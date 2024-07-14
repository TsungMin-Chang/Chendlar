"use client";

import { useEffect } from "react";
import { Suspense } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import useGoogleCalendarContext from "@/hooks/useGoogleCalendarContext";

// Google Calendar
function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setAccessToken, setExpireTime, setIsValid } =
    useGoogleCalendarContext();

  useEffect(() => {
    // Get accessToken, expiresInSecond from searchParams
    const accessToken = searchParams.get("token");
    const expiresInSecond = searchParams.get("expiresInSecond");

    if (!accessToken || !expiresInSecond) {
      router.push("/");
      router.refresh();
      return;
    }

    // Save accessToken, expireTime to GoogleCalendarContext
    setAccessToken(accessToken);
    const expireTime = new Date().getTime() + Number(expiresInSecond) * 1000;
    setExpireTime(expireTime.toString());
    setIsValid(true);

    // Redirect to Home page
    router.push("/");
    router.refresh();
  }, [searchParams, router, setAccessToken, setExpireTime, setIsValid]);

  return <div className="h-full w-full bg-[#442B0D]"></div>;
}

export default function Callback() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
