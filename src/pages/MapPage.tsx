import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { wineries, experiences, getExperiencesByWinery, experienceTypes } from '../data/mockData';
import { MapPin, Wine, ExternalLink } from 'lucide-react';
import L from 'leaflet';

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current).setView([-21.5333, -64.7333], 13);
    mapInstance.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    // Add markers for each winery
    wineries.filter(w => w.approved).forEach(winery => {
      const exps = getExperiencesByWinery(winery.id);
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background: linear-gradient(135deg, #ab2048, #5b21b6); width: 36px; height: 36px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid white;">
          <span style="transform: rotate(45deg); font-size: 16px;">🍷</span>
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([winery.lat, winery.lng], { icon }).addTo(map);

      const popupContent = `
        <div style="min-width: 220px; font-family: system-ui, sans-serif;">
          <img src="${winery.images[0]}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <h3 style="font-size: 14px; font-weight: 600; margin: 0 0 4px 0; color: #1f2937;">${winery.name}</h3>
          <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px 0;">📍 ${winery.location}</p>
          <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
            <span style="color: #f59e0b;">★</span>
            <span style="font-size: 12px; font-weight: 500;">${winery.rating}</span>
            <span style="font-size: 11px; color: #9ca3af;">(${winery.reviewCount} reseñas)</span>
          </div>
          <p style="font-size: 11px; color: #6b7280; margin: 0 0 8px 0;">${exps.length} experiencias disponibles</p>
          <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;">
            ${exps.map(e => `<span style="font-size: 10px; padding: 2px 6px; background: #fdf2f4; color: #8f1e40; border-radius: 4px;">${experienceTypes[e.type].icon} ${experienceTypes[e.type].label}</span>`).join('')}
          </div>
          <a href="/experiencia/${exps[0]?.id}" style="display: inline-block; font-size: 12px; color: #ab2048; font-weight: 500; text-decoration: none;">Ver experiencias →</a>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280 });
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mapa de la Ruta del Vino</h1>
          <p className="text-gray-600">Explora la ubicación de bodegas y viñedos en Tarija</p>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Winery List */}
          <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Bodegas en el mapa</h3>
            {wineries.filter(w => w.approved).map(winery => {
              const exps = getExperiencesByWinery(winery.id);
              return (
                <div key={winery.id} className="bg-white rounded-xl p-3 border border-gray-100 hover:border-wine-200 hover:shadow-md transition-all">
                  <div className="flex gap-3">
                    <img src={winery.images[0]} alt={winery.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{winery.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {winery.location}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{exps.length} experiencias</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200" style={{ height: '600px' }}>
              <div ref={mapRef} className="w-full h-full" />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Haz clic en los marcadores para ver detalles de cada bodega
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
