import { useCallback, useState } from "react";

import type {
  PostAffairRequest,
  UpdateAffairRequest,
} from "@/validators/crudTypes";

export default function useDay() {
  const [loading, setLoading] = useState(false);

  const postAffair = useCallback(async (data: PostAffairRequest) => {
    if (loading) return;
    setLoading(true);
    const jsonData = JSON.stringify(data);
    const res = await fetch(`/api/days`, {
      method: "POST",
      body: jsonData,
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return;
  }, []);

  const updateAffair = useCallback(async (data: UpdateAffairRequest) => {
    if (loading) return;
    setLoading(true);
    const jsonData = JSON.stringify(data);
    const res = await fetch(`/api/days`, {
      method: "PUT",
      body: jsonData,
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return;
  }, []);

  return {
    postAffair,
    updateAffair,
    setLoading,
    loading,
  };
}
