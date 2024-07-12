import { useRef, useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";

import { useRouter } from "next/navigation";

import useDateContext from "@/hooks/useDateContext";
import type { DbAffair } from "@/lib/types";
import { getDayNumber, getDateFromDayNumber } from "@/lib/utils";

type MonthCellProps = {
  cellDisplayDate: number;
  cellDayNumber: number;
  cellAffairs: DbAffair[] | null;
  lastDayOfMonthDayNumber: number;
};

export default function MonthCell({
  cellDisplayDate,
  cellDayNumber,
  cellAffairs,
  lastDayOfMonthDayNumber,
}: MonthCellProps) {
  const router = useRouter();
  const { isHalfDay } = useDateContext();

  const [accessToken, setAccessToken] = useState<string | null>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccessToken(window.localStorage.getItem("accessToken"));
    }
  }, []);

  const todayDate = new Date();
  let maxEventOrder = -1;
  let eventNumber = 0;
  if (cellAffairs) {
    for (const affair of cellAffairs) {
      if (affair.type === "event") {
        eventNumber++;
        if (affair.order > maxEventOrder) {
          maxEventOrder = affair.order;
        }
      }
    }
  }
  const screenWidthCSS = useRef([
    "12vw", // 1/7 screen width
    "26vw", // 2/7 screen width
    "40vw", // 3/7 screen width
    "54vw", // 4/7 screen width
    "69vw", // 5/7 screen width
    "83vw", // 6/7 screen width
    "98vw", // 7/7 screen width
  ]);
  return (
    <div
      key={cellDayNumber.toString()}
      className="flex h-full w-full flex-col gap-y-1"
      onClick={() =>
        router.push(
          `/day/${cellDayNumber}/?isHalfDay=${isHalfDay}&accessToken=${accessToken}`,
        )
      }
    >
      <div
        key={cellDayNumber.toString()}
        className="flex justify-center text-sm text-white"
      >
        <div
          className={`${cellDayNumber === getDayNumber(todayDate) && "flex h-5 w-5 items-center justify-center rounded-full bg-[#927868f9] text-xs text-violet-100"}`}
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
                    className="invisible max-h-3.5 text-xs"
                  >
                    empty
                  </div>
                ))}

            {/* content div */}
            <div
              key={"inner" + i.toString() + affair.id}
              className={`flex max-h-3.5 text-nowrap rounded-sm bg-[${affair.color}] ${affair.type === "todo" && "truncate"}`}
            >
              {/* Todo */}
              {affair.type === "todo" &&
                i + 1 - eventNumber + maxEventOrder + 1 <= 5 && (
                  <>
                    {affair.isDone ? (
                      <span className="items-center pl-1">
                        <AiFillHeart color="brown" size={14} />
                      </span>
                    ) : (
                      <span className="items-center pl-1 text-xs">
                        {isHalfDay && new Date(affair.time2).getHours() > 12
                          ? new Date(affair.time2).getHours() - 12
                          : new Date(affair.time2).getHours()}
                        {new Date(affair.time2).getMinutes() === 0
                          ? "."
                          : ":" +
                            new Date(affair.time2).getMinutes().toString()}
                      </span>
                    )}
                    <span className="items-center pl-0.5 text-xs">
                      {affair.title}
                    </span>
                  </>
                )}

              {/* Event */}
              {/* visible starting day/Month 1st */}
              {affair.type === "event" &&
                affair.order < 5 &&
                (cellDayNumber === getDayNumber(affair.time1) ||
                  cellDisplayDate === 1) && (
                  <span
                    className={`absolute flex max-h-3.5 items-center truncate text-nowrap rounded-sm pl-1 text-xs bg-[${affair.color}]`}
                    style={{
                      width:
                        screenWidthCSS.current[
                          Math.min(
                            6,
                            getDayNumber(affair.time2) - cellDayNumber,
                            lastDayOfMonthDayNumber - cellDayNumber,
                          )
                        ],
                    }}
                  >
                    {affair.title}
                  </span>
                )}

              {/* visible non-starting Sunday */}
              {affair.type === "event" &&
                affair.order < 5 &&
                getDateFromDayNumber(cellDayNumber).getDay() === 0 &&
                cellDayNumber > getDayNumber(affair.time1) &&
                cellDayNumber <= getDayNumber(affair.time2) &&
                cellDisplayDate !== 1 && (
                  <span
                    className={`absolute flex max-h-3.5 rounded-sm text-xs text-transparent bg-[${affair.color}]`}
                    style={{
                      width:
                        screenWidthCSS.current[
                          Math.min(
                            getDayNumber(affair.time2) - cellDayNumber,
                            6,
                            lastDayOfMonthDayNumber - cellDayNumber,
                          )
                        ],
                    }}
                  >
                    {"blank"}
                  </span>
                )}

              {/* blocked dummy block */}
              {affair.type === "event" && affair.order < 5 && (
                <span className="text-xs text-transparent">{"dummy"}</span>
              )}
            </div>
          </>
        ))}
    </div>
  );
}
