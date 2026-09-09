import { useState, useEffect, FormEvent } from 'react';
import { Star, MessageSquare, CheckCircle, ShieldAlert, ShieldCheck, ThumbsUp, X, Filter, Send, Reply, Trash2, Check, AlertCircle, PlusCircle, Settings2, Sparkles } from 'lucide-react';
import { CustomerReview, ReviewStatus } from '../types';
import { INITIAL_REVIEWS, VEHICLES } from '../data/mockData';

const STORAGE_KEY = 'autonolo_customer_reviews';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  // UI State
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isModerationOpen, setIsModerationOpen] = useState(false);
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');
  const [moderationTab, setModerationTab] = useState<ReviewStatus | 'all'>('pending');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    author: '',
    location: '',
    rating: 5,
    title: '',
    comment: '',
    carRented: VEHICLES[0].name,
  });
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submitSuccessNotice, setSubmitSuccessNotice] = useState(false);

  // Filtered Approved Reviews for public display
  const approvedReviews = reviews.filter((r) => r.status === 'approved');
  const pendingReviews = reviews.filter((r) => r.status === 'pending');
  const rejectedReviews = reviews.filter((r) => r.status === 'rejected');

  const displayedApprovedReviews = starFilter === 'all'
    ? approvedReviews
    : approvedReviews.filter((r) => r.rating === starFilter);

  // Statistics
  const totalApproved = approvedReviews.length;
  const averageRating = totalApproved > 0
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / totalApproved).toFixed(1)
    : '5.0';

  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    count: approvedReviews.filter((r) => r.rating === s).length,
    percent: totalApproved > 0
      ? (approvedReviews.filter((r) => r.rating === s).length / totalApproved) * 100
      : 0,
  }));

  // Handle Review Submission by Customer
  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: formData.author.trim(),
      location: formData.location.trim() || 'Cliente verificato',
      rating: formData.rating,
      title: formData.title.trim(),
      comment: formData.comment.trim(),
      carRented: formData.carRented,
      date: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }),
      status: 'pending', // Starts in pending for moderation
      verified: true,
      createdAt: new Date().toISOString(),
    };

    setReviews([newRev, ...reviews]);
    setSubmitSuccessNotice(true);
    setFormData({
      author: '',
      location: '',
      rating: 5,
      title: '',
      comment: '',
      carRented: VEHICLES[0].name,
    });
  };

  // Moderation Actions
  const handleUpdateStatus = (id: string, newStatus: ReviewStatus) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questa recensione?')) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  const handleSaveReply = (id: string) => {
    if (!replyText.trim()) return;
    setReviews(
      reviews.map((r) =>
        r.id === id ? { ...r, adminReply: replyText.trim() } : r
      )
    );
    setReplyingToId(null);
    setReplyText('');
  };

  const handleResetToDefault = () => {
    if (window.confirm('Ripristinare le recensioni predefinite di esempio?')) {
      setReviews(INITIAL_REVIEWS);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <section id="recensioni" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wide uppercase mb-3 border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Opinioni Autentiche & Certificate
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Recensioni dei Nostri Clienti
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Leggi le esperienze dirette di chi ha noleggiato con noi o lascia la tua valutazione.
              Tutti i feedback vengono moderati per garantire trasparenza e qualità.
            </p>
          </div>

          {/* Action CTAs: Leave Review & Moderation Panel Toggle */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                setSubmitSuccessNotice(false);
                setIsWriteModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Lascia una Recensione</span>
            </button>

            <button
              onClick={() => setIsModerationOpen(!isModerationOpen)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isModerationOpen
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Settings2 className="w-4 h-4" />
              <span>Pannello Moderazione</span>
              {pendingReviews.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white animate-pulse">
                  {pendingReviews.length} in attesa
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MODERATION PANEL (Visible when toggled) */}
        {isModerationOpen && (
          <div className="mb-12 p-6 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-800 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Pannello Moderatore Recensioni
                    <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                      Area Gestione Locale
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Approva o rifiuta i commenti inviati prima che appaiano pubblicamente sul sito.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetToDefault}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                  title="Ripristina recensioni di esempio"
                >
                  Ripristina Dati Iniziali
                </button>
                <button
                  onClick={() => setIsModerationOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Moderation Tabs */}
            <div className="flex gap-2 my-4 border-b border-slate-800 pb-3 text-xs overflow-x-auto">
              <button
                onClick={() => setModerationTab('pending')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  moderationTab === 'pending'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>In Attesa di Approvazione</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30 font-bold">
                  {pendingReviews.length}
                </span>
              </button>

              <button
                onClick={() => setModerationTab('approved')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  moderationTab === 'approved'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>Approvate (Online)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30 font-bold">
                  {approvedReviews.length}
                </span>
              </button>

              <button
                onClick={() => setModerationTab('rejected')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  moderationTab === 'rejected'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>Rifiutate</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30 font-bold">
                  {rejectedReviews.length}
                </span>
              </button>

              <button
                onClick={() => setModerationTab('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  moderationTab === 'all'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Tutte ({reviews.length})
              </button>
            </div>

            {/* Moderation List */}
            <div className="space-y-3">
              {(moderationTab === 'all'
                ? reviews
                : reviews.filter((r) => r.status === moderationTab)
              ).length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Nessuna recensione presente in questa categoria.
                </div>
              ) : (
                (moderationTab === 'all'
                  ? reviews
                  : reviews.filter((r) => r.status === moderationTab)
                ).map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-bold text-white text-sm">
                          {rev.author}
                        </span>
                        <span className="text-slate-400">({rev.location})</span>
                        <span className="text-slate-400">• {rev.date}</span>
                        <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                          {rev.carRented}
                        </span>
                      </div>

                      {/* Status Badges */}
                      <div>
                        {rev.status === 'pending' && (
                          <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[11px] flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> In attesa di moderazione
                          </span>
                        )}
                        {rev.status === 'approved' && (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[11px] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Approvata & Pubblicata
                          </span>
                        )}
                        {rev.status === 'rejected' && (
                          <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-[11px] flex items-center gap-1">
                            <X className="w-3.5 h-3.5" /> Rifiutata
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rating & Content */}
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400' : 'text-slate-600'
                            }`}
                          />
                        ))}
                        <span className="text-white font-bold ml-1.5">{rev.title}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        "{rev.comment}"
                      </p>
                    </div>

                    {/* Admin Reply Display */}
                    {rev.adminReply && (
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sky-300 text-xs">
                        <strong className="block text-white font-semibold">
                          Risposta ufficiale pubblicata:
                        </strong>
                        {rev.adminReply}
                      </div>
                    )}

                    {/* Replying Field if Active */}
                    {replyingToId === rev.id && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-sky-500 space-y-2">
                        <label className="block text-xs font-bold text-white">
                          Rispondi come AutoNolo Riviera:
                        </label>
                        <textarea
                          rows={2}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Es. Grazie mille per il feedback! È stato un piacere..."
                          className="w-full p-2 rounded bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReplyingToId(null)}
                            className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                          >
                            Annulla
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveReply(rev.id)}
                            className="px-3 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                          >
                            Salva Risposta
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action Controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        {rev.status !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(rev.id, 'approved')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Approva e Pubblica
                          </button>
                        )}

                        {rev.status !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(rev.id, 'rejected')}
                            className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-rose-300 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            Rifiuta
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setReplyingToId(rev.id);
                            setReplyText(rev.adminReply || '');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-sky-300 font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Reply className="w-3.5 h-3.5" />
                          {rev.adminReply ? 'Modifica Risposta' : 'Aggiungi Risposta'}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteReview(rev.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                        title="Elimina definitivamente"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Rating Breakdown & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Average Rating Big Stat */}
            <div className="lg:col-span-4 text-center lg:text-left lg:border-r border-slate-200 lg:pr-8">
              <div className="flex items-baseline justify-center lg:justify-start gap-3">
                <span className="text-5xl font-black text-slate-900 tracking-tight">
                  {averageRating}
                </span>
                <div>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    su 5 stelle ({totalApproved} recensioni approvate)
                  </span>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Il 100% dei clienti intervistati raccomanda il noleggio con AutoNolo Riviera per puntualità e chiarezza contrattuale.
              </p>
            </div>

            {/* Distribution Bars */}
            <div className="lg:col-span-5 space-y-1.5">
              {starCounts.map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="w-12 font-medium flex items-center gap-1">
                    {item.stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-slate-400 font-medium">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Star Filters */}
            <div className="lg:col-span-3 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-sky-600" />
                Filtra per punteggio:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setStarFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    starFilter === 'all'
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Tutte ({totalApproved})
                </button>
                {[5, 4, 3].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setStarFilter(stars)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      starFilter === stars
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{stars}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Approved Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedApprovedReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header: Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {rev.date}
                  </span>
                </div>

                {/* Review Title & Body */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5">
                    {rev.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Official Response if present */}
                {rev.adminReply && (
                  <div className="mt-3 p-3 rounded-xl bg-sky-50/80 border border-sky-100 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-sky-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                      Risposta di AutoNolo Riviera:
                    </span>
                    <p className="text-slate-600 italic">
                      "{rev.adminReply}"
                    </p>
                  </div>
                )}
              </div>

              {/* Author Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-bold text-slate-900 text-xs">
                      {rev.author}
                    </h5>
                    {rev.verified && (
                      <span title="Cliente Verificato" className="text-emerald-600">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {rev.location}
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md text-right max-w-[140px] truncate">
                  {rev.carRented}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL: "Leave a Review" */}
        {isWriteModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setIsWriteModalOpen(false)}
          >
            <div
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <h3 className="font-bold text-base">
                    Condividi la Tua Esperienza
                  </h3>
                </div>
                <button
                  onClick={() => setIsWriteModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!submitSuccessNotice ? (
                <form onSubmit={handleSubmitReview} className="p-6 space-y-4 text-xs sm:text-sm text-slate-800">
                  {/* Star Rating Picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      La tua valutazione complessiva: *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating ?? formData.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 font-bold text-slate-900 text-sm">
                        {formData.rating} su 5 stelle
                      </span>
                    </div>
                  </div>

                  {/* Name and Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Il tuo Nome *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Es. Marco T."
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Città o Provenienza
                      </label>
                      <input
                        type="text"
                        placeholder="Es. Roma, Milano..."
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
                      />
                    </div>
                  </div>

                  {/* Car Rented Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Vettura Noleggiata:
                    </label>
                    <select
                      value={formData.carRented}
                      onChange={(e) => setFormData({ ...formData, carRented: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs font-medium"
                    >
                      {VEHICLES.map((v) => (
                        <option key={v.id} value={v.name}>
                          {v.name} ({v.categoryLabel})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Titolo della Recensione *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Es. Servizio impeccabile e auto pulitissima!"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
                    />
                  </div>

                  {/* Comment Body */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      La tua Opinione Dettagliata *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Racconta la tua esperienza con la consegna, le condizioni dell'auto, l'assistenza..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs resize-none"
                    />
                  </div>

                  {/* Policy notice */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>
                      Per prevenire spam e recensioni fasulle, la tua recensione verrà inviata al nostro sistema di moderazione prima della pubblicazione definitiva.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Invia Recensione per Moderazione
                  </button>
                </form>
              ) : (
                /* Success Notification */
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <h4 className="text-xl font-extrabold text-slate-900">
                    Recensione Inviata con Successo!
                  </h4>

                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Grazie per aver dedicato del tempo a condividere la tua esperienza! 
                    La tua recensione è ora nel nostro <strong>sistema di moderazione</strong> e sarà resa visibile dopo la verifica.
                  </p>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 text-left max-w-sm mx-auto">
                    💡 <em>Nota per il test:</em> Puoi visualizzare e approvare subito questa recensione aprendo il pulsante <strong>"Pannello Moderazione"</strong> nella sezione recensioni.
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsWriteModalOpen(false);
                        setIsModerationOpen(true);
                        setModerationTab('pending');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
                    >
                      Apri Moderazione Ora
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsWriteModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                    >
                      Chiudi
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
