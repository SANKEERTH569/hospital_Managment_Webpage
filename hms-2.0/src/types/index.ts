import { LucideIcon } from 'lucide-react';

export interface Doctor {
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: string;
}

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  slug: string; // unique identifier for routing
}

export interface Testimonial {
  name: string;
  text: string;
  role: string;
  image?: string; // Add image property for UI
}