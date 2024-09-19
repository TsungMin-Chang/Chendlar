import { useState } from "react";

import DeleteDialog from "./DeleteDialog";

type SpendingItemProps = {
  title: string;
  id: string;
  kor: number;
  tw: number;
  onRefresh: () => void;
};

export default function SpendingItem({
  id,
  title,
  kor,
  tw,
  onRefresh,
}: SpendingItemProps) {
  const [openDel, setOpenDel] = useState(false);

  const [inputCountry, setInputcountry] = useState("");
  return (
    <>
      <div className={`flex flex-col`}>
        <div className="flex flex-row items-center gap-x-1 text-white">
          {/* title */}
          <div
            className="flex w-1/2 justify-start rounded-lg bg-[#473520] p-2 pl-4"
            onClick={() => {
              setOpenDel(true);
              setInputcountry("");
            }}
          >
            {title}
          </div>
          {/* kor $*/}
          <div
            className="flex w-1/4 justify-center rounded-lg bg-[#473520] p-2"
            onClick={() => {
              setOpenDel(true);
              setInputcountry("kor");
            }}
          >
            {kor}
          </div>
          {/* tw $*/}
          <div
            className="flex w-1/4 justify-center rounded-lg bg-[#473520] p-2"
            onClick={() => {
              setOpenDel(true);
              setInputcountry("tw");
            }}
          >
            {tw}
          </div>
        </div>
      </div>
      <DeleteDialog
        open={openDel}
        onClose={() => setOpenDel(false)}
        time={(new Date()).getTime()}
        inputCountry={inputCountry}
        dbId={id}
        dbTitle={title}
        dbTw={tw}
        dbKor={kor}
        onRefresh={onRefresh}
      />
    </>
  );
}
