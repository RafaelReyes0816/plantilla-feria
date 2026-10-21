export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'turista' | 'bodega' | 'admin';
  avatar?: string;
  phone?: string;
}

export interface Winery {
  id: string;
  name: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  images: string[];
  approved: boolean;
  ownerId: string;
  rating: number;
  reviewCount: number;
}

export interface Experience {
  id: string;
  wineryId: string;
  title: string;
  description: string;
  type: 'cata' | 'visita' | 'vendimia' | 'hospedaje' | 'gastronomia' | 'aventura';
  price: number;
  duration: string;
  maxCapacity: number;
  availableDates: string[];
  availableTimes: string[];
  images: string[];
  status: 'active' | 'inactive' | 'pending';
  highlights: string[];
  included: string[];
}

export interface Booking {
  id: string;
  userId: string;
  experienceId: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  total: number;
}

export interface Review {
  id: string;
  userId: string;
  experienceId: string;
  rating: number;
  comment: string;
  date: string;
  userName: string;
}

export const users: User[] = [
  { id: 'u1', name: 'María López', email: 'maria@email.com', password: '123456', role: 'turista', phone: '+591 71234567' },
  { id: 'u2', name: 'Bodega Campos Reales', email: 'campos@email.com', password: '123456', role: 'bodega', phone: '+591 46400001' },
  { id: 'u3', name: 'Viñedos San José', email: 'sanjose@email.com', password: '123456', role: 'bodega', phone: '+591 46400002' },
  { id: 'u4', name: 'Admin RutaVino', email: 'admin@rutavino.com', password: 'admin123', role: 'admin' },
  { id: 'u5', name: 'Carlos Mendoza', email: 'carlos@email.com', password: '123456', role: 'turista', phone: '+591 71987654' },
];

export const wineries: Winery[] = [
  {
    id: 'w1',
    name: 'Bodega Campos Reales',
    description: 'Fundada en 1995, Campos Reales es una de las bodegas más prestigiosas del Valle de la Concepción en Tarija. Ofrecemos vinos de altura elaborados con técnicas tradicionales y modernas. Nuestros viñedos se encuentran a más de 1,800 metros sobre el nivel del mar.',
    location: 'Valle de la Concepción, Tarija',
    lat: -21.5333,
    lng: -64.7333,
    phone: '+591 46400001',
    email: 'info@camposreales.com',
    images: [
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800',
      'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800',
    ],
    approved: true,
    ownerId: 'u2',
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: 'w2',
    name: 'Viñedos San José',
    description: 'Viñedos San José es un emprendimiento familiar que combina la tradición vitivinícola con la innovación. Nuestros vinos singani y vinos de mesa son reconocidos a nivel nacional. Ofrecemos experiencias únicas entre viñedos centenarios.',
    location: 'Samaipata, Valle de la Concepción',
    lat: -21.5167,
    lng: -64.7167,
    phone: '+591 46400002',
    email: 'visitas@sanjose.com',
    images: [
      'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
      'https://images.unsplash.com/photo-1523599288721-b752f84f39f3?w=800',
    ],
    approved: true,
    ownerId: 'u3',
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: 'w3',
    name: 'Hacienda La Concepción',
    description: 'Una hacienda centenaria rodeada de viñedos en el corazón del valle. Ofrecemos hospedaje rural, gastronomía local y experiencias inmersivas en el mundo del vino. Ideal para familias y grupos que buscan una escapada completa.',
    location: 'La Concepción, Tarija',
    lat: -21.5500,
    lng: -64.7500,
    phone: '+591 46400003',
    email: 'reservas@haciendalaconcepcion.com',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1566305970255-b23438850b50?w=800',
      'https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=800',
    ],
    approved: true,
    ownerId: 'u2',
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: 'w4',
    name: 'Viñedos del Sur',
    description: 'Ubicados en las alturas de Tarija, nuestros viñedos producen uvas excepcionales gracias al clima único de la región. Especialistas en vinos orgánicos y biodinámicos, ofrecemos experiencias educativas y degustaciones premium.',
    location: 'Tomatas, Tarija',
    lat: -21.5200,
    lng: -64.7600,
    phone: '+591 46400004',
    email: 'info@vinedosdelsur.com',
    images: [
      'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?w=800',
      'https://images.unsplash.com/photo-1464638681168-ab9602782de4?w=800',
      'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=800',
    ],
    approved: true,
    ownerId: 'u3',
    rating: 4.7,
    reviewCount: 67,
  },
  {
    id: 'w5',
    name: 'Bodega Casa Real',
    description: 'Productores del reconocido singani Casa Real, una de las marcas más emblemáticas de Bolivia. Nuestra bodega ofrece tours guiados por el proceso de destilación y catas exclusivas de singani y vinos de reserva.',
    location: 'Tarija Centro',
    lat: -21.5283,
    lng: -64.7283,
    phone: '+591 46400005',
    email: 'tours@casareal.com',
    images: [
      'https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=800',
      'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800',
      'https://images.unsplash.com/photo-1516594915307-8af78a237713?w=800',
    ],
    approved: true,
    ownerId: 'u2',
    rating: 4.5,
    reviewCount: 203,
  },
];

