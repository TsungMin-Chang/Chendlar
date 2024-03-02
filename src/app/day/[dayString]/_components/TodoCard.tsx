// server side component
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

export default function TodoCard() {
  return (
    <>
      <div className="flex flex-row items-center justify-center rounded-full border p-2">
        <div className="pr-2">
          <AiFillHeart color="brown" size={20} />
        </div>
        <div className="flex items-center">看電影</div>
        <div className="grow"></div>
        <div className="z-10 pl-1">
          <TiDelete color="black" size={22} />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center rounded-full border p-2">
        <div className="pr-2">
          <AiOutlineHeart color="black" size={20} />
        </div>
        <div className="flex items-center">看電影</div>
        <div className="grow"></div>
        <div className="z-10 pl-1">
          <TiDelete color="black" size={22} />
        </div>
      </div>
    </>
  );
}
