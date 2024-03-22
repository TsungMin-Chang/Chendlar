import { useRouter } from "next/navigation";

import type { dbAffair } from "@/lib/types";
import { getDayNumber } from "@/lib/utils";

type MonthCellProps = {
  cellDisplayDate: number;
  cellDayNumber: number;
  cellAffairs: dbAffair[] | null;
};

export default function MonthCell({
  cellDisplayDate,
  cellDayNumber,
  cellAffairs,
}: MonthCellProps) {
  const router = useRouter();
  return (
    <div
      className="flex h-full w-full flex-col gap-y-1"
      onClick={() => router.push(`/day/${cellDayNumber}`)}
    >
      <div className="flex justify-center text-sm text-white">
        <div
          className={`${cellDayNumber === getDayNumber(new Date()) && "flex h-5 w-5 items-center justify-center rounded-full bg-[#aa2a59] text-xs"}`}
        >
          {cellDisplayDate}
        </div>
      </div>
      {cellAffairs &&
        cellAffairs[0] &&
        Array(cellAffairs[0].order) // empty div for event offest
          .fill(0)
          .map((_, i) => (
            <div
              key={"empty" + i.toString()}
              className="invisible max-h-4 text-xs"
            >
              empty
            </div>
          )) &&
        cellAffairs.map((affair, i) => (
          <div
            key={"innerCell_Affair" + i.toString() + affair.id}
            className={`max-h-4 truncate rounded-sm pl-1 text-xs bg-[${affair.color}]`}
          >
            {/* todo */}
            {i < 5 && affair.type === "todo" && (
              <>
                <span className="font-medium">
                  {new Date(affair.time2).getHours()}.
                </span>
                <span>{affair.title}</span>
              </>
            )}

            {/* event */}
            {i < 5 &&
              affair.type === "event" &&
              getDayNumber(affair.time1) === cellDayNumber && (
                <span>{affair.title}</span>
              )}
            {i < 5 &&
              affair.type === "event" &&
              getDayNumber(affair.time1) !== cellDayNumber && (
                <span>{"... ..."}</span>
              )}
          </div>
        ))}
    </div>
  );
}
