import { useRouter } from "next/navigation";

import type { dbAffair } from "@/lib/types";
import { days } from "@/lib/utils";

type DayRowProps = {
  rowDisplayDate: Date;
  rowDayNumber: number;
  rowDbAffairs: dbAffair[] | null;
};

export default function DayRow({
  rowDisplayDate,
  rowDayNumber,
  rowDbAffairs,
}: DayRowProps) {
  const router = useRouter();

  const rowAffairs: { [order: number]: dbAffair } = {};
  if (rowDbAffairs) {
    rowDbAffairs.map((dbAffair, i) => {
      // Event
      if (dbAffair.type === "event") {
        rowAffairs[dbAffair.order] = dbAffair;
      }
      // To-do
      if (dbAffair.type === "todo" && i === 0) {
        // special case: the first affair is a todo
        rowDbAffairs[0]["order"] = 0;
        rowAffairs[dbAffair.order] = dbAffair;
      }
      if (dbAffair.type === "todo" && i > 0) {
        rowDbAffairs[i]["order"] = rowDbAffairs[i - 1]["order"] + 1;
        rowAffairs[dbAffair.order] = dbAffair;
      }
    });
  }

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
            {i === 0 && ( // first cell displays the actual data
              <div
                className="flex flex-col items-center justify-center text-sm text-gray-300"
                onClick={() => router.push(`/day/${rowDayNumber}`)}
              >
                <div>{days[rowDisplayDate.getDay()]}</div>
                <div>
                  {rowDisplayDate.getMonth() + 1}/{rowDisplayDate.getDate()}
                </div>
              </div>
            )}
            {i > 0 &&
              rowAffairs &&
              rowAffairs[i - 1] && ( // normal cell
                <div
                  className={`h-full w-full text-zinc-900 bg-[${rowAffairs[i - 1].color}]`}
                >
                  {rowAffairs[i - 1].title}
                </div>
              )}
            {i > 0 &&
              (!rowAffairs || !rowAffairs[i - 1]) && ( // empty cell
                <div></div>
              )}
          </div>
        ))}
    </div>
  );
}
