"use client"
import Image from "next/image";

export default function Home() {
  const dayName = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];
  return (
    <div className="flex-1 flex flex-col" style={{backgroundColor: "rgba(71, 53, 32, 1)"}}>
      <div className="basis-12 grid grid-cols-7">
        {Array(dayName.length).fill(0).map((_, i) => (
          <div 
            key={i}
            className="flex justify-center items-center text-gray-300 border border-[#4E4743]"
          >
            {dayName[i]}
          </div>
        ))}
      </div>
      <div className="basis-full grid grid-cols-7 grid-rows-6">
        {Array(42).fill(0).map((_, i) => (
          <div 
            key={i}
            className="flex justify-center text-white border border-[#4E4743]"
          >
            {i+1}
          </div>
        ))}
      </div>
    </div>
  );
}