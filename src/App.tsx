import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FleetSection from './components/FleetSection';
import GallerySection from './components/GallerySection';
import OnlineBookingSystem from './components/OnlineBookingSystem';
import WhyUsSection from './components/WhyUsSection';
import PriceCalculator from './components/PriceCalculator';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { Vehicle, VehicleCategory } from './types';
import { VEHICLES } from './data/mockData';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory>('all');
  const [calculatedDays, setCalculatedDays] = useState<number>(3);
  const [calculatedExtras, setCalculatedExtras] = useState<string[]>(['second-driver']);

  // Handlers
  const handleOpenBookingModal = (vehicleId?: string) => {
    if (vehicleId) {
      const found = VEHICLES.find((v) => v.id === vehicleId);
      setSelectedVehicle(found || VEHICLES[0]);
    } else {
      setSelectedVehicle(VEHICLES[0]);
    }
    setIsBookingModalOpen(true);
  };

  const handleSelectVehicleToBook = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    // Smooth scroll to Online Booking System
    const bookingEl = document.getElementById('prenotazione-online');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const handleSearchFromHero = (criteria: {
    location: string;
    pickupDate: string;
    returnDate: string;
    category: VehicleCategory;
  }) => {
    setSelectedCategory(criteria.category);
    const bookingEl = document.getElementById('prenotazione-online');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConfirmEstimateFromCalculator = (
    vehicle: Vehicle,
    days: number,
    extras: string[],
    total: number
  ) => {
    setSelectedVehicle(vehicle);
    setCalculatedDays(days);
    setCalculatedExtras(extras);
    const bookingEl = document.getElementById('prenotazione-online');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const handleViewVehicleGallery = (vehicleName: string) => {
    const galleriaEl = document.getElementById('galleria');
    if (galleriaEl) {
      galleriaEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCarFromGallery = (carName: string) => {
    const matched = VEHICLES.find((v) =>
      v.name.toLowerCase().includes(carName.toLowerCase()) ||
      carName.toLowerCase().includes(v.name.toLowerCase())
    );
    setSelectedVehicle(matched || VEHICLES[0]);
    const bookingEl = document.getElementById('prenotazione-online');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Fixed Header */}
      <Header onOpenBookingModal={handleOpenBookingModal} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section with Quick Availability Search */}
        <Hero
          onSearch={handleSearchFromHero}
          onOpenBookingModal={() => handleOpenBookingModal()}
        />

        {/* Fleet Section with Categorized Cards */}
        <FleetSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectVehicleToBook={handleSelectVehicleToBook}
          onViewVehicleGallery={handleViewVehicleGallery}
        />

        {/* Dedicated Modern Image Gallery Section (as explicitly requested) */}
        <GallerySection onSelectCarToBook={handleSelectCarFromGallery} />

        {/* Full-Featured Online Booking System (Wizard: Dates, Car, Extras, Customer Details, Summary Voucher) */}
        <OnlineBookingSystem preselectedVehicleId={selectedVehicle?.id} />

        {/* Why Us / Local Business Strengths */}
        <WhyUsSection />

        {/* Interactive Instant Price Calculator */}
        <PriceCalculator onConfirmEstimate={handleConfirmEstimateFromCalculator} />

        {/* Customer Reviews with Star Rating, Comment Submission & Moderation System */}
        <ReviewsSection />

        {/* Contact Section, Form, Hours, Map and FAQ */}
        <ContactSection />
      </main>

      {/* Footer & Floating WhatsApp */}
      <Footer />

      {/* Fast Reservation & Quote Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedVehicle={selectedVehicle}
        initialDays={calculatedDays}
        initialExtras={calculatedExtras}
      />
    </div>
  );
}
