import { useRouter } from "next/navigation";

import useDummy from "@/hooks/useDummy";

export default function MonthCell({
  firstDayOfMonth,
  index,
}: {
  firstDayOfMonth: Date;
  index: number;
}) {
  const router = useRouter();
  const { dummy } = useDummy();

  const year = firstDayOfMonth.getFullYear();
  const month = firstDayOfMonth.getMonth();
  const offset = firstDayOfMonth.getDay();
  const cellDate = index + 1 - offset;
  const cellDateString = new Date(year, month, cellDate).toLocaleDateString(
    "en-US",
  );

  return (
    <div
      className="flex h-full w-full flex-col gap-y-1"
      onClick={() => router.push("/day")}
    >
      <div className="flex justify-center text-sm text-white">{cellDate}</div>
      {dummy[cellDateString] &&
        dummy[cellDateString].map((ele, i) => (
          <div
            key={ele.id + i.toString()}
            className="max-h-4 rounded-sm pl-1 text-xs text-zinc-200 "
            style={{ backgroundColor: ele.color }}
          >
            {ele.type === "todo" && (
              <>
                {ele.time2.getHours()}.{ele.title}
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
