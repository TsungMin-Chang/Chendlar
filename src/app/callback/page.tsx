"use client";

import { useEffect } from "react";
import { Suspense } from "react";

import { useRouter, useSearchParams } from "next/navigation";

// Google Calendar
function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    // Get accessToken, expiresInSecond from searchParams
    const accessToken = searchParams.get("token");
    const expiresInSecond = searchParams.get("expiresInSecond");

    if (!accessToken || !expiresInSecond) {
      router.push("/");
      return;
    }

    // Save accessToken, expireTime to localStorage
    window.localStorage.setItem("accessToken", accessToken);
    const currentTimeMilliseconds = new Date().getTime();
    const expireTime = currentTimeMilliseconds + Number(expiresInSecond) * 1000;
    window.localStorage.setItem("expireTime", expireTime.toString());

    // Redirect to Home page
    router.push("/");
  }, [router, searchParams]);

  return <div className="h-full w-full bg-[#442B0D]"></div>;
}

export default function Callback() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
