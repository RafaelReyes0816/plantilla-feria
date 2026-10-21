import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getExperienceById, getWineryById } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, Users, Check, ArrowLeft, AlertCircle } from 'lucide-react';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, addBooking } = useApp();

  const experience = getExperienceById(id || '');
  const winery = experience ? getWineryById(experience.wineryId) : null;

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!experience || !winery) {
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

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm max-w-md mx-4">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Inicia sesión para reservar</h2>
          <p className="text-gray-600 mb-6">Necesitas una cuenta para realizar reservas</p>
          <div className="flex flex-col gap-3">
            <Link to="/auth" className="px-6 py-3 bg-gradient-to-r from-wine-600 to-grape-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              Iniciar Sesión
            </Link>
            <Link to={`/experiencia/${experience.id}`} className="text-wine-600 font-medium text-sm">
              Volver a la experiencia
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const total = experience.price * guests;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking({
      userId: currentUser.id,
      experienceId: experience.id,
      date: selectedDate,
      time: selectedTime,
      guests,
      status: 'pending',
      total,
    });
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm max-w-md mx-4">
          <div className="w-16 h-16 bg-vine-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-vine-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Reserva Enviada!</h2>
          <p className="text-gray-600 mb-6">
            Tu reserva ha sido registrada exitosamente. La bodega confirmará tu reserva pronto.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-gray-600"><strong>Experiencia:</strong> {experience.title}</p>
            <p className="text-sm text-gray-600"><strong>Fecha:</strong> {selectedDate}</p>
            <p className="text-sm text-gray-600"><strong>Hora:</strong> {selectedTime}</p>
            <p className="text-sm text-gray-600"><strong>Personas:</strong> {guests}</p>
            <p className="text-sm text-gray-600"><strong>Total:</strong> Bs. {total}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/perfil" className="px-6 py-3 bg-gradient-to-r from-wine-600 to-grape-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              Ver mis reservas
            </Link>
            <Link to="/catalogo" className="text-wine-600 font-medium text-sm">
              Explorar más experiencias
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-wine-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Reservar Experiencia</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-wine-500" />
                    Selecciona una fecha
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {experience.availableDates.map(date => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedDate === date
                            ? 'bg-wine-600 text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-wine-50 hover:text-wine-700 border border-gray-100'
                        }`}
                      >
                        {new Date(date + 'T12:00:00').toLocaleDateString('es-BO', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 text-wine-500" />
                    Selecciona un horario
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {experience.availableTimes.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-grape-600 text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-grape-50 hover:text-grape-700 border border-gray-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 text-wine-500" />
                    Número de personas (máx. {experience.maxCapacity})
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold text-gray-900 w-8 text-center">{guests}</span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(experience.maxCapacity, guests + 1))}
                      className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Notas adicionales (opcional)</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Alergias, solicitudes especiales, etc."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine-500 resize-none"
                    rows={3}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime}
                  className="w-full py-3.5 bg-gradient-to-r from-wine-600 to-grape-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  Confirmar Reserva - Bs. {total}
                </button>

                {!selectedDate && (
                  <p className="flex items-center gap-1.5 text-xs text-amber-600">
                    <AlertCircle className="w-3.5 h-3.5" /> Selecciona una fecha para continuar
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <img src={experience.images[0]} alt={experience.title} className="w-full h-32 rounded-xl object-cover mb-4" />
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{experience.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{winery.name}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio por persona</span>
                  <span className="font-medium">Bs. {experience.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Personas</span>
                  <span className="font-medium">× {guests}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-wine-700 text-lg">Bs. {total}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-earth-50 rounded-lg border border-earth-100">
                <p className="text-xs text-earth-800">
                  💡 La reserva quedará como <strong>pendiente</strong> hasta que la bodega la confirme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
