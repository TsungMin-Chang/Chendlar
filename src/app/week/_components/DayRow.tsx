import { useRouter } from "next/navigation";

import type { Affair } from "@/lib/types";
// for dummy use, will delete later
import type { dbAffair } from "@/lib/types";

type DayRowProps = {
  rowDisplayDate: Date;
  rowDayNumber: number;
  rowAffairs: dbAffair[] | null;
  data: Affair[] | null; // for dummy use, will delete later
};

export default function DayRow({
  rowDisplayDate,
  rowDayNumber,
  rowAffairs,
  data, // for dummy use, will delete later
}: DayRowProps) {
  const days = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];
  const router = useRouter();

  console.log(rowDayNumber); // for router.push(`/day/{$rowDayNumber}`)
  console.log(rowAffairs); // for mapping and rendering, we are currently using dummy

  return (
    <div
      key={rowDisplayDate.toLocaleDateString("en-US")}
      className="grid grid-cols-6"
    >
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div
            key={"dayRowCell" + i.toString()}
            className="flex items-center justify-center border border-[#4E4743]"
          >
            {i === 0 && (
              <div
                className="flex flex-col items-center justify-center text-sm text-gray-300"
                onClick={() => router.push("/day/123")}
              >
                <div>{days[rowDisplayDate.getDay()]}</div>
                <div>
                  {rowDisplayDate.getMonth() + 1}/{rowDisplayDate.getDate()}
                </div>
              </div>
            )}
            {i > 0 && data && data[i - 1] && (
              <div
                className="h-full w-full text-zinc-900"
                style={{ backgroundColor: data[i - 1].color }}
              >
                {data[i - 1].title}
              </div>
            )}
            {i > 0 && (!data || !data[i - 1]) && <div></div>}
          </div>
        ))}
    </div>
  );
}
