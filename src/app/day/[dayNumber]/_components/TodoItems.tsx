// this is a server side component
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

import type { dbAffair } from "@/lib/types";

type TodoItemsProps = {
  todos: dbAffair[];
};

export default function TodoItems({ todos }: TodoItemsProps) {
  return (
    <>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex flex-row items-center justify-center rounded-full bg-[#473520] p-2"
        >
          <div className="pr-2">
            {todo.isDone ? (
              <AiFillHeart color={todo.color + "E5"} size={20} />
            ) : (
              <AiOutlineHeart color={todo.color + "E5"} size={20} />
            )}
          </div>
          <div className="flex items-center text-zinc-200">
            {new Date(todo.time2).getHours()}:
            {new Date(todo.time2).getMinutes()} {todo.title}
          </div>
          <div className="grow"></div>
          <div className="z-10 pl-1">
            <TiDelete color="gray" size={22} />
          </div>
        </div>
      ))}
    </>
  );
}
