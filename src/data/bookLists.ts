export interface BookItem {
    sn: number;
    subject: string;
    publisher: string;
    bookTitle: string;
}

export interface NotebookItem {
    sn: number;
    type: string;
    details: string;
    qty: number;
}

export interface ClassBookList {
    classId: string;
    className: string;
    academicYear: string;
    books: BookItem[];
    notebooks: NotebookItem[];
}

export const bookListsData: Record<string, ClassBookList> = {
    "6th": {
        classId: "6th",
        className: "Class - 6th",
        academicYear: "2026-27",
        books: [
            { sn: 1, subject: "Hindi (Text Book)", publisher: "NCERT", bookTitle: "Malhar" },
            { sn: 2, subject: "English (Text Book)", publisher: "NCERT", bookTitle: "Poorvi" },
            { sn: 3, subject: "Sanskrit (Text Book)", publisher: "NCERT", bookTitle: "दीपकम" },
            { sn: 4, subject: "Mathematics", publisher: "NCERT", bookTitle: "Ganit Prakash" },
            { sn: 5, subject: "Science", publisher: "NCERT", bookTitle: "Curiosity" },
            { sn: 6, subject: "Social Science", publisher: "NCERT", bookTitle: "Exploring Society India & Beyond" },
            { sn: 7, subject: "Computer", publisher: "Kips Publication", bookTitle: "Cyber Quest Rebooted (Optional)" },
            { sn: 8, subject: "English Grammar (Optional)", publisher: "Mac Millan Edu.", bookTitle: "My Sixth Book of Gramm. & Comp." },
            { sn: 9, subject: "Reasoning Workbook -6", publisher: "MTG", bookTitle: "Reasoning Workbook -6" },
            { sn: 10, subject: "Vocational Education", publisher: "NCERT", bookTitle: "Kaushal Bodh" },
            { sn: 11, subject: "Physical Education & Well Being", publisher: "NCERT", bookTitle: "Khel Yatra" },
        ],
        notebooks: [
            { sn: 1, type: "Single Line", details: "A4 Size (254) Pages", qty: 2 },
            { sn: 2, type: "Single Line", details: "A4 Size (168) Pages", qty: 5 },
            { sn: 3, type: "Single Line", details: "A4 (120 pages)", qty: 1 },
            { sn: 4, type: "Rough Note Book", details: "Yellow Pages", qty: 2 },
        ]
    },
    "7th": {
        classId: "7th",
        className: "Class - 7th",
        academicYear: "2026-27",
        books: [
            { sn: 1, subject: "Hindi (Text Book)", publisher: "NCERT", bookTitle: "Malhar" },
            { sn: 2, subject: "English (Text Book)", publisher: "NCERT", bookTitle: "Poorvi" },
            { sn: 3, subject: "Sanskrit (Text Book)", publisher: "NCERT", bookTitle: "Deepakam" },
            { sn: 4, subject: "Mathematics", publisher: "NCERT", bookTitle: "Ganita Prakash (Part I & II)" },
            { sn: 5, subject: "Science", publisher: "NCERT", bookTitle: "Curiosity" },
            { sn: 6, subject: "Social Science", publisher: "NCERT", bookTitle: "Exploring Society India & Beyond (Part I & II)" },
            { sn: 7, subject: "Computer", publisher: "Kips Publication", bookTitle: "Cyber Quest Rebooted (Optional)" },
            { sn: 8, subject: "English Grammar (optional)", publisher: "Mac Millan", bookTitle: "My Seventh Book of Gramm. & Comp." },
            { sn: 9, subject: "Reasoning Workbook -7", publisher: "MTG", bookTitle: "Reasoning Workbook -7" },
            { sn: 10, subject: "Vocational Education", publisher: "NCERT", bookTitle: "Kaushal Bodh" },
            { sn: 11, subject: "Physical Education & Well Being", publisher: "NCERT", bookTitle: "Khel Yatra" },
        ],
        notebooks: [
            { sn: 1, type: "Single Line", details: "A4 Size (254) Pages", qty: 2 },
            { sn: 2, type: "Single Line", details: "A4 Size (168) Pages", qty: 5 },
            { sn: 3, type: "Single Line", details: "A4 (120 pages)", qty: 1 },
            { sn: 4, type: "Rough Note Book", details: "Yellow Pages", qty: 2 },
        ]
    },
    "8th": {
        classId: "8th",
        className: "Class - 8th",
        academicYear: "2026-27",
        books: [
            { sn: 1, subject: "Hindi (Text Book)", publisher: "NCERT", bookTitle: "Malhar" },
            { sn: 2, subject: "English (Text Book)", publisher: "NCERT", bookTitle: "Poorvi" },
            { sn: 3, subject: "Sanskrit (Text Book)", publisher: "NCERT", bookTitle: "Deepakam" },
            { sn: 4, subject: "Mathematics", publisher: "NCERT", bookTitle: "Ganita Prakash (Part I & II)" },
            { sn: 5, subject: "Science", publisher: "NCERT", bookTitle: "Curiosity" },
            { sn: 6, subject: "Social Science", publisher: "NCERT", bookTitle: "Exploring Society India & Beyond" },
            { sn: 7, subject: "Computer", publisher: "Kips Publication", bookTitle: "Cyber Quest Rebooted (Optional)" },
            { sn: 8, subject: "English Grammar", publisher: "Mac Millan", bookTitle: "My Seventh Book of Gramm. & Comp." },
            { sn: 9, subject: "Reasoning Workbook -8", publisher: "MTG", bookTitle: "Reasoning Workbook -8" },
            { sn: 10, subject: "Vocational Education", publisher: "NCERT", bookTitle: "Kaushal Bodh" },
            { sn: 11, subject: "Physical Education & Well Being", publisher: "NCERT", bookTitle: "Khel Yatra" },
        ],
        notebooks: [
            { sn: 1, type: "Single Line", details: "A4 Size (254) Pages", qty: 2 },
            { sn: 2, type: "Single Line", details: "A4 Size (168) Pages", qty: 5 },
            { sn: 3, type: "Single Line", details: "A4 (120 pages)", qty: 1 },
            { sn: 4, type: "Rough Note Book", details: "Yellow Pages", qty: 2 },
        ]
    },
    "10th": {
        classId: "10th",
        className: "Class - 10th",
        academicYear: "2026-27",
        books: [
            { sn: 1, subject: "Hindi (Text Book)", publisher: "NCERT", bookTitle: "Sparsh I" },
            { sn: 2, subject: "Hindi (Supplementary)", publisher: "NCERT", bookTitle: "Sanchayan II" },
            { sn: 3, subject: "English (Text Book)", publisher: "NCERT", bookTitle: "First Flight" },
            { sn: 4, subject: "English (Supplementary)", publisher: "NCERT", bookTitle: "Foot Prints" },
            { sn: 5, subject: "Mathematics", publisher: "NCERT", bookTitle: "Mathematics" },
            { sn: 6, subject: "Science", publisher: "NCERT", bookTitle: "Science" },
            { sn: 7, subject: "Social Science", publisher: "NCERT", bookTitle: "All Parts" },
            { sn: 8, subject: "Information Technology", publisher: "Kips Publication", bookTitle: "IT 402" },
        ],
        notebooks: [
            { sn: 1, type: "Single Line", details: "A4 Size (168) Pages", qty: 4 },
            { sn: 2, type: "One Line", details: "A4 Size (300) Pages", qty: 2 },
            { sn: 3, type: "Single Line", details: "A4 Size (120) Pages", qty: 1 },
            { sn: 4, type: "Rough Note Book", details: "Yellow Pages", qty: 1 },
            { sn: 5, type: "Science Practical Notebook", details: "-", qty: 1 },
        ]
    }
};
