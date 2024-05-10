import type { DbAffair } from "@/lib/types";
import { getDayNumber } from "@/lib/utils";

import DayCell from "./DayCell";

type MonthCellsProps = {
  firstDayOfMonth: Date;
  lastDayOfMonth: Date;
  monthData: {
    [dayNumber: number]: DbAffair[];
  } | null;
};

export default function MonthCells({
  firstDayOfMonth,
  lastDayOfMonth,
  monthData,
}: MonthCellsProps) {
  const year = firstDayOfMonth.getFullYear();
  const month = firstDayOfMonth.getMonth();
  const offset = firstDayOfMonth.getDay();

  return (
    <div className="grid grid-cols-7 grid-rows-6" style={{ height: "88.5vh" }}>
      {Array(42)
        .fill(0)
        .map((_, i) => (
          <div
            key={"outterBox" + i.toString()}
            className="overflow-y-hidden border border-[#5a524f]"
          >
            {i >= firstDayOfMonth.getDay() &&
              i < firstDayOfMonth.getDay() + lastDayOfMonth.getDate() && (
                <DayCell
                  key={i + 1 - offset}
                  cellDisplayDate={i + 1 - offset}
                  cellDayNumber={getDayNumber(
                    new Date(year, month, i + 1 - offset),
                  )}
                  cellAffairs={
                    monthData &&
                    monthData[
                      getDayNumber(new Date(year, month, i + 1 - offset))
                    ]
                      ? monthData[
                          getDayNumber(new Date(year, month, i + 1 - offset))
                        ]
                      : null
                  }
                  lastDayOfMonthDayNumber={getDayNumber(lastDayOfMonth)}
                />
              )}
          </div>
        ))}
    </div>
  );
}
