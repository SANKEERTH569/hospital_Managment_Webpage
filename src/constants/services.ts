import { Heart, Brain, Bone, Stethoscope, Activity, CrossIcon } from 'lucide-react';
import { Service } from '../types';

export const services: Service[] = [
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Comprehensive heart care services with advanced diagnostic and treatment options.',
    slug: 'cardiology'
  },
  {
    icon: Brain,
    title: 'Neurology',
    description: 'Expert care for neurological conditions with cutting-edge treatments.',
    slug: 'neurology'
  },
  {
    icon: Bone,
    title: 'Orthopedics',
    description: 'Specialized care for bone, joint, and muscle conditions.',
    slug: 'orthopedics'
  },
  {
    icon: CrossIcon,
    title: 'Emergency Care',
    description: '24/7 emergency services with rapid response teams.',
    slug: 'emergency-care'
  },
  {
    icon: Stethoscope,
    title: 'Primary Care',
    description: 'Regular check-ups and preventive healthcare services.',
    slug: 'primary-care'
  },
  {
    icon: Activity,
    title: 'Diagnostics',
    description: 'Advanced diagnostic services with quick and accurate results.',
    slug: 'diagnostics'
  }
];