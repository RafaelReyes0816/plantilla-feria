import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-wine-950 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-wine-500 to-grape-600 rounded-lg flex items-center justify-center">
                <Wine className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold">RutaVino</span>
                <span className="text-xs text-wine-300 block -mt-1">Tarija</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Conectamos turistas con bodegas, viñedos y emprendimientos rurales de Tarija para experiencias únicas de enoturismo.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-wine-300 mb-4">Explorar</h4>
            <ul className="space-y-2">
              <li><Link to="/catalogo" className="text-sm text-gray-400 hover:text-white transition-colors">Catálogo</Link></li>
              <li><Link to="/mapa" className="text-sm text-gray-400 hover:text-white transition-colors">Mapa de Bodegas</Link></li>
              <li><Link to="/recomendacion" className="text-sm text-gray-400 hover:text-white transition-colors">Tu Ruta Personalizada</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-wine-300 mb-4">Experiencias</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-400">🍷 Catas de Vino</span></li>
              <li><span className="text-sm text-gray-400">🏛️ Visitas Guiadas</span></li>
              <li><span className="text-sm text-gray-400">🍇 Vendimia</span></li>
              <li><span className="text-sm text-gray-400">🏡 Hospedaje Rural</span></li>
              <li><span className="text-sm text-gray-400">🍽️ Gastronomía</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-wine-300 mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-wine-400" /> Tarija, Bolivia
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-wine-400" /> +591 4 611 0000
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-wine-400" /> info@rutavino.tarija
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-wine-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-wine-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2026 RutaVino Tarija. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-500">Hecho con 🍷 en Tarija, Bolivia</p>
        </div>
      </div>
    </footer>
  );
}
