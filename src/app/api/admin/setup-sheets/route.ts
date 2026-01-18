
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance } from "@/lib/google-sheets";

// Define the required tabs and their header rows
const REQUIRED_SHEETS = [
    {
        title: "News",
        header: ["Id", "Title", "Date", "Content", "Link", "Status", "CreatedAt"]
    },
    {
        title: "Notices",
        header: ["Id", "Title", "Date", "Content", "Link", "Status", "CreatedAt"]
    },
    {
        title: "Gallery",
        header: ["Id", "Title", "Category", "ImageUrl", "Date", "Description", "Status", "CreatedAt"]
    },
    {
        title: "Careers",
        header: ["Id", "JobTitle", "Department", "Type", "Experience", "Description", "Status", "CreatedAt"]
    },
    {
        title: "TransferCertificates",
        header: ["AdmissionNo", "TCNo", "StudentName", "Class", "Session", "IssueDate", "PDFLink", "Status", "CreatedAt", "DOB"]
    },
    {
        title: "Results",
        header: ["AdmissionNo", "DOB", "StudentName", "Class", "ExamName", "ResultLink", "Status", "CreatedAt"]
    },
    {
        title: "Enquiries",
        header: ["Name", "Phone", "Email", "Class", "Message", "Date", "Status"]
    },
    {
        title: "Applications",
        header: ["JobId", "Name", "Phone", "Email", "ResumeLink", "Date", "Status"]
    },
    {
        title: "Admissions",
        header: [
            "Id", "Date", "StudentName", "DOB", "Gender",
            "CurrentClass", "ApplyingFor", "CurrentSchool", "Board",
            "FatherName", "FatherMobile", "FatherEmail",
            "MotherName", "MotherMobile", "MotherEmail",
            "Address", "Transport", "VisitTime", "Status"
        ]
    },
    {
        title: "SiteAssets",
        header: ["Id", "Section", "Key", "ImageUrl", "AltText", "UpdatedAt"]
    },
    {
        title: "StudentAchievers",
        header: ["Id", "Name", "Class", "Achievement", "Category", "ImageUrl", "Priority", "Status", "CreatedAt"]
    }
];

export async function GET() {
    return POST();
}

export async function POST() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) {
            return NextResponse.json({ error: "Missing Spreadsheet ID" }, { status: 500 });
        }

        // 1. Get existing sheet properties
        const meta = await sheets.spreadsheets.get({ spreadsheetId });
        const existingSheets = meta.data.sheets || [];
        const existingTitles = existingSheets.map(s => s.properties?.title);

        const requests: any[] = [];
        const updateHeaderRequests: any[] = [];

        // 2. Identify missing sheets
        for (const sheetDef of REQUIRED_SHEETS) {
            if (!existingTitles.includes(sheetDef.title)) {
                // Add sheet request
                requests.push({
                    addSheet: {
                        properties: { title: sheetDef.title }
                    }
                });

                // We'll add headers after sheet creation in a separate step/logic or appending to values
                // But batchUpdate can handle addSheet. values.update is separate.
                // We can't values.update a sheet that doesn't exist yet in the same batch if it relies on ID?
                // Actually, we can reference by title in A1 notation once it exists.
                // Let's create sheets first.
            }
        }

        // Execute creation of missing tabs
        if (requests.length > 0) {
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                requestBody: { requests }
            });
            console.log(`Created ${requests.length} new tabs.`);
        }

        // 3. Update Headers (for ALL sheets, to ensure consistency or add missing columns)
        // Note: verify existing header row to avoid overwriting data if someone changed structure? 
        // Ideally we just check if A1 is empty, or just overwrite/append Row 1?
        // Safest is to Check A1:Z1. If empty, write Header. 
        // If not empty, we assume it's correct or we risk breaking existing data mapping.

        // For simplicity in this helper, we will just try to write headers if the sheet seems "empty" or just overwrite Row 1 
        // to match our code's expectation? Overwriting Row 1 is risky if column order changed.
        // Let's just Append if empty? No, header must be at top.
        // Let's read A1 of each sheet.

        const updatesLog = [];

        for (const sheetDef of REQUIRED_SHEETS) {
            // Read first row
            const checkRes = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `${sheetDef.title}!A1:1`
            });

            const existingHeader = checkRes.data.values?.[0];

            if (!existingHeader || existingHeader.length === 0) {
                // Empty sheet, write headers
                await sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range: `${sheetDef.title}!A1`,
                    valueInputOption: "USER_ENTERED",
                    requestBody: { values: [sheetDef.header] }
                });
                updatesLog.push(`Initialized headers for ${sheetDef.title}`);
            } else {
                // Check if specific new columns are missing (e.g. DOB in TC)
                // This is a comprehensive fix for the user's "TC sheet also dont have doc section" issue
                // We'll compare expected vs actual and append if needed?
                // Or just Log that it exists.
                // User specifically mentioned TC sheet issue.

                if (sheetDef.title === "TransferCertificates") {
                    // Check if "DOB" is present
                    if (!existingHeader.includes("DOB")) {
                        // Append DOB to the end of header row
                        // Find the next empty column index? 
                        // Or just update the whole header row if we are confident? 
                        // Let's just append data to the next column.
                        const nextColIndex = existingHeader.length; // 0-based index of next empty col
                        // Convert to A1 notation? A bit complex.
                        // Easier: Just update A1 with the FULL expected header allowed?
                        // If we overwrite, we fix the structure.

                        await sheets.spreadsheets.values.update({
                            spreadsheetId,
                            range: `${sheetDef.title}!A1`,
                            valueInputOption: "USER_ENTERED",
                            requestBody: { values: [sheetDef.header] } // Force update to match code expectation
                        });
                        updatesLog.push(`Updated headers for ${sheetDef.title} (Added missing columns)`);
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: "Sheets setup complete",
            createdTabs: requests.length,
            updates: updatesLog
        });

    } catch (error) {
        console.error("Setup Sheets Error:", error);
        return NextResponse.json({ error: "Failed to setup sheets" }, { status: 500 });
    }
}
