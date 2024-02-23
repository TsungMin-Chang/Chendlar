// server side component
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

import Checkbox from "@mui/material/Checkbox";

export default function DayPage() {
  return (
    <div
      className="flex flex-col gap-y-5 bg-[#442B0D] px-10 py-5"
      style={{ height: "94vh" }}
    >
      <div className="flex flex-col gap-y-4 bg-[#ABA8A8] px-6 py-3">
        <div className="m-2 text-lg font-bold">Date</div>

        {/* To do */}
        <div className="rounded-md border bg-[#99887F] p-2">
          <div className="m-2 text-lg font-bold">To do</div>

          <div className="flex flex-row items-center justify-center">
            ☑️
            <div className="flex items-center">看電影</div>
            <div className="grow"></div>
            <div className="p-1">
              <MdEdit color="green" size={20} />
            </div>
            <div className="p-1">
              <FaTrash color="red" size={16} />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row gap-x-1">
              <Checkbox checked={true} />
              <div className="flex items-center">看電影</div>
            </div>
            <div className="grow"></div>
            <div className="p-1">
              <MdEdit color="green" size={20} />
            </div>
            <div className="p-1">
              <FaTrash color="red" size={16} />
            </div>
          </div>
        </div>

        {/* Event */}
        <div className=" rounded-md border bg-[#8C8784] p-2">
          <div className="text-base font-bold">Event</div>
        </div>
      </div>
    </div>
  );
}
