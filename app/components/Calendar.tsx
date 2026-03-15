"use client";

import { useState } from "react";

const dates = [
  "16", "17", "18", "19", 
  "20", "21", "22", "23"
];

const schools = [
  "Queensland Academy",
  "Hogwarts",
  "Hogwarts",
  "",
  "Springfield High",
  "Springfield high",
  "Vienna International",
  ""
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className="max-w-xl p-6 bg-white rounded-lg shadow-lg m-4">
      {/* March Title */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-gray-800">March</h2>
      </div>
      
      {/* Date Header */}
      <div className="grid grid-cols-8 gap-0 text-center border-l border-r border-gray-200">
        {dates.map((date, index) => (
          <div 
            key={date}
            className={`h-10 p-4 font-semibold text-xs border-r border-gray-200 first:border-l-0 last:border-r-0 transition-all duration-200 cursor-pointer hover:bg-blue-50 flex flex-col justify-center ${
              selectedDate === date 
                ? "bg-blue-100 border-b-blue-500 text-blue-700" 
                : "border-b-gray-200 text-gray-700 hover:border-b-blue-300"
            }`}
            onClick={() => setSelectedDate(date)}
          >
            <div className="text-xs font-bold">{date}</div>
          </div>
        ))}
      </div>

      {/* Schools Row */}
      <div className="grid grid-cols-8 gap-0 text-center border-l border-r border-b border-gray-200">
        {schools.map((school, index) => (
          <div 
            key={index}
            className="h-12 border-r border-gray-200 first:border-l-0 last:border-r-0 flex items-center justify-center px-1"
          >
            <span className="text-xs font-medium text-gray-600 truncate">
              {school}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
