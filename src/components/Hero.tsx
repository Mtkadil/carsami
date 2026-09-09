import { useState, FormEvent } from 'react';
import { Calendar, MapPin, Search, Shield, Star, CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react';
import { PICKUP_LOCATIONS, COMPANY_INFO } from '../data/mockData';
import { VehicleCategory } from '../types';

interface HeroProps {
  onSearch: (criteria: {
    location: string;
    pickupDate: string;
    returnDate: string;
    category: VehicleCategory;
  }) => void;
  onOpenBookingModal: () => void;
}

export default function Hero({ onSearch, onOpenBookingModal }: HeroProps) {
  // Default dates: tomorrow and 4 days later
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const inFourDays = new Date();
  inFourDays.setDate(inFourDays.getDate() + 4);
  const inFourDaysStr = inFourDays.toISOString().split('T')[0];

  const [location, setLocation] = useState(PICKUP_LOCATIONS[0]);
  const [pickupDate, setPickupDate] = useState(tomorrowStr);
  const [returnDate, setReturnDate] = useState(inFourDaysStr);
  const [category, setCategory] = useState<VehicleCategory>('all');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({
      location,
      pickupDate,
      returnDate,
      category,
    });
    // Smooth scroll to online booking section
    const bookingEl = document.getElementById('prenotazione-online');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      const fleetEl = document.getElementById('flotta');
      if (fleetEl) fleetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-slate-950 text-white">
      {/* Background with real automotive photo & gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85"
          alt="Strada panoramica costiera e noleggio auto"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              <span>Noleggio Auto Diretto • Nessun Intermediario</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Esplora la Riviera in Totale Libertà con un{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-200">
                Partner Locale Affidabile
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Auto igienizzate, tariffe chiare con assicurazione inclusa e consegna gratuita presso la stazione ferroviaria o il tuo hotel. 
              <span className="text-sky-300 font-medium"> Accettiamo anche carte di debito e senza sorprese al banco.</span>
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero costi nascosti</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Consegna Stazione / Hotel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Assistenza 24/7 telefonica</span>
              </div>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-4 flex-wrap">
              <a
                href="#recensioni"
                className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white hover:underline">
                  4.9 / 5 <span className="text-slate-400 font-normal">({COMPANY_INFO.reviewsCount} recensioni certificate)</span>
                </span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="ml-auto hidden sm:inline-flex items-center gap-2 text-xs text-sky-400 hover:text-sky-300 underline font-medium"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Dubbi? Chiama il titolare
              </a>
            </div>
          </div>

          {/* Right Column: Search & Quick Reservation Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl text-slate-900 border border-white/20">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Cerca & Prenota la Tua Auto
                  </h2>
                  <p className="text-xs text-slate-500">
                    Miglior tariffa garantita senza intermediari
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
                  Flotta 2024
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                {/* Pickup Location */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-600" />
                    Punto di Ritiro & Riconsegna
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm font-medium transition-all"
                  >
                    {PICKUP_LOCATIONS.map((loc, idx) => (
                      <option key={idx} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      Data Ritiro
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      Data Riconsegna
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      min={pickupDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Vehicle Category Filter */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-sky-600" />
                    Tipologia Auto
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as VehicleCategory)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm font-medium"
                  >
                    <option value="all">Tutte le categorie (Visualizza Flotta)</option>
                    <option value="city">City Car (Fiat 500 & Compatte)</option>
                    <option value="suv">SUV & Crossover (Yaris Cross, Jeep)</option>
                    <option value="cabrio">Cabriolet (Fiat 500C Dolce Vita)</option>
                    <option value="van">Van 9 Posti (Gruppi & Famiglie)</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Verifica Auto Disponibili</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={onOpenBookingModal}
                    className="w-full py-2.5 text-xs text-center font-medium text-slate-600 hover:text-sky-600 transition-colors"
                  >
                    Oppure invia una richiesta su misura personalizzata →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
