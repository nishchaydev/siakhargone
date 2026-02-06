
export interface FacultyMember {
    name: string;
    role: string;
    qualification: string;
    experience?: string;
    image?: string;
}

export interface Department {
    id: string;
    label: string;
    head: FacultyMember;
    members: FacultyMember[];
}

export const departments: Department[] = [
    {
        id: "science",
        label: "Science",
        head: { name: "Mr. R.K. Sharma", role: "HOD Science (Physics)", qualification: "M.Sc. Physics, B.Ed", experience: "15 Years" },
        members: [
            { name: "Mrs. Anjali Gupta", role: "Chemistry PGT", qualification: "M.Sc. Chemistry" },
            { name: "Mr. Vimal Verma", role: "Biology PGT", qualification: "M.Sc. Biotech" },
            { name: "Ms. Priya Singh", role: "Science TGT", qualification: "B.Sc., B.Ed" },
        ]
    },
    {
        id: "maths",
        label: "Mathematics",
        head: { name: "Mrs. S. Iyer", role: "HOD Mathematics", qualification: "M.Sc. Maths, M.Ed", experience: "12 Years" },
        members: [
            { name: "Mr. Amit Patel", role: "Maths PGT", qualification: "M.Sc. Maths" },
            { name: "Mrs. Ritu Jain", role: "Maths TGT", qualification: "B.Sc., B.Ed" },
        ]
    },
    {
        id: "humanities",
        label: "Humanities / English",
        head: { name: "Dr. A.K. Mishra", role: "HOD English", qualification: "Ph.D. English Lit.", experience: "20 Years" },
        members: [
            { name: "Mrs. Kavita Roy", role: "History PGT", qualification: "M.A. History" },
            { name: "Mr. Suresh Yadav", role: "Hindi PGT", qualification: "M.A. Hindi" },
        ]
    },
    {
        id: "primary",
        label: "Primary Wing",
        head: { name: "Mrs. Neeta Kapoor", role: "Headmistress - Primary", qualification: "M.A. Psych, B.Ed", experience: "18 Years" },
        members: [
            { name: "Mrs. Sunita Rao", role: "Primary Coordinator", qualification: "B.A., B.Ed" },
            { name: "Ms. Daisy Thomas", role: "PRT - English", qualification: "B.A. English" },
            { name: "Mrs. Pooja Sharma", role: "PRT - EVS", qualification: "B.Sc., B.Ed" },
        ]
    },
];
