
export interface FacultyMember {
    id: string;
    name: string;
    role: string;
    qualification: string;
    image: string;
    department: "Leadership" | "Coordinators" | "Science" | "Mathematics" | "Humanities" | "Sports" | "Arts" | "Admin";
    message?: string;
    experience?: string;
}

export const facultyMembers: FacultyMember[] = [
    // Leadership
    {
        id: "chair-1",
        name: "Mr. Pushpendra Patel",
        role: "Chairperson",
        qualification: "Educationist",
        image: "https://res.cloudinary.com/dkits80xk/image/upload/v1765349457/director_image_k8s33e.jpg", // Placeholder - Need real image
        department: "Leadership",
        message: "Building a foundation of excellence for generations to come.",
        experience: "30+ Years"
    },
    {
        id: "dir-1",
        name: "Mr. Praveen Asnade",
        role: "Managing Director",
        qualification: "M.Sc, B.Ed",
        image: "https://res.cloudinary.com/dkits80xk/image/upload/v1765349457/director_image_k8s33e.jpg", // Placeholder
        department: "Leadership",
        message: "Empowering students to become global citizens through holistic education.",
        experience: "25+ Years"
    },
    {
        id: "prin-1",
        name: "Mr. Shivam Jaiswal",
        role: "Principal",
        qualification: "M.A, B.Ed",
        image: "https://res.cloudinary.com/dkits80xk/image/upload/v1765349458/principal_image_w3qg1a.jpg", // Placeholder matching principal-message
        department: "Leadership",
        message: "Education is not just about syllabi and exams. It's about kindling the fire of curiosity.",
        experience: "15+ Years"
    },

    // Coordinators & Senior Teachers
    {
        id: "teach-1",
        name: "Mrs. Pratibha Bhawsar",
        role: "Senior Coordinator",
        qualification: "M.Sc, B.Ed",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", // Generic female
        department: "Coordinators",
        experience: "12 Years"
    },
    {
        id: "teach-2",
        name: "Mrs. Reena Patel",
        role: "Academic Coordinator",
        qualification: "M.A, B.Ed",
        image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=400", // Generic female
        department: "Coordinators",
        experience: "10 Years"
    },

    // Teachers (Using representatives from committee as base)
    {
        id: "teach-3",
        name: "Mr. Rameshchandra Jha",
        role: "PGT Mathematics",
        qualification: "M.Sc Mathematics",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
        department: "Mathematics",
        experience: "15 Years"
    },
    {
        id: "teach-4",
        name: "Mr. Ritesh Bhawsar",
        role: "PGT Science",
        qualification: "M.Sc Physics",
        image: "https://images.unsplash.com/photo-1572044162444-ad6021194362?auto=format&fit=crop&q=80&w=400",
        department: "Science",
        experience: "8 Years"
    },

    // Arts & Sports
    {
        id: "arts-1",
        name: "Mrs. S. Rao",
        role: "Art & Craft",
        qualification: "B.F.A",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
        department: "Arts",
        experience: "6 Years"
    },
    {
        id: "sport-1",
        name: "Mr. K. Yadav",
        role: "Sports Instructor",
        qualification: "B.P.Ed",
        image: "https://images.unsplash.com/photo-1531427550796-060130560772?auto=format&fit=crop&q=80&w=400",
        department: "Sports",
        experience: "9 Years"
    }
];
