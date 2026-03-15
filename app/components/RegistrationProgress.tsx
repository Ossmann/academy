"use client";

import { useState, useEffect } from 'react';

export default function RegistrationProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const target = 73; // 16/22 = ~73%
    const increment = 1;
    const timer = setInterval(() => {
      current += increment;
      setProgress(current);
      if (current >= target) {
        setProgress(target);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/60 rounded-lg shadow-md">
      <div className="text-sm font-medium text-gray-700 mb-4 flex items-center justify-between">
        <span>16 of 22 students registration completed</span>
        <span className="font-semibold text-gray-900">{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-6">
        <div 
          className="bg-gray-800 h-6 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
