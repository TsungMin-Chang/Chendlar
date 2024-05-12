// this is a server side component
// TODO: long format
import { TiDelete } from "react-icons/ti";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import type { DbAffair } from "@/lib/types";

import { deleteEvent } from "./actions";

type EventCardProps = {
  events: DbAffair[];
  dayNumberInt: number;
  isHalfDay: boolean;
};

export default function EventCard({
  events,
  dayNumberInt,
  isHalfDay,
}: EventCardProps) {
  return (
    <>
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-row items-center justify-between rounded-full bg-[#473520] p-2"
        >
          {/* edit dialog */}
          <div className="grow">
            <Link
              href={{
                pathname: `/day/${dayNumberInt}`,
                query: { editAffairId: event.id, isHalfDay },
              }}
            >
              <div className="flex flex-row items-center justify-between">
                <div className="pl-2 text-zinc-200">{event.title}</div>
                <div className="flex items-center text-nowrap pr-2 text-sm text-zinc-200">
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
            </Link>
          </div>

          {/* delete */}
          <form
            className="flex"
            action={async () => {
              "use server";
              await deleteEvent(
                event.title,
                event.order,
                event.time1,
                event.time2,
              );
              revalidatePath(`/day/${dayNumberInt}`);
              redirect(`/day/${dayNumberInt}/?isHalfDay=${isHalfDay}`);
            }}
          >
            <button className="z-10 grow pl-1" type={"submit"}>
              <TiDelete color="gray" size={22} />
            </button>
          </form>
        </div>
      ))}
    </>
  );
}
