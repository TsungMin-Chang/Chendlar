import { useState, useCallback } from "react";

import type {
  PostMemosRequest,
  UpdateMemosRequest,
} from "@/validators/crudTypes";

// const userId = "f60ff11e-d4e8-4faa-9eae-0c4e9567e48d";

export default function useMyMemo() {
  const [loading, setLoading] = useState(false);

  const postMemos = useCallback(
    async (data: PostMemosRequest) => {
      if (loading) return;
      setLoading(true);
      const jsonData = JSON.stringify(data);
      const res = await fetch(`/api/memos`, {
        method: "POST",
        body: jsonData,
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error);
      }
      setLoading(false);
      return;
    },
    [loading],
  );

  const updateMemos = useCallback(
    async (data: UpdateMemosRequest) => {
      if (loading) return;
      setLoading(true);
      const jsonData = JSON.stringify(data);
      const res = await fetch(`/api/memos`, {
        method: "PUT",
        body: jsonData,
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error);
      }
      setLoading(false);
      return;
    },
    [loading],
  );

  const deleteMemos = useCallback(
    async (deletedIdArray: string[]) => {
      if (loading) return;
      setLoading(true);
      const deletedIdArrayToString = deletedIdArray.join();
      const res = await fetch(`/api/memos`, {
        method: "DELETE",
        headers: { deletedIdArrayToString },
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error);
      }
      setLoading(false);
      return;
    },
    [loading],
  );

  return {
    postMemos,
    updateMemos,
    deleteMemos,
  };
}
