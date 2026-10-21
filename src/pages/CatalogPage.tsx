import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ExperienceCard from '../components/ExperienceCard';
import { experiences, wineries, experienceTypes } from '../data/mockData';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialType = searchParams.get('type') || '';
  const initialWinery = searchParams.get('winery') || '';

  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState(initialType);
  const [wineryFilter, setWineryFilter] = useState(initialWinery);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredExperiences = useMemo(() => {
    return experiences.filter(exp => {
      if (exp.status !== 'active') return false;
      const winery = wineries.find(w => w.id === exp.wineryId);
      if (!winery) return false;

      const matchesQuery = !query ||
        exp.title.toLowerCase().includes(query.toLowerCase()) ||
        exp.description.toLowerCase().includes(query.toLowerCase()) ||
        winery.name.toLowerCase().includes(query.toLowerCase());

      const matchesType = !typeFilter || exp.type === typeFilter;
      const matchesWinery = !wineryFilter || exp.wineryId === wineryFilter;
      const matchesPrice = exp.price >= priceRange[0] && exp.price <= priceRange[1];

      return matchesQuery && matchesType && matchesWinery && matchesPrice;
    });
  }, [query, typeFilter, wineryFilter, priceRange]);

  const clearFilters = () => {
    setQuery('');
    setTypeFilter('');
    setWineryFilter('');
    setPriceRange([0, 500]);
  };

  const hasActiveFilters = query || typeFilter || wineryFilter || priceRange[0] > 0 || priceRange[1] < 500;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Experiencias</h1>
          <p className="text-gray-600">Descubre todas las experiencias disponibles en la ruta del vino de Tarija</p>

          {/* Search & Filter Bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar experiencias, bodegas..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors ${
                showFilters ? 'bg-wine-50 border-wine-200 text-wine-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-wine-500 rounded-full" />
              )}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fade-in-up">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Tipo de experiencia</label>
                  <select
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500"
                  >
                    <option value="">Todas</option>
                    {Object.entries(experienceTypes).map(([key, val]) => (
                      <option key={key} value={key}>{val.icon} {val.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Bodega</label>
                  <select
                    value={wineryFilter}
                    onChange={e => setWineryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500"
                  >
                    <option value="">Todas las bodegas</option>
                    {wineries.filter(w => w.approved).map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Precio máximo: Bs. {priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-wine-600"
                  />
                </div>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-3 flex items-center gap-1 text-sm text-wine-600 hover:text-wine-700"
                >
                  <X className="w-3.5 h-3.5" /> Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{filteredExperiences.length}</span> experiencias encontradas
          </p>
        </div>

        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map(exp => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍷</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron experiencias</h3>
            <p className="text-gray-600 mb-4">Intenta ajustar los filtros o buscar con otros términos</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-wine-100 text-wine-700 rounded-lg font-medium hover:bg-wine-200 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
