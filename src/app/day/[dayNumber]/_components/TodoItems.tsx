// server side component
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

export default function TodoItems() {
  return (
    <>
      {/* wil be using map function */}
      <div 
        className="flex flex-row items-center justify-center border-2 border-[#4F4132] rounded-full p-2"
      >
        <div className="pr-2">
          <AiFillHeart color="brown" size={20} />
        </div>
        <div className="flex items-center">4:50 看電影</div>
        <div className="grow"></div>
        <div className="pl-1 z-10">
          <TiDelete color="black" size={22} />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center border-2 border-[#4F4132] rounded-full p-2">
        <div className="pr-2">
          <AiOutlineHeart color="black" size={20} />
        </div>
        <div className="flex items-center">7:30 看電影</div>
        <div className="grow"></div>
        <div className="pl-1 z-10">
          <TiDelete color="black" size={22} />
        </div>
      </div>
    </>
  );
}
