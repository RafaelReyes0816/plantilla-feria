import React from 'react';
import { Link } from 'react-router-dom';
import { Experience, getWineryById, experienceTypes } from '../data/mockData';
import { Star, Clock, Users, MapPin } from 'lucide-react';

interface Props {
  experience: Experience;
}

export default function ExperienceCard({ experience }: Props) {
  const winery = getWineryById(experience.wineryId);
  const typeInfo = experienceTypes[experience.type];

  return (
    <Link
      to={`/experiencia/${experience.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-wine-200 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={experience.images[0]}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${typeInfo.color}`}>
            {typeInfo.icon} {typeInfo.label}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 text-wine-800 backdrop-blur-sm">
            Bs. {experience.price}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{winery?.name}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-wine-700 transition-colors">
          {experience.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {experience.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {experience.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              Max {experience.maxCapacity}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-medium text-gray-700">{winery?.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
