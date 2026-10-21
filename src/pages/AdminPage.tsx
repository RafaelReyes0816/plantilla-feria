import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { experiences, wineries, getWineryById, experienceTypes, getExperiencesByWinery } from '../data/mockData';
import { Users, Wine, BookOpen, Star, Check, X, BarChart3, Eye, TrendingUp } from 'lucide-react';

export default function AdminPage() {
  const { currentUser, users, bookings, reviews, updateBookingStatus } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'users' | 'reviews'>('overview');

  if (!currentUser || currentUser.role !== 'admin') {
    navigate('/');
    return null;
  }

  const totalRevenue = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.total, 0);
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');

  const tabs = [
    { id: 'overview' as const, label: 'Resumen', icon: BarChart3 },
    { id: 'bookings' as const, label: 'Reservas', icon: BookOpen },
    { id: 'users' as const, label: 'Usuarios', icon: Users },
    { id: 'reviews' as const, label: 'Reseñas', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600">Supervisa y gestiona la plataforma RutaVino Tarija</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-sm border border-gray-100 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-wine-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-wine-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-wine-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                    <p className="text-xs text-gray-500">Usuarios</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-vine-100 rounded-lg flex items-center justify-center">
                    <Wine className="w-5 h-5 text-vine-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{wineries.filter(w => w.approved).length}</p>
                    <p className="text-xs text-gray-500">Bodegas activas</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-grape-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-grape-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                    <p className="text-xs text-gray-500">Reservas totales</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-earth-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-earth-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">Bs. {totalRevenue}</p>
                    <p className="text-xs text-gray-500">Ingresos confirmados</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Wineries Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Bodegas Registradas</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bodega</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ubicación</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Experiencias</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {wineries.map(w => (
                      <tr key={w.id} className="hover:bg-gray-50">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img src={w.images[0]} alt={w.name} className="w-8 h-8 rounded-lg object-cover" />
                            <span className="text-sm font-medium text-gray-900">{w.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-600">{w.location}</td>
                        <td className="px-5 py-3 text-sm text-gray-600">{getExperiencesByWinery(w.id).length}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-sm font-medium">{w.rating}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${w.approved ? 'bg-vine-100 text-vine-700' : 'bg-amber-100 text-amber-700'}`}>
                            {w.approved ? 'Aprobada' : 'Pendiente'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Actividad Reciente</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {bookings.slice(-5).reverse().map(b => {
                  const exp = experiences.find(e => e.id === b.experienceId);
                  const user = users.find(u => u.id === b.userId);
                  return (
                    <div key={b.id} className="px-5 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{user?.name}</span> reservó <span className="font-medium">{exp?.title}</span>
                        </p>
                        <p className="text-xs text-gray-500">{b.date} • {b.guests} personas • Bs. {b.total}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        b.status === 'confirmed' ? 'bg-vine-100 text-vine-700' :
                        b.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {b.status === 'confirmed' ? 'Confirmada' : b.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Pending */}
            {pendingBookings.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Reservas Pendientes ({pendingBookings.length})</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {pendingBookings.map(booking => {
                    const exp = experiences.find(e => e.id === booking.experienceId);
                    const winery = exp ? getWineryById(exp.wineryId) : null;
                    const user = users.find(u => u.id === booking.userId);
                    return (
                      <div key={booking.id} className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <p className="font-medium text-gray-900">{exp?.title}</p>
                            <p className="text-sm text-gray-500">{winery?.name} • {user?.name}</p>
                            <p className="text-xs text-gray-400 mt-1">{booking.date} a las {booking.time} • {booking.guests} personas • Bs. {booking.total}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              className="flex items-center gap-1 px-3 py-1.5 bg-vine-100 text-vine-700 rounded-lg text-sm font-medium hover:bg-vine-200 transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" /> Confirmar
                            </button>
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" /> Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All bookings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Todas las Reservas</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Experiencia</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Personas</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map(b => {
                      const exp = experiences.find(e => e.id === b.experienceId);
                      const user = users.find(u => u.id === b.userId);
                      return (
                        <tr key={b.id} className="hover:bg-gray-50">
                          <td className="px-5 py-3 text-sm font-medium text-gray-900">{exp?.title}</td>
                          <td className="px-5 py-3 text-sm text-gray-600">{user?.name}</td>
                          <td className="px-5 py-3 text-sm text-gray-600">{b.date} {b.time}</td>
                          <td className="px-5 py-3 text-sm text-gray-600">{b.guests}</td>
                          <td className="px-5 py-3 text-sm font-medium text-gray-900">Bs. {b.total}</td>
                          <td className="px-5 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              b.status === 'confirmed' ? 'bg-vine-100 text-vine-700' :
                              b.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {b.status === 'confirmed' ? 'Confirmada' : b.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Usuarios Registrados ({users.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reservas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-wine-400 to-grape-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">{u.name[0]}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-600">{u.email}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                          u.role === 'admin' ? 'bg-grape-100 text-grape-700' :
                          u.role === 'bodega' ? 'bg-wine-100 text-wine-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-600">
                        {bookings.filter(b => b.userId === u.id).length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Reseñas ({reviews.length})</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {reviews.map(r => {
                const exp = experiences.find(e => e.id === r.experienceId);
                return (
                  <div key={r.id} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">{r.userName}</span>
                          <span className="text-xs text-gray-400">en</span>
                          <span className="text-sm text-wine-700 font-medium">{exp?.title}</span>
                        </div>
                        <div className="flex gap-0.5 mb-1">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{r.comment}</p>
                        <p className="text-xs text-gray-400 mt-1">{r.date}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
