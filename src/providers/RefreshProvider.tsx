"use client";

import type { Dispatch, SetStateAction } from "react";
import React, { useState, createContext } from "react";

type RefreshContextProps = {
  refresh: boolean | null;
  setRefresh: Dispatch<SetStateAction<boolean>> | null;
};

export const RefreshContext = createContext<RefreshContextProps>({
  refresh: null,
  setRefresh: null,
});

export default function RefreshProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [refresh, setRefresh] = useState(false);

  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}
