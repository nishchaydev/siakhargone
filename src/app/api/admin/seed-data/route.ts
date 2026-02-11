import { NextResponse } from 'next/server';
import { addAchievement } from '@/services/achievementsService';
import { addResult } from '@/services/resultsService';
import { addUpdate } from '@/services/updatesService';
import { addNewsService } from '@/services/newsService';
import { addEventService } from '@/services/eventsService';
import { addNoticeService } from '@/services/noticesService';

export async function GET(request: Request) {
    try {
        // Simple auth bypass using secret key from environment
        const url = new URL(request.url);
        const secretKey = url.searchParams.get('key');
        const expectedKey = process.env.SEED_DATA_SECRET_KEY || 'sia_seed_2026';

        if (secretKey !== expectedKey) {
            return NextResponse.json({ success: false, error: 'Unauthorized - Invalid or missing key parameter' }, { status: 401 });
        }

        const results = {
            achievements: 0,
            results: 0,
            updates: 0,
            news: 0,
            events: 0,
            notices: 0,
            errors: [] as string[]
        };

        // ACHIEVEMENTS
        const achievements = [
            {
                title: "1st Prize in Republic Day Cultural Program 2024",
                studentName: "School Team",
                class: "Multiple Classes",
                date: "2024-01-26",
                description: "SIA students won 1st prize in main Republic Day drill line program - sanskritik program organized on 26 January 2024.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816165/26_january_2024.jpg_zmcf3i.jpg",
                priority: "2",
                category: "Cultural",
                mediaCoverage: false
            },
            {
                title: "Triple Gold Medal Winner - District Athletics Championship",
                studentName: "Ishika Kushwah",
                class: "8th",
                date: "2024-01-14",
                description: "Won Gold Medal in 60m race, High Jump and Long Jump (Age group 14) at District Level Athletics Championship 2024. Selected for National Level competition in Gujarat.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816298/1747807056752.jpg_bjruq7.jpg",
                priority: "1",
                category: "Sports",
                mediaCoverage: true
            },
            {
                title: "Double Gold Medal Winner - District Athletics",
                studentName: "Krishna Yadav",
                class: "9th",
                date: "2024-01-14",
                description: "Won Gold Medal in 600m race and Long Jump (Age group 14) at District Level Athletics Championship 2024. Selected for National Level competition in Gujarat.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816298/1747807056752.jpg_bjruq7.jpg",
                priority: "1",
                category: "Sports",
                mediaCoverage: true
            },
            {
                title: "Gold Medal in 60m Race - District Athletics",
                studentName: "Vanshika Chauhan",
                class: "Multiple",
                date: "2024-01-14",
                description: "Won 1st place (Gold Medal) in 60m race (Age group 17) at District Level Athletics Championship 2024. Selected for National Level competition.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816298/1747807056752.jpg_bjruq7.jpg",
                priority: "1",
                category: "Sports",
                mediaCoverage: true
            },
            {
                title: "Gold Medal in Long Jump - District Athletics",
                studentName: "Rajveer Chauhan",
                class: "8th",
                date: "2024-01-14",
                description: "Won 1st place (Gold Medal) in Long Jump (Age group 16) at District Level Athletics Championship 2024. Selected for National Level competition.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816298/1747807056752.jpg_bjruq7.jpg",
                priority: "1",
                category: "Sports",
                mediaCoverage: true
            },
            {
                title: "City Topper Honored by DEO Office",
                studentName: "Prince Kushwah",
                class: "10th",
                date: "2024-05-15",
                description: "Prince Kushwah recognized as City Topper by District Education Officer in special felicitation ceremony at DEO office, Khargone.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816559/DEO_CITY_TOPPER.jpg_n0hkhn.jpg",
                priority: "1",
                category: "Academic",
                mediaCoverage: false
            },
            {
                title: "Selected for State Level Taekwondo Championship",
                studentName: "SIA Student",
                class: "Multiple",
                date: "2022-09-20",
                description: "SIA student selected for state level Taekwondo championship. Achievement covered in leading newspapers.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816590/IMG-20220920-WA0004.jpg_zhhfto.jpg",
                priority: "2",
                category: "Sports",
                mediaCoverage: true
            },
            {
                title: "SIA Taekwondo Achievement Featured in Leading Newspaper",
                studentName: "SIA Team",
                class: "Multiple",
                date: "2024-01-15",
                description: "SIA students' achievements in Taekwondo featured in leading local newspaper, highlighting the school's excellence in sports.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816285/1747807023219.jpg_qssnwf.jpg",
                priority: "2",
                category: "Sports",
                mediaCoverage: true
            },
            {
                title: "Bronze Medal at State Level Weightlifting Championship",
                studentName: "Naksh Shailendra Choudhary",
                class: "10th",
                date: "2023-09-23",
                description: "Naksh Shailendra Choudhary won Bronze Medal in Under-17 weightlifting category at State Level Championship. First selected at district level, then competed at state level.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816089/1747806889599.jpg_lzcyj3.jpg",
                priority: "1",
                category: "Sports",
                mediaCoverage: false
            },
            {
                title: "Students Honored at Pratibha Samman Ceremony",
                studentName: "Multiple Students",
                class: "Multiple",
                date: "2024-01-15",
                description: "SIA students honored at Pratibha Samman ceremony for their outstanding achievements in academics and sports.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816530/1747810401916.jpg_vnyccx.jpg",
                priority: "2",
                category: "Academic",
                mediaCoverage: false
            },
            {
                title: "Student Achievement Recognition",
                studentName: "SIA Student",
                class: "Multiple",
                date: "2025-11-22",
                description: "General student achievement recognition ceremony.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816644/IMG20251122122140_-_Copy.jpg_rst3dc.jpg",
                priority: "3",
                category: "General",
                mediaCoverage: false
            }
        ];

        for (const item of achievements) {
            try {
                await addAchievement(item);
                results.achievements++;
            } catch (e) {
                console.error("Failed to add achievement:", item.title, e);
                results.errors.push(`Failed to add achievement: ${item.title}`);
            }
        }

        // RESULTS
        const resultItems = [
            {
                title: "Excellent Academic Performance - School Results Declared",
                examName: "Annual Examination 2024-25",
                date: "2025-05-21",
                description: "School examination results announced with outstanding performance by students across all classes.",
                link: "",
                type: "General",
                topperName: "",
                topperMarks: "",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816680/WhatsApp_Image_2025-05-21_at_14.50.12_0d54471a.jpg_usptmg.jpg",
                mediaCoverage: true
            },
            {
                title: "SIA Exam Results Featured in News",
                examName: "School Examination Results",
                date: "2025-01-21",
                description: "Sanskar International Academy's excellent exam results featured in local newspaper, highlighting student achievements.",
                link: "",
                type: "General",
                topperName: "",
                topperMarks: "",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816680/WhatsApp_Image_2025-05-21_at_14.50.12_0d54471a.jpg_usptmg.jpg",
                mediaCoverage: true
            }
        ];

        for (const item of resultItems) {
            try {
                await addResult(item);
                results.results++;
            } catch (e) {
                console.error("Failed to add result:", item.title, e);
                results.errors.push(`Failed to add result: ${item.title}`);
            }
        }

        // UPDATES
        const updates = [
            {
                content: "🏆 4 SIA Students Selected for National Athletics! Ishika Kushwah, Krishna Yadav, Vanshika Chauhan & Rajveer Chauhan to compete in Gujarat in February after winning Gold Medals at District Level.",
                date: "2024-01-15",
                type: "Achievement",
                link: "/achievements",
                showOnHomepage: true
            },
            {
                content: "🇮🇳 SIA Team Wins 1st Prize in Republic Day Cultural Program! Our students won first prize in main drill line and cultural program on 26 January 2024.",
                date: "2024-01-27",
                type: "Achievement",
                link: "/achievements",
                showOnHomepage: true
            },
            {
                content: "📰 SIA in News! Our students' achievements in Taekwondo and Athletics featured in leading local newspapers. Proud moment for SIA family!",
                date: "2024-01-20",
                type: "Info",
                link: "/achievements",
                showOnHomepage: true
            }
        ];

        for (const item of updates) {
            try {
                await addUpdate(item);
                results.updates++;
            } catch (e) {
                console.error("Failed to add update:", item.content, e);
                results.errors.push(`Failed to add update: ${item.content.substring(0, 20)}...`);
            }
        }

        // NEWS
        const newsItems = [
            {
                title: "Gujarat Educational Tour 2026: A Grand Departure",
                description: "Our senior secondary students embarked on an enriching 10-day tour to Gujarat, visiting the Statue of Unity, Sabarmati Ashram, and modern industrial hubs. An experience of a lifetime!",
                date: "2026-02-15",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1765349468/mix-photos-1_jjhoek.webp"
            },
            {
                title: "Admissions Open 2026-27: Join the SIA Legacy",
                description: "Experience excellence in education with modern labs, smart classrooms, and a focus on sports and values. Admissions are now open for Pre-Nursery to Grade IX.",
                date: "2026-02-10",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1768373239/school-logo_npmwwm.png"
            },
            {
                title: "National Level Athletics: 4 SIA Students Representing MP",
                description: "Proud moment for Khargone! Ishika Kushwah and her team represent Madhya Pradesh in the National Athletics Championship in Gujarat.",
                date: "2026-01-20",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816298/1747807056752.jpg_bjruq7.jpg"
            }
        ];

        for (const item of newsItems) {
            try {
                await addNewsService(item);
                results.news++;
            } catch (e) {
                console.error("Failed to add news:", item.title, e);
                results.errors.push(`Failed to add news: ${item.title}`);
            }
        }

        // EVENTS
        const eventsItems = [
            {
                title: "Gujarat Tour Flag-off Ceremony",
                date: "2026-02-15",
                time: "07:30 AM",
                location: "SIA Main Campus",
                description: "Wishing our students a safe and educational journey as they depart for the Gujarat Cultural Tour.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1765349474/session-start-1_qshvtb.webp"
            },
            {
                title: "Admission Counseling Day",
                date: "2026-02-22",
                time: "10:00 AM",
                location: "School Auditorium",
                description: "Join our expert counselors to understand the New Education Policy (NEP) and our 2026 curriculum.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1765349457/classroom-1_k9z4s9.webp"
            },
            {
                title: "Annual Sports Day - Sutra 2026",
                date: "2026-03-15",
                time: "08:00 AM",
                location: "SIA Sports Ground",
                description: "A celebration of sportsmanship and spirit! Join us for our annual athletic meet.",
                imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1770816298/1747807056752.jpg_bjruq7.jpg"
            }
        ];

        for (const item of eventsItems) {
            try {
                await addEventService(item);
                results.events++;
            } catch (e) {
                console.error("Failed to add event:", item.title, e);
                results.errors.push(`Failed to add event: ${item.title}`);
            }
        }

        // NOTICES
        const noticesItems = [
            {
                title: "Admission Registration Open 2026-27",
                date: "2026-02-01",
                pdfUrl: "/admissions",
                important: true
            },
            {
                title: "Gujarat Tour 2026 - Last Minute Instructions",
                date: "2026-02-12",
                pdfUrl: "#",
                important: true
            },
            {
                title: "Maha Shivratri Holiday Notice",
                date: "2026-02-26",
                pdfUrl: "#",
                important: false
            }
        ];

        for (const item of noticesItems) {
            try {
                await addNoticeService(item);
                results.notices++;
            } catch (e) {
                console.error("Failed to add notice:", item.title, e);
                results.errors.push(`Failed to add notice: ${item.title}`);
            }
        }

        return NextResponse.json({ success: true, results });
    } catch (error) {
        console.error("Seed Data Error:", error);
        return NextResponse.json({ success: false, error: 'Failed to seed data' }, { status: 500 });
    }
}
