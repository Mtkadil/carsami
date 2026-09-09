import { Star, Quote, CheckCircle, MessageSquare } from 'lucide-react';
import { TESTIMONIALS, COMPANY_INFO } from '../data/mockData';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wide uppercase mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            La Voce dei Nostri Clienti
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cosa Dicono di AutoNolo Riviera
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Valutazione media di <strong className="text-slate-900">{COMPANY_INFO.rating}</strong> su oltre{' '}
            {COMPANY_INFO.reviewsCount} recensioni su Google e portali turistici.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{review.date}</span>
                </div>

                {/* Review text */}
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{review.text}"
                </p>
              </div>

              {/* Author & Car info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {review.author}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {review.location} • {review.role}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md block">
                    {review.carRented}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="mt-12 text-center text-xs text-slate-500 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Nessun commento sponsorizzato
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Recensioni verificate da clienti autentici
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <MessageSquare className="w-4 h-4 text-sky-500" />
            Assistenza post-noleggio garantita
          </span>
        </div>
      </div>
    </section>
  );
}
