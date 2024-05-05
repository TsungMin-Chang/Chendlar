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
  const [refreshCard, setRefreshCard] = useState(0);

  useEffect(() => {
    onRefreshCards();
  }, [refreshCard]);

  const [isCardEditing, setIsCardEditing] = useState(
    cardName.slice(0, 9) === "initialDB",
  );
  const [expandingMemoIds, setExpandingMemoIds] = useState<string[]>([]);

  const [updatingCardName, setUpdatingCardName] = useState(cardName ?? "");
  const [updatingDbMemos, setUpdatingDbMemos] = useState<DbMemo[]>(memos ?? []);
  const [addedNewMemos, setAddedNewMemos] = useState<DbMemo[]>([]);
  const [deletedMemoIds, setDeletedMemoIds] = useState<string[]>([]);

  const handlePinkPencilBtn = async () => {
    setIsCardEditing((prev) => !prev);
    if (isCardEditing) {
      if (updatingCardName !== cardName) {
        const data = { prevName: cardName, name: updatingCardName };
        await updateCard(data);
      }
      if (addedNewMemos.length > 0) {
        const newMemos = [];
        for (let i = 0; i < addedNewMemos.length; i++) {
          newMemos.push({
            userId: "aea86071-f215-416a-908d-589eac59814a",
            title: addedNewMemos[i].title,
            description: addedNewMemos[i].description,
            cardName: addedNewMemos[i].cardName,
          });
        }
        await postMemos(newMemos);
      }
      if (updatingDbMemos.length > 0) {
        const changedMemos = [];
        for (let i = 0; i < updatingDbMemos.length; i++) {
          if (
            updatingDbMemos[i].title !== memos[i].title ||
            updatingDbMemos[i].description !== memos[i].description
          ) {
            changedMemos.push(updatingDbMemos[i]);
          }
        }
        await updateMemos(changedMemos);
      }
      if (deletedMemoIds.length > 0) {
        await deleteMemo(deletedMemoIds);
      }
      setRefreshCard((prev) => prev + 1);
    }
  };

  return (
    <div
      key={cardName}
      className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3"
    >
      <div className="flex flex-row justify-between">
        {/* Card Name */}
        {isCardEditing ? (
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
              isCardEditing={isCardEditing}
              setWorkingMemoArray={setUpdatingDbMemos}
              isExpanded={expandingMemoIds.includes(memo.id)}
              setIsExpanded={() => {
                expandingMemoIds.includes(memo.id)
                  ? setExpandingMemoIds((prev) =>
                      prev.filter((ele) => ele !== memo.id),
                    )
                  : setExpandingMemoIds((prev) => [...prev, memo.id]);
              }}
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
          isCardEditing={isCardEditing}
          setWorkingMemoArray={setAddedNewMemos}
          isExpanded={expandingMemoIds.includes(memo.id)}
          setIsExpanded={() => {
            expandingMemoIds.includes(memo.id)
              ? setExpandingMemoIds((prev) =>
                  prev.filter((ele) => ele !== memo.id),
                )
              : setExpandingMemoIds((prev) => [...prev, memo.id]);
          }}
          deleteAction={() => setAddedNewMemos((prev) => prev.splice(i, 1))}
        />
      ))}

      {/* Add-Memo Button */}
      {isCardEditing && (
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
