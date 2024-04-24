import { useContext } from "react";

import { DateContext } from "@/providers/DateProvider";

export default function useDateContext() {
  const { date, setDate, isHalfDay, setIsHalfDay } = useContext(DateContext);
  if (
    date === null ||
    setDate === null ||
    isHalfDay === null ||
    setIsHalfDay === null
  ) {
    throw new Error("Component is not wrapped in the DateContext provider.");
  }
  return {
    date,
    setDate,
    isHalfDay,
    setIsHalfDay,
  };
}
