// this is a server side component
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import type { dbAffair } from "@/lib/types";

import { heartTodo, deleteTodo } from "./actions";

type TodoItemsProps = {
  todos: dbAffair[];
  dayNumberInt: number;
  isHalfDay: boolean;
};

export default function TodoItems({
  todos,
  dayNumberInt,
  isHalfDay,
}: TodoItemsProps) {
  return (
    <>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex flex-row items-center justify-between rounded-full bg-[#473520] p-2"
        >
          {/* heart */}
          <form
            className="flex"
            action={async () => {
              "use server";
              await heartTodo(todo.id, todo.isDone);
              revalidatePath(`/day/${dayNumberInt}`);
              redirect(`/day/${dayNumberInt}/?isHalfDay=${isHalfDay}`);
            }}
          >
            <button className="z-10 pr-2" type={"submit"}>
              {todo.isDone ? (
                <AiFillHeart color={todo.color + "E5"} size={20} />
              ) : (
                <AiOutlineHeart color={todo.color + "E5"} size={20} />
              )}
            </button>
          </form>

          {/* edit dialog */}
          <div className="grow">
            <Link
              href={{
                pathname: `/day/${dayNumberInt}`,
                query: { editAffairId: todo.id, isHalfDay },
              }}
            >
              <div className="justify-self-start text-zinc-200">
                {isHalfDay && new Date(todo.time2).getHours() > 12
                  ? new Date(todo.time2).getHours() - 12
                  : new Date(todo.time2).getHours()}
                {":"}
                {new Date(todo.time2)
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}{" "}
                {isHalfDay &&
                  (new Date(todo.time2).getHours() > 12 ? "pm" : "am")}{" "}
                {todo.title}
              </div>
            </Link>
          </div>

          {/* delete */}
          <form
            className="flex"
            action={async () => {
              "use server";
              await deleteTodo(todo.id);
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
