import { Car, Phone, Mail, MapPin, Clock, MessageCircle, ArrowUp, ShieldCheck, Heart } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Bio (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Auto<span className="text-sky-400">Nolo</span> Riviera
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Azienda locale indipendente specializzata nel noleggio auto a breve e medio termine. 
              Servizio personalizzato, consegna al binario ferroviario e presso strutture ricettive del territorio.
            </p>

            <div className="pt-2 flex items-center gap-2 text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{COMPANY_INFO.vat} • REA SP-128490</span>
            </div>
          </div>

          {/* Col 2: Flotta & Categorie */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              La Flotta
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#flotta" className="hover:text-white transition-colors">
                  City Car & Ibride
                </a>
              </li>
              <li>
                <a href="#flotta" className="hover:text-white transition-colors">
                  SUV & Crossover 4x4
                </a>
              </li>
              <li>
                <a href="#flotta" className="hover:text-white transition-colors">
                  Cabriolet Dolce Vita
                </a>
              </li>
              <li>
                <a href="#flotta" className="hover:text-white transition-colors">
                  Van 9 Posti (Patente B)
                </a>
              </li>
              <li>
                <a href="#preventivo" className="hover:text-white transition-colors text-sky-400">
                  Calcola Tariffa Online →
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigazione Rapida */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navigazione
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home Page
                </a>
              </li>
              <li>
                <a href="#flotta" className="hover:text-white transition-colors">
                  La Nostra Flotta
                </a>
              </li>
              <li>
                <a href="#prenotazione-online" className="hover:text-white transition-colors text-sky-400 font-semibold">
                  Prenotazione Online
                </a>
              </li>
              <li>
                <a href="#recensioni" className="hover:text-white transition-colors">
                  Recensioni dei Clienti
                </a>
              </li>
              <li>
                <a href="#galleria" className="hover:text-white transition-colors">
                  Galleria Fotografica
                </a>
              </li>
              <li>
                <a href="#contatti" className="hover:text-white transition-colors">
                  Dove Siamo & Domande (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contatti Rapidi */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contatti Diretti
            </h4>
            <div className="space-y-2.5">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors text-slate-300 font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2 pt-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>

              <div className="flex items-start gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>Lun - Sab 08-20 | Dom 08:30-13 (H24 Keybox)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} AutoNolo Riviera - Tutti i diritti riservati. Noleggio auto senza intermediari.
          </p>

          <div className="flex items-center gap-4">
            <span>Trasparenza & Assistenza 100% Locale</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              title="Torna su"
            >
              <span>Torna su</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action Button for immediate conversion */}
      <div className="fixed bottom-5 right-5 z-40">
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Buongiorno,%20vorrei%20informazioni%20sulla%20disponibilit%C3%A0%20auto`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-900/30 transition-all transform hover:scale-105"
          aria-label="Contattaci su WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">Serve aiuto? Scrivici</span>
        </a>
      </div>
    </footer>
  );
}
