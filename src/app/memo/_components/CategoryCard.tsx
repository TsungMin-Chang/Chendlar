import { useState } from "react";
import { TiDelete } from "react-icons/ti";

import { Icon } from "@iconify/react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";

import type { DbMemo } from "@/lib/types";

type CategoryCardProps = {
  catName: string;
  memos: DbMemo[];
};

export default function CategoryCard({ catName, memos }: CategoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [expandingMemoIds, setExpandingMemoIds] = useState<string[]>([]);
  const [updatingMemo, setUpdatingMemo] = useState<DbMemo[]>(memos ?? []);
  const [updatingCatName, setUpdatingCatName] = useState(catName ?? "");

  console.log(updatingMemo);

  return (
    <div
      key={catName}
      className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3"
    >
      <div className="flex flex-row justify-between">
        {isEditing ? (
          <ClickAwayListener onClickAway={() => {}} className="grow">
            <Input
              defaultValue={updatingCatName}
              onChange={(e) => setUpdatingCatName(e.target.value)}
              className="w-full pl-1 text-lg font-bold text-zinc-200 "
              placeholder="Category"
            />
          </ClickAwayListener>
        ) : (
          <div className="pb-1 text-lg font-bold text-zinc-200">{catName}</div>
        )}

        <button className="pr-2" onClick={() => setIsEditing((prev) => !prev)}>
          <Icon icon="fluent-emoji:pencil" style={{ fontSize: "28px" }} />
        </button>
      </div>

      {memos.map((memo, i) => (
        <div key={memo.id} className="flex flex-col">
          <div className="flex flex-row items-center rounded-full bg-[#473520] p-2">
            {/* delete btn */}
            {isEditing && (
              <div className="flex">
                <button className="z-10 grow pl-1">
                  <TiDelete color="brown" size={22} />
                </button>
              </div>
            )}

            {/* title */}
            <div className="flex grow pl-2">
              {isEditing ? (
                <ClickAwayListener onClickAway={() => {}} className="grow">
                  <Input
                    defaultValue={updatingMemo[i].title}
                    onChange={(e) =>
                      setUpdatingMemo((prev) => {
                        prev[i].title = e.target.value;
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

            {/* expand btn */}
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

          {/* description */}
          {expandingMemoIds.includes(memo.id) && isEditing && (
            <FormControl>
              <TextField
                className="mt-2"
                defaultValue={updatingMemo[i].description}
                onChange={(e) =>
                  setUpdatingMemo((prev) => {
                    prev[i].description = e.target.value;
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
          {expandingMemoIds.includes(memo.id) && !isEditing && (
            <div className="p-1 px-3">{memo.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}
