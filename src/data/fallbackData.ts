
import type { Testimonial, SchoolHighlight, AcademicTier, Job, GalleryImage } from '@/lib/definitions';
import placeholderData from '@/lib/placeholder-images.json';

export const fallbackTestimonials: Testimonial[] = [
    { id: 't1', name: 'Anjali Sharma', relation: 'Parent, Grade 8', quote: 'The holistic approach at SIA has been wonderful for my child\'s development. The teachers are caring and the environment is nurturing.', avatarUrl: 'https://picsum.photos/seed/parent1/100/100' },
    { id: 't2', name: 'Vikram Singh', relation: 'Parent, Grade 5', quote: 'I am impressed with the school\'s focus on both academics and extracurriculars. My son has discovered a love for sports here.', avatarUrl: 'https://picsum.photos/seed/parent2/100/100' },
    { id: 't3', name: 'Priya Mehta', relation: 'Parent, Grade 10', quote: 'The teachers at Sanskar International Academy are incredibly dedicated. They provide personalized attention that has made a huge difference for my daughter.', avatarUrl: 'https://picsum.photos/seed/parent3/100/100' },
    { id: 't4', name: 'Rajesh Kumar', relation: 'Parent, Grade 3', quote: 'The school\'s infrastructure is top-notch, and the use of technology in classrooms makes learning very engaging for my son.', avatarUrl: 'https://picsum.photos/seed/parent4/100/100' },
    { id: 't5', name: 'Sunita Patil', relation: 'Parent, Grade 12', quote: 'SIA has been instrumental in preparing my daughter for her board exams and future studies. The career counseling is excellent.', avatarUrl: 'https://picsum.photos/seed/parent5/100/100' },
];

export const fallbackHighlights: SchoolHighlight[] = [
    {
        id: "highlight-carousel-1",
        title: "Annual Day Success",
        description: "Annual cultural celebration uniting students and families.",
        linkUrl: "https://picsum.photos/seed/annual-day/1200/800",
        icon: "carousel",
        order: 1,
    },
    {
        id: "highlight-carousel-2",
        title: "Science & Innovation",
        description: "Student-led projects and science fair winners.",
        linkUrl: "https://picsum.photos/seed/science-fair/1200/800",
        icon: "carousel",
        order: 2,
    },
    {
        id: "highlight-carousel-3",
        title: "Sports Excellence",
        description: "District level champions in multiple sports.",
        linkUrl: "https://picsum.photos/seed/sports-day/1200/800",
        icon: "carousel",
        order: 3,
    },
];

export const fallbackPrincipalMessage: SchoolHighlight[] = [{
    id: "principal-message",
    title: "The Principal",
    description: "At Sanskar International Academy, we believe education is not merely the transfer of knowledge — it is the awakening of wisdom. Every day, our classrooms hum with curiosity, kindness, and creativity. We nurture children to think independently, act responsibly, and dream fearlessly. Beyond textbooks and grades, we instill संस्कार — values that form the foundation of strong character and compassion.",
    linkUrl: "",
    order: 1,
    icon: 'message'
}];

export const fallbackChairmanMessage: SchoolHighlight[] = [{
    id: "chairman-message",
    title: "Mr. Praveen Asnande",
    description: "Education is the most powerful means to transform a generation. When knowledge is blended with discipline, empathy, and integrity — greatness follows naturally. Sanskar International Academy was founded with this belief — that true learning must shape both intellect and character. In an age of rapid change, our mission is to anchor young minds in timeless values while empowering them with modern skills.",
    linkUrl: "",
    order: 1,
    icon: 'message'
}];

export const fallbackAcademics: AcademicTier[] = [
    {
        id: "mock1",
        name: "Pre-Primary",
        description: "Play-based learning that builds confidence and curiosity.",
        order: 1,
        imageUrl: "/academics#pre-primary"
    },
    {
        id: "mock2",
        name: "Primary",
        description: "Foundational literacy & numeracy with project learning.",
        order: 2,
        imageUrl: "/academics#primary"
    },
    {
        id: "mock3",
        name: "Secondary",
        description: "Rigorous academics, electives and career guidance.",
        order: 3,
        imageUrl: "/academics#secondary"
    }
];

export const fallbackJobs: Job[] = [
    {
        id: "job1",
        title: "Mathematics Teacher (Secondary)",
        description: "Seeking an experienced Mathematics teacher for grades 9-12. Must have a passion for the subject and modern teaching methods.",
        department: "Academics",
        location: "Khargone",
        status: "Open"
    },
    {
        id: "job2",
        title: "Sports Coach (Football)",
        description: "Looking for a certified football coach to train our school teams and manage the sports curriculum.",
        department: "Sports",
        location: "Khargone",
        status: "Open"
    },
    {
        id: "job4",
        title: "Physics Teacher (Senior Secondary)",
        description: "We are looking for a qualified Physics teacher to inspire students in grades 11-12 with a deep understanding of the subject.",
        department: "Academics",
        location: "Khargone",
        status: "Open"
    },
    {
        id: "job5",
        title: "Librarian",
        description: "Seeking a knowledgeable and passionate Librarian to manage our library and foster a love of reading among students.",
        department: "Administration",
        location: "Khargone",
        status: "Open"
    },
    {
        id: "job3",
        title: "Admissions Counsellor",
        description: "A friendly and organized individual to manage the student admission process from inquiry to enrollment.",
        department: "Administration",
        location: "Khargone",
        status: "Closed"
    }
];

export const fallbackHeroData = {
    title: "Where Excellence Begins.",
    subtitle: "Nurturing tomorrow's leaders through a blend of tradition and innovation.",
    sanskrit: "विद्या ददाति विनयम्",
    video: "/Video/children-running.mp4",
    cta1Href: "/admissions",
    cta2Href: "/gallery",
    grid: [
        "https://picsum.photos/seed/hero1/600/400",
        "https://picsum.photos/seed/hero2/600/400",
        "https://picsum.photos/seed/hero3/600/400",
        "https://picsum.photos/seed/hero4/600/400"
    ]
};

export const fallbackStats = [
    { label: "Students", value: "2500+" },
    { label: "Results", value: "100%" },
    { label: "Awards", value: "50+" },
    { label: "Sports & Activities", value: "30+" }
];

export const mockGalleryImages: GalleryImage[] = placeholderData.placeholderImages.map(image => ({
    id: image.id,
    imageUrl: image.imageUrl,
    description: image.description,
    imageHint: image.imageHint,
}));
