import React from "react";

import { Icon } from "@iconify/react";

import type { Spending } from "@/lib/types";

import SpendingItem from "./SpendingItem";

type DayCardProps = {
  date: Date;
  spendings: Spending[];
  onRefresh: () => void;
};

function DayCard({ date, spendings, onRefresh }: DayCardProps) {
  return (
    <div key={date.toLocaleTimeString()}>
      <div className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3">
        <div className="flex flex-row justify-between">
          <div className="flex w-1/2 items-center justify-start text-lg font-bold text-zinc-200">
            {date.toLocaleDateString().slice(0, -5)}
          </div>
          <div className="flex w-1/4 items-center justify-center">
            <Icon
              icon="emojione:flag-for-south-korea"
              style={{ fontSize: "28px" }}
            />
          </div>
          <div className="flex w-1/4 items-center justify-center">
            <Icon
              icon="emojione:flag-for-taiwan"
              style={{ fontSize: "28px" }}
            />
          </div>
        </div>

        {spendings.map((item, i) => (
          <SpendingItem
            key={i}
            id={item.id}
            title={item.title}
            kor={item.kor}
            tw={item.tw}
            onRefresh={onRefresh}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(DayCard);