export const experiences: Experience[] = [
  {
    id: 'e1',
    wineryId: 'w1',
    title: 'Cata Premium de Vinos de Altura',
    description: 'Disfruta de una cata guiada por nuestro enólogo con 5 vinos de altura seleccionados. Aprenderás sobre el terroir único de Tarija, las técnicas de vinificación y los maridajes perfectos. Incluye tabla de quesos y embutidos locales.',
    type: 'cata',
    price: 150,
    duration: '2 horas',
    maxCapacity: 15,
    availableDates: ['2026-11-01', '2026-11-02', '2026-11-03', '2026-11-08', '2026-11-09', '2026-11-10', '2026-11-15', '2026-11-16'],
    availableTimes: ['10:00', '12:00', '15:00', '17:00'],
    images: ['https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800'],
    status: 'active',
    highlights: ['5 vinos premium', 'Enólogo experto', 'Tabla de quesos', 'Vista a viñedos'],
    included: ['Guía especializada', '5 vinos de degustación', 'Tabla de quesos artesanales', 'Copa de recuerdo'],
  },
  {
    id: 'e2',
    wineryId: 'w1',
    title: 'Tour por Bodega y Viñedos',
    description: 'Recorre nuestras instalaciones y viñedos con un guía experto. Conoce el proceso completo desde la uva hasta la botella. Incluye visita a la bodega subterránea, sala de barricas y degustación de 3 vinos.',
    type: 'visita',
    price: 80,
    duration: '1.5 horas',
    maxCapacity: 20,
    availableDates: ['2026-11-01', '2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '2026-11-08', '2026-11-09', '2026-11-10'],
    availableTimes: ['09:00', '11:00', '14:00', '16:00'],
    images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800'],
    status: 'active',
    highlights: ['Bodega subterránea', 'Sala de barricas', 'Viñedos centenarios', 'Degustación incluida'],
    included: ['Guía bilingüe', 'Degustación de 3 vinos', 'Souvenir'],
  },
  {
    id: 'e3',
    wineryId: 'w2',
    title: 'Experiencia de Vendimia',
    description: 'Vive la experiencia única de participar en la vendimia. Cosecha uvas, aprende el proceso de pisado tradicional y elabora tu propio mosto. Incluye almuerzo campestre entre viñedos con productos locales.',
    type: 'vendimia',
    price: 200,
    duration: '4 horas',
    maxCapacity: 12,
    availableDates: ['2026-11-05', '2026-11-06', '2026-11-12', '2026-11-13', '2026-11-19', '2026-11-20'],
    availableTimes: ['07:00', '08:00'],
    images: ['https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800', 'https://images.unsplash.com/photo-1523599288721-b752f84f39f3?w=800'],
    status: 'active',
    highlights: ['Cosecha de uvas', 'Pisado tradicional', 'Almuerzo campestre', 'Certificado de participación'],
    included: ['Todos los materiales', 'Almuerzo campestre', 'Botella de vino de tu cosecha', 'Certificado'],
  },
  {
    id: 'e4',
    wineryId: 'w3',
    title: 'Hospedaje Rural - Finca Completa',
    description: 'Alojamiento en habitación privada dentro de la hacienda centenaria. Desayuno incluido con productos de la finca. Acceso a piscina, jardines y senderos. Posibilidad de participar en actividades de la finca.',
    type: 'hospedaje',
    price: 350,
    duration: '1 noche',
    maxCapacity: 4,
    availableDates: ['2026-11-01', '2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '2026-11-06', '2026-11-07', '2026-11-08'],
    availableTimes: ['14:00'],
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'https://images.unsplash.com/photo-1566305970255-b23438850b50?w=800'],
    status: 'active',
    highlights: ['Habitación privada', 'Desayuno incluido', 'Piscina y jardines', 'Senderos naturales'],
    included: ['Alojamiento 1 noche', 'Desayuno campestre', 'Acceso a todas las instalaciones', 'Tour por la finca'],
  },
  {
    id: 'e5',
    wineryId: 'w3',
    title: 'Almuerzo Gastronómico con Maridaje',
    description: 'Disfruta de un menú de 4 tiempos elaborado con productos locales y maridado con vinos de la casa. La experiencia incluye una breve charla sobre la gastronomía tarijeña y su relación con el vino.',
    type: 'gastronomia',
    price: 250,
    duration: '2.5 horas',
    maxCapacity: 20,
    availableDates: ['2026-11-01', '2026-11-02', '2026-11-03', '2026-11-08', '2026-11-09', '2026-11-10'],
    availableTimes: ['12:00', '13:00', '19:00'],
    images: ['https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=800', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
    status: 'active',
    highlights: ['Menú de 4 tiempos', 'Maridaje con vinos', 'Productos locales', 'Chef especializado'],
    included: ['Menú completo', '4 vinos de maridaje', 'Charla gastronómica', 'Postre sorpresa'],
  },
  {
    id: 'e6',
    wineryId: 'w4',
    title: 'Cata de Vinos Orgánicos',
    description: 'Descubre los sabores únicos de nuestros vinos orgánicos y biodinámicos. Una experiencia sensorial guiada que te conectará con la tierra y el esfuerzo detrás de cada botella.',
    type: 'cata',
    price: 120,
    duration: '1.5 horas',
    maxCapacity: 10,
    availableDates: ['2026-11-01', '2026-11-03', '2026-11-05', '2026-11-07', '2026-11-09', '2026-11-11'],
    availableTimes: ['11:00', '15:00', '17:00'],
    images: ['https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?w=800', 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=800'],
    status: 'active',
    highlights: ['Vinos orgánicos', 'Viñedos biodinámicos', 'Aprende de viticultura sustentable', 'Snacks locales'],
    included: ['4 vinos orgánicos', 'Guía especializado', 'Snacks artesanales', 'Descuento en tienda'],
  },
  {
    id: 'e7',
    wineryId: 'w5',
    title: 'Tour del Singani - Destilación Artesanal',
    description: 'Conoce el fascinante mundo del singani boliviano. Recorre el proceso de destilación artesanal, aprende sobre la historia de esta bebida nacional y disfruta de una cata exclusiva con maridaje.',
    type: 'visita',
    price: 100,
    duration: '2 horas',
    maxCapacity: 15,
    availableDates: ['2026-11-01', '2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '2026-11-06', '2026-11-07'],
    availableTimes: ['10:00', '12:00', '14:00', '16:00'],
    images: ['https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=800', 'https://images.unsplash.com/photo-1516594915307-8af78a237713?w=800'],
    status: 'active',
    highlights: ['Proceso de destilación', 'Historia del singani', 'Cata exclusiva', 'Cóctel de bienvenida'],
    included: ['Tour completo', 'Cata de 4 singanis', 'Receta de cóctel', 'Vaso de recuerdo'],
  },
  {
    id: 'e8',
    wineryId: 'w4',
    title: 'Senderismo entre Viñedos al Atardecer',
    description: 'Camina entre los viñedos mientras el sol se pone sobre los valles de Tarija. Una experiencia única que combina naturaleza, vino y los colores mágicos del atardecer. Incluye picnic y degustación.',
    type: 'aventura',
    price: 180,
    duration: '3 horas',
    maxCapacity: 8,
    availableDates: ['2026-11-02', '2026-11-04', '2026-11-06', '2026-11-08', '2026-11-10', '2026-11-12'],
    availableTimes: ['16:00'],
    images: ['https://images.unsplash.com/photo-1464638681168-ab9602782de4?w=800', 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=800'],
    status: 'active',
    highlights: ['Atardecer en viñedos', 'Senderismo guiado', 'Picnic gourmet', 'Fotografía de paisaje'],
    included: ['Guía de senderismo', 'Picnic gourmet', 'Degustación de 3 vinos', 'Fotos profesionales'],
  },
  {
    id: 'e9',
    wineryId: 'w2',
    title: 'Taller de Elaboración de Vino',
    description: 'Aprende los fundamentos de la elaboración del vino en un taller práctico. Desde la selección de uvas hasta el embotellado. Te llevarás tu propia botella de vino elaborada por ti.',
    type: 'visita',
    price: 280,
    duration: '5 horas',
    maxCapacity: 8,
    availableDates: ['2026-11-07', '2026-11-14', '2026-11-21'],
    availableTimes: ['09:00'],
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800', 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800'],
    status: 'active',
    highlights: ['Taller práctico', 'Elabora tu propio vino', 'Instructor profesional', 'Botella personalizada'],
    included: ['Todos los materiales', 'Almuerzo', 'Botella de tu vino', 'Diploma de participación'],
  },
];

export const bookings: Booking[] = [
  { id: 'b1', userId: 'u1', experienceId: 'e1', date: '2026-11-01', time: '15:00', guests: 2, status: 'confirmed', createdAt: '2026-10-20', total: 300 },
  { id: 'b2', userId: 'u1', experienceId: 'e5', date: '2026-11-02', time: '12:00', guests: 4, status: 'pending', createdAt: '2026-10-21', total: 1000 },
  { id: 'b3', userId: 'u5', experienceId: 'e3', date: '2026-11-05', time: '07:00', guests: 2, status: 'confirmed', createdAt: '2026-10-18', total: 400 },
];

export const reviews: Review[] = [
  { id: 'r1', userId: 'u1', experienceId: 'e1', rating: 5, comment: '¡Increíble experiencia! Los vinos son espectaculares y el enólogo es muy knowledgeable. La tabla de quesos es perfecta.', date: '2026-10-15', userName: 'María López' },
  { id: 'r2', userId: 'u5', experienceId: 'e1', rating: 4, comment: 'Muy buena cata, los vinos de altura son únicos. El lugar es hermoso.', date: '2026-10-12', userName: 'Carlos Mendoza' },
  { id: 'r3', userId: 'u1', experienceId: 'e3', rating: 5, comment: 'La vendimia fue una experiencia inolvidable. El almuerzo campestre entre viñedos fue mágico.', date: '2026-10-10', userName: 'María López' },
  { id: 'r4', userId: 'u5', experienceId: 'e7', rating: 5, comment: 'El tour del singani es imperdible. Aprendí muchísimo sobre la destilación artesanal.', date: '2026-10-08', userName: 'Carlos Mendoza' },
  { id: 'r5', userId: 'u1', experienceId: 'e5', rating: 4, comment: 'El menú fue delicioso y los maridajes perfectos. Muy recomendable.', date: '2026-10-05', userName: 'María López' },
  { id: 'r6', userId: 'u5', experienceId: 'e8', rating: 5, comment: 'El atardecer entre viñedos es algo que hay que vivir. La experiencia completa fue perfecta.', date: '2026-10-03', userName: 'Carlos Mendoza' },
];

export const experienceTypes: Record<string, { label: string; icon: string; color: string }> = {
  cata: { label: 'Cata de Vinos', icon: '🍷', color: 'bg-wine-100 text-wine-800' },
  visita: { label: 'Visita Guiada', icon: '🏛️', color: 'bg-grape-100 text-grape-800' },
  vendimia: { label: 'Vendimia', icon: '🍇', color: 'bg-vine-100 text-vine-800' },
  hospedaje: { label: 'Hospedaje Rural', icon: '🏡', color: 'bg-earth-100 text-earth-800' },
  gastronomia: { label: 'Gastronomía', icon: '🍽️', color: 'bg-wine-100 text-wine-800' },
  aventura: { label: 'Aventura', icon: '🥾', color: 'bg-vine-100 text-vine-800' },
};

export function getWineryById(id: string): Winery | undefined {
  return wineries.find(w => w.id === id);
}

export function getExperienceById(id: string): Experience | undefined {
  return experiences.find(e => e.id === id);
}

export function getExperiencesByWinery(wineryId: string): Experience[] {
  return experiences.filter(e => e.wineryId === wineryId);
}

export function getReviewsByExperience(experienceId: string): Review[] {
  return reviews.filter(r => r.experienceId === experienceId);
}

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}
