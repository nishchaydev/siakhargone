
import type { Metadata } from 'next';
import AdmissionsPageClient from './AdmissionsPageClient';


export const metadata: Metadata = {
  title: 'Admissions Open 2026-27 - Apply Online',
  description: 'Secure your child\'s future at Sanskar International Academy. View admission process, eligibility, and scholarship details. Apply online today.',
};

const careerCounsellingImage = {
  id: 'career-counselling',
  imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1765351972/ptm-1_jfssci.webp",
  description: "Career Counselling Session",
  imageHint: "Counselling"
};

import Schema from '@/components/seo/Schema';

// ...

const faqs = [
  { question: "What is the age criteria for admission?", answer: "For Nursery, the child must be 3+ years as of March 31st of the academic year. For Class 1, the age should be 6+ years." },
  { question: "Is transport facility available?", answer: "Yes, we have a fleet of GPS-enabled buses covering the entire Khargone city and nearby rural areas within a 20km radius." },
  { question: "What is the student-teacher ratio?", answer: "We maintain a healthy student-teacher ratio of 25:1 in Pre-Primary and 30:1 in higher classes to ensure personalized attention." },
  { question: "Do you offer sports and co-curricular activities?", answer: "Absolutely. We have facilities for Cricket, Football, Basketball, skating, and Taekwondo. We also offer Music, Dance, Art & Craft, and Robotics." },
  { question: "How can I pay the school fees?", answer: "Fees can be paid online via our school app/portal, or via Cheque/DD at the school reception. We also accept UPI and Card payments." }
];

export default async function AdmissionsPage() {
  return (
    <>
      <Schema type="FAQ" data={faqs} />
      <AdmissionsPageClient careerCounsellingImage={careerCounsellingImage} />
    </>
  );
}
