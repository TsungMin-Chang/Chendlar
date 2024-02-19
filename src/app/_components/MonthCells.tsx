export default function MonthCells({
  firstDayOfMonth,
  lastDayOfMonth
}: {
  firstDayOfMonth: Date,
  lastDayOfMonth: Date
}) {
  return (
    <div
      className="grid grid-cols-7 grid-rows-6"
      style={{height: "88vh"}}
    >
      {Array(42).fill(0).map((_, i) => (
        <div
          key={i}
          className="flex justify-center text-sm text-white border border-[#4E4743]"
        >
          {(i >= firstDayOfMonth.getDay() % 7 && i < firstDayOfMonth.getDay() + lastDayOfMonth.getDate()) && (
            <div>
              {i + 1 - firstDayOfMonth.getDay() % 7}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}