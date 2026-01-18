import { NextResponse } from "next/server";
import { getCachedTCs } from "@/lib/tc-service";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q")?.trim();
        const dob = searchParams.get("dob")?.trim();

        if (!query || !dob) {
            return NextResponse.json({ error: "Admission No/TC No and Date of Birth are required" }, { status: 400 });
        }

        // 3. Cached Lookup
        const tcs = await getCachedTCs();

        // 4. Exact Match Search Logic
        const match = tcs.find(row => {
            const admissionNo = row.admissionNo?.trim().toLowerCase();
            const tcNo = row.tcNo?.trim().toLowerCase();
            const recordDob = row.dob?.trim();
            const q = query.toLowerCase();

            const isIdentifierMatch = (admissionNo === q || tcNo === q);
            const isDobMatch = recordDob === dob;

            return isIdentifierMatch && isDobMatch;
        });

        if (match) {
            if (match.status === "Revoked") {
                return NextResponse.json({
                    found: false,
                    message: "This Transfer Certificate has been revoked. Please contact the school administration."
                });
            }

            return NextResponse.json({
                found: true,
                data: match // Return the whole object (already formatted in service)
            });
        }

        return NextResponse.json({ found: false, message: "No record found with these details. Please check Admission No and Date of Birth." });

    } catch (error) {
        console.error("TC Search Error:", error);
        return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }
}
