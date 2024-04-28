"use client";

import { useState, useEffect, useMemo } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import useDateContext from "@/hooks/useDateContext";
import useRefreshContext from "@/hooks/useRefreshContext";
import useWeek from "@/hooks/useWeek";
import type { resData } from "@/lib/types";
import { getWeekNumber } from "@/lib/utils";

import WeekCells from "./_components/WeekCells";

export default function WeekPage() {
  const { getWeeks } = useWeek();

  const { date, setDate } = useDateContext();
  const { refresh } = useRefreshContext();
  const [slideDate, setSlideDate] = useState(date);
  const [weeksData, setWeeksData] = useState<resData | null>(null);

  const currentWeekNumber = useMemo(
    () => getWeekNumber(slideDate),
    [slideDate],
  );
  useEffect(() => {
    async function fetchData() {
      const reqData = {
        weekNumber: currentWeekNumber,
        userId: "aea86071-f215-416a-908d-589eac59814a",
      };
      const resData = await getWeeks(reqData);
      setWeeksData(resData.data);
    }
    fetchData();
  }, [currentWeekNumber, getWeeks, refresh]);

  const handleSwipe = (from: number, to: number) => {
    if (from === to) {
      return;
    }

    if (from === 2 && to === 0) {
      // Next week - specical case
      setDate(
        (prev) =>
          new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 7),
      );
      setSlideDate(
        (prev) =>
          new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 21),
      );
      return;
    }

    if (from === 0 && to === 2) {
      // Previous week - special case
      setDate(
        (prev) =>
          new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 7),
      );
      setSlideDate(
        (prev) =>
          new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 21),
      );
      return;
    }

    if (from < to) {
      // Next week
      setDate(
        (prev) =>
          new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 7),
      );
      return;
    }

    if (from > to) {
      // Previous week
      setDate(
        (prev) =>
          new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 7),
      );
      return;
    }
  };

  return (
    <Slide
      vertical
      autoplay={false}
      arrows={false}
      canSwipe={true}
      onStartChange={(from: number, to: number) => handleSwipe(from, to)}
      defaultIndex={1}
    >
      <WeekCells // previous week: 0
        firstDayOfWeek={
          new Date(
            slideDate.getFullYear(),
            slideDate.getMonth(),
            slideDate.getDate() - slideDate.getDay() - 7,
          )
        }
        weekData={weeksData ? weeksData[getWeekNumber(slideDate) - 1] : null}
      />
      <WeekCells // current week: 1
        firstDayOfWeek={
          new Date(
            slideDate.getFullYear(),
            slideDate.getMonth(),
            slideDate.getDate() - slideDate.getDay(),
          )
        }
        weekData={weeksData ? weeksData[getWeekNumber(slideDate)] : null}
      />
      <WeekCells // next week: 2
        firstDayOfWeek={
          new Date(
            slideDate.getFullYear(),
            slideDate.getMonth(),
            slideDate.getDate() - slideDate.getDay() + 7,
          )
        }
        weekData={weeksData ? weeksData[getWeekNumber(slideDate) + 1] : null}
      />
    </Slide>
  );
}
