import { useState, useRef } from "react";
import { TiDelete } from "react-icons/ti";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Input from "@mui/material/Input";

import type { DbMemo } from "@/lib/types";

type CategoryCardProps = {
  catName: string;
  memos: DbMemo[];
  isEditing: boolean;
};

export default function CategoryCard({
  catName,
  memos,
  isEditing,
}: CategoryCardProps) {
  const [expandingMemoIds, setExpandingMemoIds] = useState<string[]>([]);
  const textfield = useRef<HTMLInputElement>(null);

  return (
    <div
      key={catName}
      className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3"
    >
      <div className="pb-1 text-lg font-bold text-zinc-200">{catName}</div>
      {memos.map((memo) => (
        <div key={memo.id} className="flex flex-col">
          <div className="flex flex-row items-center justify-between rounded-full bg-[#473520] p-2">
            {/* delete */}
            {isEditing && (
              <div className="flex-none flex">
                <button className="z-10 grow pl-1" type={"submit"}>
                  <TiDelete color="brown" size={22} />
                </button>
              </div>
            )}

            {/* title */}
            <div className="pl-2">
            {isEditing ? (
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  value={memo.title}
                  // onChange={(e) => setNewName(e.target.value ?? name)}
                  className="grow"
                  placeholder="Title"
                />
              </ClickAwayListener>
            ) : (
              <>
              <div className="text-zinc-200">
                {memo.title}
              </div>
              <div className="grow" />
              </>
            )}
            </div>

            {/* expand */}
            <div className="flex-none flex">
              <button
                className="z-10 grow pl-1"
                type={"submit"}
                onClick={() => {
                  expandingMemoIds.includes(memo.id)
                    ? setExpandingMemoIds((prev) => {
                        return prev.filter((ele) => ele !== memo.id);
                      })
                    : setExpandingMemoIds((prev) => [...prev, memo.id]);
                }}
              >
                <ExpandMoreIcon sx={{ color: "rgb(228 228 231)" }} />
              </button>
            </div>
          </div>

          {/* description */}
          {expandingMemoIds.includes(memo.id) && isEditing && (
            <FormControl>
              <TextField
                className="mt-2"
                defaultValue={memo.description}
                inputRef={textfield}
                label="Description"
                variant="outlined"
                multiline
                rows={2}
              />
            </FormControl>
          )}
          {expandingMemoIds.includes(memo.id) && !isEditing && (
            <div className="p-1 px-3">{memo.description}</div>
          )}

        </div>
      ))}
    </div>
  );
}
