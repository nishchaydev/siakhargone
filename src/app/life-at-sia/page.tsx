
import type { Metadata } from 'next';
import { Section } from "@/components/common/Section";
import LifeAtSiaPageClient from './LifeAtSiaPageClient';

export const metadata: Metadata = {
  title: 'Life at SIA',
  description: 'Experience learning beyond the classroom — creativity, innovation, and global exposure.',
};

const whySiaItems = [
  {
    icon: "Sparkles",
    title: "Holistic Education",
    description: "We focus on complete development — intellectual, emotional, physical, and spiritual — ensuring every child grows with balance and confidence.",
  },
  {
    icon: "UserCheck",
    title: "Caring & Experienced Faculty",
    description: "Our educators go beyond teaching; they mentor. Each faculty member is trained to identify potential and nurture it with compassion and expertise.",
  },
  {
    icon: "MonitorSmartphone",
    title: "Modern Infrastructure",
    description: "Our state-of-the-art campus includes smart classrooms, labs, and digital resources — fostering innovation and curiosity.",
  },
  {
    icon: "Globe",
    title: "Global Learning Environment",
    description: "We prepare students to think beyond boundaries, with exposure to international programs, global collaborations, and multilingual learning.",
  },
  {
    icon: "HeartHandshake",
    title: "Strong Moral Foundation",
    description: "Rooted in Indian values, our students learn integrity, empathy, and respect, making them responsible global citizens.",
  },
  {
    icon: "Users",
    title: "Personalized Attention",
    description: "A healthy student-teacher ratio ensures that every learner receives personalized care, support, and growth opportunities.",
  },
];

const methodologySteps = [
    {
      icon: "Lightbulb",
      title: "Student-Centered Learning",
      description: "Every classroom is designed for participation. Students learn through discovery, not memorization — encouraged to ask, explore, and apply knowledge.",
    },
    {
      icon: "Layers",
      title: "Integrated Curriculum",
      description: "Subjects are interconnected — linking science to art, math to music, and theory to practice. This nurtures creativity and multi-dimensional learning.",
    },
    {
      icon: "FlaskConical",
      title: "Experiential Learning",
      description: "Hands-on experiments, projects, and outdoor exploration develop real-world understanding and problem-solving skills.",
    },
    {
      icon: "Users",
      title: "Collaborative Classrooms",
      description: "Peer learning, discussions, and teamwork help students develop empathy, leadership, and communication — essential life skills for the 21st century.",
    },
    {
      icon: "MonitorSmartphone",
      title: "Tech-Enabled Teaching",
      description: "Smart boards, e-learning tools, and digital simulations enhance engagement and future readiness.",
    },
];

export default function LifeAtSiaPage() {
  return (
    <div>
      <LifeAtSiaPageClient 
        whySiaItems={whySiaItems}
        methodologySteps={methodologySteps}
      />
    </div>
  );
}
