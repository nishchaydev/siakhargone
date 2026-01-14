const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function setupSheets() {
    try {
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_ID) {
            console.error('Missing environment variables. Check .env.local');
            return;
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        // 1. Get existing sheets
        const metadata = await sheets.spreadsheets.get({ spreadsheetId });
        const existingSheets = metadata.data.sheets.map(s => s.properties.title);

        console.log('Existing sheets:', existingSheets);

        const tabsToCreate = [
            { title: 'News', headers: ['Title', 'Description', 'Date', 'ImageUrl'] },
            { title: 'Notices', headers: ['Text', 'Link', 'Date', 'Priority'] },
            { title: 'Careers', headers: ['Role', 'Experience', 'Description', 'Active', 'Type', 'Department', 'DeletedAt'] },
            { title: 'Gallery', headers: ['ImageID', 'Category', 'AltText'] },
            { title: 'Applications', headers: ['Name', 'Phone', 'Email', 'Role', 'ResumeLink', 'CoverLetter', 'Date', 'Status', 'Notes'] },
            { title: 'TransferCertificates', headers: ['AdmissionNo', 'TCNo', 'StudentName', 'Class', 'Session', 'IssueDate', 'PDFLink', 'Status', 'CreatedAt'] },
            {
                title: "Results",
                header: ["AdmissionNo", "DOB", "StudentName", "Class", "ExamName", "ResultLink", "Status", "LastUpdated"],
            },
        ];

        for (const tab of tabsToCreate) {
            if (!existingSheets.includes(tab.title)) {
                console.log(`Creating missing sheet: ${tab.title}...`);

                // Add Sheet
                await sheets.spreadsheets.batchUpdate({
                    spreadsheetId,
                    requestBody: {
                        requests: [{ addSheet: { properties: { title: tab.title } } }],
                    },
                });

                // Add Headers
                await sheets.spreadsheets.values.append({
                    spreadsheetId,
                    range: `${tab.title}!A1`,
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [tab.headers],
                    },
                });

                console.log(`✅ Created ${tab.title} with headers.`);
            } else {
                console.log(`ℹ️  ${tab.title} already exists. Skipping.`);
            }
        }

        console.log('Setup complete!');

    } catch (error) {
        console.error('Error setting up sheets:', error);
    }
}

setupSheets();
