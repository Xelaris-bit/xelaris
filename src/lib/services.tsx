'use client';

import {
  Code,
  School,
  Cuboid,
  Megaphone,
  AreaChart,
  Cloud,
  CheckCircle,
} from 'lucide-react';
import type { ReactElement } from 'react';
import { services as servicesData } from '@/lib/services-data';

export interface Service {
  id: string;
  slug: string;
  icon?: ReactElement;
  title: string;
  description: string;
  longDescription: string;
}

export const services: Service[] = servicesData.map((s) => ({
  ...s,
  icon: {
    'service-software': <Code className="h-6 w-6 text-accent" />,
    'service-elearning': <School className="h-6 w-6 text-accent" />,
    'service-multimedia': <Cuboid className="h-6 w-6 text-accent" />,
    'service-marketing': <Megaphone className="h-6 w-6 text-accent" />,
    'service-qa': <CheckCircle className="h-6 w-6 text-accent" />,
    'service-data-analysis': <AreaChart className="h-6 w-6 text-accent" />,
    'service-cloud-devops': <Cloud className="h-6 w-6 text-accent" />,
  }[s.id],
}));
