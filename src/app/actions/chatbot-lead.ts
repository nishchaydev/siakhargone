'use server';

import { getGoogleSheetsInstance } from "@/lib/google-sheets";

export async function submitChatbotLead(data: {
    name: string;
    phone: string;
    class: string;
    message: string;
}) {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) {
            console.error("Missing Google Sheets ID");
            throw new Error("Missing Google Sheets ID");
        }
        console.log("Submitting to sheet:", spreadsheetId);

        // Append to "Enquiries" sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Enquiries!A:G', // Columns: Name, Phone, Email, Class, Message, Date, Status
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        data.name,
                        data.phone,
                        "N/A", // Email
                        data.class,
                        data.message || "Chatbot Enquiry",
                        new Date().toISOString(), // Date
                        "New" // Status
                    ]
                ]
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Error submitting chatbot lead:", error);
        return { success: false, error: "Failed to submit enquiry." };
    }
}
