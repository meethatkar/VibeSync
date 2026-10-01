import React from 'react';

const MoodCard = ({ 
  title, 
  tracks, 
  genre, 
  duration, 
  badgeText, 
  badgeColor, 
  badgeBg, 
  icon: Icon,
  imageSrc,
  gradient
}) => {
  return (
    <div className="bg-[#14151a] border border-[#2a2d36] rounded-xl p-4 flex flex-col gap-4 w-full cursor-pointer hover:border-gray-500 transition-colors">
      <div 
        className={`relative w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center ${gradient ? gradient : 'bg-gray-800'}`}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          Icon && <Icon className="w-16 h-16" style={{ color: badgeColor }} />
        )}
        
        {badgeText && (
          <div 
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold"
            style={{ backgroundColor: badgeBg, color: badgeColor }}
          >
            {badgeText}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-white text-base sm:text-lg font-bold truncate">{title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm truncate">
          {tracks} Tracks • {genre}
        </p>
      </div>

      <div className="flex justify-end items-center text-[10px] sm:text-xs font-bold mt-1">
        <span className="text-gray-400">{duration}</span>
      </div>
    </div>
  );
};

export default MoodCard;
