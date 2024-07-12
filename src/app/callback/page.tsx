"use client";

import { useEffect } from "react";
import { Suspense } from "react";

import { useRouter, useSearchParams } from "next/navigation";

// Google Calendar

function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    // Get accessToken from searchParams
    const accessToken = searchParams.get("token");
    if (!accessToken) {
      router.push("/");
      return;
    }
    // Save accessToken to localStorage
    window.localStorage.setItem("accessToken", accessToken);

    // Redirect to dashboard
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
