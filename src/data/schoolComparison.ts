export interface SchoolComparisonData {
    name: string;
    founded: string;
    affiliation: string;
    studentTeacherRatio: string;
    transport: string;
    computerLab: string;
    smartClassrooms: string;
    sports: string;
    fees: string;
    highlights?: string[];
}

export const schoolComparison: SchoolComparisonData[] = [
    {
        name: "Sanskar International Academy",
        founded: "2016",
        affiliation: "CBSE (1031345)",
        studentTeacherRatio: "22:1",
        transport: "GPS-enabled 15+ routes",
        computerLab: "1:1 ratio, AI curriculum",
        smartClassrooms: "Yes, all rooms",
        sports: "Indoor + Outdoor complex",
        fees: "Competitive & transparent",
        highlights: [
            "Modern infrastructure on 5-acre campus",
            "Experienced faculty with 75+ teachers",
            "Focus on holistic development",
            "Regular parent-teacher meetings",
            "CCTV surveillance throughout campus"
        ]
    },
    {
        name: "Other CBSE Schools",
        founded: "Varies",
        affiliation: "CBSE/State Board",
        studentTeacherRatio: "35:1 - 50:1",
        transport: "Limited routes",
        computerLab: "Shared access",
        smartClassrooms: "Selected rooms only",
        sports: "Basic playground",
        fees: "Varies",
        highlights: [
            "Traditional teaching methods",
            "Limited extracurricular activities",
            "Basic infrastructure"
        ]
    }
];

export const comparisonCategories = [
    { key: "affiliation", label: "Board Affiliation" },
    { key: "studentTeacherRatio", label: "Student-Teacher Ratio" },
    { key: "smartClassrooms", label: "Smart Classrooms" },
    { key: "computerLab", label: "Computer Lab" },
    { key: "sports", label: "Sports Facilities" },
    { key: "transport", label: "Transportation" },
    { key: "fees", label: "Fee Structure" }
] as const;
