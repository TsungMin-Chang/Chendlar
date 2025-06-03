// this is a server side component
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import type { DbAffair } from "@/lib/types";
import { getTaipeiDate } from "@/lib/utils";

import { heartTodo, deleteTodo } from "./actions";

type TodoCardProps = {
  todos: DbAffair[];
  dayNumberInt: number;
  isHalfDay: boolean;
  accessToken: string;
};

export default function TodoCard({
  todos,
  dayNumberInt,
  isHalfDay,
  accessToken,
}: TodoCardProps) {
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
              redirect(
                `/day/${dayNumberInt}/?isHalfDay=${isHalfDay}&accessToken=${accessToken}`,
              );
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
                query: { editAffairId: todo.id, isHalfDay, accessToken },
              }}
            >
              <div className="justify-self-start text-zinc-200">
                <span className="text-nowrap">
                  {isHalfDay && getTaipeiDate(todo.time2).getHours() > 12
                    ? getTaipeiDate(todo.time2).getHours() - 12
                    : getTaipeiDate(todo.time2).getHours()}
                  {":"}
                  {getTaipeiDate(todo.time2)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}{" "}
                  {isHalfDay &&
                    (getTaipeiDate(todo.time2).getHours() >= 12 ? "PM" : "AM")}
                </span>
                <span className="pl-2">{todo.title}</span>
              </div>
            </Link>
          </div>

          {/* delete */}
          <form
            className="flex"
            action={async () => {
              "use server";
              if (!accessToken) return;
              await deleteTodo(todo.id, accessToken);
              revalidatePath(`/day/${dayNumberInt}`);
              redirect(
                `/day/${dayNumberInt}/?isHalfDay=${isHalfDay}&accessToken=${accessToken}`,
              );
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
