import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { experiences, wineries, experienceTypes, getWineryById } from '../data/mockData';
import { Sparkles, Calendar, Users, DollarSign, Heart, MapPin, ArrowRight, Wine, Grape, Mountain, UtensilsCrossed } from 'lucide-react';

export default function RecommendationPage() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    date: '',
    budget: 300,
    guests: 2,
    interests: [] as string[],
  });
  const [recommendations, setRecommendations] = useState<typeof experiences>([]);

  const interestOptions = [
    { id: 'vino', label: 'Vino', icon: Wine, desc: 'Catas y degustaciones' },
    { id: 'gastronomia', label: 'Gastronomía', icon: UtensilsCrossed, desc: 'Sabores locales' },
    { id: 'naturaleza', label: 'Naturaleza', icon: Mountain, desc: 'Paisajes y senderos' },
    { id: 'cultura', label: 'Cultura', icon: Grape, desc: 'Tradición vitivinícola' },
  ];

  const toggleInterest = (id: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id],
    }));
  };

  const generateRecommendation = () => {
    const interestToType: Record<string, string[]> = {
      vino: ['cata'],
      gastronomia: ['gastronomia', 'cata'],
      naturaleza: ['aventura', 'vendimia'],
      cultura: ['visita', 'vendimia'],
    };

    const relevantTypes = preferences.interests.flatMap(i => interestToType[i] || []);
    const uniqueTypes = [...new Set(relevantTypes)];

    let filtered = experiences.filter(e => {
      if (e.status !== 'active') return false;
      if (e.price > preferences.budget) return false;
      if (e.maxCapacity < preferences.guests) return false;
      if (preferences.date && !e.availableDates.includes(preferences.date)) return false;
      return true;
    });

    // Sort by relevance to interests
    filtered.sort((a, b) => {
      const aScore = uniqueTypes.includes(a.type) ? 2 : 0;
      const bScore = uniqueTypes.includes(b.type) ? 2 : 0;
      return bScore - aScore;
    });

    // Pick diverse experiences (morning, midday, afternoon)
    const selected: typeof experiences = [];
    const usedWineryIds = new Set<string>();

    // First: a morning activity (visita or aventura)
    const morning = filtered.find(e =>
      (e.type === 'visita' || e.type === 'aventura') && !usedWineryIds.has(e.wineryId)
    ) || filtered.find(e => !usedWineryIds.has(e.wineryId));
    if (morning) {
      selected.push(morning);
      usedWineryIds.add(morning.wineryId);
    }

    // Second: a midday activity (cata or gastronomia)
    const midday = filtered.find(e =>
      (e.type === 'cata' || e.type === 'gastronomia') && !usedWineryIds.has(e.wineryId)
    ) || filtered.find(e => !selected.includes(e) && !usedWineryIds.has(e.wineryId));
    if (midday) {
      selected.push(midday);
      usedWineryIds.add(midday.wineryId);
    }

    // Third: an afternoon activity
    const afternoon = filtered.find(e =>
      !selected.includes(e) && !usedWineryIds.has(e.wineryId)
    );
    if (afternoon) {
      selected.push(afternoon);
    }

    setRecommendations(selected);
    setStep(3);
  };

  const totalCost = recommendations.reduce((sum, e) => sum + e.price * preferences.guests, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-grape-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-grape-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-grape-600" />
            <span className="text-sm font-medium text-grape-700">Ruta personalizada</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Diseña tu Ruta del Vino Ideal
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Cuéntanos tus preferencias y te recomendaremos las mejores experiencias para tu visita a Tarija.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map(s => (
            <React.Fragment key={s}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                s <= step ? 'bg-wine-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${s < step ? 'bg-wine-600' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Date & Guests */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm max-w-lg mx-auto animate-fade-in-up">
            <h2 className="text-xl font-bold text-gray-900 mb-6">¿Cuándo vienes?</h2>

            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-wine-500" />
                  Fecha de visita
                </label>
                <input
                  type="date"
                  value={preferences.date}
                  onChange={e => setPreferences({ ...preferences, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 text-wine-500" />
                  ¿Cuántas personas?
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPreferences({ ...preferences, guests: Math.max(1, preferences.guests - 1) })}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 font-bold"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-gray-900 w-8 text-center">{preferences.guests}</span>
                  <button
                    onClick={() => setPreferences({ ...preferences, guests: Math.min(20, preferences.guests + 1) })}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-gradient-to-r from-wine-600 to-grape-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Budget & Interests */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm max-w-lg mx-auto animate-fade-in-up">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tus preferencias</h2>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 text-wine-500" />
                  Presupuesto por persona: Bs. {preferences.budget}
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={preferences.budget}
                  onChange={e => setPreferences({ ...preferences, budget: parseInt(e.target.value) })}
                  className="w-full accent-wine-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Bs. 50</span>
                  <span>Bs. 500</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <Heart className="w-4 h-4 text-wine-500" />
                  ¿Qué te interesa? (selecciona uno o más)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {interestOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => toggleInterest(opt.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        preferences.interests.includes(opt.id)
                          ? 'border-wine-500 bg-wine-50 shadow-sm'
                          : 'border-gray-100 hover:border-wine-200 hover:bg-wine-50/50'
                      }`}
                    >
                      <opt.icon className={`w-6 h-6 mb-2 ${preferences.interests.includes(opt.id) ? 'text-wine-600' : 'text-gray-400'}`} />
                      <p className={`text-sm font-medium ${preferences.interests.includes(opt.id) ? 'text-wine-800' : 'text-gray-700'}`}>{opt.label}</p>
                      <p className="text-xs text-gray-500">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={generateRecommendation}
                  disabled={preferences.interests.length === 0}
                  className="flex-1 py-3 bg-gradient-to-r from-wine-600 to-grape-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generar Mi Ruta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Tu Ruta Personalizada!</h2>
              <p className="text-gray-600">
                Hemos seleccionado {recommendations.length} experiencias perfectas para ti
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {recommendations.map((exp, i) => {
                const w = getWineryById(exp.wineryId);
                const typeInfo = experienceTypes[exp.type];
                return (
                  <div key={exp.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-wine-200 transition-all">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-32 h-24 sm:h-auto rounded-xl overflow-hidden flex-shrink-0">
                        <img src={exp.images[0]} alt={exp.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-wine-100 text-wine-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeInfo.color}`}>
                              {typeInfo.icon} {typeInfo.label}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-wine-700 whitespace-nowrap">Bs. {exp.price * preferences.guests}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{exp.title}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" /> {w?.name}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{exp.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>⏱ {exp.duration}</span>
                            <span>👥 {preferences.guests} personas</span>
                          </div>
                          <Link
                            to={`/experiencia/${exp.id}`}
                            className="flex items-center gap-1 text-xs font-medium text-wine-600 hover:text-wine-700"
                          >
                            Ver detalles <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Summary */}
            <div className="bg-gradient-to-r from-wine-800 to-grape-800 rounded-2xl p-6 text-white text-center">
              <p className="text-wine-200 text-sm mb-1">Costo total estimado para {preferences.guests} personas</p>
              <p className="text-3xl font-bold mb-4">Bs. {totalCost}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => { setStep(1); setRecommendations([]); }}
                  className="px-6 py-2.5 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
                >
                  Ajustar preferencias
                </button>
                <Link
                  to={recommendations.length > 0 ? `/reservar/${recommendations[0].id}` : '/catalogo'}
                  className="px-6 py-2.5 bg-white text-wine-800 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Reservar primera experiencia
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
