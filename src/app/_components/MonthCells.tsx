import MonthCell from "./MonthCell";

export default function MonthCells({
  firstDayOfMonth,
  lastDayOfMonth,
}: {
  firstDayOfMonth: Date;
  lastDayOfMonth: Date;
}) {
  return (
    <div className="grid grid-cols-7 grid-rows-6" style={{ height: "88vh" }}>
      {Array(42)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="overflow-hidden border border-[#4E4743]">
            {i >= firstDayOfMonth.getDay() &&
              i < firstDayOfMonth.getDay() + lastDayOfMonth.getDate() && (
                <MonthCell firstDayOfMonth={firstDayOfMonth} index={i} />
              )}
          </div>
        ))}
    </div>
  );
}
