import type { Dispatch, SetStateAction } from "react";
import { TiDelete } from "react-icons/ti";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";

import type { DbMemo } from "@/lib/types";

type MemoProps = {
  memo: DbMemo;
  index: number;
  isCardEditing: boolean;
  setWorkingMemoArray: Dispatch<SetStateAction<DbMemo[]>>;
  isExpanded: boolean;
  setIsExpanded: () => void;
  deleteAction: () => void;
};

export default function Memo({
  memo,
  index,
  isCardEditing,
  setWorkingMemoArray,
  isExpanded,
  setIsExpanded,
  deleteAction,
}: MemoProps) {
  return (
    <div key={memo.id} className="flex flex-col">
      <div className="flex flex-row items-center rounded-full bg-[#473520] p-2">
        {/* delete memo button */}
        {isCardEditing && (
          <div className="flex">
            <button className="z-10 grow pl-1" onClick={deleteAction}>
              <TiDelete color="brown" size={22} />
            </button>
          </div>
        )}

        {/* memo title */}
        <div className="flex grow pl-2">
          {/* editing */}
          {isCardEditing ? (
            <ClickAwayListener onClickAway={() => {}} className="grow">
              <Input
                defaultValue={memo.title}
                onChange={(e) =>
                  setWorkingMemoArray((prev) => {
                    prev[index].title = e.target.value;
                    return prev;
                  })
                }
                className="w-full pl-1 text-zinc-200"
                placeholder="Title"
              />
            </ClickAwayListener>
          ) : (
            <div className="w-full text-zinc-200">{memo.title}</div>
          )}
        </div>

        {/* expand button */}
        <div className="flex">
          <button className="z-10 grow pl-1" onClick={setIsExpanded}>
            {isExpanded ? (
              <ExpandLessIcon sx={{ color: "rgb(228 228 231)" }} />
            ) : (
              <ExpandMoreIcon sx={{ color: "rgb(228 228 231)" }} />
            )}
          </button>
        </div>
      </div>

      {/* memo description */}
      {/* editing */}
      {isExpanded &&
        (isCardEditing ? (
          <FormControl>
            <TextField
              className="mt-2"
              defaultValue={memo.description}
              onChange={(e) =>
                setWorkingMemoArray((prev) => {
                  prev[index].description = e.target.value;
                  return prev;
                })
              }
              label="Description"
              variant="outlined"
              multiline
              rows={2}
            />
          </FormControl>
        ) : (
          <div className="p-1 px-3">{memo.description}</div>
        ))}
    </div>
  );
}
