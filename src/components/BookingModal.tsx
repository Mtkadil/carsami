import { useState, useEffect, FormEvent } from 'react';
import { X, Check, ShieldCheck, Car, Calendar, MapPin, Phone, Mail, User, CheckCircle2, MessageCircle } from 'lucide-react';
import { VEHICLES, PICKUP_LOCATIONS, EXTRAS, COMPANY_INFO } from '../data/mockData';
import { Vehicle } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicle?: Vehicle | null;
  initialDays?: number;
  initialExtras?: string[];
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedVehicle,
  initialDays = 3,
  initialExtras = ['second-driver'],
}: BookingModalProps) {
  const [vehicleId, setVehicleId] = useState<string>(
    selectedVehicle ? selectedVehicle.id : VEHICLES[0].id
  );
  const [days, setDays] = useState<number>(initialDays);
  const [pickupLocation, setPickupLocation] = useState<string>(PICKUP_LOCATIONS[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(initialExtras);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '25+',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Update vehicle when prop changes
  useEffect(() => {
    if (selectedVehicle) {
      setVehicleId(selectedVehicle.id);
    }
  }, [selectedVehicle]);

  // Handle escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentVehicle = VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[0];

  // Pricing
  let discountPercent = 0;
  if (days >= 7) discountPercent = 20;
  else if (days >= 3) discountPercent = 10;

  const carBase = currentVehicle.pricePerDay * days;
  const discount = Math.round((carBase * discountPercent) / 100);
  const carTotal = carBase - discount;

  const extrasCost = selectedExtras.reduce((acc, extraId) => {
    const ex = EXTRAS.find((e) => e.id === extraId);
    return acc + (ex ? ex.pricePerDay * days : 0);
  }, 0);

  const totalEstimate = carTotal + extrasCost;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const code = `PREN-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(code);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-base sm:text-lg">
              Prenotazione Rapida & Preventivo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs sm:text-sm text-slate-800">
            {/* Vehicle Chosen Badge */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={currentVehicle.image}
                  alt={currentVehicle.name}
                  className="w-16 h-12 rounded-lg object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {currentVehicle.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentVehicle.categoryLabel} • {currentVehicle.transmission} • {currentVehicle.fuel}
                  </p>
                </div>
              </div>

              {/* Selector for other cars */}
              <select
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none"
              >
                {VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} (€{v.pricePerDay}/g)
                  </option>
                ))}
              </select>
            </div>

            {/* Dates & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  Luogo di Ritiro
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-xs font-medium"
                >
                  {PICKUP_LOCATIONS.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  Data Inizio
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  Giorni di Noleggio
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-xs font-bold"
                />
              </div>
            </div>

            {/* Extras Checklist */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Optional Inclusi o Aggiuntivi:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {EXTRAS.map((extra) => {
                  const checked = selectedExtras.includes(extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                        checked
                          ? 'border-sky-500 bg-sky-50/60'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            checked ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {checked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-medium text-slate-800">
                          {extra.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">
                        {extra.pricePerDay === 0 ? 'Gratis' : `+€${extra.pricePerDay * days}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Driver Personal Information */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">
                Dati del Conducente:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mario Rossi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Telefono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+39 340 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Email per conferma preventivo *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="mario.rossi@email.it"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Età del guidatore
                  </label>
                  <select
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-xs font-medium"
                  >
                    <option value="25+">25 anni o più (Nessun sovrapprezzo)</option>
                    <option value="21-24">21 - 24 anni (Giovane guidatore)</option>
                    <option value="20">20 anni (Con 1 anno di patente)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Note aggiuntive (orario arrivo treno, seggiolino, ecc.)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Es. arrivo previsto in stazione alle ore 10:30..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-xs resize-none"
                />
              </div>
            </div>

            {/* Price Preview & Action */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-slate-400 block">
                  Totale preventivato ({days} gg):
                </span>
                <span className="text-2xl font-black text-white">
                  €{totalEstimate}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Cauzione {currentVehicle.deposit}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Invia Prenotazione
                </button>
              </div>
            </div>

            <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Nessun pagamento con carta adesso • Verifica e conferma con operatore
            </p>
          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-extrabold text-slate-900">
              Richiesta Inviata con Successo!
            </h4>

            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Grazie <strong>{formData.name}</strong>, abbiamo riservato la pre-assegnazione per la tua{' '}
              <strong>{currentVehicle.name}</strong> ({days} giorni).
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs max-w-sm mx-auto space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Codice Prenotazione:</span>
                <strong className="text-sky-700 font-bold">{bookingCode}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Preventivo:</span>
                <strong className="text-slate-900">€{totalEstimate}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ritiro:</span>
                <span>{pickupLocation}</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Salve,%20ho%20inviato%20la%20prenotazione%20${bookingCode}%20per%20la%20${encodeURIComponent(currentVehicle.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                Invia Codice su WhatsApp
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Chiudi Finestra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
