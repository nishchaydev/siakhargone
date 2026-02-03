import { getGoogleSheetsInstance, SHEET_TAB_IDS, deleteRowById } from "@/lib/google-sheets";

export interface CareerItem {
    id: string;
    role: string;
    department: string;
    type: string;
    experience: string;
    description: string;
    isActive: boolean;
}

export async function getCareersService(): Promise<CareerItem[]> {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) {
            console.error("Configuration Error: Missing Sheet ID");
            return [];
        }

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.CAREERS || 'Careers'}!A2:H`, // Id, JobTitle, Department, Type, Experience, Description, Status, CreatedAt
        });

        const rows = response.data.values || [];
        const careers = rows.map((row) => ({
            id: row[0],
            role: row[1],
            department: row[2],
            type: row[3],
            experience: row[4],
            description: row[5],
            isActive: row[6] === "Active",
        }));

        // Filter active only? Or return all and let consumer decide?
        // Admin might want to see inactive. Public only active.
        // For now, return all.
        return careers.reverse();
    } catch (error) {
        console.error("Service Careers Fetch Error:", error);
        return [];
    }
}

export async function addCareerService(item: { role: string, department: string, type: string, experience: string, description: string }) {
    const sheets = await getGoogleSheetsInstance();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    if (!spreadsheetId) throw new Error("Missing ID");

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_TAB_IDS.CAREERS || 'Careers'}!A:H`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [[id, item.role, item.department, item.type, item.experience, item.description, "Active", createdAt]],
        },
    });
    return true;
}

export async function updateCareerService(item: { id: string, role: string, department: string, type: string, experience: string, description: string, isActive: boolean }) {
    const sheets = await getGoogleSheetsInstance();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    if (!spreadsheetId) throw new Error("Missing ID");

    const readRes = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${SHEET_TAB_IDS.CAREERS || 'Careers'}!A:A`,
    });

    const rows = readRes.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === item.id);

    if (rowIndex === -1) throw new Error("Career item not found");

    const sheetRowNumber = rowIndex + 1;

    // Update row
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${SHEET_TAB_IDS.CAREERS || 'Careers'}!B${sheetRowNumber}:G${sheetRowNumber}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [[item.role, item.department, item.type, item.experience, item.description, item.isActive ? "Active" : "Inactive"]],
        },
    });
    return true;
}

export async function deleteCareerService(id: string) {
    if (!id) throw new Error("Missing ID");
    await deleteRowById(SHEET_TAB_IDS.CAREERS || 'Careers', id);
    return true;
}
