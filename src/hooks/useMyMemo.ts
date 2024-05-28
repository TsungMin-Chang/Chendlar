import { useCallback } from "react";

import type {
  PostMemosRequest,
  UpdateMemosRequest,
} from "@/validators/crudTypes";

// const userId = "55a0ef11-c9c8-471d-adeb-29b87d3d6bdc";

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

  const deleteMemos = useCallback(async (deletedIdArray: string[]) => {
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
    deleteMemos,
  };
}
