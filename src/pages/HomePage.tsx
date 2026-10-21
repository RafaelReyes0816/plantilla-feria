import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExperienceCard from '../components/ExperienceCard';
import { experiences, wineries, experienceTypes } from '../data/mockData';
import { Search, MapPin, Calendar, Users, ArrowRight, Wine, Grape, Mountain, UtensilsCrossed, Star, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  const featuredExperiences = experiences.filter(e => e.status === 'active').slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/catalogo?q=${searchQuery}&type=${selectedType}`);
  };

  const categories = [
    { type: 'cata', icon: Wine, label: 'Catas de Vino', desc: 'Degustaciones guiadas' },
    { type: 'visita', icon: Mountain, label: 'Visitas Guiadas', desc: 'Tours por bodegas' },
    { type: 'vendimia', icon: Grape, label: 'Vendimia', desc: 'Cosecha participativa' },
    { type: 'gastronomia', icon: UtensilsCrossed, label: 'Gastronomía', desc: 'Maridajes y sabores' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-wine-900 via-wine-800 to-grape-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-wine-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-grape-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-earth-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-earth-300" />
              <span className="text-sm font-medium text-wine-100">Descubre la ruta del vino de Tarija</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Vive la experiencia del
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-earth-300 via-wine-300 to-grape-300">
                vino tarijeño
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-wine-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Descubre bodegas, viñedos y experiencias únicas en el corazón vitivinícola de Bolivia. Reserva catas, tours y hospedajes rurales en un solo lugar.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-md rounded-2xl p-3 max-w-3xl mx-auto border border-white/20">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-wine-300" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Buscar experiencias, bodegas..."
                    className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-xl text-white placeholder-wine-300 border border-white/10 focus:outline-none focus:border-wine-400 transition-colors"
                  />
                </div>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                    className="w-full sm:w-auto px-4 py-3 bg-white/10 rounded-xl text-white border border-white/10 focus:outline-none focus:border-wine-400 appearance-none cursor-pointer"
                  >
                    <option value="" className="text-gray-900">Todas las experiencias</option>
                    {Object.entries(experienceTypes).map(([key, val]) => (
                      <option key={key} value={key} className="text-gray-900">{val.icon} {val.label}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-wine-500 to-grape-600 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 whitespace-nowrap"
                >
                  Buscar
                </button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold">{wineries.length}+</div>
                <div className="text-sm text-wine-300">Bodegas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{experiences.length}+</div>
                <div className="text-sm text-wine-300">Experiencias</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-wine-300">Valoración</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Explora por Categoría</h2>
            <p className="text-gray-600">Encuentra la experiencia perfecta para ti</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.type}
                to={`/catalogo?type=${cat.type}`}
                className="group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-wine-200 hover:shadow-lg transition-all text-center hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-wine-100 to-grape-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <cat.icon className="w-7 h-7 text-wine-700" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{cat.label}</h3>
                <p className="text-xs text-gray-500">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16 bg-gradient-to-b from-white to-wine-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Experiencias Destacadas</h2>
              <p className="text-gray-600">Las mejores experiencias seleccionadas para ti</p>
            </div>
            <Link
              to="/catalogo"
              className="hidden sm:flex items-center gap-1 text-wine-700 font-medium hover:text-wine-800 transition-colors"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExperiences.map(exp => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-1 text-wine-700 font-medium"
            >
              Ver todas las experiencias <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Wineries Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Nuestras Bodegas</h2>
            <p className="text-gray-600">Conoce a los productores que hacen posible esta experiencia</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wineries.filter(w => w.approved).slice(0, 3).map(winery => (
              <Link
                key={winery.id}
                to={`/catalogo?winery=${winery.id}`}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-wine-200 hover:shadow-xl transition-all"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={winery.images[0]}
                    alt={winery.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-wine-700 transition-colors">{winery.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5" /> {winery.location}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium text-gray-700">{winery.rating}</span>
                    <span className="text-xs text-gray-400">({winery.reviewCount} reseñas)</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-wine-800 to-grape-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿No sabes por dónde empezar?</h2>
          <p className="text-wine-200 mb-8 text-lg">
            Cuéntanos tus preferencias y te recomendaremos la ruta perfecta para tu visita a Tarija.
          </p>
          <Link
            to="/recomendacion"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-wine-800 font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            Generar Mi Ruta Personalizada
          </Link>
        </div>
      </section>
    </div>
  );
}
