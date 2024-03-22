import type { dbAffair } from "@/lib/types";
import { getDayNumber } from "@/lib/utils";

import MonthCell from "./MonthCell";

type MonthCellsProps = {
  firstDayOfMonth: Date;
  lastDayOfMonth: Date;
  monthData: {
    [dayNumber: number]: dbAffair[];
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
    <div className="grid grid-cols-7 grid-rows-6" style={{ height: "88vh" }}>
      {Array(42)
        .fill(0)
        .map((_, i) => (
          <div
            key={"outterBox" + i.toString()}
            className="overflow-hidden border border-[#4E4743]"
          >
            {i >= firstDayOfMonth.getDay() &&
              i < firstDayOfMonth.getDay() + lastDayOfMonth.getDate() && (
                <MonthCell
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
                />
              )}
          </div>
        ))}
    </div>
  );
}
