export default function WeekCells({
  firstDayOfWeek
}: {
  firstDayOfWeek: Date
}) {
  
  const days = [
    "SUN", 
    "MON", 
    "TUE", 
    "WED", 
    "THR", 
    "FRI", 
    "SAT"
  ];
  const year = firstDayOfWeek.getFullYear();
  const month = firstDayOfWeek.getMonth();
  const localDate = firstDayOfWeek.getDate();
  
  return (
    <div 
      className="flex flex-row bg-[#442B0D]"
      style={{height: "94vh"}}
    >
      <div className="basis-20 grid grid-rows-7">
        {Array(7).fill(0).map((_, i) => (
          <div 
            key={i}
            className="flex flex-col justify-center items-center text-gray-300 text-sm border border-[#4E4743]"
          >
            <div>{days[new Date(year, month, localDate + i).getDay()]}</div>
            <div>
              {new Date(year, month, localDate + i).getMonth() + 1}
              /
              {new Date(year, month, localDate + i).getDate()}
            </div>
          </div>
        ))}
      </div>
      <div className="basis-full grid grid-rows-7 grid-flow-col auto-cols-fr">
        {Array(35).fill(0).map((_, i) => (
          <div
            key={i} 
            className="flex justify-center items-center text-white text-sm border border-[#4E4743]"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}