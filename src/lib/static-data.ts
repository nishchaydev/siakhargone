
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

export const committeeContent = `<p>SCHOOL MANAGING COMMITTEE</p><p>2024-25</p><table><tr><td><p><strong>S. No.</strong></p></td><td><p><strong>Name of Committee Member</strong></p></td><td><p><strong>Designation</strong></p></td></tr><tr><td><p>1</p></td><td><p>Mr. Pushpendra Patel</p></td><td><p>Chairperson</p></td></tr><tr><td><p>2</p></td><td><p>Mr. Praveen Asnade</p></td><td><p>Vice-Chairperson</p></td></tr><tr><td><p>3</p></td><td><p>Mr. Sanjay Yadav</p></td><td><p>Pro-Vice Chairperson</p></td></tr><tr><td><p>4</p></td><td><p>Mr. Shivam Jaiswal</p></td><td><p>Member Secretary</p></td></tr><tr><td><p>5</p></td><td><p>Mrs. Vandana Panwar</p></td><td><p>Board Representative</p></td></tr><tr><td><p>6</p></td><td><p>Mrs Bhawna Patel</p></td><td><p>Board Representative</p></td></tr><tr><td><p>7</p></td><td><p>Mr. Rameshchandra Jha</p></td><td><p>Teacher Representative from other school</p></td></tr><tr><td><p>8</p></td><td><p>Mr. Ritesh Bhawsar</p></td><td><p>Teacher Representative from other school</p></td></tr><tr><td><p>9</p></td><td><p>Mrs Pratibha Bhawsar</p></td><td><p>Teacher Representative</p></td></tr><tr><td><p>10</p></td><td><p>Mrs. Reena Patel</p></td><td><p>Teacher Representative</p></td></tr><tr><td><p>11</p></td><td><p>Mrs Kirti Choudhary</p></td><td><p>Parent Representative</p></td></tr><tr><td><p>12</p></td><td><p>Mrs. Bindu Hariom Kushwah</p></td><td><p>Parent Representative</p></td></tr><tr><td><p>13</p></td><td><p>Mrs. Vaishali Asnade</p></td><td><p>Member</p></td></tr><tr><td><p>14</p></td><td><p>Mrs Anita Kushwah</p></td><td><p>Member</p></td></tr><tr><td><p>15</p></td><td><p>Mr Hariram Solanki</p></td><td><p>Member</p></td></tr><tr><td><p>16</p></td><td><p>Mr Yogesh Kushwah</p></td><td><p>Member</p></td></tr></table><p>Principal</p>`;

export const committeeDocuments: any[] = [];

export const messages = {
    'principal-message': {
        message: `<p>Welcome to our vibrant school community! At <strong>Sanskar International Academy</strong>, we believe that education nurtures responsible, confident, and compassionate individuals ready for a changing world.</p><p>Our dedicated teachers create an inspiring environment, balancing academics with creativity, leadership, and character building. We value the strong partnership between school and parents in guiding children to become lifelong learners.</p><p>Our commitment remains constant: to provide quality education and strong moral values. I invite you to explore our website and join us in creating a bright future for every child.</p>`,
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
