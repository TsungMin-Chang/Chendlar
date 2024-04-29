import { AiFillHeart } from "react-icons/ai";

import { useRouter } from "next/navigation";

import useDateContext from "@/hooks/useDateContext";
import type { DbAffair } from "@/lib/types";
import { getDayNumber } from "@/lib/utils";

type MonthCellProps = {
  cellDisplayDate: number;
  cellDayNumber: number;
  cellAffairs: DbAffair[] | null;
};

export default function MonthCell({
  cellDisplayDate,
  cellDayNumber,
  cellAffairs,
}: MonthCellProps) {
  const router = useRouter();
  const { isHalfDay } = useDateContext();
  return (
    <div
      className="flex h-full w-full flex-col gap-y-1"
      onClick={() =>
        router.push(`/day/${cellDayNumber}/?isHalfDay=${isHalfDay}`)
      }
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
            {i < 5 &&
              affair.type === "event" &&
              Array(
                i === 0
                  ? affair.order
                  : affair.order - cellAffairs[i - 1].order - 1,
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
              className={`flex max-h-4 items-center truncate rounded-sm pl-1 text-xs bg-[${affair.color}]`}
            >
              {/* todo */}
              {i < 5 && affair.type === "todo" && (
                <>
                  {affair.isDone ? (
                    <span>
                      <AiFillHeart color="brown" size={14} />
                    </span>
                  ) : (
                    <span>
                      {isHalfDay && new Date(affair.time2).getHours() > 12
                        ? new Date(affair.time2).getHours() - 12
                        : new Date(affair.time2).getHours()}
                      {new Date(affair.time2).getMinutes() === 0
                        ? "."
                        : ":" + new Date(affair.time2).getMinutes().toString()}
                    </span>
                  )}
                  <span className="pl-0.5">{affair.title}</span>
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
          </>
        ))}
    </div>
  );
}
