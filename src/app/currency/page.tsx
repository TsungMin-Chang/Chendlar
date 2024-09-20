"use client";

import { useState, useEffect } from "react";

import { Icon } from "@iconify/react";

import useSpending from "@/hooks/useSpending";
import type { Spending } from "@/lib/types";

import AddDialog from "./_components/AddDialog";
import DayCard from "./_components/DayCard";

export default function CurrencyPage() {
  const { getSpendings } = useSpending();
  const [openDialog, setOpenDialog] = useState(false);
  const [totalKor, setTotalKor] = useState(0);
  const [totalTw, setTotalTw] = useState(0);
  const [spendings, setSpendings] = useState<{ [key: string]: Spending[] }>({});
  const [eachDayTotal, setEachDayTotal] = useState<{
    [day: string]: { [country: string]: number };
  }>({});
  const [inputCountry, setInputcountry] = useState("");
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const resData = await getSpendings();
      setTotalTw(resData.totalTw);
      setTotalKor(resData.totalKor);
      setSpendings(resData.data);
      setEachDayTotal(resData.eachDayTotal);
    }
    fetchData();
  }, [refreshToggle]);

  return (
    <>
      <div
        className="flex h-full w-full flex-col gap-y-6 overflow-y-auto  bg-[#442B0D] px-10 py-5"
        style={{ height: "94vh" }}
      >
        <div className="flex w-full flex-row gap-x-2">
          <div
            onClick={() => {
              setOpenDialog(true);
              setInputcountry("kor");
            }}
            className="flex w-1/2 flex-row rounded-lg border border-black bg-zinc-300 px-2 py-3"
          >
            <div className="flex w-1/4 items-center justify-center">
              <Icon
                icon="emojione:flag-for-south-korea"
                style={{ fontSize: "30px" }}
              />
            </div>
            <div className="flex w-3/4 items-center justify-center text-lg font-bold">
              {totalKor}
            </div>
          </div>
          <div
            onClick={() => {
              setOpenDialog(true);
              setInputcountry("tw");
            }}
            className="flex w-1/2 flex-row rounded-lg border border-black bg-zinc-300  px-2 py-3"
          >
            <div className="flex w-1/4 items-center justify-center">
              <Icon
                icon="emojione:flag-for-taiwan"
                style={{ fontSize: "30px" }}
              />
            </div>
            <div className="flex w-3/4 items-center justify-center text-lg font-bold">
              {totalTw}
            </div>
          </div>
        </div>

        {Object.keys(spendings).map((date, i) => (
          <DayCard
            key={i}
            date={new Date(date)}
            spendings={spendings[date]}
            totalKor={eachDayTotal[date]["kor"]}
            totalTw={eachDayTotal[date]["tw"]}
            onRefresh={() => setRefreshToggle((prev) => !prev)}
          />
        ))}
      </div>
      <AddDialog
        open={openDialog}
        inputCountry={inputCountry}
        onClose={() => setOpenDialog(false)}
        onRefresh={() => setRefreshToggle((prev) => !prev)}
      />
    </>
  );
}
