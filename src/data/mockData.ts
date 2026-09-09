import { Vehicle, GalleryItem, Testimonial, FAQItem, ExtraOption } from '../types';

export const COMPANY_INFO = {
  name: "AutoNolo Riviera",
  tagline: "Noleggio Auto Locale & Senza Sorprese",
  shortDesc: "Dal 2012 la tua agenzia di noleggio auto locale a gestione familiare. Massima trasparenza, nessun costo nascosto e consegna anche a domicilio o in stazione.",
  phone: "+39 0187 842100",
  mobile: "+39 348 7192830",
  whatsapp: "+39 348 7192830",
  email: "info@autonoloriviera.it",
  bookingEmail: "prenotazioni@autonoloriviera.it",
  address: "Viale delle Palme 42, 19124 La Spezia (SP) - Vicino Stazione FS & Porto",
  hours: "Lun - Sab: 08:00 - 20:00 | Dom: 08:30 - 13:00 (Ritiro/Riconsegna H24 su richiesta)",
  vat: "P.IVA 01489200115",
  rating: "4.9/5",
  reviewsCount: 384,
};

export const PICKUP_LOCATIONS = [
  "Sede Principale - Viale delle Palme 42",
  "Stazione Ferroviaria Centrale (Consegna al binario)",
  "Porto Turistico / Terminal Crociere",
  "Hotel / B&B in zona (Consegna a domicilio)",
  "Aeroporto di Pisa / Genova (Transfer dedicato)"
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'fiat-500-hybrid',
    name: 'Fiat 500 Dolcevita Hybrid',
    brand: 'Fiat',
    category: 'city',
    categoryLabel: 'City Car',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80'
    ],
    pricePerDay: 29,
    seats: 4,
    doors: 3,
    luggage: 2,
    transmission: 'Manuale',
    fuel: 'Ibrida',
    consumption: '4.7 L / 100 km',
    features: ['Apple CarPlay & Android Auto', 'Sensori Parcheggio Posteriori', 'Clima', 'Bluetooth', 'Cruise Control'],
    highlightBadge: 'Più Economica & Agile',
    isPopular: true,
    available: true,
    deposit: '250€ (anche con carta di debito)'
  },
  {
    id: 'toyota-yaris-cross',
    name: 'Toyota Yaris Cross 1.5 Hybrid',
    brand: 'Toyota',
    category: 'suv',
    categoryLabel: 'SUV Compatto',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80'
    ],
    pricePerDay: 44,
    seats: 5,
    doors: 5,
    luggage: 3,
    transmission: 'Automatico',
    fuel: 'Ibrida',
    consumption: '4.4 L / 100 km',
    features: ['Cambio Automatico E-CVT', 'Telecamera Posteriore', 'Frenata Automatica', 'Keyless Go', 'Navigatore touch 9"'],
    highlightBadge: 'Ideale Famiglie & Coppie',
    isPopular: true,
    available: true,
    deposit: '300€'
  },
  {
    id: 'fiat-500c-cabrio',
    name: 'Fiat 500C Cabriolet Dolce Vita',
    brand: 'Fiat',
    category: 'cabrio',
    categoryLabel: 'Cabriolet',
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80'
    ],
    pricePerDay: 49,
    seats: 4,
    doors: 2,
    luggage: 1,
    transmission: 'Manuale',
    fuel: 'Ibrida',
    consumption: '4.8 L / 100 km',
    features: ['Capote Elettrica in Tessuto', 'Display Touchscreen', 'Cerchi in Lega 16"', 'Sensori di Parcheggio', 'Interni Avorio'],
    highlightBadge: 'Esperienza Riviera',
    isPopular: true,
    available: true,
    deposit: '350€'
  },
  {
    id: 'jeep-renegade',
    name: 'Jeep Renegade 4xe Plug-in Hybrid',
    brand: 'Jeep',
    category: 'suv',
    categoryLabel: 'SUV 4x4',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80'
    ],
    pricePerDay: 58,
    seats: 5,
    doors: 5,
    luggage: 4,
    transmission: 'Automatico',
    fuel: 'Ibrida',
    consumption: '3.2 L / 100 km',
    features: ['Trazione Integrale 4xe', 'Cambio Automatico', 'Sensori 360° + Retrocamera', 'Assetto Rialzato', 'Barre sul Tetto'],
    highlightBadge: 'Spazio & Avventura',
    isPopular: false,
    available: true,
    deposit: '400€'
  },
  {
    id: 'volkswagen-golf',
    name: 'Volkswagen Golf 8 1.5 eTSI Life',
    brand: 'Volkswagen',
    category: 'city',
    categoryLabel: 'Berlina Compatta',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80'
    ],
    pricePerDay: 52,
    seats: 5,
    doors: 5,
    luggage: 3,
    transmission: 'Automatico',
    fuel: 'Ibrida',
    consumption: '5.1 L / 100 km',
    features: ['Cambio Automatico DSG', 'Digital Cockpit Pro', 'Adaptive Cruise Control', 'Fari Full LED', 'Assistente di Corsia'],
    highlightBadge: 'Massimo Comfort',
    isPopular: false,
    available: true,
    deposit: '350€'
  },
  {
    id: 'renault-trafic-9',
    name: 'Renault Trafic Passenger Grand Confort',
    brand: 'Renault',
    category: 'van',
    categoryLabel: 'Van 9 Posti',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1000&q=80'
    ],
    pricePerDay: 85,
    seats: 9,
    doors: 5,
    luggage: 7,
    transmission: 'Manuale',
    fuel: 'Diesel',
    consumption: '7.1 L / 100 km',
    features: ['9 Posti Veri', 'Bagagliaio Extra Capiente', 'Aria Condizionata Posteriore', 'Porta Laterale Scorrevole', 'Guida con Patente B'],
    highlightBadge: 'Gruppi & Grandi Famiglie',
    isPopular: true,
    available: true,
    deposit: '500€'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Fiat 500C lungo la Costa dei Tramonti',
    category: 'territorio',
    categoryLabel: 'Itinerari Locali',
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
    description: 'La nostra iconica 500C Cabrio mentre attraversa le strade panoramiche a picco sul mare ligure.',
    vehicleRelated: 'Fiat 500C Cabriolet',
    aspectRatio: 'wide'
  },
  {
    id: 'gal-2',
    title: 'Parco Auto Pronto per la Consegna',
    category: 'flotta',
    categoryLabel: 'La Nostra Flotta',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    description: 'Tutte le nostre vetture sono lavate a vapore, igienizzate e sottoposte a controllo liquidi prima di ogni noleggio.',
    aspectRatio: 'square'
  },
  {
    id: 'gal-3',
    title: 'Plancia e Schermo Touchscreen Digitale',
    category: 'interni',
    categoryLabel: 'Dettagli & Interni',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    description: 'Navigatore satellitare integrato, mirroring smartphone Apple CarPlay e climatizzatore automatico bi-zona.',
    aspectRatio: 'wide'
  },
  {
    id: 'gal-4',
    title: 'Consegna Rapida al Porto & Terminal',
    category: 'consegna',
    categoryLabel: 'Servizio di Consegna',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    description: 'Il nostro personale ti accoglie direttamente al molo o alla stazione FS con le chiavi pronte e zero code.',
    aspectRatio: 'square'
  },
  {
    id: 'gal-5',
    title: 'Jeep Renegade per l\'Entroterra e Borghi Storici',
    category: 'flotta',
    categoryLabel: 'La Nostra Flotta',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Assetto comodo e sicurezza 4x4 anche per le curve dei borghi arroccati e sentieri panoramici.',
    vehicleRelated: 'Jeep Renegade 4xe',
    aspectRatio: 'wide'
  },
  {
    id: 'gal-6',
    title: 'Sedili Igienizzati e Comfort a Bordo',
    category: 'interni',
    categoryLabel: 'Dettagli & Interni',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    description: 'Massima cura per gli spazi interni: sanitizzazione all\'ozono e profumazione naturale neutra.',
    aspectRatio: 'square'
  },
  {
    id: 'gal-7',
    title: 'Van 9 Posti per Gruppi e Tour Enogastronomici',
    category: 'territorio',
    categoryLabel: 'Itinerari Locali',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    description: 'Viaggiare tutti insieme con un solo veicolo: perfetto per gite tra i vigneti e cene tipiche in collina.',
    vehicleRelated: 'Renault Trafic 9 Posti',
    aspectRatio: 'wide'
  },
  {
    id: 'gal-8',
    title: 'Riconsegna Flessibile H24 con Keybox Sicura',
    category: 'consegna',
    categoryLabel: 'Servizio di Consegna',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
    description: 'Devi partire all\'alba? Puoi riconsegnare l\'auto comodamente a qualsiasi orario grazie alla nostra cassetta protetta.',
    aspectRatio: 'square'
  }
];

