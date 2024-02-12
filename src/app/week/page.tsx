"use client"

export default function WeekPage() {
  const dayName = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];
  const dummy = ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6", "3/7"];
  return (
    <div className="flex-1 flex flex-row" style={{backgroundColor: "rgba(71, 53, 32, 1)"}}>
      <div className="basis-20 grid grid-rows-7">
        {Array(dayName.length).fill(0).map((_, i) => (
          <div 
            key={i}
            className="flex flex-col justify-center items-center text-gray-300 text-sm border border-[#4E4743]"
          >
            <div>{dayName[i]}</div>
            <div>{dummy[i]}</div>
          </div>
        ))}
      </div>
      <div className="basis-full grid grid-cols-5 grid-rows-7">
        {Array(35).fill(0).map((_, i) => (
          <div
            key={i} 
            className="flex justify-center text-white border border-[#4E4743]"
          >
            {}
          </div>
        ))}
      </div>
    </div>
  );
}