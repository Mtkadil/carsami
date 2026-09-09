import { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem, GalleryCategory } from '../types';
import { Image as ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight, Sparkles, Car } from 'lucide-react';

interface GallerySectionProps {
  onSelectCarToBook?: (carName: string) => void;
}

export default function GallerySection({ onSelectCarToBook }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: { id: GalleryCategory; label: string }[] = [
    { id: 'all', label: 'Tutte le Foto' },
    { id: 'flotta', label: 'Parco Auto' },
    { id: 'interni', label: 'Dettagli & Interni' },
    { id: 'consegna', label: 'Consegna & Esperienza' },
    { id: 'territorio', label: 'Itinerari Riviera' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="galleria" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold tracking-wide uppercase mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-sky-600" />
            Galleria Fotografica Ufficiale
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Scopri le Nostre Vetture e i Nostri Servizi
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Fotografie autentiche delle nostre auto, degli interni igienizzati e dei momenti di consegna.
            Guarda la qualità reale che offriamo ogni giorno ai nostri clienti.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-72"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category Pill on top */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Zoom Icon on hover */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Caption details at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-transform duration-300">
                <h3 className="font-bold text-sm line-clamp-1 group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
                {item.vehicleRelated && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-sky-400 font-medium">
                    <Car className="w-3 h-3" />
                    <span>Modello: {item.vehicleRelated}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && currentLightboxItem && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header Bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 text-xs font-semibold">
                    {currentLightboxItem.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400">
                    Foto {lightboxIndex + 1} di {filteredItems.length}
                  </span>
                </div>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  aria-label="Chiudi visualizzazione"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image View */}
              <div className="relative bg-black flex items-center justify-center min-h-[350px] max-h-[65vh] overflow-hidden">
                <img
                  src={currentLightboxItem.image}
                  alt={currentLightboxItem.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain mx-auto transition-all"
                />

                {/* Left/Right Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white transition-all backdrop-blur-sm cursor-pointer"
                  aria-label="Foto precedente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white transition-all backdrop-blur-sm cursor-pointer"
                  aria-label="Foto successiva"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox Footer Bar with Info & CTA */}
              <div className="p-5 bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <h4 className="text-base font-bold text-white">
                    {currentLightboxItem.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {currentLightboxItem.description}
                  </p>
                </div>

                {currentLightboxItem.vehicleRelated && onSelectCarToBook && (
                  <button
                    onClick={() => {
                      const carName = currentLightboxItem.vehicleRelated!;
                      setLightboxIndex(null);
                      onSelectCarToBook(carName);
                    }}
                    className="shrink-0 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Car className="w-3.5 h-3.5" />
                    Prenota questo modello
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
