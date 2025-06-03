"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import useDateContext from "@/hooks/useDateContext";
import useGoogleCalendarContext from "@/hooks/useGoogleCalendarContext";
import useMonth from "@/hooks/useMonth";
import useRefreshContext from "@/hooks/useRefreshContext";
import type { ResData } from "@/lib/types";
import { getMonthNumber, days } from "@/lib/utils";

import MonthCells from "./_components/MonthCells";

export default function Home() {
  const { getMonths } = useMonth();
  const { date, setDate } = useDateContext();
  const { isValid } = useGoogleCalendarContext();
  const { refresh } = useRefreshContext();

  const [slideDate, setSlideDate] = useState(date);
  const [monthsData, setMonthsData] = useState<ResData | null>(null);

  const currentMonthNumber = useMemo(
    () => getMonthNumber(slideDate),
    [slideDate],
  );

  // Google Calendar
  useEffect(() => {
    const link = document.getElementById("google-calendar");
    if (link && !isValid) {
      link.click();
    }
  }, [isValid]);

  useEffect(() => {
    async function fetchData() {
      const reqData = {
        monthNumber: currentMonthNumber,
        userId: "f60ff11e-d4e8-4faa-9eae-0c4e9567e48d",
      };
      const resData = await getMonths(reqData);
      setMonthsData(resData.data);
    }
    fetchData();
  }, [currentMonthNumber, getMonths, refresh]);

  const handleSwipe = (from: number, to: number) => {
    if (from === to) {
      return;
    }

    if (from === 2 && to === 0) {
      // Next month - specical case
      setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
      setSlideDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 3));
      return;
    }

    if (from === 0 && to === 2) {
      // Previous month - special case
      setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
      setSlideDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 3));
      return;
    }

    if (from < to) {
      // Next month
      setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
      return;
    }

    if (from > to) {
      // Previous month
      setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
      return;
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col bg-[#442B0D]">
        <div className="grid grid-cols-7" style={{ height: "5.5vh" }}>
          {days.map((ele, i) => (
            <div
              key={i}
              className="flex items-center justify-center border border-[#5a524f] text-sm text-gray-300"
            >
              {ele}
            </div>
          ))}
        </div>
        <Slide
          cssClass="h-[88.5vh]"
          vertical
          autoplay={false}
          arrows={false}
          canSwipe={true}
          onStartChange={(from: number, to: number) => handleSwipe(from, to)}
          defaultIndex={1}
        >
          <MonthCells // previous month: 0
            firstDayOfMonth={
              new Date(slideDate.getFullYear(), slideDate.getMonth() - 1, 1)
            }
            lastDayOfMonth={
              new Date(slideDate.getFullYear(), slideDate.getMonth(), 0)
            }
            monthData={
              monthsData ? monthsData[getMonthNumber(slideDate) - 1] : null
            }
          />
          <MonthCells // current month: 1
            firstDayOfMonth={
              new Date(slideDate.getFullYear(), slideDate.getMonth(), 1)
            }
            lastDayOfMonth={
              new Date(slideDate.getFullYear(), slideDate.getMonth() + 1, 0)
            }
            monthData={
              monthsData ? monthsData[getMonthNumber(slideDate)] : null
            }
          />
          <MonthCells // next month: 2
            firstDayOfMonth={
              new Date(slideDate.getFullYear(), slideDate.getMonth() + 1, 1)
            }
            lastDayOfMonth={
              new Date(slideDate.getFullYear(), slideDate.getMonth() + 2, 0)
            }
            monthData={
              monthsData ? monthsData[getMonthNumber(slideDate) + 1] : null
            }
          />
        </Slide>
      </div>
    </>
  );
}
