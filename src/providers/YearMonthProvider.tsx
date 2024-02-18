"use client"
import React, {useState, createContext, Dispatch, SetStateAction} from "react";

type YearMonthContextProps = {
  year: number | null,
  setYear: Dispatch<SetStateAction<number>> | null,
  month: number | null,
  setMonth: Dispatch<SetStateAction<number>> | null,
} 

export const YearMonthContext = createContext<YearMonthContextProps>({
  year: null, 
  setYear: null, 
  month: null, 
  setMonth: null
});

export default function YearMonthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  return (
    <YearMonthContext.Provider value={{year, setYear, month, setMonth}}>
      {children}
    </YearMonthContext.Provider>
  )
}
