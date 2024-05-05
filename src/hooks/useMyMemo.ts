import { useCallback } from "react";

import type {
  PostMemosRequest,
  UpdateMemosRequest,
} from "@/validators/crudTypes";

// const userId = "aea86071-f215-416a-908d-589eac59814a";

export default function useMyMemo() {
  const postMemos = useCallback(async (data: PostMemosRequest) => {
    const jsonData = JSON.stringify(data);
    const res = await fetch(`/api/memos`, {
      method: "POST",
      body: jsonData,
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return;
  }, []);

  const updateMemos = useCallback(async (data: UpdateMemosRequest) => {
    const jsonData = JSON.stringify(data);
    const res = await fetch(`/api/memos`, {
      method: "PUT",
      body: jsonData,
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return;
  }, []);

  const deleteMemo = useCallback(async (deletedIdArray: string[]) => {
    const deletedIdArrayToString = deletedIdArray.join();
    const res = await fetch(`/api/memos`, {
      method: "DELETE",
      headers: { deletedIdArrayToString },
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return;
  }, []);

  return {
    postMemos,
    updateMemos,
    deleteMemo,
  };
}
