
import { cloudinary } from './cloudinary-images';

export const academicStages = [
    {
        title: 'Primary Level',
        description: 'Foundation years focusing on English, Mathematics, EVS, and holistic development through Arts & Sports.',
        slug: 'primary-level',
        images: []
    },
    {
        title: 'Middle School',
        description: 'Integrating specialized subjects like Science, Social Science, and Computer Science to build analytical skills.',
        slug: 'middle-school',
        images: []
    },
    {
        title: 'Secondary Level',
        description: 'Preparing for board examinations with focused subjects including Physics, Chemistry, Biology, and Commerce options.',
        slug: 'secondary-level',
        images: []
    },
    {
        title: 'Senior Secondary',
        description: 'Specialized streams in Science (PCM/PCB), Commerce, and Humanities to guide students towards their career paths.',
        slug: 'senior-secondary',
        images: []
    }
];


export const albums = [
    {
        "albumName": "Annual Function",
        "category": "Events",
        "coverPhoto": cloudinary.annualFunction[3], // annual-function-3
        "photos": cloudinary.annualFunction
    },
    {
        "albumName": "Sports & Achivements",
        "category": "Sports",
        "coverPhoto": cloudinary.sportsAchievements[0],
        "photos": cloudinary.sportsAchievements
    },
    {
        "albumName": "District Level Taekwando",
        "category": "Sports",
        "coverPhoto": cloudinary.districtLevelTaekwando[0],
        "photos": cloudinary.districtLevelTaekwando
    },
    {
        "albumName": "National Youth Day",
        "category": "Events",
        "coverPhoto": cloudinary.nationalYouthDay[2], // 3rd image was cover previously?
        "photos": cloudinary.nationalYouthDay
    },
    {
        "albumName": "Holi Celebration",
        "category": "Celebrations",
        "coverPhoto": cloudinary.holiCelebration[0],
        "photos": cloudinary.holiCelebration
    },
    {
        "albumName": "PTM",
        "category": "Events",
        "coverPhoto": cloudinary.ptm[0],
        "photos": cloudinary.ptm
    },
    {
        "albumName": "Rainy Day & Plantation",
        "category": "Events",
        "coverPhoto": cloudinary.rainyDay[1],
        "photos": cloudinary.rainyDay
    },
    {
        "albumName": "Session Start",
        "category": "Events",
        "coverPhoto": cloudinary.sessionStart[0],
        "photos": cloudinary.sessionStart
    },
    {
        "albumName": "Campus Life",
        "category": "Campus",
        "coverPhoto": cloudinary.infrastructure.building[1],
        "photos": [
            ...cloudinary.infrastructure.building,
            ...cloudinary.mixPhotos,
            ...cloudinary.infrastructure.others
        ]
    },
    {
        "albumName": "Classrooms",
        "category": "Classrooms",
        "coverPhoto": cloudinary.infrastructure.classrooms[0],
        "photos": cloudinary.infrastructure.classrooms
    },
    {
        "albumName": "Library",
        "category": "Labs & Facilities",
        "coverPhoto": cloudinary.infrastructure.library[0],
        "photos": cloudinary.infrastructure.library
    },
    {
        "albumName": "Labs & Facilities",
        "category": "Labs & Facilities",
        "coverPhoto": cloudinary.lab.computer[0],
        "photos": [
            ...cloudinary.lab.computer,
            ...cloudinary.lab.chemistry,
            ...cloudinary.lab.biology,
            ...cloudinary.lab.physics,
            ...cloudinary.lab.math
        ]
    }
];

export const certificates = [
    { title: "High School Affiliation", fileUrl: "/siakhargone-content/certificates/Affiliation%20Documents/High%20School/high%20school%20affiliation.pdf" },
    { title: "Building Safety Certificate", fileUrl: "/siakhargone-content/certificates/Building%20Safety/Building%20Safety%20Certificate.pdf" },
    { title: "Fire Safety Certificate", fileUrl: "/siakhargone-content/certificates/Fire%20Safety/Fire%20Safety%20Certificate.pdf" },
    { title: "Land Certificate", fileUrl: "/siakhargone-content/certificates/Land%20Certificate/Land%20Certificate.pdf" },
    { title: "Middle School Recognition", fileUrl: "/siakhargone-content/certificates/Middile%20Manyata/Middile%20Manyata%20Certificate%20(2022-2025).pdf" },
    { title: "Water, Health, and Sanitation", fileUrl: "/siakhargone-content/certificates/Water%20safety/Water%20Safety%20Certificate.pdf" },
    { title: "Annual Academic Calendar", fileUrl: "/siakhargone-content/academic-stages/Annual%20calendar/Annual%20Calendar%2024-25.pdf" },
    { title: "Trust / Society Registration", fileUrl: "/siakhargone-content/certificates/Affiliation%20Documents/High%20School/high%20school%20affiliation.pdf" },
];

export const downloads: any[] = [
    // Empty as no files were clearly identified in downloads/itemX folders
];

