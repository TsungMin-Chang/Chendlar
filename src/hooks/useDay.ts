import { useCallback } from "react";

import type { PostAffairRequest } from "@/validators/crudTypes";

export default function useDay() {
  const postAffair = useCallback(async (data: PostAffairRequest) => {
    const jsonData = JSON.stringify(data);
    const res = await fetch(`/api/days`, {
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
    postAffair,
  };
}
