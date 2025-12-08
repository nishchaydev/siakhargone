export type StrapiImage = {
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
};

export type HeroSection = {
    title: string;
    subtitle: string;
    sanskrit: string;
    video: StrapiImage | string; // URL string for mock, StrapiImage object for real
    grid: (StrapiImage | string)[];
    cta1Href: string;
    cta2Href: string;
};

export type StatItem = {
    label: string;
    value: string;
};

export type WhyChooseItem = {
    title: string;
    desc: string;
    icon: string;
};

export type HomepageData = {
    hero: HeroSection;
    stats: StatItem[];
    whyChoose: WhyChooseItem[];
};

export type GalleryItem = {
    title: string;
    category: string;
    caption?: string;
    images: (StrapiImage | string)[];
};

export type NoticeItem = {
    id: string;
    title: string;
    date: string;
    content: string; // Rich text HTML/Markdown
    attachments?: (StrapiImage | string)[];
};

export type FacultyItem = {
    name: string;
    designation: string;
    bio: string;
    subjects: string;
    photo: StrapiImage | string;
};

export type TestimonialItem = {
    name: string;
    relation: string;
    text: string;
    rating: number;
    photo?: StrapiImage | string;
    video?: StrapiImage | string;
};

export type AdmissionData = {
    processSteps: { title: string; description: string }[];
    prospectus?: StrapiImage | string;
    feesPdf?: StrapiImage | string;
    faqs: { question: string; answer: string }[];
};
