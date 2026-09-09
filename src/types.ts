export type VehicleCategory = 'all' | 'city' | 'suv' | 'cabrio' | 'van';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: VehicleCategory;
  categoryLabel: string;
  image: string;
  galleryImages: string[];
  pricePerDay: number;
  seats: number;
  doors: number;
  luggage: number;
  transmission: 'Manuale' | 'Automatico';
  fuel: 'Benzina' | 'Ibrida' | 'Diesel' | '100% Elettrica';
  consumption: string;
  co2?: string;
  features: string[];
  highlightBadge?: string;
  isPopular?: boolean;
  available: boolean;
  deposit: string;
}

export type GalleryCategory = 'all' | 'flotta' | 'interni' | 'consegna' | 'territorio';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'flotta' | 'interni' | 'consegna' | 'territorio';
  categoryLabel: string;
  image: string;
  description: string;
  vehicleRelated?: string;
  aspectRatio?: 'wide' | 'square' | 'tall';
}

export interface BookingRequest {
  vehicleId: string;
  vehicleName: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  fullName: string;
  email: string;
  phone: string;
  age: string;
  notes?: string;
  selectedExtras: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  role: string;
  text: string;
  rating: number;
  carRented: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ExtraOption {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  iconName: string;
}

export type ReviewStatus = 'approved' | 'pending' | 'rejected';

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  carRented: string;
  date: string;
  status: ReviewStatus;
  verified: boolean;
  adminReply?: string;
  createdAt: string;
}

export interface BookingRecord {
  id: string;
  bookingCode: string;
  createdAt: string;
  vehicle: Vehicle;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  days: number;
  baseCarRate: number;
  discountPercent: number;
  discountAmount: number;
  selectedExtras: { id: string; name: string; pricePerDay: number; total: number }[];
  totalPrice: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    age: string;
    licenseNumber?: string;
    guaranteeType: 'debito' | 'credito' | 'contanti';
    notes?: string;
  };
  status: 'confermata' | 'in_attesa' | 'completata';
}
