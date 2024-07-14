import { useContext } from "react";

import { GoogleCalendarContext } from "@/providers/GoogleCalendarProvider";

export default function useGoogleCalendarContext() {
  const {
    accessToken,
    setAccessToken,
    expireTime,
    setExpireTime,
    isValid,
    setIsValid,
  } = useContext(GoogleCalendarContext);
  if (
    accessToken === null ||
    setAccessToken === null ||
    expireTime === null ||
    setExpireTime === null ||
    isValid === null ||
    setIsValid === null
  ) {
    throw new Error(
      "Component is not wrapped in the GoogleCalendarContext provider.",
    );
  }
  return {
    accessToken,
    setAccessToken,
    expireTime,
    setExpireTime,
    isValid,
    setIsValid,
  };
}
