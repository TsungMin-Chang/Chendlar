"use client";

import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

type DateContextProps = {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date>> | null;
};

export const DateContext = createContext<DateContextProps>({
  date: null,
  setDate: null,
});

export default function DateProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [date, setDate] = useState(new Date());

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
}
