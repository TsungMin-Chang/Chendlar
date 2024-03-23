import { useCallback } from "react";

import type { GetWeeksRequest } from "@/validators/crudTypes";

export default function useWeek() {
  const getWeeks = useCallback(async (data: GetWeeksRequest) => {
    const jsonData = JSON.stringify(data);
    const res = await fetch(`/api/weeks`, {
      method: "POST",
      body: jsonData,
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    const body = await res.json();
    return body;
  }, []);

  return {
    getWeeks,
  };
}
