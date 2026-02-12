
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
  iconName?: string;
  alignRight?: boolean;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isUrgent?: boolean;
}

export interface GalleryImage {
  id: string;
  description?: string;
  imageUrl: string;
  imageHint?: string;
  eventDate?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string | React.ReactNode;
  isLoading?: boolean;
}

export interface FlowMessage {
  role: 'user' | 'model';
  content: Array<{ text: string }>;
}


export interface ChatbotResponse {
  id: string;
  intent: string;
  response: string;
}

export interface SchoolHighlight {
  id: string;
  title: string;
  description: string;
  icon?: string;
  linkUrl?: string;
  order?: number;
}

export interface AdmissionStep {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof import('lucide-react');
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  relation: string; // e.g., 'Parent, Grade 5'
  quote: string;
  avatarUrl: string;
}

export interface AcademicTier {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  order: number;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  status: 'Open' | 'Closed';
}
