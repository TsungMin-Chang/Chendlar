import { useCallback } from "react";

import type {
  PostSpendingRequest,
  UpdateSpendingRequest,
} from "@/validators/crudTypes";

export default function useSpending() {
  const getSpendings = useCallback(async () => {
    const res = await fetch(`/api/spendings`, {
      method: "GET",
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    const body = await res.json();
    return body;
  }, []);

  const postSpending = useCallback(async (data: PostSpendingRequest) => {
    const jsonData = JSON.stringify(data);
    const res = await fetch(`/api/spendings`, {
      method: "POST",
      body: jsonData,
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return;
  }, []);

  const updateSpending = useCallback(async (data: UpdateSpendingRequest) => {
    const jsonData = JSON.stringify(data);
    const res = await fetch(`/api/spendings`, {
      method: "PUT",
      body: jsonData,
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return;
  }, []);

  const deleteSpending = useCallback(async (spendingId: string) => {
    const res = await fetch(`/api/spendings`, {
      method: "DELETE",
      headers: { spendingId },
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return;
  }, []);

  return {
    getSpendings,
    postSpending,
    updateSpending,
    deleteSpending,
  };
}
