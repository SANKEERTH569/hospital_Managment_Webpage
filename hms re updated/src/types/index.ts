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
}

export interface Testimonial {
  name: string;
  text: string;
  role: string;
}