export const EXTRAS: ExtraOption[] = [
  {
    id: 'second-driver',
    name: 'Secondo Conducente',
    description: 'Guida alternata senza stress per tutto il viaggio',
    pricePerDay: 0, // Promozione gratuita!
    iconName: 'Users'
  },
  {
    id: 'baby-seat',
    name: 'Seggiolino Bimbo ISOFIX',
    description: 'Omologato per tutte le fasce d\'età (0-36 kg)',
    pricePerDay: 5,
    iconName: 'Shield'
  },
  {
    id: 'kasko-zero',
    name: 'Copertura Relax Senza Franchigia',
    description: 'Zero pensieri per graffi, cristalli e danni accidentali',
    pricePerDay: 12,
    iconName: 'ShieldCheck'
  },
  {
    id: 'delivery-door',
    name: 'Consegna Diretta in Hotel / B&B',
    description: 'Ti portiamo l\'auto direttamente davanti al tuo alloggio',
    pricePerDay: 0, // Entro 10 km incluso!
    iconName: 'MapPin'
  }
];

export const WHY_CHOOSE_US = [
  {
    id: '1',
    title: 'Zero Costi Nascosti',
    desc: 'Il prezzo concordato nel preventivo è quello finale. Nessuna sorpresa al momento del ritiro.',
    icon: 'BadgeCheck'
  },
  {
    id: '2',
    title: 'Niente Carta di Credito Obbligatoria',
    desc: 'Accettiamo anche carte di debito (Bancomat / PostePay Evolution) e deposito trasparente.',
    icon: 'CreditCard'
  },
  {
    id: '3',
    title: 'Consegna Dove Vuoi Tu',
    desc: 'Ritiro gratuito in stazione FS, terminal crociere o direttamente presso il tuo hotel/alloggio.',
    icon: 'MapPin'
  },
  {
    id: '4',
    title: 'Assistenza Diretta & Umana 24/7',
    desc: 'Parli direttamente con noi del team locale via telefono o WhatsApp, mai con un call center.',
    icon: 'PhoneCall'
  },
  {
    id: '5',
    title: 'Auto Recenti & Sempre Pulite',
    desc: 'Flotta rinnovata ogni anno, tagliandata rigorosamente e igienizzata a fondo prima di ogni partenza.',
    icon: 'Sparkles'
  },
  {
    id: '6',
    title: 'Cancellazione Facile e Gratuita',
    desc: 'I piani possono cambiare: cancelli o modifichi la tua richiesta senza penali fino a 24h prima.',
    icon: 'CalendarX2'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Matteo & Sara B.',
    location: 'Milano',
    role: 'Coppia in vacanza',
    text: 'Esperienza perfetta! Abbiamo noleggiato la Fiat 500C per 4 giorni per girare la costa. Auto profumata, consegna puntuale al binario della stazione e nessun intoppo. Consigliatissimi!',
    rating: 5,
    carRented: 'Fiat 500C Cabriolet',
    date: 'Agosto 2024'
  },
  {
    id: 't-2',
    author: 'Hans & Elena Müller',
    location: 'Monaco di Baviera',
    role: 'Turisti internazionali',
    text: 'Very friendly local service! Marco spoke fluent English and made the pickup process super fast. No crazy deposits like the big multinational airport companies. We will rent again next year!',
    rating: 5,
    carRented: 'Toyota Yaris Cross',
    date: 'Luglio 2024'
  },
  {
    id: 't-3',
    author: 'Gianluca R.',
    location: 'Genova',
    role: 'Trasferta di lavoro',
    text: 'Utilizzo AutoNolo Riviera ogni volta che ho clienti da accompagnare nella zona. La Golf automatica era impeccabile e il servizio di riconsegna serale con keybox è comodissimo.',
    rating: 5,
    carRented: 'Volkswagen Golf 8',
    date: 'Settembre 2024'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Posso noleggiare senza carta di credito classica?',
    answer: 'Sì! Essendo un\'azienda locale a gestione diretta, accettiamo anche carte di debito nominali (es. Visa Debit, Mastercard Debit, Postepay Evolution) con deposito cauzionale ridotto trattenuto e sbloccato immediatamente alla riconsegna.'
  },
  {
    question: 'Qual è l\'età minima per noleggiare?',
    answer: 'L\'età minima è 20 anni con patente conseguita da almeno 1 anno. Per alcune categorie (come i Van 9 posti) è richiesto avere almeno 23 anni e 2 anni di patente. Tutta la flotta è guidabile con la normale Patente B.'
  },
  {
    question: 'Cosa succede se il mio treno o aereo è in ritardo?',
    answer: 'Nessun problema: quando prenoti ti chiediamo il numero del treno o del volo. Monitoriamo in tempo reale l\'orario di arrivo e ti aspettiamo senza alcun supplemento di ritardo.'
  },
  {
    question: 'I chilometri sono illimitati?',
    answer: 'Tutte le nostre tariffe includono 200 km al giorno (più che sufficienti per esplorare l\'intero golfo e le colline circostanti). Con soli 5€ al giorno in più è possibile richiedere la tariffa con chilometri illimitati.'
  },
  {
    question: 'Come funziona la riconsegna fuori dall\'orario d\'ufficio?',
    answer: 'Disponiamo di un parcheggio videosorvegliato dedicato con cassetta blindata "Key-Box" H24. Puoi lasciare il veicolo e imbucare la chiave in qualsiasi momento della notte o all\'alba in totale sicurezza.'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Matteo & Sara B.',
    location: 'Milano',
    rating: 5,
    title: 'Vacanza perfetta nelle Cinque Terre con la 500C!',
    comment: 'Esperienza impeccabile! Abbiamo noleggiato la Fiat 500C per 4 giorni per girare la costa e i borghi marinari. Auto profumata, pulitissima e consegna puntuale al binario della stazione senza attese. Personale gentilissimo, niente sorprese con la carta di debito.',
    carRented: 'Fiat 500C Cabriolet Dolce Vita',
    date: '18 Agosto 2024',
    status: 'approved' as const,
    verified: true,
    adminReply: 'Grazie mille ragazzi! È stato un vero piacere darvi il benvenuto alla Spezia. Vi aspettiamo per il prossimo tour estivo!',
    createdAt: '2024-08-18'
  },
  {
    id: 'rev-2',
    author: 'Hans & Elena Müller',
    location: 'Monaco di Baviera',
    rating: 5,
    title: 'Top local rental, no airport scams',
    comment: 'Very friendly local service! Marco spoke fluent English and made the pickup process super fast. No crazy deposits or endless waiting lines like the big multinational airport companies. The Toyota Yaris Cross was practically brand new with great fuel economy.',
    carRented: 'Toyota Yaris Cross 1.5 Hybrid',
    date: '25 Luglio 2024',
    status: 'approved' as const,
    verified: true,
    adminReply: 'Vielen Dank Hans! We are delighted you enjoyed exploring our coastline with the hybrid crossover. Safe travels!',
    createdAt: '2024-07-25'
  },
  {
    id: 'rev-3',
    author: 'Gianluca R.',
    location: 'Genova',
    rating: 5,
    title: 'Servizio business puntuale e flessibile',
    comment: 'Utilizzo AutoNolo Riviera ogni volta che ho clienti da accompagnare nella zona o trasferte per lavoro. La Golf automatica era impeccabile e il servizio di riconsegna serale con keybox automatica è una comodità impagabile.',
    carRented: 'Volkswagen Golf 8 1.5 eTSI Life',
    date: '12 Settembre 2024',
    status: 'approved' as const,
    verified: true,
    createdAt: '2024-09-12'
  },
  {
    id: 'rev-4',
    author: 'Federico M. e amici',
    location: 'Firenze',
    rating: 5,
    title: 'Van 9 posti comodissimo per il nostro gruppo',
    comment: 'Abbiamo noleggiato il Renault Trafic per una trasferta enogastronomica di 8 persone. Bagagliaio enorme, aria condizionata efficiente anche dietro e guida facilissima con la semplice patente B. Consigliatissimo!',
    carRented: 'Renault Trafic Passenger 9 Posti',
    date: '02 Ottobre 2024',
    status: 'approved' as const,
    verified: true,
    adminReply: 'Grazie ragazzi! Il Van 9 posti è ideale proprio per questo tipo di gite in compagnia. Alla prossima!',
    createdAt: '2024-10-02'
  },
  {
    id: 'rev-5',
    author: 'Chiara V.',
    location: 'Torino',
    rating: 4,
    title: 'Ottima esperienza, consegna puntuale al porto',
    comment: 'Auto consegnata direttamente al terminal crociere senza costi extra. Piccola attesa di 5 minuti per il traffico ma Marco ci ha avvisato tempestivamente via WhatsApp. Tutto trasparente!',
    carRented: 'Fiat 500 Dolcevita Hybrid',
    date: '14 Novembre 2024',
    status: 'pending' as const, // Sample pending review for moderation testing!
    verified: true,
    createdAt: '2024-11-14'
  }
];
