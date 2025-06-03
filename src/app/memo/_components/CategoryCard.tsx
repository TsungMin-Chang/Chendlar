import React, { useState, useEffect } from "react";
import { FcSupport } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

import useCard from "@/hooks/useCard";
import useMyMemo from "@/hooks/useMyMemo";
import type { DbMemo } from "@/lib/types";

import MemoItem from "./MemoItem";

type CategoryCardProps = {
  cardName: string;
  memos: DbMemo[];
  cardsName: string[];
  onRefreshCards: () => void;
};

function CategoryCard({
  cardName,
  memos,
  cardsName,
  onRefreshCards,
}: CategoryCardProps) {
  const { updateCard, deleteCard } = useCard();
  const { postMemos, updateMemos, deleteMemos } = useMyMemo();

  // Card
  const [isEditingCard, setIsEditingCard] = useState(
    cardName.slice(0, 9) === "initialDB",
  );
  const [updatingCardName, setUpdatingCardName] = useState(cardName ?? "");

  // Memo
  const [expandingMemoIds, setExpandingMemoIds] = useState<string[]>([]);
  const [updatingDbMemos, setUpdatingDbMemos] = useState<DbMemo[]>(memos ?? []);
  const [addedNewMemos, setAddedNewMemos] = useState<DbMemo[]>([]);
  const [deletedMemoIds, setDeletedMemoIds] = useState<string[]>([]);

  useEffect(() => {
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
        if (cardsName.includes(updatingCardName)) {
          alert("This name has been used. Please choose another one.");
          return;
        }
        const data = { prevName: cardName, name: updatingCardName };
        await updateCard(data);
      }
      if (addedNewMemos.length > 0) {
        const newMemos = [];
        for (let i = 0; i < addedNewMemos.length; i++) {
          newMemos.push({
            userId: "f60ff11e-d4e8-4faa-9eae-0c4e9567e48d",
            cardName: updatingCardName,
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
        await deleteMemos(deletedMemoIds);
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
    <div key={cardName} className="relative">
      {/* Delete-Card Button */}
      {isEditingCard && cardName !== "General" && (
        <div className="absolute -right-4 -top-4 z-50">
          <IconButton
            onClick={async () => {
              if (confirm("Are you sure to delete this Category?")) {
                await deleteCard(cardName);
                onRefreshCards();
              } else {
                return;
              }
            }}
          >
            <TiDelete size={28} color="red" />
          </IconButton>
        </div>
      )}
      <div className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3">
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

          {/* Edit Button */}
          <button onClick={() => handlePinkPencilBtn()}>
            <FcSupport size={25} />
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
            deleteAction={() =>
              setAddedNewMemos((prev) => {
                const newMemos = [...prev];
                newMemos.splice(i, 1);
                return newMemos;
              })
            }
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
    </div>
  );
}

export default React.memo(CategoryCard);
