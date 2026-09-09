import { useState, useEffect, MouseEvent } from 'react';
import { Phone, MessageCircle, Clock, MapPin, Menu, X, Car, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface HeaderProps {
  onOpenBookingModal: (vehicleId?: string) => void;
}

export default function Header({ onOpenBookingModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Flotta', href: '#flotta' },
    { label: 'Galleria', href: '#galleria' },
    { label: 'Prenota Online', href: '#prenotazione-online' },
    { label: 'Recensioni', href: '#recensioni' },
    { label: 'Preventivo', href: '#preventivo' },
    { label: 'Contatti', href: '#contatti' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Notification Bar for Local Business */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Azienda Locale di Fiducia • Dal 2012
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              La Spezia & Riviera (Consegne in Stazione e Hotel)
            </span>
            <span className="hidden lg:inline-block text-slate-600">|</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {COMPANY_INFO.hours}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold">{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Salve,%20vorrei%20informazioni%20su%20un%20noleggio%20auto`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">WhatsApp Diretto</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-800'
            : 'bg-white/90 backdrop-blur-sm shadow-sm py-4 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group text-left"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Auto<span className="text-sky-600">Nolo</span>
                </span>
                <span className="text-xs uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                  Riviera
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                Noleggio Auto Locale Senza Sorprese
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenBookingModal()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white text-sm font-semibold shadow-sm shadow-sky-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Prenota Ora</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Apri menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 text-white font-semibold shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                Richiedi Preventivo / Prenota
              </button>

              <div className="flex gap-2 pt-2">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-medium text-sm hover:bg-slate-50"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  Chiama
                </a>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
