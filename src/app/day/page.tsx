// server side component
import EventItems from "./[dayNumber]/_components/EventItems";
import TodoItems from "./[dayNumber]/_components/TodoItems";

export default function DayPage() {
  return (
    <div
      className="flex flex-col gap-y-5 bg-[#442B0D] px-10 py-5"
      style={{ height: "94vh" }}
    >
      <div className="flex flex-col gap-y-6">
        {/* Day Date */}
        <div className="ml-2 text-lg font-bold text-zinc-200">July 24, 2024</div>

        {/* To do */}
        <div className="flex flex-col gap-y-2 rounded-lg bg-[#634d3f] border-1 border-black p-4 pb-6 pt-3">
          <div className="text-lg pb-1 font-bold text-zinc-200">To do</div>
          <TodoItems />
        </div>

        {/* Event */}
        <div className="flex flex-col gap-y-2 rounded-lg bg-[#634d3f] border-1 border-black p-4 pb-6 pt-3">
          <div className="text-lg pb-1 font-bold text-zinc-200">Event</div>
          <EventItems />
        </div>
      </div>
    </div>
  );
}
