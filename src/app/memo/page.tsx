"use client";

import { useState, useEffect, useCallback } from "react";
import { FcPlus } from "react-icons/fc";

import useCard from "@/hooks/useCard";
import type { DbMemo } from "@/lib/types";

import CategoryCard from "./_components/CategoryCard";

export default function MemoPage() {
  const { getCards, postCard } = useCard();
  const [cardsName, setCardsName] = useState<string[]>([]);
  const [cardsData, setCardsData] = useState<DbMemo[][]>([]);
  const [generalCardData, setGeneralCardData] = useState<DbMemo[]>();
  const [refreshCards, setRefreshCards] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const resData = await getCards();
      setGeneralCardData(resData.data.pop());
      resData.dbCardsName.pop();
      setCardsName(resData.dbCardsName);
      setCardsData(resData.data);
    }
    fetchData();
  }, [refreshCards, getCards]);

  const onRefreshCards = useCallback(
    () => setRefreshCards((prev) => !prev),
    [],
  );

  return (
    <div
      className="flex h-full w-full flex-col gap-y-5 overflow-y-auto  bg-[#442B0D] px-10 py-5"
      style={{ height: "94vh" }}
    >
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-row justify-between">
          {/* Memo Wording*/}
          <div className="ml-2 text-lg font-bold text-zinc-200">Memo</div>
          {/* Pink-Add Card Button*/}
          <button
            onClick={async () => {
              await postCard();
              setRefreshCards((prev) => !prev);
            }}
          >
            <FcPlus size={25} />
          </button>
        </div>

        {/* General Card */}
        {generalCardData !== undefined && (
          <CategoryCard
            cardName={"General"}
            memos={JSON.parse(JSON.stringify(generalCardData))}
            cardsName={cardsName}
            onRefreshCards={onRefreshCards}
          />
        )}

        {/* Card */}
        {cardsName.map((cardName, i) => (
          <CategoryCard
            key={cardName}
            cardName={cardName}
            memos={JSON.parse(JSON.stringify(cardsData[i]))}
            cardsName={cardsName}
            onRefreshCards={onRefreshCards}
          />
        ))}

        {/* Add-Card Button */}
        {/* {isEditingCards && (
          <button
            id="Add_Card_Button"
            onClick={}
            className="rounded-lg border-2 border-zinc-400 bg-[#634d3f] p-2 font-semibold text-white transition-all duration-300"
          >
            + Category
          </button>
        )} */}
      </div>
    </div>
  );
}