export const committeeMembers = [
    { sn: 1, name: "Mr. Pushpendra Patel", designation: "Chairperson" },
    { sn: 2, name: "Mr. Praveen Asnade", designation: "Vice-Chairperson" },
    { sn: 3, name: "Mr. Sanjay Yadav", designation: "Pro-Vice Chairperson" },
    { sn: 4, name: "Mr. Shivam Jaiswal", designation: "Member Secretary" },
    { sn: 5, name: "Mrs. Vandana Panwar", designation: "Board Representative" },
    { sn: 6, name: "Mrs Bhawna Patel", designation: "Board Representative" },
    { sn: 7, name: "Mr. Rameshchandra Jha", designation: "Teacher Representative from other school" },
    { sn: 8, name: "Mr. Ritesh Bhawsar", designation: "Teacher Representative from other school" },
    { sn: 9, name: "Mrs Pratibha Bhawsar", designation: "Teacher Representative" },
    { sn: 10, name: "Mrs. Reena Patel", designation: "Teacher Representative" },
    { sn: 11, name: "Mrs Kirti Choudhary", designation: "Parent Representative" },
    { sn: 12, name: "Mrs. Bindu Hariom Kushwah", designation: "Parent Representative" },
    { sn: 13, name: "Mrs. Vaishali Asnade", designation: "Member" },
    { sn: 14, name: "Mrs Anita Kushwah", designation: "Member" },
    { sn: 15, name: "Mr Hariram Solanki", designation: "Member" },
    { sn: 16, name: "Mr Yogesh Kushwah", designation: "Member" }
];

export const committeeContent = ""; // Deprecated, kept for temporary type compatibility if needed

export const committeeDocuments: any[] = [];

export const messages = {
    'principal-message': {
        message: `<p>Welcome to our vibrant school community! <strong>Over the years, Sanskar International Academy has grown into one of the leading CBSE English-medium schools in Khargone.</strong> We believe that education nurtures responsible, confident, and compassionate individuals ready for a changing world.</p><p>Our dedicated teachers create an inspiring environment, balancing academics with creativity, leadership, and character building. We value the strong partnership between school and parents in guiding children to become lifelong learners.</p><p>Our commitment remains constant: to provide quality education and strong moral values. I invite you to explore our website and join us in creating a bright future for every child.</p>`,
        image: cloudinary.misc.parentAvatar, // Updated per user request
        name: "Mr. Shivam Jaiswal",
        role: "Principal"
    },
    'director-message': {
        message: `<p>It is my pleasure to welcome you to our official website. At <strong>Sanskar International Academy</strong>, education is about academic excellence and nurturing confident individuals prepared for the future.</p><p>We strive to create a learning environment where curiosity is encouraged and values are strengthened. Our focus is on fostering critical thinking, creativity, and holistic development.</p><p>By integrating modern technology and building strong community partnerships, we aim to provide an inspiring educational journey. We look forward to your continued support in shaping a successful future for our students.</p>`,
        image: cloudinary.sportsAchievements[5], // sports-achievements-5_dzuqsi (used for director in previous refactor?)
        name: "Mr. Praveen Asnade",
        role: "Managing Director"
    }
};

export const aboutData = {
    content: `
    <div class="space-y-6">
        <div>
            <h3 class="text-2xl font-bold text-navy mb-4">About SIA</h3>
            <p class="text-muted-foreground leading-relaxed">
                Welcome to <strong>Sanskar International Academy</strong>, a place where learning goes beyond the classroom. 
                We are dedicated to creating a safe, inspiring environment where every student can discover their strengths and prepare for a successful future.
            </p>
            <p class="text-muted-foreground leading-relaxed mt-4">
                We believe education is a partnership between students, teachers, and families.
                Through a rich curriculum blending academics, sports, and arts with strong moral values, we nurture confident, compassionate individuals ready to make a positive impact on the world.
            </p>
        </div>
    </div>
    `,
    schoolImage: { src: cloudinary.infrastructure.building[0], alt: "Sanskar International Academy Campus" }
};

// Home facilities - can be added here if needed, but previously was dynamic listing from 'home-facilities'
export const homeFacilities = [
    // Add logic here if you want to support home facilities
];

export const testimonials = [
    {
        id: "hero-review",
        quote: "For us, Sanskar International Academy is one of the leading CBSE English-medium schools in Khargone. The discipline and teaching quality stand out.",
        name: "Mr. Rakesh Gupta",
        relation: "Parent",
        avatarUrl: cloudinary.misc.parentAvatar
    },
    {
        id: "1",
        quote: "Sanskar International Academy has provided my child with a perfect balance of academics and co-curricular activities. The teachers are incredibly supportive and dedicated.",
        name: "Mrs. Anjali Sharma",
        relation: "Parent of Class 8 Student",
        avatarUrl: cloudinary.misc.parentAvatar // fallback
    },
    {
        id: "2",
        quote: "The infrastructure and facilities are top-notch. My son loves the computer lab and sports complex. It's truly a world-class environment for learning.",
        name: "Mr. Rajesh Patel",
        relation: "Parent of Class 5 Student",
        avatarUrl: cloudinary.misc.parentAvatar // fallback
    },
    {
        id: "3",
        quote: "I am impressed by the school's focus on values and holistic development. It's not just about grades; it's about building character.",
        name: "Mrs. Sunita Verma",
        relation: "Parent of Class 10 Student",
        avatarUrl: cloudinary.misc.parentAvatar // fallback
    }
];

export const faqs = [
    {
        question: "Which CBSE school is best for disciplined academics in Khargone?",
        answer: "Sanskar International Academy is often regarded as one of the leading CBSE English-medium schools in Khargone due to its focus on disciplined academics, modern infrastructure, and holistic student development.",
    },
    {
        question: "What facilities should I look for in a top Khargone school?",
        answer: "A top school should offer smart classrooms, fully equipped science and computer labs, a wide-ranging library, and dedicated sports facilities. SIA provides all these on a secure 4-acre campus.",
    },
    {
        question: "Does the school provide transport for students from nearby tehsils?",
        answer: "Yes, SIA operates a fleet of GPS-enabled buses covering 15+ routes across Khargone and surrounding areas, ensuring safe and reliable transport for all students.",
    },
    {
        question: "How does the school prepare students for competitive exams?",
        answer: "Our curriculum is aligned with CBSE standards that form the base for exams like JEE and NEET. We emphasize concept clarity and critical thinking rather than rote learning.",
    }
];
