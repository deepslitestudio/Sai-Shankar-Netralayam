export interface UserProfile {
  userId: string;
  displayName: string;
  email: string;
  phone?: string;
  age?: number;
  location?: string;
  preferredLanguage?: 'en' | 'te';
  createdAt: string;
}

export interface Appointment {
  id: string;
  userId: string;
  patientName: string;
  phone: string;
  preferredDate: string;
  preferredTimeSlot: string;
  serviceId: string;
  symptoms?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  userId: string;
  authorName: string;
  rating: number;
  content: string;
  location?: string;
  isApproved: boolean;
  createdAt: string;
}
