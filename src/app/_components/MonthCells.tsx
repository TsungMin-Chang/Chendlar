import { useRouter } from "next/navigation";

export default function MonthCells({
  firstDayOfMonth,
  lastDayOfMonth
}: {
  firstDayOfMonth: Date,
  lastDayOfMonth: Date
}) {

  const router = useRouter();
  return (
    <div
      className="grid grid-cols-7 grid-rows-6"
      style={{height: "88vh"}}
    >
      {Array(42).fill(0).map((_, i) => (
        <div
          key={i}
          className="border border-[#4E4743] overflow-hidden"
        >
          {(i >= firstDayOfMonth.getDay() % 7 && i < firstDayOfMonth.getDay() + lastDayOfMonth.getDate()) && (
            <div 
              className="flex flex-col gap-y-1"
              onClick={() => router.push("/day")}
            >
              <div className="flex justify-center text-sm text-white">
                {i + 1 - firstDayOfMonth.getDay() % 7}
              </div>
              <div className="rounded max-h-4 text-xs pl-1 bg-red-500">3.看電影</div>
              <div className="rounded max-h-4 text-xs pl-1 bg-pink-500">3.看電影</div>
              <div className="rounded max-h-4 text-xs pl-1 bg-blue-500">3.看電影</div>
              <div className="rounded max-h-4 text-xs pl-1 bg-purple-500">3.看電影</div>
              <div className="rounded max-h-4 text-xs pl-1 bg-yellow-500">3.看電影</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}