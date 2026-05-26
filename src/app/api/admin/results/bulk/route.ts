import { NextResponse } from "next/server";
import { getGoogleSheetsInstance } from "@/lib/google-sheets";
import { normalizeClassName } from "@/lib/class-options";
import { uploadBufferToCloudinary } from "@/lib/cloudinary-upload";

const RESULTS_TAB_NAME = "Results";
const DOB_PATTERN = /^\d{2}-\d{2}-\d{4}$/;

type HeaderKey = "admissionNo" | "dob" | "studentName" | "className" | "examName" | "resultLink" | "status";

const HEADER_ALIASES: Record<HeaderKey, string[]> = {
    admissionNo: ["admissionno", "admissionnumber", "rollno", "rollnumber"],
    dob: ["dob", "dateofbirth", "birthdate"],
    studentName: ["studentname", "name"],
    className: ["classname", "class", "grade", "classgrade"],
    examName: ["examname", "exam", "term", "examtitle"],
    resultLink: ["resultlink", "link", "pdflink", "resulturl", "url"],
    status: ["status"],
};

function toErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "Unknown error";
}

function normalizeHeader(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeDob(value: string): string {
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return trimmed.split("-").reverse().join("-");
    }
    return trimmed;
}

function isValidDob(value: string): boolean {
    if (!DOB_PATTERN.test(value)) return false;

    const [dayRaw, monthRaw, yearRaw] = value.split("-");
    const day = Number(dayRaw);
    const month = Number(monthRaw);
    const year = Number(yearRaw);
    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

function parseCsv(content: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let cell = "";
    let inQuotes = false;

    for (let i = 0; i < content.length; i += 1) {
        const char = content[i];
        const nextChar = content[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                cell += '"';
                i += 1;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (char === "," && !inQuotes) {
            row.push(cell.trim());
            cell = "";
            continue;
        }

        if ((char === "\n" || char === "\r") && !inQuotes) {
            if (char === "\r" && nextChar === "\n") {
                i += 1;
            }
            row.push(cell.trim());
            cell = "";
            if (row.some((col) => col.length > 0)) {
                rows.push(row);
            }
            row = [];
            continue;
        }

        cell += char;
    }

    if (cell.length > 0 || row.length > 0) {
        row.push(cell.trim());
        if (row.some((col) => col.length > 0)) {
            rows.push(row);
        }
    }

    return rows;
}

function findHeaderIndex(headerRow: string[], key: HeaderKey): number {
    return headerRow.findIndex((header) => HEADER_ALIASES[key].includes(header));
}

function normalizeFileKey(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const resultFiles = formData.getAll("resultFiles").filter((entry): entry is File => entry instanceof File);

        if (!(file instanceof File)) {
            return NextResponse.json({ success: false, error: "CSV file is required" }, { status: 400 });
        }

        const resultFileMap = new Map<string, File>();
        for (const resultFile of resultFiles) {
            const baseName = resultFile.name.replace(/\.[^/.]+$/, "");
            const normalizedKey = normalizeFileKey(baseName);
            if (normalizedKey) {
                resultFileMap.set(normalizedKey, resultFile);
            }
        }

        const raw = (await file.text()).replace(/^\uFEFF/, "");
        const csvRows = parseCsv(raw);

        if (csvRows.length < 2) {
            return NextResponse.json({ success: false, error: "CSV must include a header row and at least one data row" }, { status: 400 });
        }

        const normalizedHeaders = csvRows[0].map((header) => normalizeHeader(header));
        const headerIndexes = {
            admissionNo: findHeaderIndex(normalizedHeaders, "admissionNo"),
            dob: findHeaderIndex(normalizedHeaders, "dob"),
            studentName: findHeaderIndex(normalizedHeaders, "studentName"),
            className: findHeaderIndex(normalizedHeaders, "className"),
            examName: findHeaderIndex(normalizedHeaders, "examName"),
            resultLink: findHeaderIndex(normalizedHeaders, "resultLink"),
            status: findHeaderIndex(normalizedHeaders, "status"),
        };

        const missingHeaders = Object.entries(headerIndexes)
            .filter(([key, index]) => key !== "status" && key !== "resultLink" && index === -1)
            .map(([key]) => key);

        if (missingHeaders.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "CSV is missing required columns",
                    missingColumns: missingHeaders,
                    requiredColumns: ["admissionNo", "dob", "studentName", "className", "examName"],
                },
                { status: 400 }
            );
        }

        const errors: string[] = [];
        const nowIso = new Date().toISOString();
        const values: string[][] = [];
        const uploadedResultLinks = new Map<string, string>();
        let uploadedFiles = 0;
        const dataRows = csvRows.slice(1);

        for (let index = 0; index < dataRows.length; index += 1) {
            const row = dataRows[index];
            const lineNo = index + 2;
            const admissionNo = row[headerIndexes.admissionNo]?.trim() || "";
            const dob = normalizeDob(row[headerIndexes.dob]?.trim() || "");
            const studentName = row[headerIndexes.studentName]?.trim() || "";
            const className = normalizeClassName(row[headerIndexes.className]?.trim() || "");
            const examName = row[headerIndexes.examName]?.trim() || "";
            const status = headerIndexes.status >= 0 ? row[headerIndexes.status]?.trim() || "Published" : "Published";
            let resultLink = headerIndexes.resultLink >= 0 ? row[headerIndexes.resultLink]?.trim() || "" : "";

            const rowIssues: string[] = [];
            if (!admissionNo) rowIssues.push("admissionNo");
            if (!dob) rowIssues.push("dob");
            if (!studentName) rowIssues.push("studentName");
            if (!className) rowIssues.push("className");
            if (!examName) rowIssues.push("examName");
            if (!isValidDob(dob)) rowIssues.push("valid dob (DD-MM-YYYY)");

            if (rowIssues.length > 0) {
                errors.push(`Row ${lineNo}: missing ${rowIssues.join(", ")}`);
                continue;
            }

            if (!resultLink) {
                const admissionKey = normalizeFileKey(admissionNo);
                const examKey = normalizeFileKey(examName);
                const combinedKey = `${admissionKey}${examKey}`;
                const matchedKey = (combinedKey && resultFileMap.has(combinedKey))
                    ? combinedKey
                    : (resultFileMap.has(admissionKey) ? admissionKey : "");

                if (matchedKey) {
                    if (uploadedResultLinks.has(matchedKey)) {
                        resultLink = uploadedResultLinks.get(matchedKey) || "";
                    } else {
                        const matchedFile = resultFileMap.get(matchedKey);
                        if (matchedFile) {
                            try {
                                const buffer = Buffer.from(await matchedFile.arrayBuffer());
                                const uploadRes = await uploadBufferToCloudinary(buffer, {
                                    folder: "school_documents/results-bulk",
                                });
                                resultLink = uploadRes.secure_url;
                                uploadedResultLinks.set(matchedKey, resultLink);
                                uploadedFiles += 1;
                            } catch (uploadError: unknown) {
                                errors.push(`Row ${lineNo}: failed to upload linked file (${toErrorMessage(uploadError)})`);
                                continue;
                            }
                        }
                    }
                }
            }

            if (!resultLink) {
                errors.push(`Row ${lineNo}: missing resultLink and no matching file found (use file name as admissionNo or admissionNo+examName).`);
                continue;
            }

            values.push([admissionNo, dob, studentName, className, examName, resultLink, status, nowIso]);
        }

        if (errors.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "CSV validation failed",
                    totalErrors: errors.length,
                    errors: errors.slice(0, 20),
                },
                { status: 400 }
            );
        }

        if (values.length === 0) {
            return NextResponse.json({ success: false, error: "No valid rows found in CSV" }, { status: 400 });
        }

        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) {
            return NextResponse.json({ success: false, error: "Missing spreadsheet configuration" }, { status: 500 });
        }

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${RESULTS_TAB_NAME}!A:H`,
            valueInputOption: "USER_ENTERED",
            requestBody: { values },
        });

        return NextResponse.json({
            success: true,
            inserted: values.length,
            uploadedFiles,
            filesProvided: resultFiles.length,
        });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error: "Bulk upload failed", details: toErrorMessage(error) }, { status: 500 });
    }
}
