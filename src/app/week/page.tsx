"use client";

import { useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import useDateContext from "@/hooks/useDateContext";

import WeekCells from "./_components/WeekCells";

// import useWeek from "@/hooks/useWeek";

export default function WeekPage() {
  const { date, setDate } = useDateContext();
  const [slideDate, setSlideDate] = useState(date);

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
      <WeekCells // previous week
        firstDayOfWeek={
          new Date(
            slideDate.getFullYear(),
            slideDate.getMonth(),
            slideDate.getDate() - slideDate.getDay() - 7,
          )
        }
      />
      <WeekCells // current week
        firstDayOfWeek={
          new Date(
            slideDate.getFullYear(),
            slideDate.getMonth(),
            slideDate.getDate() - slideDate.getDay(),
          )
        }
      />
      <WeekCells // next week
        firstDayOfWeek={
          new Date(
            slideDate.getFullYear(),
            slideDate.getMonth(),
            slideDate.getDate() - slideDate.getDay() + 7,
          )
        }
      />
    </Slide>
  );
}
