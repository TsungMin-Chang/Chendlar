import { AiFillHeart } from "react-icons/ai";

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
          className={`${cellDayNumber === getDayNumber(new Date()) && "flex h-5 w-5 items-center justify-center rounded-full bg-[#7b5f3fbd] text-xs"}`}
        >
          {cellDisplayDate}
        </div>
      </div>
      {cellAffairs &&
        cellAffairs.map((affair, i) => (
          <>
            {/* invisible div for padding */}
            {cellAffairs[i].type === "event" &&
              Array(
                i === 0
                  ? cellAffairs[i].order
                  : cellAffairs[i].order - cellAffairs[i - 1].order - 1,
              )
                .fill(0)
                .map((_, j) => (
                  <div
                    key={"empty" + j.toString()}
                    className="invisible max-h-4 text-xs"
                  >
                    empty
                  </div>
                ))}

            {/* visible div */}
            <div
              key={"inner" + i.toString() + affair.id}
              className={`max-h-4 truncate rounded-sm pl-1 text-xs bg-[${affair.color}]`}
            >
              {/* todo */}
              {i < 5 && affair.type === "todo" && (
                <div className="flex flex-row">
                  {affair.isDone ? (
                    <AiFillHeart color="brown" size={14} />
                  ) : (
                    <span>
                      {new Date(affair.time2).getHours()}:
                      {new Date(affair.time2).getMinutes().toString()[0]}{" "}
                    </span>
                  )}
                  {affair.title}
                </div>
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
          </>
        ))}
    </div>
  );
}
