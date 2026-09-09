import { useState, useMemo, FormEvent } from 'react';
import { Calendar, Clock, MapPin, Car, Shield, ShieldCheck, Users, Briefcase, Gauge, Fuel, Check, ChevronRight, ChevronLeft, Printer, MessageCircle, FileText, Sparkles, Tag, ArrowRight, AlertCircle } from 'lucide-react';
import { VEHICLES, PICKUP_LOCATIONS, EXTRAS, COMPANY_INFO } from '../data/mockData';
import { Vehicle, VehicleCategory, BookingRecord } from '../types';

const BOOKINGS_STORAGE_KEY = 'autonolo_client_bookings';

interface OnlineBookingSystemProps {
  preselectedVehicleId?: string;
}

export default function OnlineBookingSystem({ preselectedVehicleId }: OnlineBookingSystemProps) {
  // Wizard Steps: 1: Date & Luogo, 2: Auto & Prezzo, 3: Optional, 4: Dati Cliente, 5: Conferma/Riepilogo
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Tomorrow as default pickup
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const inFourDays = new Date();
  inFourDays.setDate(inFourDays.getDate() + 4);
  const inFourDaysStr = inFourDays.toISOString().split('T')[0];

  // Step 1: Dates & Locations
  const [pickupLocation, setPickupLocation] = useState(PICKUP_LOCATIONS[0]);
  const [returnLocation, setReturnLocation] = useState(PICKUP_LOCATIONS[0]);
  const [pickupDate, setPickupDate] = useState(tomorrowStr);
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState(inFourDaysStr);
  const [returnTime, setReturnTime] = useState('10:00');

  // Step 2: Car selection
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory>('all');
  const [selectedCarId, setSelectedCarId] = useState<string>(
    preselectedVehicleId || VEHICLES[0].id
  );

  // Step 3: Extras
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['second-driver']);

  // Step 4: Customer Details
  const [customerData, setCustomerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '25+',
    licenseNumber: '',
    guaranteeType: 'debito' as 'debito' | 'credito' | 'contanti',
    notes: '',
  });

  // Step 5: Confirmed Booking Record
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [savedBookings, setSavedBookings] = useState<BookingRecord[]>(() => {
    try {
      const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Days Calculation
  const rentalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  }, [pickupDate, returnDate]);

  // Selected Car
  const currentVehicle = VEHICLES.find((v) => v.id === selectedCarId) || VEHICLES[0];

  // Pricing breakdown
  const pricing = useMemo(() => {
    let discountPercent = 0;
    if (rentalDays >= 7) discountPercent = 20;
    else if (rentalDays >= 3) discountPercent = 10;

    const baseCost = currentVehicle.pricePerDay * rentalDays;
    const discountAmount = Math.round((baseCost * discountPercent) / 100);
    const carSubtotal = baseCost - discountAmount;

    const extrasList = selectedExtras.map((extraId) => {
      const ex = EXTRAS.find((e) => e.id === extraId);
      const pricePerDay = ex ? ex.pricePerDay : 0;
      const total = pricePerDay * rentalDays;
      return {
        id: extraId,
        name: ex?.name || extraId,
        pricePerDay,
        total,
      };
    });

    const extrasSubtotal = extrasList.reduce((acc, item) => acc + item.total, 0);
    const grandTotal = carSubtotal + extrasSubtotal;

    return {
      discountPercent,
      baseCost,
      discountAmount,
      carSubtotal,
      extrasList,
      extrasSubtotal,
      grandTotal,
    };
  }, [currentVehicle, rentalDays, selectedExtras]);

  // Extras Toggle
  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Submit Booking
  const handleFinalSubmit = (e: FormEvent) => {
    e.preventDefault();

    const bookingCode = `RIV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingRecord = {
      id: `book-${Date.now()}`,
      bookingCode,
      createdAt: new Date().toISOString(),
      vehicle: currentVehicle,
      pickupLocation,
      returnLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      days: rentalDays,
      baseCarRate: currentVehicle.pricePerDay,
      discountPercent: pricing.discountPercent,
      discountAmount: pricing.discountAmount,
      selectedExtras: pricing.extrasList,
      totalPrice: pricing.grandTotal,
      customer: { ...customerData },
      status: 'confermata',
    };

    setConfirmedBooking(newBooking);

    // Save to localStorage
    const updated = [newBooking, ...savedBookings];
    setSavedBookings(updated);
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setCurrentStep(5);
  };

  // Categories list
  const categories: { id: VehicleCategory; label: string }[] = [
    { id: 'all', label: 'Tutte le Vetture' },
    { id: 'city', label: 'City Car' },
    { id: 'suv', label: 'SUV & Crossover' },
    { id: 'cabrio', label: 'Cabriolet' },
    { id: 'van', label: 'Van 9 Posti' },
  ];

  const filteredVehicles = selectedCategory === 'all'
    ? VEHICLES
    : VEHICLES.filter((v) => v.category === selectedCategory);

  return (
    <section id="prenotazione-online" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold tracking-wide uppercase mb-3 border border-sky-500/30">
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            Sistema di Prenotazione Online Ufficiale
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Prenota la Tua Auto in Pochi Minuti
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Scegli date e vettura, visualizza il prezzo totale trasparente con tasse e assicurazione incluse, 
            e ricevi il voucher immediato senza costi di prenotazione anticipata.
          </p>

          {savedBookings.length > 0 && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowHistoryModal(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 underline"
              >
                <FileText className="w-3.5 h-3.5" />
                Hai già prenotato con noi? Visualizza lo storico delle tue {savedBookings.length} prenotazioni
              </button>
            </div>
          )}
        </div>

        {/* Wizard Progress Stepper */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center text-xs">
            {[
              { num: 1, label: 'Date & Luogo' },
              { num: 2, label: 'Auto & Prezzo' },
              { num: 3, label: 'Optional' },
              { num: 4, label: 'Dati Cliente' },
              { num: 5, label: 'Riepilogo' },
            ].map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div
                  key={step.num}
                  className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-sky-600/30 border border-sky-500 text-white font-bold'
                      : isPast
                      ? 'bg-slate-800 text-emerald-400'
                      : 'bg-slate-800/40 text-slate-500'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                      isCurrent
                        ? 'bg-sky-500 text-white shadow-md'
                        : isPast
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : step.num}
                  </div>
                  <span className="hidden sm:inline truncate max-w-full text-[11px]">
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Booking Container */}
        <div className="max-w-5xl mx-auto bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          {/* STEP 1: DATES & LOCATION */}
          {currentStep === 1 && (
            <div className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sky-400" />
                  Passo 1: Seleziona Date, Orari e Punti di Ritiro
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Indicaci dove e quando desideri trovare l'auto pronta per la consegna.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup Location & Date */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                    <MapPin className="w-4 h-4" />
                    <span>Ritiro della Vettura</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Luogo di Ritiro
                    </label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-sky-500"
                    >
                      {PICKUP_LOCATIONS.map((loc, idx) => (
                        <option key={idx} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Data Ritiro
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Orario Ritiro
                      </label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-sky-500"
                      >
                        {['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00 (Keybox)'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Return Location & Date */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                    <MapPin className="w-4 h-4" />
                    <span>Riconsegna della Vettura</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Luogo di Riconsegna
                    </label>
                    <select
                      value={returnLocation}
                      onChange={(e) => setReturnLocation(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-sky-500"
                    >
                      {PICKUP_LOCATIONS.map((loc, idx) => (
                        <option key={idx} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Data Riconsegna
                      </label>
                      <input
                        type="date"
                        value={returnDate}
                        min={pickupDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Orario Riconsegna
                      </label>
                      <select
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-sky-500"
                      >
                        {['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', 'H24 (Keybox sicura)'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Duration Banner */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-black text-base">
                    {rentalDays}g
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white">
                      Durata totale noleggio: {rentalDays} {rentalDays === 1 ? 'giorno' : 'giorni'}
                    </span>
                    <p className="text-xs text-slate-400">
                      {pickupDate} ore {pickupTime} → {returnDate} ore {returnTime}
                    </p>
                  </div>
                </div>

                {rentalDays >= 7 ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Sconto settimanale -20% attivo!
                  </span>
                ) : rentalDays >= 3 ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Sconto durata -10% attivo!
                  </span>
                ) : null}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Passo Successivo: Scegli l'Auto</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT CAR & LIVE TOTAL PRICE */}
          {currentStep === 2 && (
            <div className="p-6 sm:p-10 space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Car className="w-5 h-5 text-sky-400" />
                    Passo 2: Seleziona l'Auto e Visualizza il Prezzo Totale
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Prezzo totale calcolato per <strong>{rentalDays} giorni</strong> con tasse, 200 km/giorno e assicurazione inclusa.
                  </p>
                </div>

                {/* Category filters */}
                <div className="flex gap-1.5 flex-wrap">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCategory(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        selectedCategory === c.id
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVehicles.map((car) => {
                  const isSelected = selectedCarId === car.id;

                  // Compute total for this car
                  let discountPercent = 0;
                  if (rentalDays >= 7) discountPercent = 20;
                  else if (rentalDays >= 3) discountPercent = 10;
                  const base = car.pricePerDay * rentalDays;
                  const disc = Math.round((base * discountPercent) / 100);
                  const totalForThisCar = base - disc;

                  return (
                    <div
                      key={car.id}
                      onClick={() => setSelectedCarId(car.id)}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col cursor-pointer ${
                        isSelected
                          ? 'bg-slate-850 border-sky-500 shadow-lg shadow-sky-500/20 ring-2 ring-sky-500'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="relative h-44 overflow-hidden bg-slate-800">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-bold text-white">
                            {car.categoryLabel}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-sky-500 text-white text-xs font-extrabold flex items-center gap-1 shadow">
                            <Check className="w-3.5 h-3.5" /> Selezionata
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                            {car.brand}
                          </span>
                          <h4 className="text-base font-bold text-white">
                            {car.name}
                          </h4>

                          {/* Quick specs icons */}
                          <div className="grid grid-cols-4 gap-1 text-[11px] text-slate-300 my-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                            <span>{car.seats} Posti</span>
                            <span>{car.luggage} Borse</span>
                            <span className="truncate">{car.transmission}</span>
                            <span className="truncate">{car.fuel}</span>
                          </div>
                        </div>

                        {/* Price calculation display */}
                        <div className="pt-3 border-t border-slate-800 flex items-end justify-between">
                          <div>
                            <span className="text-[11px] text-slate-400 block">
                              Tariffa: €{car.pricePerDay}/giorno
                            </span>
                            <span className="text-xs text-slate-400">
                              Totale ({rentalDays} gg):
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="text-2xl font-black text-sky-400">
                              €{totalForThisCar}
                            </span>
                            {discountPercent > 0 && (
                              <span className="block text-[10px] text-emerald-400 font-semibold">
                                Sconto -{discountPercent}% applicato
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Torna a Date & Luoghi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Passo Successivo: Scegli gli Optional</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: EXTRAS & ASSURANCES */}
          {currentStep === 3 && (
            <div className="p-6 sm:p-10 space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sky-400" />
                  Passo 3: Personalizza con Servizi e Coperture Aggiuntive
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Seleziona gli optional desiderati per viaggiare in totale tranquillità.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXTRAS.map((extra) => {
                  const isChecked = selectedExtras.includes(extra.id);
                  const totalExtraCost = extra.pricePerDay * rentalDays;

                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isChecked
                          ? 'bg-sky-950/40 border-sky-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-sky-500 border-sky-500 text-white'
                              : 'border-slate-700 bg-slate-800'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            {extra.name}
                            {extra.pricePerDay === 0 && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-bold">
                                Promozione Gratis
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            {extra.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-sky-400">
                          {extra.pricePerDay === 0 ? '0 €' : `+€${totalExtraCost}`}
                        </span>
                        {extra.pricePerDay > 0 && (
                          <span className="text-[10px] text-slate-500 block">
                            (€{extra.pricePerDay}/gg)
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Running Total Box */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">
                    Auto selezionata: <strong className="text-white">{currentVehicle.name}</strong> ({rentalDays} gg)
                  </span>
                  <span className="text-xs text-slate-400">
                    Optional selezionati: {selectedExtras.length}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Totale parziale:</span>
                  <span className="text-2xl font-black text-white">
                    €{pricing.grandTotal}
                  </span>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Torna alla Flotta</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Passo Successivo: I Tuoi Dati</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOMER DETAILS FORM */}
          {currentStep === 4 && (
            <form onSubmit={handleFinalSubmit} className="p-6 sm:p-10 space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-sky-400" />
                  Passo 4: Dati del Conducente e Garanzia Noleggio
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Inserisci le informazioni per intestare il contratto. Nessun pagamento anticipato richiesto.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mario Rossi"
                    value={customerData.fullName}
                    onChange={(e) => setCustomerData({ ...customerData, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Numero di Telefono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+39 340 1234567"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Indirizzo Email per Voucher *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="mario.rossi@email.it"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Fascia d'Età del Conducente
                  </label>
                  <select
                    value={customerData.age}
                    onChange={(e) => setCustomerData({ ...customerData, age: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-sky-500 font-medium"
                  >
                    <option value="25+">25 anni o superiore (Nessun sovrapprezzo)</option>
                    <option value="21-24">21 - 24 anni (Giovane guidatore)</option>
                    <option value="20">20 anni (Con 1 anno di patente B)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Numero Patente di Guida (Opzionale per velocizzare)
                  </label>
                  <input
                    type="text"
                    placeholder="Es. U12345678X"
                    value={customerData.licenseNumber}
                    onChange={(e) => setCustomerData({ ...customerData, licenseNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Metodo di Garanzia / Deposito Preferito
                  </label>
                  <select
                    value={customerData.guaranteeType}
                    onChange={(e) => setCustomerData({ ...customerData, guaranteeType: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-sky-500 font-medium"
                  >
                    <option value="debito">Carta di Debito / Bancomat (Accettata senza problemi)</option>
                    <option value="credito">Carta di Credito classica (Visa, Mastercard, Amex)</option>
                    <option value="contanti">Deposito in contanti concordato alla consegna</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  Note aggiuntive (orario treno/volo, arrivo anticipato, richieste particolari)
                </label>
                <textarea
                  rows={2}
                  placeholder="Es. Arriviamo con Frecciarossa alle 14:15, gradiremmo la consegna direttamente sul piazzale della stazione..."
                  value={customerData.notes}
                  onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-sky-500 text-xs resize-none"
                />
              </div>

              {/* Guarantee policy notice */}
              <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Trasparenza AutoNolo:</strong> Non ti verrà addebitato alcun importo adesso. 
                  Il pagamento del noleggio (€{pricing.grandTotal}) avverrà al momento della consegna della vettura.
                </span>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Torna a Optional</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Conferma e Genera Voucher</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: BOOKING CONFIRMATION & FULL SUMMARY VOUCHER */}
          {currentStep === 5 && confirmedBooking && (
            <div className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
              {/* Header Status */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Prenotazione Registrata con Successo
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Voucher di Prenotazione: {confirmedBooking.bookingCode}
                </h3>
                <p className="text-xs text-slate-400 max-w-lg mx-auto">
                  Una copia è stata inviata a <strong>{confirmedBooking.customer.email}</strong>. 
                  Presenta questo codice al momento del ritiro.
                </p>
              </div>

              {/* Detailed Summary Card (Printable / Shareable) */}
              <div id="booking-voucher" className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
                  <div>
                    <span className="text-xs text-slate-400">Azienda di noleggio:</span>
                    <h4 className="font-extrabold text-white text-base">
                      {COMPANY_INFO.name} ({COMPANY_INFO.vat})
                    </h4>
                    <span className="text-xs text-slate-400">{COMPANY_INFO.address}</span>
                  </div>

                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30">
                      Stato: Confermata
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-1">
                      Data emissione: {new Date().toLocaleDateString('it-IT')}
                    </span>
                  </div>
                </div>

                {/* Car & Trip Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Car Box */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <img
                      src={confirmedBooking.vehicle.image}
                      alt={confirmedBooking.vehicle.name}
                      className="w-24 h-18 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-sky-400">
                        {confirmedBooking.vehicle.categoryLabel}
                      </span>
                      <h5 className="font-bold text-white text-base">
                        {confirmedBooking.vehicle.name}
                      </h5>
                      <p className="text-xs text-slate-400">
                        {confirmedBooking.vehicle.transmission} • {confirmedBooking.vehicle.fuel} • {confirmedBooking.vehicle.seats} Posti
                      </p>
                    </div>
                  </div>

                  {/* Customer Box */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Intestatario del Noleggio:
                    </span>
                    <strong className="text-white text-sm block">
                      {confirmedBooking.customer.fullName}
                    </strong>
                    <div className="text-slate-300">
                      Tel: {confirmedBooking.customer.phone}
                    </div>
                    <div className="text-slate-300">
                      Email: {confirmedBooking.customer.email}
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Garanzia: {confirmedBooking.customer.guaranteeType === 'debito' ? 'Carta di Debito / Bancomat' : 'Carta di Credito'}
                    </div>
                  </div>
                </div>

                {/* Schedule Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div>
                    <strong className="text-sky-400 block mb-1">Ritiro Vettura:</strong>
                    <span className="text-white font-semibold block">
                      {confirmedBooking.pickupDate} alle ore {confirmedBooking.pickupTime}
                    </span>
                    <span className="text-slate-400">{confirmedBooking.pickupLocation}</span>
                  </div>
                  <div>
                    <strong className="text-sky-400 block mb-1">Riconsegna:</strong>
                    <span className="text-white font-semibold block">
                      {confirmedBooking.returnDate} alle ore {confirmedBooking.returnTime}
                    </span>
                    <span className="text-slate-400">{confirmedBooking.returnLocation}</span>
                  </div>
                </div>

                {/* Price Breakdown in Voucher */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Costo base ({confirmedBooking.days} gg x €{confirmedBooking.baseCarRate})</span>
                    <span>€{confirmedBooking.baseCarRate * confirmedBooking.days}</span>
                  </div>

                  {confirmedBooking.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Sconto durata applicato (-{confirmedBooking.discountPercent}%)</span>
                      <span>-€{confirmedBooking.discountAmount}</span>
                    </div>
                  )}

                  {confirmedBooking.selectedExtras.map((ex, i) => (
                    <div key={i} className="flex justify-between text-slate-300">
                      <span>Optional: {ex.name}</span>
                      <span>{ex.total === 0 ? 'Omaggio' : `+€${ex.total}`}</span>
                    </div>
                  ))}

                  <div className="flex justify-between text-slate-400 pt-1">
                    <span>Deposito cauzionale da bloccare</span>
                    <span className="text-white">{confirmedBooking.vehicle.deposit}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-slate-700 text-base font-bold text-white">
                    <span>Totale da saldare al ritiro (IVA inclusa):</span>
                    <span className="text-2xl font-black text-emerald-400">
                      €{confirmedBooking.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions: WhatsApp confirmation, Print Voucher, New Booking */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Buongiorno,%20ho%20confermato%20la%20prenotazione%20${confirmedBooking.bookingCode}%20per%20la%20${encodeURIComponent(confirmedBooking.vehicle.name)}%20dal%20${confirmedBooking.pickupDate}%20al%20${confirmedBooking.returnDate}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Invia Conferma Rapida su WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Stampa / Salva Voucher
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    setConfirmedBooking(null);
                  }}
                  className="px-4 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
                >
                  Effettua Altra Prenotazione
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History Modal for Previous Bookings */}
      {showHistoryModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowHistoryModal(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 overflow-hidden my-6 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-bold text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                Le Tue Prenotazioni Registrate ({savedBookings.length})
              </h4>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {savedBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sky-400 text-sm">
                      {b.bookingCode}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      €{b.totalPrice} ({b.days} giorni)
                    </span>
                  </div>

                  <div className="text-slate-300">
                    Auto: <strong>{b.vehicle.name}</strong> • Intestata a: {b.customer.fullName}
                  </div>

                  <div className="text-slate-400">
                    Periodo: {b.pickupDate} → {b.returnDate} ({b.pickupLocation})
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
