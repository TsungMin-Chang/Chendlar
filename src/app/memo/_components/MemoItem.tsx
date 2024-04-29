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
  isEditing: boolean;
  updatingDbMemos?: DbMemo[];
  setUpdatingDbMemos?: Dispatch<SetStateAction<DbMemo[]>>;
  addedNewMemos?: DbMemo[];
  setAddedNewMemos?: Dispatch<SetStateAction<DbMemo[]>>;
  expandingMemoIds: string[];
  setExpandingMemoIds: Dispatch<SetStateAction<string[]>>;
};

export default function Memo({
  memo,
  index,
  isEditing,
  updatingDbMemos,
  setUpdatingDbMemos,
  addedNewMemos,
  setAddedNewMemos,
  expandingMemoIds,
  setExpandingMemoIds,
}: MemoProps) {
  return (
    <div key={memo.id} className="flex flex-col">
      <div className="flex flex-row items-center rounded-full bg-[#473520] p-2">
        {/* delete memo button */}
        {isEditing && (
          <div className="flex">
            <button className="z-10 grow pl-1">
              <TiDelete color="brown" size={22} />
            </button>
          </div>
        )}

        {/* memo title */}
        <div className="flex grow pl-2">
          {/* editing update-memo-array */}
          {updatingDbMemos && setUpdatingDbMemos && isEditing && (
            <ClickAwayListener onClickAway={() => {}} className="grow">
              <Input
                defaultValue={updatingDbMemos[index].title}
                onChange={(e) =>
                  setUpdatingDbMemos((prev) => {
                    prev[index].title = e.target.value;
                    return prev;
                  })
                }
                className="w-full pl-1 text-zinc-200"
                placeholder="Title"
              />
            </ClickAwayListener>
          )}

          {/* editing add-memo-array */}
          {addedNewMemos && setAddedNewMemos && isEditing && (
            <ClickAwayListener onClickAway={() => {}} className="grow">
              <Input
                defaultValue={addedNewMemos[index].title}
                onChange={(e) =>
                  setAddedNewMemos((prev) => {
                    prev[index].title = e.target.value;
                    return prev;
                  })
                }
                className="w-full pl-1 text-zinc-200"
                placeholder="Title"
              />
            </ClickAwayListener>
          )}

          {/* not editing */}
          {!isEditing && (
            <div className="w-full text-zinc-200">{memo.title}</div>
          )}
        </div>

        {/* expand button */}
        <div className="flex">
          <button
            className="z-10 grow pl-1"
            onClick={() => {
              expandingMemoIds.includes(memo.id)
                ? setExpandingMemoIds((prev) => {
                    return prev.filter((ele) => ele !== memo.id);
                  })
                : setExpandingMemoIds((prev) => [...prev, memo.id]);
            }}
          >
            {expandingMemoIds.includes(memo.id) ? (
              <ExpandLessIcon sx={{ color: "rgb(228 228 231)" }} />
            ) : (
              <ExpandMoreIcon sx={{ color: "rgb(228 228 231)" }} />
            )}
          </button>
        </div>
      </div>

      {/* memo description */}

      {/* editing update-memo-array */}
      {updatingDbMemos &&
        setUpdatingDbMemos &&
        expandingMemoIds.includes(memo.id) &&
        isEditing && (
          <FormControl>
            <TextField
              className="mt-2"
              defaultValue={updatingDbMemos[index].description}
              onChange={(e) =>
                setUpdatingDbMemos((prev) => {
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
        )}

      {/* editing add-memo-array */}
      {addedNewMemos &&
        setAddedNewMemos &&
        expandingMemoIds.includes(memo.id) &&
        isEditing && (
          <FormControl>
            <TextField
              className="mt-2"
              defaultValue={addedNewMemos[index].description}
              onChange={(e) =>
                setAddedNewMemos((prev) => {
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
        )}

      {/* not editing */}
      {expandingMemoIds.includes(memo.id) && !isEditing && (
        <div className="p-1 px-3">{memo.description}</div>
      )}
    </div>
  );
}
