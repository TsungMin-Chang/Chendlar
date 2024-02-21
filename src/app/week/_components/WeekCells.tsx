import useDummy from '@/hooks/useDummy';
import WeekRow from "./WeekRow";

export default function WeekCells({
  firstDayOfWeek
}: {
  firstDayOfWeek: Date
}) {
  
  const {dummy} = useDummy();

  const year = firstDayOfWeek.getFullYear();
  const month = firstDayOfWeek.getMonth();
  const firstDayOfWeekDate = firstDayOfWeek.getDate();
  
  return (
    <div 
      className="grid grid-rows-7 bg-[#442B0D]"
      style={{height: "94vh"}}
    >
      {Array(7).fill(0).map((_, i) => (
        <WeekRow
          data={dummy[new Date(year, month, firstDayOfWeekDate + i).toLocaleDateString("en-US")] ?? null}
          rowDate={new Date(year, month, firstDayOfWeekDate + i)}
        />
      ))}
    </div>
  );
}