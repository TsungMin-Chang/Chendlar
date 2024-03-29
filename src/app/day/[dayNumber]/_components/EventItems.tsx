// this is a server side component
import type { dbAffair } from "@/lib/types";

type EventItemsProps = {
  events: dbAffair[];
};

export default function EventItems({ events }: EventItemsProps) {
  console.log(events);

  return (
    <>
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-row items-center justify-center rounded-full bg-[#473520] p-2"
        >
          <div className="flex items-center pl-2 text-zinc-200">
            {event.title}
          </div>
          <div className="grow"></div>
          <div className="flex items-center pr-2 text-sm text-zinc-200">
            {event.time1.getFullYear === new Date().getFullYear
              ? event.time1.toLocaleDateString("en-GB", {
                  month: "short",
                  day: "numeric",
                })
              : event.time1.toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
            -{" "}
            {event.time2.getFullYear === new Date().getFullYear
              ? event.time2.toLocaleDateString("en-GB", {
                  month: "short",
                  day: "numeric",
                })
              : event.time2.toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
          </div>
        </div>
      ))}
    </>
  );
}
