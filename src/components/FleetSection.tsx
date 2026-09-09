import { useState } from 'react';
import { Users, Briefcase, Fuel, Gauge, Sparkles, Shield, ChevronRight, Check } from 'lucide-react';
import { VEHICLES } from '../data/mockData';
import { Vehicle, VehicleCategory } from '../types';

interface FleetSectionProps {
  selectedCategory: VehicleCategory;
  onSelectCategory: (category: VehicleCategory) => void;
  onSelectVehicleToBook: (vehicle: Vehicle) => void;
  onViewVehicleGallery: (vehicleName: string) => void;
}

export default function FleetSection({
  selectedCategory,
  onSelectCategory,
  onSelectVehicleToBook,
  onViewVehicleGallery,
}: FleetSectionProps) {
  const [activeTab, setActiveTab] = useState<VehicleCategory>(selectedCategory);

  const categories: { id: VehicleCategory; label: string }[] = [
    { id: 'all', label: 'Tutte le Vetture' },
    { id: 'city', label: 'City Car' },
    { id: 'suv', label: 'SUV & Crossover' },
    { id: 'cabrio', label: 'Cabriolet' },
    { id: 'van', label: 'Van 9 Posti' },
  ];

  const handleTabChange = (cat: VehicleCategory) => {
    setActiveTab(cat);
    onSelectCategory(cat);
  };

  const filteredVehicles = activeTab === 'all'
    ? VEHICLES
    : VEHICLES.filter((v) => v.category === activeTab);

  return (
    <section id="flotta" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Parco Auto di Proprietà
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            La Nostra Flotta Moderna & Tagliandata
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Veicoli recenti con consumi ridotti, dotati di climatizzatore, connettività smartphone e massima pulizia. 
            Nessun modello a sorpresa: guidi esattamente l'auto che scegli.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Category & Highlight Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold">
                    {car.categoryLabel}
                  </span>
                  {car.highlightBadge && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-sky-500/90 backdrop-blur-md text-white text-[11px] font-bold">
                      {car.highlightBadge}
                    </span>
                  )}
                </div>

                {/* Instant Availability Pill */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Pronta consegna
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-sky-600">
                      {car.brand}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">
                      {car.name}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-500 block">a partire da</span>
                    <span className="text-2xl font-black text-slate-900">
                      €{car.pricePerDay}
                    </span>
                    <span className="text-xs text-slate-500">/giorno</span>
                  </div>
                </div>

                {/* Specs Pill Grid */}
                <div className="grid grid-cols-4 gap-2 my-4 py-3 px-2 rounded-xl bg-slate-50 text-xs text-slate-600 border border-slate-100 text-center">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span>{car.seats} Posti</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    <span>{car.luggage} Borse</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Gauge className="w-4 h-4 text-slate-500" />
                    <span className="truncate max-w-full font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Fuel className="w-4 h-4 text-slate-500" />
                    <span className="truncate max-w-full">{car.fuel}</span>
                  </div>
                </div>

                {/* Main Feature Highlights */}
                <div className="space-y-1.5 mb-6 text-xs text-slate-600 flex-1">
                  {car.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1 font-medium">
                    <Shield className="w-3 h-3 text-emerald-600" />
                    Deposito: <strong className="text-slate-700">{car.deposit}</strong>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectVehicleToBook(car)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Prenota</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onViewVehicleGallery(car.name)}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer"
                    title="Vedi foto nella galleria"
                  >
                    Foto & Scheda
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Local Conditions */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-sky-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Shield className="w-5 h-5 text-sky-400" />
              Cerchi un modello specifico o un noleggio a lungo termine?
            </h4>
            <p className="text-sm text-slate-300">
              Contattaci direttamente: verifichiamo la disponibilità in tempo reale anche per veicoli commerciali e richieste speciali.
            </p>
          </div>
          <a
            href="#contatti"
            className="shrink-0 px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-sky-50 font-bold text-sm shadow transition-all"
          >
            Richiedi Preventivo Dedicato
          </a>
        </div>
      </div>
    </section>
  );
}
