import { useState } from "react";
import { GiPencil } from "react-icons/gi";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";

import useCard from "@/hooks/useCard";
import type { DbMemo } from "@/lib/types";

import MemoItem from "./MemoItem";

type CategoryCardProps = {
  cardName: string;
  memos: DbMemo[];
  onRefreshCards: () => void;
};

export default function CategoryCard({
  cardName,
  memos,
  onRefreshCards,
}: CategoryCardProps) {
  const { updateCard } = useCard();

  const [isEditing, setIsEditing] = useState(
    cardName.slice(0, 9) === "initialDB",
  );

  const [updatingCardName, setUpdatingCardName] = useState(cardName ?? "");

  const [updatingDbMemos, setUpdatingDbMemos] = useState<DbMemo[]>(memos ?? []);
  const [expandingMemoIds, setExpandingMemoIds] = useState<string[]>([]);
  const [addedNewMemos, setAddedNewMemos] = useState<DbMemo[]>([]);

  const handlePencilBtn = async () => {
    setIsEditing((prev) => !prev);
    if (updatingCardName !== cardName) {
      const data = { prevName: cardName, name: updatingCardName };
      await updateCard(data);
      onRefreshCards();
    }
  };

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
        <MemoItem
          key={i}
          memo={memo}
          index={i}
          isEditing={isEditing}
          updatingDbMemos={updatingDbMemos}
          setUpdatingDbMemos={setUpdatingDbMemos}
          expandingMemoIds={expandingMemoIds}
          setExpandingMemoIds={setExpandingMemoIds}
        />
      ))}

      {addedNewMemos.map((memo, i) => (
        <MemoItem
          key={i}
          memo={memo}
          index={i}
          isEditing={isEditing}
          addedNewMemos={addedNewMemos}
          setAddedNewMemos={setAddedNewMemos}
          expandingMemoIds={expandingMemoIds}
          setExpandingMemoIds={setExpandingMemoIds}
        />
      ))}

      {/* Add Memo Button */}
      {isEditing && (
        <button
          className="rounded-lg border-2 border-zinc-400 bg-[#473520] p-2 font-semibold text-white transition-all duration-300"
          onClick={() =>
            setAddedNewMemos((prev) => [
              ...prev,
              {
                id: new Date().getTime().toString(),
                title: "",
                description: "",
                cardName,
              },
            ])
          }
        >
          + Memo
        </button>
      )}
    </div>
  );
}
