"use client";

import { useState, useEffect, useCallback } from "react";
// import { IoMdAddCircle } from "react-icons/io";
import { RiAddCircleFill } from "react-icons/ri";

import useCard from "@/hooks/useCard";
import type { DbCards, DbMemo } from "@/lib/types";

import CategoryCard from "./_components/CategoryCard";

export default function MemoPage() {
  const [isEditingCards, setIsEditingCards] = useState(false);
  const [cardsData, setCardsData] = useState<DbCards>({});
  const [generalCardData, setGeneralCardData] = useState<DbMemo[]>();
  const [refreshCards, setRefreshCards] = useState(false);
  const { getCards, postCard } = useCard();

  useEffect(() => {
    async function fetchData() {
      const resData = await getCards();
      setGeneralCardData(resData.data["General"]);
      delete resData.data["General"];
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
      className="flex h-full w-full flex-col gap-y-5 overflow-y-auto bg-[#442B0D] px-10 py-5"
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
            <RiAddCircleFill size={28} color="rgb(228, 228, 231)" />
          </button>
        </div>

        {/* General Card */}
        {generalCardData !== undefined && (
          <CategoryCard
            cardName={"General"}
            memos={JSON.parse(JSON.stringify(generalCardData))}
            onRefreshCards={onRefreshCards}
          />
        )}

        {/* Card */}
        {Object.keys(cardsData).map((cardName) => (
          <CategoryCard
            key={cardName}
            cardName={cardName}
            memos={JSON.parse(JSON.stringify(cardsData[cardName]))}
            onRefreshCards={onRefreshCards}
          />
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
