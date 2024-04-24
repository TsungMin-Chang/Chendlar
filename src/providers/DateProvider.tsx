"use client";

import type { Dispatch, SetStateAction } from "react";
import React, { useState, createContext } from "react";

type DateContextProps = {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date>> | null;
  isHalfDay: boolean | null;
  setIsHalfDay: Dispatch<SetStateAction<boolean>> | null;
};

export const DateContext = createContext<DateContextProps>({
  date: null,
  setDate: null,
  isHalfDay: null,
  setIsHalfDay: null,
});

export default function DateProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [date, setDate] = useState(new Date());
  const [isHalfDay, setIsHalfDay] = useState(true);

  return (
    <DateContext.Provider value={{ date, setDate, isHalfDay, setIsHalfDay }}>
      {children}
    </DateContext.Provider>
  );
}
