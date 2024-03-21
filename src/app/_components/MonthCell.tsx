import { useRouter } from "next/navigation";

import useDummy from "@/hooks/useDummy";
// for dummy use, will delete later
import type { dbAffair } from "@/lib/types";
import { getDayNumber } from "@/lib/utils";

type MonthCellProps = {
  cellDisplayDate: number;
  cellDateString: string; // for dummy use, will delete later
  cellDayNumber: number;
  cellAffairs: dbAffair[] | null;
};

export default function MonthCell({
  cellDisplayDate,
  cellDateString, // for dummy use, will delete later
  cellDayNumber,
  // cellAffairs,
}: MonthCellProps) {
  const router = useRouter();
  const { dummy } = useDummy(); // for dummy use, will delete later

  // console.log(cellDayNumber); // for router.push(`/day/{$cellDayNumber}`)
  // console.log(cellAffairs); // for mapping and rendering, we are currently using dummy

  return (
    <div
      className="flex h-full w-full flex-col gap-y-1"
      onClick={() => router.push("/day/123")}
    >
      <div className="flex justify-center text-sm text-white">
        <div
          className={`${cellDayNumber === getDayNumber(new Date()) && "flex h-5 w-5 items-center justify-center rounded-full bg-[#aa2a59] text-xs"}`}
        >
          {cellDisplayDate}
        </div>
      </div>
      {dummy[cellDateString] &&
        dummy[cellDateString].map((ele, i) => (
          <div
            key={"innerCell_Affair" + i.toString() + ele.id}
            className="max-h-4 rounded-sm pl-1 text-xs"
            style={{ backgroundColor: ele.color }}
          >
            {ele.type === "todo" && (
              <>
                <span className="font-medium">{ele.time2.getHours()}.</span>
                {ele.title}
              </>
            )}
            {ele.type === "event" &&
              ele.time1.toLocaleDateString("en-US") === cellDateString && (
                <>{ele.title}</>
              )}
            {ele.type === "event" &&
              ele.time1.toLocaleDateString("en-US") !== cellDateString &&
              "... ..."}
          </div>
        ))}
    </div>
  );
}
