import { useState } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { VEHICLES, EXTRAS } from '../data/mockData';
import { Vehicle } from '../types';

interface PriceCalculatorProps {
  onConfirmEstimate: (vehicle: Vehicle, days: number, selectedExtras: string[], total: number) => void;
}

export default function PriceCalculator({ onConfirmEstimate }: PriceCalculatorProps) {
  const [selectedCarId, setSelectedCarId] = useState<string>(VEHICLES[0].id);
  const [days, setDays] = useState<number>(3);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['second-driver']);

  const selectedCar = VEHICLES.find((v) => v.id === selectedCarId) || VEHICLES[0];

  // Duration discount
  let discountPercent = 0;
  if (days >= 7) {
    discountPercent = 20; // 20% discount for weekly rentals
  } else if (days >= 3) {
    discountPercent = 10; // 10% discount for 3+ days
  }

  const baseTotal = selectedCar.pricePerDay * days;
  const discountAmount = Math.round((baseTotal * discountPercent) / 100);
  const discountedCarTotal = baseTotal - discountAmount;

  // Extras total
  const extrasTotal = selectedExtras.reduce((acc, extraId) => {
    const extra = EXTRAS.find((e) => e.id === extraId);
    return acc + (extra ? extra.pricePerDay * days : 0);
  }, 0);

  const finalTotal = discountedCarTotal + extrasTotal;

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  return (
    <section id="preventivo" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold tracking-wide uppercase mb-3">
            <Calculator className="w-3.5 h-3.5 text-sky-600" />
            Trasparenza Totale
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calcola il Tuo Preventivo in Tempo Reale
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Simula il costo esatto del tuo noleggio in base ai giorni desiderati e agli optional.
            Sconti automatici fino al 20% per noleggi da 3 o più giorni.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            {/* Step 1: Select Car */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                1. Scegli il Modello di Auto
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {VEHICLES.map((car) => (
                  <button
                    key={car.id}
                    type="button"
                    onClick={() => setSelectedCarId(car.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedCarId === car.id
                        ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {car.name}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {car.categoryLabel} • {car.fuel}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-sky-700 shrink-0">
                      €{car.pricePerDay}/g
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Days */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-900">
                  2. Durata del Noleggio
                </label>
                <span className="text-sm font-extrabold text-sky-600">
                  {days} {days === 1 ? 'Giorno' : 'Giorni'}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="21"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>1 giorno</span>
                <span>Weekend (3 gg)</span>
                <span>1 settimana (7 gg)</span>
                <span>2 settimane (14 gg)</span>
                <span>21 gg</span>
              </div>

              {discountPercent > 0 && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  <Tag className="w-3.5 h-3.5" />
                  Sconto durata applicato: -{discountPercent}% sul noleggio!
                </div>
              )}
            </div>

            {/* Step 3: Optional Extras */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                3. Optional e Coperture
              </label>
              <div className="space-y-2">
                {EXTRAS.map((extra) => {
                  const isChecked = selectedExtras.includes(extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'border-sky-500 bg-sky-50/50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-sky-600 border-sky-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            {extra.name}
                            {extra.pricePerDay === 0 && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold uppercase">
                                Gratis
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {extra.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-700 shrink-0">
                        {extra.pricePerDay === 0
                          ? '0 €'
                          : `+€${extra.pricePerDay * days}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Price Breakdown Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Riepilogo Stimato
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  IVA & Tasse Incluse
                </span>
              </div>

              {/* Selected Car Preview */}
              <div className="space-y-2">
                <div className="h-32 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {selectedCar.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {selectedCar.categoryLabel} • {selectedCar.transmission}
                  </p>
                </div>
              </div>

              {/* Calculation List */}
              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>Tariffa base ({days} gg x €{selectedCar.pricePerDay})</span>
                  <span>€{baseTotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Sconto durata (-{discountPercent}%)</span>
                    <span>-€{discountAmount}</span>
                  </div>
                )}

                {extrasTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Optional & Coperture selezionate</span>
                    <span>+€{extrasTotal}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400 pt-1">
                  <span>Chilometri compresi</span>
                  <span className="text-slate-200">200 km / giorno</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Deposito cauzionale richiesto</span>
                  <span className="text-slate-200">{selectedCar.deposit}</span>
                </div>
              </div>
            </div>

            {/* Total Block & Action */}
            <div className="pt-6 border-t border-slate-800 mt-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Totale stimato</span>
                  <span className="text-3xl font-black text-white">
                    €{finalTotal}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Pari a solo</span>
                  <div className="text-sm font-bold text-sky-400">
                    €{(finalTotal / days).toFixed(1)} / giorno
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onConfirmEstimate(selectedCar, days, selectedExtras, finalTotal)}
                className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Blocca Questa Offerta</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Nessun addebito anticipato • Conferma via WhatsApp/Email
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
