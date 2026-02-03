
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q")?.toLowerCase();

        if (!query) {
            return NextResponse.json({ data: [] });
        }

        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // Fetch data from multiple sources in parallel
        const [newsRes, noticesRes, tcRes] = await Promise.all([
            sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TAB_IDS.NEWS}!A2:B` }), // Title, Description
            sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TAB_IDS.NOTICES}!A2:A` }), // Text
            sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TAB_IDS.TRANSFER_CERTIFICATES}!A2:C` }) // AdminNo, TCNo, Name
        ]);

        interface SearchResult {
            type: string;
            title: string;
            description: string;
            url: string;
        }

        const results: SearchResult[] = [];

        // 1. Search News
        const newsRows = newsRes.data.values || [];
        newsRows.forEach((row, index) => {
            const title = row[0]?.toLowerCase() || "";
            const desc = row[1]?.toLowerCase() || "";
            if (title.includes(query) || desc.includes(query)) {
                results.push({
                    type: "News",
                    title: row[0],
                    description: "News Article",
                    url: "/#news" // Anchor to homepage news section
                });
            }
        });

        // 2. Search Notices
        const noticeRows = noticesRes.data.values || [];
        noticeRows.forEach((row) => {
            const text = row[0]?.toLowerCase() || "";
            if (text.includes(query)) {
                results.push({
                    type: "Notice",
                    title: row[0],
                    description: "Announcement",
                    url: "/#notices"
                });
            }
        });

        // 3. Search TCs
        const tcRows = tcRes.data.values || [];
        tcRows.forEach((row) => {
            const adminNo = row[0]?.toLowerCase() || "";
            const name = row[2]?.toLowerCase() || "";
            if (adminNo.includes(query) || name.includes(query)) {
                results.push({
                    type: "Transfer Certificate",
                    title: `TC: ${row[2]}`,
                    description: `Admission No: ${row[0]}`,
                    url: "/tc"
                });
            }
        });

        // 4. Static Pages (Hardcoded for speed)
        const staticPages = [
            { title: "Admissions", url: "/admissions", keywords: "admission apply fee join" },
            { title: "Contact Us", url: "/contact", keywords: "phone email address map" },
            { title: "About Us", url: "/about", keywords: "principal vision history" },
            { title: "Gallery", url: "/gallery", keywords: "photos images events" },
            { title: "Careers", url: "/careers", keywords: "job vacancy teacher apply work" },
        ];

        staticPages.forEach(page => {
            if (page.title.toLowerCase().includes(query) || page.keywords.includes(query)) {
                results.push({
                    type: "Page",
                    title: page.title,
                    description: "Quick Link",
                    url: page.url
                });
            }
        });

        return NextResponse.json({ data: results.slice(0, 10) }); // Limit to top 10

    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }
}
