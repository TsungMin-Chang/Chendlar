// server side component
import TodoItems from "./[dayNumber]/_components/TodoItems";
import EventItems from "./[dayNumber]/_components/EventItems";

export default function DayPage() {
  return (
    <div
      className="flex flex-col gap-y-5 bg-[#442B0D] px-10 py-5"
      style={{ height: "94vh" }}
    >
      <div className="flex flex-col gap-y-6">
        {/* Day Date */}
        <div className="m-2 text-lg font-bold text-white">July 24, 2024</div>

        {/* To do */}
        <div className="flex flex-col gap-y-2 rounded-lg bg-[#99887F] p-4 pb-6">
          <div className="text-md pb-1 font-bold">To do</div>
          <TodoItems />
        </div>

        {/* Event */}
        <div className="flex flex-col gap-y-2 rounded-lg bg-[#8C8784] p-4 pb-6">
          <div className="text-md pb-1 font-bold">Event</div>
          <EventItems/>
          
        </div>
      </div>
    </div>
  );
}
