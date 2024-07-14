"use client";

import type { Dispatch, SetStateAction } from "react";
import React, { useState, createContext } from "react";

type GoogleCalendarContextProps = {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string>> | null;
  expireTime: string | null;
  setExpireTime: Dispatch<SetStateAction<string>> | null;
  isValid: boolean | null;
  setIsValid: Dispatch<SetStateAction<boolean>> | null;
};

export const GoogleCalendarContext = createContext<GoogleCalendarContextProps>({
  accessToken: null,
  setAccessToken: null,
  expireTime: null,
  setExpireTime: null,
  isValid: null,
  setIsValid: null,
});

export default function GoogleCalendarProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [accessToken, setAccessToken] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const [isValid, setIsValid] = useState(false);

  return (
    <GoogleCalendarContext.Provider
      value={{
        accessToken,
        setAccessToken,
        expireTime,
        setExpireTime,
        isValid,
        setIsValid,
      }}
    >
      {children}
    </GoogleCalendarContext.Provider>
  );
}
