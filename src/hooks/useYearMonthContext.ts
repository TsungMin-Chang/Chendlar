import { useContext } from "react";
import { YearMonthContext } from "@/providers/YearMonthProvider"

export default function useYearMonthContext() {
  const {year, setYear, month, setMonth} = useContext(YearMonthContext);
  if (year === null || setYear === null || month === null || setMonth === null) {
    throw new Error("your components need to be wrapped within the provider");
  }
  return {
    year,
    setYear,
    month, 
    setMonth
  };
}