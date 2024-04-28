import { useState } from "react";
import { GiPencil } from "react-icons/gi";
import { TiDelete } from "react-icons/ti";

import useCard from "@/hooks/useCard";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";

import type { DbMemo } from "@/lib/types";

type CategoryCardProps = {
  cardName: string;
  memos: DbMemo[];
  onRefreshCards : () => void;
};

export default function CategoryCard({ cardName, memos, onRefreshCards }: CategoryCardProps) {
  const { updateCard } = useCard();

  const [isEditing, setIsEditing] = useState(cardName.slice(0, 9) === "initialDB");
  const [expandingMemoIds, setExpandingMemoIds] = useState<string[]>([]);
  const [updatingMemo, setUpdatingMemo] = useState<DbMemo[]>(memos ?? []);
  const [updatingCardName, setUpdatingCardName] = useState(cardName ?? "");

  const handlePencilBtn = async () => {
    setIsEditing((prev) => !prev);
    if (updatingCardName !== cardName) {
      const data = {prevName: cardName, name: updatingCardName};
      await updateCard(data);
      onRefreshCards();
    }
  }

  return (
    <div
      key={cardName}
      className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3"
    >
      <div className="flex flex-row justify-between">
        {/* Card Name */}
        {isEditing ? (
          <ClickAwayListener onClickAway={() => {}} className="grow">
            <Input
              defaultValue={
                updatingCardName.slice(0, 9) === "initialDB"
                  ? ""
                  : updatingCardName
              }
              onChange={(e) => setUpdatingCardName(e.target.value)}
              className="w-full pl-1 text-lg font-bold text-zinc-200 "
              placeholder="Category"
            />
          </ClickAwayListener>
        ) : (
          <div className="pb-1 text-lg font-bold text-zinc-200">
            {cardName.slice(0, 9) === "initialDB" ? "" : cardName}
          </div>
        )}

        {/* Edit Button */}
        <button className="pr-2" onClick={() => handlePencilBtn()}>
          <GiPencil size={28} color="pink" />
        </button>
      </div>

      {memos.map((memo, i) => (
        <div key={memo.id} className="flex flex-col">
          <div className="flex flex-row items-center rounded-full bg-[#473520] p-2">
            {/* delete button */}
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

      {/* Add Memo Button */}
      {isEditing && (
        <button
          // onClick={handleClick}
          className="rounded-lg border-2 border-zinc-400 bg-[#473520] p-2 font-semibold text-white transition-all duration-300"
        >
          + Memo
        </button>
      )}
    </div>
  );
}
