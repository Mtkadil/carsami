import { ReactNode } from 'react';
import { ShieldCheck, CreditCard, MapPin, PhoneCall, Sparkles, CalendarX2, Check, X } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/mockData';

export default function WhyUsSection() {
  const iconMap: Record<string, ReactNode> = {
    BadgeCheck: <ShieldCheck className="w-6 h-6 text-sky-600" />,
    CreditCard: <CreditCard className="w-6 h-6 text-sky-600" />,
    MapPin: <MapPin className="w-6 h-6 text-sky-600" />,
    PhoneCall: <PhoneCall className="w-6 h-6 text-sky-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-sky-600" />,
    CalendarX2: <CalendarX2 className="w-6 h-6 text-sky-600" />,
  };

  return (
    <section id="vantaggi" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold tracking-wide uppercase mb-3 border border-sky-500/30">
            Perché Sceglierci
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            I Vantaggi di un Noleggio Locale di Fiducia
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Dimentica le lunghe code in aeroporto, le franchigie sproporzionate e le clausole scritte in piccolo.
            Da noi trovi un servizio trasparente, caloroso e personalizzato.
          </p>
        </div>

        {/* 6 Key Strengths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-sky-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-700/60 border border-slate-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all">
                {iconMap[item.icon] || <ShieldCheck className="w-6 h-6 text-sky-400" />}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Box: Local Business vs Big Airport Chains */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 sm:p-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-center text-white mb-6">
            Confronto Diretto: AutoNolo Riviera vs Grandi Catene
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Our Service */}
            <div className="p-5 rounded-xl bg-sky-950/40 border border-sky-500/30 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>AutoNolo Riviera (La Nostra Formula)</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-200 space-y-2.5">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Carta di credito non indispensabile (accettiamo carte di debito)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Consegna gratuita al binario della stazione o hotel</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Nessuna coda: chiavi e contratto pronti in 3 minuti</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Parli direttamente col gestore locale, reperibile h24</span>
                </li>
              </ul>
            </div>

            {/* Typical Big Multinational */}
            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3 text-slate-400">
              <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
                <X className="w-4 h-4 text-rose-400" />
                <span>Tipiche Grandi Catene & Broker Online</span>
              </div>
              <ul className="text-xs sm:text-sm space-y-2.5">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Carta di credito tradizionale con plafond elevato obbligatoria</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Nessuna consegna: spostamenti costosi fino al banco aeroportuale</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Code anche di 45-60 minuti nei periodi di alta stagione</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Centralini automatici e call center esterni in caso di problemi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
