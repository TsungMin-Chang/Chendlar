// server side component
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import type { dbAffair } from "@/lib/types";

type TodoItemsProps = {
  todos: dbAffair[];
};

export default function TodoItems({todos}: TodoItemsProps) {
  console.log(todos);
  return (
    <>
      {/* wil be using map function */}
      <div className="flex flex-row items-center justify-center rounded-full bg-[#473520] p-2">
        <div className="pr-2">
          <AiFillHeart color="brown" size={20} />
        </div>
        <div className="flex items-center text-zinc-200">4:50 看電影</div>
        <div className="grow"></div>
        <div className="z-10 pl-1">
          <TiDelete color="gray" size={22} />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center rounded-full bg-[#473520] p-2">
        <div className="pr-2">
          <AiOutlineHeart color="black" size={20} />
        </div>
        <div className="flex items-center text-zinc-200">7:30 看電影</div>
        <div className="grow"></div>
        <div className="z-10 pl-1">
          <TiDelete color="gray" size={22} />
        </div>
      </div>
    </>
  );
}
