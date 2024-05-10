"use client";

import { useState, useEffect } from "react";
import { GiPencil } from "react-icons/gi";
import { TiDelete } from "react-icons/ti";

import IconButton from "@mui/material/IconButton";

import useCard from "@/hooks/useCard";
import type { DbCards, DbMemo } from "@/lib/types";

import CategoryCard from "./_components/CategoryCard";

export default function MemoPage() {
  const [isEditingCards, setIsEditingCards] = useState(false);
  const [cardsData, setCardsData] = useState<DbCards>({});
  const [generalCardData, setGeneralCardData] = useState<DbMemo[]>();
  const [refreshCards, setRefreshCards] = useState(false);
  const { getCards, postCard, deleteCard } = useCard();

  useEffect(() => {
    async function fetchData() {
      const resData = await getCards();
      setGeneralCardData(resData.data["General"]);
      delete resData.data["General"];
      setCardsData(resData.data);
    }
    fetchData();
  }, [refreshCards, getCards]);

  return (
    <div
      className="flex flex-col gap-y-5 overflow-y-auto bg-[#442B0D] px-10 py-5"
      style={{ height: "94vh" }}
    >
      <div className="flex flex-col gap-y-6">
        {/* Memo && Orange-Edit Button*/}
        <div className="flex flex-row justify-between">
          <div className="ml-2 text-lg font-bold text-zinc-200">Memo</div>
          <button
            className="pr-2"
            onClick={() => setIsEditingCards((prev) => !prev)}
          >
            <GiPencil size={28} color="orange" />
          </button>
        </div>

        {/* General Card */}
        {generalCardData !== undefined && (
          <CategoryCard
            cardName={"General"}
            memos={JSON.parse(JSON.stringify(generalCardData))}
            onRefreshCards={() => setRefreshCards((prev) => !prev)}
          />
        )}

        {Object.keys(cardsData).map((cardName) => (
          <div key={cardName} className="relative">
            {/* Delete-Card Button */}
            {isEditingCards && (
              <div className="absolute -right-4 -top-4 z-50">
                <IconButton
                  onClick={async () => {
                    await deleteCard(cardName);
                    setRefreshCards((prev) => !prev);
                  }}
                >
                  <TiDelete size={28} color="red" />
                </IconButton>
              </div>
            )}

            {/* Card */}
            <CategoryCard
              cardName={cardName}
              memos={JSON.parse(JSON.stringify(cardsData[cardName]))}
              onRefreshCards={() => setRefreshCards((prev) => !prev)}
            />
          </div>
        ))}

        {/* Add-Card Button */}
        {isEditingCards && (
          <button
            onClick={async () => {
              await postCard();
              setRefreshCards((prev) => !prev);
            }}
            className="rounded-lg border-2 border-zinc-400 bg-[#634d3f] p-2 font-semibold text-white transition-all duration-300"
          >
            + Category
          </button>
        )}
      </div>
    </div>
  );
}
