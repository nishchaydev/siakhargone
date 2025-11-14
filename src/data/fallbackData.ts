
import type { Testimonial, SchoolHighlight, AcademicTier, Job, GalleryImage } from '@/lib/definitions';
import placeholderData from '@/lib/placeholder-images.json';

export const fallbackTestimonials: Testimonial[] = [
    { id: 't1', name: 'Anjali Sharma', relation: 'Parent, Grade 8', quote: 'The holistic approach at SIA has been wonderful for my child\'s development. The teachers are caring and the environment is nurturing.', avatarUrl: 'https://picsum.photos/seed/parent1/100/100' },
    { id: 't2', name: 'Vikram Singh', relation: 'Parent, Grade 5', quote: 'I am impressed with the school\'s focus on both academics and extracurriculars. My son has discovered a love for sports here.', avatarUrl: 'https://picsum.photos/seed/parent2/100/100' },
    { id: 't3', name: 'Priya Mehta', relation: 'Parent, Grade 10', quote: 'The teachers at Sanskar International Academy are incredibly dedicated. They provide personalized attention that has made a huge difference for my daughter.', avatarUrl: 'https://picsum.photos/seed/parent3/100/100' },
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
  title: "Mrs. Kavita Sharma",
  description: "At Sanskar International Academy, we believe education is not merely the transfer of knowledge — it is the awakening of wisdom. Every day, our classrooms hum with curiosity, kindness, and creativity. We nurture children to think independently, act responsibly, and dream fearlessly. Beyond textbooks and grades, we instill संस्कार — values that form the foundation of strong character and compassion.",
  linkUrl: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2MjU3MzY3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  order: 1,
  icon: 'message'
}];

export const fallbackChairmanMessage: SchoolHighlight[] = [{
  id: "chairman-message",
  title: "Mr. Rakesh Verma",
  description: "Education is the most powerful means to transform a generation. When knowledge is blended with discipline, empathy, and integrity — greatness follows naturally. Sanskar International Academy was founded with this belief — that true learning must shape both intellect and character. In an age of rapid change, our mission is to anchor young minds in timeless values while empowering them with modern skills.",
  linkUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHN1aXR8ZW58MHx8fHwxNzYyNTg2MzEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
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
        id: "job3",
        title: "Admissions Counsellor",
        description: "A friendly and organized individual to manage the student admission process from inquiry to enrollment.",
        department: "Administration",
        location: "Khargone",
        status: "Closed"
    }
];

export const mockGalleryImages: GalleryImage[] = placeholderData.placeholderImages.map(image => ({
    id: image.id,
    imageUrl: image.imageUrl,
    description: image.description,
    imageHint: image.imageHint,
}));
