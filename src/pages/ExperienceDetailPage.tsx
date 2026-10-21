import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getExperienceById, getWineryById, getReviewsByExperience, experienceTypes } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Star, Clock, Users, MapPin, Phone, Mail, Check, Calendar, ArrowLeft, Heart, Share2 } from 'lucide-react';

export default function ExperienceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, addReview, reviews } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const experience = getExperienceById(id || '');
  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍷</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Experiencia no encontrada</h2>
          <Link to="/catalogo" className="text-wine-600 hover:text-wine-700 font-medium">Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  const winery = getWineryById(experience.wineryId);
  const typeInfo = experienceTypes[experience.type];
  const expReviews = reviews.filter(r => r.experienceId === experience.id);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    addReview({
      userId: currentUser.id,
      experienceId: experience.id,
      rating: reviewRating,
      comment: reviewComment,
      userName: currentUser.name,
    });
    setShowReviewForm(false);
    setReviewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-wine-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="relative h-64 sm:h-80 lg:h-96">
                <img
                  src={experience.images[selectedImage]}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${typeInfo.color}`}>
                    {typeInfo.icon} {typeInfo.label}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              {experience.images.length > 1 && (
                <div className="flex gap-2 p-3">
                  {experience.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        i === selectedImage ? 'border-wine-500 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{experience.title}</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <Link to={`/catalogo?winery=${winery?.id}`} className="hover:text-wine-700">{winery?.name}</Link>
                    <span>•</span>
                    <span>{winery?.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-wine-500" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-wine-500" />
                  <span>Máx. {experience.maxCapacity} personas</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-medium">{winery?.rating}</span>
                  <span className="text-gray-400">({winery?.reviewCount} reseñas)</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{experience.description}</p>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Lo más destacado</h3>
                <div className="grid grid-cols-2 gap-2">
                  {experience.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-vine-500 flex-shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Included */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Incluye</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {experience.included.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-wine-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Dates */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-wine-500" />
                Fechas disponibles
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.availableDates.map(date => (
                  <span key={date} className="px-3 py-1.5 bg-vine-50 text-vine-700 rounded-lg text-sm font-medium border border-vine-100">
                    {new Date(date + 'T12:00:00').toLocaleDateString('es-BO', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Horarios disponibles</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.availableTimes.map(time => (
                    <span key={time} className="px-3 py-1.5 bg-grape-50 text-grape-700 rounded-lg text-sm font-medium border border-grape-100">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Reseñas ({expReviews.length})</h3>
                {currentUser && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="text-sm text-wine-600 font-medium hover:text-wine-700"
                  >
                    {showReviewForm ? 'Cancelar' : 'Escribir reseña'}
                  </button>
                )}
              </div>

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="mb-3">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Calificación</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-0.5"
                        >
                          <Star className={`w-6 h-6 ${star <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      value={reviewComment}
                      onChange={e => setReviewComment(e.target.value)}
                      placeholder="Cuéntanos tu experiencia..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500 resize-none"
                      rows={3}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-wine-600 text-white rounded-lg text-sm font-medium hover:bg-wine-700 transition-colors"
                  >
                    Publicar reseña
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {expReviews.length > 0 ? expReviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 text-sm">{review.userName}</span>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                )) : (
                  <p className="text-sm text-gray-500 text-center py-4">Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia!</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900">Bs. {experience.price}</span>
                <span className="text-gray-500 text-sm"> / persona</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duración</span>
                  <span className="font-medium text-gray-900">{experience.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Capacidad máx.</span>
                  <span className="font-medium text-gray-900">{experience.maxCapacity} personas</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tipo</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeInfo.color}`}>
                    {typeInfo.label}
                  </span>
                </div>
              </div>

              <Link
                to={`/reservar/${experience.id}`}
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-wine-600 to-grape-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                Reservar Ahora
              </Link>

              {!currentUser && (
                <p className="text-xs text-gray-500 text-center mt-3">
                  <Link to="/auth" className="text-wine-600 hover:underline">Inicia sesión</Link> para reservar
                </p>
              )}

              {/* Winery Info */}
              {winery && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 text-sm mb-3">Sobre la bodega</h4>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={winery.images[0]} alt={winery.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{winery.name}</p>
                      <p className="text-xs text-gray-500">{winery.location}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-3 mb-3">{winery.description}</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone className="w-3.5 h-3.5" /> {winery.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Mail className="w-3.5 h-3.5" /> {winery.email}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
