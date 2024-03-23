import { useCallback } from "react";

import type { GetMonthsRequest } from "@/validators/crudTypes";

export default function useMonth() {
  const getMonths = useCallback(async (data: GetMonthsRequest) => {
    const jsonData = JSON.stringify(data);
    const res = await fetch(`/api/months`, {
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
    getMonths,
  };
}
