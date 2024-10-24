'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const MeltingCandle = ({
  initialHeight = 300,
  meltingDuration = 300,
  waxDropInterval = 3
}) => {
  const [height, setHeight] = useState(initialHeight);
  const [waxDrops, setWaxDrops] = useState([]);
  const [dropId, setDropId] = useState(0);

  useEffect(() => {
    // Melting effect
    const meltingRate = (initialHeight - 150) / (meltingDuration * 1000); // Minimum height is 150px
    const meltingInterval = setInterval(() => {
      setHeight((prev) => {
        if (prev <= 150) {
          clearInterval(meltingInterval);
          return prev;
        }
        return prev - meltingRate;
      });
    }, 1);

    // Wax dropping effect
    const waxInterval = setInterval(() => {
      const newDrop = {
        id: dropId,
        left: Math.random() * 80 + 10 // Random position between 10% and 90%
      };
      setDropId(prev => prev + 1);
      setWaxDrops(prev => [...prev, newDrop]);

      // Remove drop after animation
      setTimeout(() => {
        setWaxDrops(prev => prev.filter(drop => drop.id !== newDrop.id));
      }, 3000);
    }, waxDropInterval * 1000);

    return () => {
      clearInterval(meltingInterval);
      clearInterval(waxInterval);
    };
  }, [initialHeight, meltingDuration, waxDropInterval, dropId]);

  return (
    <div className="relative w-[150px] h-[400px] mx-auto mt-12">
      <div 
        className="absolute bottom-0 w-[150px] rounded-[150px/40px] shadow-[inset_20px_-30px_50px_0_rgba(0,0,0,0.4),inset_-20px_0_50px_0_rgba(0,0,0,0.4)] bg-gradient-to-b from-[#e48825] via-[#e78e0e] via-[#833c03] to-[#1c0900] transition-all duration-1000"
        style={{ height: `${height}px` }}
      >
        {/* Candle top */}
        <div className="absolute w-full h-[40px] rounded-full border-2 border-[#d47401] bg-[#b86409] bg-radial-gradient" />
        
        {/* Thread */}
        <div className="absolute w-[6px] h-[36px] -top-[17px] left-1/2 -translate-x-1/2 z-10 rounded-t-[40%] bg-gradient-to-b from-[#d6994a] via-[#4b232c] via-[#121212] to-[#e8bb31]" />
        
        {/* Flame */}
        <div className="absolute w-[24px] h-[120px] left-1/2 -translate-x-1/2 -bottom-[120px] rounded-[50%_50%_20%_20%] bg-gradient-to-b from-white to-transparent animate-flame">
          <div className="absolute inset-0 rounded-[50%_50%_20%_20%] shadow-flame" />
        </div>
        
        {/* Glow */}
        <div className="absolute w-[26px] h-[60px] left-1/2 -translate-x-1/2 -top-[48px] rounded-[50%_50%_35%_35%] bg-[rgba(0,133,255,0.7)] shadow-glow">
          <div className="absolute w-[70%] h-[60%] left-1/2 -translate-x-1/2 bottom-0 rounded-full bg-[rgba(0,0,0,0.35)]" />
        </div>
        
        {/* Blinking glow */}
        <div className="absolute w-[100px] h-[180px] left-1/2 -translate-x-1/2 -top-[55%] rounded-full bg-[#ff6000] blur-[60px] animate-blink" />
      </div>

      {/* Wax drops */}
      {waxDrops.map(drop => (
        <div
          key={drop.id}
          className="absolute w-[10px] h-[20px] bg-[#e78e0e] rounded-full animate-waxDrop"
          style={{ 
            left: `${drop.left}%`,
            top: `${height - 20}px`
          }}
        />
      ))}
    </div>
  );
};
