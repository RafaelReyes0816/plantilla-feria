import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Wine, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'turista' | 'bodega'>('turista');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } else {
      if (!name || !email || !password) {
        setError('Por favor completa todos los campos');
        return;
      }
      const success = register(name, email, password, role);
      if (success) {
        navigate('/');
      } else {
        setError('Ya existe una cuenta con ese correo');
      }
    }
  };

  const demoAccounts = [
    { label: 'Turista', email: 'maria@email.com', password: '123456' },
    { label: 'Bodega', email: 'campos@email.com', password: '123456' },
    { label: 'Admin', email: 'admin@rutavino.com', password: 'admin123' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wine-50 via-white to-grape-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-wine-600 to-grape-700 rounded-xl flex items-center justify-center shadow-lg">
              <Wine className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xl font-bold text-wine-900">RutaVino</span>
              <span className="text-xs text-wine-600 block -mt-1">Tarija</span>
            </div>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {isLogin ? 'Bienvenido de vuelta' : 'Crear cuenta'}
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            {isLogin ? 'Inicia sesión para continuar' : 'Regístrate para reservar experiencias'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Nombre completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo de cuenta</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('turista')}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      role === 'turista' ? 'border-wine-500 bg-wine-50' : 'border-gray-100 hover:border-wine-200'
                    }`}
                  >
                    <span className="text-2xl block mb-1">🧑‍💼</span>
                    <span className="text-sm font-medium text-gray-700">Turista</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('bodega')}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      role === 'bodega' ? 'border-wine-500 bg-wine-50' : 'border-gray-100 hover:border-wine-200'
                    }`}
                  >
                    <span className="text-2xl block mb-1">🏛️</span>
                    <span className="text-sm font-medium text-gray-700">Bodega</span>
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-wine-600 to-grape-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-[1.01]"
            >
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-sm text-wine-600 hover:text-wine-700 font-medium"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-3 text-center">🔑 Cuentas de demostración</p>
          <div className="space-y-2">
            {demoAccounts.map(acc => (
              <button
                key={acc.email}
                onClick={() => { setEmail(acc.email); setPassword(acc.password); setIsLogin(true); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-wine-50 transition-colors text-left"
              >
                <span className="text-sm font-medium text-gray-700">{acc.label}</span>
                <span className="text-xs text-gray-400">{acc.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
