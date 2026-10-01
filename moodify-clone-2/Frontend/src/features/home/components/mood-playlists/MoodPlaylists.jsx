import React, { useState } from 'react';
import { Sun, Brain, CloudRain, Zap, Moon, Waves, ListMusic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MoodCard from './MoodCard';

const moodFilters = [
  { id: 'radiant-joy', label: 'Radiant Joy', value: 'happy', icon: Sun, color: '#00e5ff' },
  { id: 'deep-focus', label: 'Deep Focus', value: 'neutral', icon: Brain, color: '#a3a3a3' },
  { id: 'melancholic-drift', label: 'Melancholic Drift', value: 'sad', icon: CloudRain, color: '#a3a3a3' },
  { id: 'hyper-workout', label: 'Hyper Workout', value: 'angry', icon: Zap, color: '#a3a3a3' },
  { id: 'midnight-chill', label: 'Midnight Chill', value: 'fearful', icon: Moon, color: '#a3a3a3' },
];

const cardsData = [
  {
    id: 1,
    badgeText: 'Radiant Joy',
    badgeColor: '#00e5ff',
    badgeBg: '#00e5ff22',
    title: 'Euphoric Sunrise',
    tracks: 18,
    genre: 'Ambient Electronic / Liquid DnB',
    duration: '54 min',
    imageSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    icon: null,
    gradient: null,
  },
  {
    id: 2,
    badgeText: 'Deep Focus',
    badgeColor: '#00e5ff',
    badgeBg: '#00e5ff22',
    title: 'Deep Alpha Flow',
    tracks: 24,
    genre: 'Binaural & Chill Synth',
    duration: '1 hr 18 min',
    imageSrc: null,
    icon: Waves,
    gradient: 'bg-gradient-to-br from-[#0c2e3a] to-[#12141d]',
  },
  {
    id: 3,
    badgeText: 'Melancholic Drift',
    badgeColor: '#ff7eb3',
    badgeBg: '#ff7eb322',
    title: 'Neon Midnight Catharsis',
    tracks: 15,
    genre: 'Cyberpunk Lo-Fi & Downtempo',
    duration: '42 min',
    imageSrc: null,
    icon: Moon,
    gradient: 'bg-gradient-to-br from-[#3b1236] to-[#12141d]',
  },
  {
    id: 4,
    badgeText: 'Hyper Workout',
    badgeColor: '#ff7eb3',
    badgeBg: '#ff7eb322',
    title: 'Dopamine High Voltage',
    tracks: 20,
    genre: 'High Energy Bass & Future Beat',
    duration: '1 hr 02 min',
    imageSrc: null,
    icon: Zap,
    gradient: 'bg-gradient-to-br from-[#4a1532] to-[#12141d]',
  },
];

const MoodPlaylists = ({ onMoodSelect }) => {
  const [activeFilter, setActiveFilter] = useState('radiant-joy');

  return (
    <div className="w-full max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-12 py-12 relative z-10 font-sans">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 text-white">
        <div>
          <div className="flex items-center gap-2 text-[#00e5ff] text-xs font-bold tracking-widest uppercase mb-2">
            <ListMusic size={16} />
            Sonic Resonance Curation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Mood Playlists & Sonic Resonance</h2>
        </div>
        <p className="text-gray-400 max-w-md text-sm lg:text-base leading-relaxed">
          Biometrically tuned sets curated to amplify, ground, or elevate your current state of consciousness.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-10">
        {moodFilters.map(filter => {
          const isActive = activeFilter === filter.id;
          const Icon = filter.icon;
          return (
            <Button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                if (onMoodSelect) {
                  onMoodSelect(filter.value);
                }
              }}
              variant="ghost"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                isActive 
                  ? 'text-[#0B0A11] shadow-lg hover:text-[#0B0A11]' 
                  : 'bg-[#2a2d36] text-gray-300 hover:bg-[#3a3d46] hover:text-white'
              }`}
              style={isActive ? { backgroundColor: filter.color } : {}}
            >
              <Icon size={16} />
              {filter.label}
            </Button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardsData.map(card => (
          <MoodCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default MoodPlaylists;
