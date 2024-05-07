import { useState, useEffect } from "react";
import { GiPencil } from "react-icons/gi";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";

import useCard from "@/hooks/useCard";
import useMyMemo from "@/hooks/useMyMemo";
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
  const { postMemos, updateMemos, deleteMemo } = useMyMemo();

  const [isEditingCard, setIsEditingCard] = useState(
    cardName.slice(0, 9) === "initialDB",
  );
  const [expandingMemoIds, setExpandingMemoIds] = useState<string[]>([]);

  const [updatingCardName, setUpdatingCardName] = useState(cardName ?? "");
  const [updatingDbMemos, setUpdatingDbMemos] = useState<DbMemo[]>(memos ?? []);
  const [addedNewMemos, setAddedNewMemos] = useState<DbMemo[]>([]);
  const [deletedMemoIds, setDeletedMemoIds] = useState<string[]>([]);

  useEffect(() => {
    setIsEditingCard(cardName.slice(0, 9) === "initialDB");
    setUpdatingCardName(cardName);
    setUpdatingDbMemos(memos);
    setAddedNewMemos([]);
    setDeletedMemoIds([]);
  }, [cardName, memos]);

  const handlePinkPencilBtn = async () => {
    if (isEditingCard) {
      if (updatingCardName.slice(0, 9) === "initialDB") {
        alert("Please input your category name.");
        return;
      }
      if (updatingCardName !== cardName) {
        const data = { prevName: cardName, name: updatingCardName };
        await updateCard(data);
      }
      if (addedNewMemos.length > 0) {
        const newMemos = [];
        for (let i = 0; i < addedNewMemos.length; i++) {
          newMemos.push({
            userId: "aea86071-f215-416a-908d-589eac59814a",
            cardName: addedNewMemos[i].cardName,
            title: addedNewMemos[i].title,
            description: addedNewMemos[i].description,
          });
        }
        await postMemos(newMemos);
      }
      if (updatingDbMemos.length > 0) {
        const changedMemos = [];
        for (let i = 0; i < updatingDbMemos.length; i++) {
          if (
            !deletedMemoIds.includes(updatingDbMemos[i].id) &&
            updatingDbMemos[i].id === memos[i].id &&
            (updatingDbMemos[i].title !== memos[i].title ||
              updatingDbMemos[i].description !== memos[i].description)
          ) {
            changedMemos.push(updatingDbMemos[i]);
          }
        }
        if (changedMemos.length > 0) {
          await updateMemos(changedMemos);
        }
      }
      if (deletedMemoIds.length > 0) {
        await deleteMemo(deletedMemoIds);
      }
      onRefreshCards();
    }
    setIsEditingCard((prev) => !prev);
  };

  const handleExpandingMemo = (memoId: string) => {
    expandingMemoIds.includes(memoId)
      ? setExpandingMemoIds((prev) => prev.filter((ele) => ele !== memoId))
      : setExpandingMemoIds((prev) => [...prev, memoId]);
  };

  return (
    <div
      key={cardName}
      className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3"
    >
      <div className="flex flex-row justify-between">
        {/* Card Name */}
        {isEditingCard && cardName !== "General" ? (
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
            {updatingCardName.slice(0, 9) === "initialDB"
              ? ""
              : updatingCardName}
          </div>
        )}

        {/* Pink-Edit Button */}
        <button className="pr-2" onClick={() => handlePinkPencilBtn()}>
          <GiPencil size={28} color="pink" />
        </button>
      </div>

      {updatingDbMemos.map((memo, i) => {
        if (!deletedMemoIds.includes(memo.id)) {
          return (
            <MemoItem
              key={i}
              memo={memo}
              index={i}
              isEditingCard={isEditingCard}
              setWorkingMemoArray={setUpdatingDbMemos}
              isExpanded={expandingMemoIds.includes(memo.id)}
              setIsExpanded={() => handleExpandingMemo(memo.id)}
              deleteAction={() =>
                setDeletedMemoIds((prev) => [...prev, memo.id])
              }
            />
          );
        }
        return null;
      })}

      {addedNewMemos.map((memo, i) => (
        <MemoItem
          key={i}
          memo={memo}
          index={i}
          isEditingCard={isEditingCard}
          setWorkingMemoArray={setAddedNewMemos}
          isExpanded={expandingMemoIds.includes(memo.id)}
          setIsExpanded={() => handleExpandingMemo(memo.id)}
          deleteAction={() => setAddedNewMemos((prev) => prev.splice(i, 1))}
        />
      ))}

      {/* Add-Memo Button */}
      {isEditingCard && (
        <button
          className="rounded-lg border-2 border-zinc-400 bg-[#473520] p-2 font-semibold text-white transition-all duration-300"
          onClick={() =>
            setAddedNewMemos((prev) => [
              ...prev,
              {
                id: new Date().getTime().toString(),
                cardName,
                title: "",
                description: "",
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
