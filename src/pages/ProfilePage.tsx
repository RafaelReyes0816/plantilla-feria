import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getExperienceById, getWineryById, experienceTypes } from '../data/mockData';
import { User, Calendar, Clock, MapPin, Star, BookOpen, LogOut, Edit } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, bookings, logout } = useApp();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/auth');
    return null;
  }

  const userBookings = bookings.filter(b => b.userId === currentUser.id);
  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-vine-100 text-vine-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    cancelled: 'Cancelada',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-wine-400 to-grape-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
              <p className="text-gray-600 text-sm">{currentUser.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-2.5 py-0.5 bg-wine-100 text-wine-700 rounded-full text-xs font-medium capitalize">
                  {currentUser.role}
                </span>
                {currentUser.phone && (
                  <span className="text-xs text-gray-500">{currentUser.phone}</span>
                )}
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="flex items-center gap-1.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" /> Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-wine-700">{userBookings.length}</div>
            <div className="text-xs text-gray-500">Reservas</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-vine-700">{userBookings.filter(b => b.status === 'confirmed').length}</div>
            <div className="text-xs text-gray-500">Confirmadas</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-grape-700">{userBookings.filter(b => b.status === 'pending').length}</div>
            <div className="text-xs text-gray-500">Pendientes</div>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-wine-500" />
              Mis Reservas
            </h2>
          </div>

          {userBookings.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {userBookings.map(booking => {
                const exp = getExperienceById(booking.experienceId);
                const winery = exp ? getWineryById(exp.wineryId) : null;
                if (!exp || !winery) return null;
                const typeInfo = experienceTypes[exp.type];

                return (
                  <div key={booking.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img src={exp.images[0]} alt={exp.title} className="w-full sm:w-24 h-20 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link to={`/experiencia/${exp.id}`} className="font-semibold text-gray-900 hover:text-wine-700 transition-colors">
                              {exp.title}
                            </Link>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" /> {winery.name}
                            </p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                            {statusLabels[booking.status]}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {booking.time}
                          </span>
                          <span>👥 {booking.guests} personas</span>
                          <span className="font-medium text-wine-700">Bs. {booking.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="text-5xl mb-3">📋</div>
              <p className="text-gray-600 mb-4">Aún no tienes reservas</p>
              <Link
                to="/catalogo"
                className="inline-flex px-4 py-2 bg-wine-100 text-wine-700 rounded-lg font-medium text-sm hover:bg-wine-200 transition-colors"
              >
                Explorar experiencias
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
