import useDummy from "@/hooks/useDummy";
// for dummy use, will delete later
import type { dbAffair } from "@/lib/types";
import { getDayNumber } from "@/lib/utils";

import DayRow from "./DayRow";

type WeekCellsProps = {
  firstDayOfWeek: Date;
  weekData: {
    [dayNumber: number]: dbAffair[];
  } | null;
};

export default function WeekCells({
  firstDayOfWeek,
  weekData,
}: WeekCellsProps) {
  const { dummy } = useDummy(); // for dummy use, will delete later

  const year = firstDayOfWeek.getFullYear();
  const month = firstDayOfWeek.getMonth();
  const firstDayOfWeekDate = firstDayOfWeek.getDate();

  return (
    <div className="grid grid-rows-7 bg-[#442B0D]" style={{ height: "94vh" }}>
      {Array(7)
        .fill(0)
        .map((_, i) => (
          <DayRow
            key={"dayRow" + i.toString()}
            rowDisplayDate={new Date(year, month, firstDayOfWeekDate + i)}
            rowDayNumber={getDayNumber(
              new Date(year, month, firstDayOfWeekDate + i),
            )}
            rowAffairs={
              weekData &&
              weekData[
                getDayNumber(new Date(year, month, firstDayOfWeekDate + i))
              ]
                ? weekData[
                    getDayNumber(new Date(year, month, firstDayOfWeekDate + i))
                  ]
                : null
            }
            data={
              // for dummy use, will delete later
              dummy[
                new Date(
                  year,
                  month,
                  firstDayOfWeekDate + i,
                ).toLocaleDateString("en-US")
              ] ?? null
            }
          />
        ))}
    </div>
  );
}
