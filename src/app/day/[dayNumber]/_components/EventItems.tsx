// server side component
import type { dbAffair } from "@/lib/types";

type EventItemsProps = {
  events: dbAffair[];
};

export default function EventItems({events}: EventItemsProps) {
  console.log(events);

  return (
    <>
      {/* wil be using map function */}
      <div className="flex flex-row items-center justify-center rounded-full bg-[#473520] p-2">
        <div className="flex items-center pl-2 text-zinc-200">爬玉山</div>
        <div className="grow"></div>
        <div className="flex items-center pr-2 text-sm text-zinc-200">
          2023/3/1 - 2024/3/1
        </div>
      </div>

      <div className="flex flex-row items-center justify-center rounded-full bg-[#473520] p-2">
        <div className="flex items-center pl-2 text-zinc-200">爬玉山</div>
        <div className="grow"></div>
        <div className="flex items-center pr-2 text-sm text-zinc-200">
          2023/3/1 - 2024/3/1
        </div>
      </div>
    </>
  );
}
