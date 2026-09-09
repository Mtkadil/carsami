import { useState, FormEvent } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2, ChevronDown, HelpCircle, Navigation, Copy, Check } from 'lucide-react';
import { COMPANY_INFO, PICKUP_LOCATIONS, VEHICLES, FAQS } from '../data/mockData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carId: VEHICLES[0].id,
    pickupLocation: PICKUP_LOCATIONS[0],
    startDate: '',
    endDate: '',
    notes: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const code = `RIV-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceCode(code);
    setFormSubmitted(true);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(COMPANY_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const selectedCarObj = VEHICLES.find((v) => v.id === formData.carId);

  return (
    <section id="contatti" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold tracking-wide uppercase mb-3">
            <Phone className="w-3.5 h-3.5 text-sky-600" />
            Siamo a Tua Completa Disposizione
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contatti, Preventivi & Dove Trovarci
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Hai domande, desideri verificare la disponibilità o richiedere una consegna speciale? 
            Scrivici, chiamaci o vieni a trovarci nella nostra sede a due passi dalla stazione e dal porto.
          </p>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Quick Contact Cards & Office Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Telephone Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-sky-950 text-white shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider uppercase text-sky-400">
                  Assistenza Telefonica Diretta
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold flex items-center gap-1 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Reperibilità H24
                </span>
              </div>

              <div>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-2xl sm:text-3xl font-black text-white hover:text-sky-300 transition-colors block"
                >
                  {COMPANY_INFO.phone}
                </a>
                <p className="text-xs text-slate-300 mt-1">
                  Chiamata diretta con i titolari (Marco ed Elena)
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Salve,%20vorrei%20informazioni%20per%20un%20noleggio%20auto`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat WhatsApp Immediata
                </a>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPhone ? 'Copiato!' : 'Copia Numero'}</span>
                </button>
              </div>
            </div>

            {/* Office Information Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-600" />
                Sede Operativa & Punti di Incontro
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Indirizzo Sede:</strong>
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Orari di Sportello:</strong>
                    <span>{COMPANY_INFO.hours}</span>
                    <span className="block text-emerald-700 font-medium mt-0.5">
                      Riconsegna notturna disponibile H24 con Keybox blindata
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Email Ufficio:</strong>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-sky-600 hover:underline">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Locations & Proximity */}
            <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-100">
              <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-sky-700" />
                Distanze e Collegamenti Chiave
              </h4>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-center justify-between py-1 border-b border-sky-100/80">
                  <span>🚆 Stazione FS Centrale</span>
                  <span className="font-semibold text-slate-900">350 metri (5 min a piedi)</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-sky-100/80">
                  <span>⚓ Terminal Crociere & Molo Traghetti</span>
                  <span className="font-semibold text-slate-900">600 metri</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-sky-100/80">
                  <span>🛣️ Raccordo Autostradale A12/A15</span>
                  <span className="font-semibold text-slate-900">2.5 km (facile accesso)</span>
                </li>
                <li className="flex items-center justify-between py-1">
                  <span>🏖️ Cinque Terre & Golfo dei Poeti</span>
                  <span className="font-semibold text-slate-900">15 min in auto</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact / Booking Request Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
              {!formSubmitted ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Invia una Richiesta o Richiedi un Preventivo
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Rispondiamo generalmente entro 15-30 minuti durante l'orario di apertura.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Name and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nome e Cognome *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Mario Rossi"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Numero di Telefono / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+39 340 1234567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Indirizzo Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="mario.rossi@email.it"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                      />
                    </div>

                    {/* Row 3: Vehicle & Location selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Modello d'Interesse
                        </label>
                        <select
                          value={formData.carId}
                          onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm font-medium"
                        >
                          {VEHICLES.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name} (da €{v.pricePerDay}/g)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Punto di Consegna Preferito
                        </label>
                        <select
                          value={formData.pickupLocation}
                          onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm font-medium"
                        >
                          {PICKUP_LOCATIONS.map((loc, idx) => (
                            <option key={idx} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Data Inizio Noleggio
                        </label>
                        <input
                          type="date"
                          value={formData.startDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Data Fine Noleggio
                        </label>
                        <input
                          type="date"
                          value={formData.endDate}
                          min={formData.startDate || new Date().toISOString().split('T')[0]}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                        />
                      </div>
                    </div>

                    {/* Message or Special notes */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Richieste Particolari o Domande
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Es: Arrivo con Frecciarossa alle 15:40, desidero il seggiolino per bimbo di 2 anni..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Invia Richiesta di Disponibilità</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-slate-400">
                      Nessun pagamento anticipato. Riceverai un preventivo scritto chiaro e non vincolante.
                    </p>
                  </form>
                </div>
              ) : (
                /* Success Screen */
                <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      Richiesta Ricevuta con Successo!
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                      Grazie, {formData.name || 'Gentile Cliente'}!
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                      Abbiamo preso in carico la tua richiesta per la{' '}
                      <strong>{selectedCarObj?.name || 'vettura'}</strong>. Ti ricontatteremo a breve al numero{' '}
                      <strong>{formData.phone}</strong> o via email.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto text-xs space-y-2 text-slate-700">
                    <div className="flex justify-between font-medium">
                      <span>Codice Richiesta:</span>
                      <strong className="text-sky-700 font-bold">{referenceCode}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Ritiro presso:</span>
                      <span>{formData.pickupLocation}</span>
                    </div>
                    {formData.startDate && (
                      <div className="flex justify-between">
                        <span>Periodo:</span>
                        <span>{formData.startDate} → {formData.endDate || 'da concordare'}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Salve,%20ho%20inviato%20la%20richiesta%20${referenceCode}%20per%20la%20${encodeURIComponent(selectedCarObj?.name || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Conferma Più Velocemente su WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                    >
                      Nuova Richiesta
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              Domande Frequenti
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Tutto Quello che C'è da Sapere sul Noleggio
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-sky-600 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-400 ${
                      activeFaq === idx ? 'transform rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
