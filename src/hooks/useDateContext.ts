import { useContext } from "react";
import { DateContext } from "@/providers/DateProvider"

export default function useDateContext() {
  const {date, setDate} = useContext(DateContext);
  if (date === null || setDate === null) {
    throw new Error("your components need to be wrapped within the provider");
  }
  return {
    date,
    setDate,
  };
}