import { useCallback, useState } from "react";

import useGoogleCalendarContext from "@/hooks/useGoogleCalendarContext";
import type {
  PostAffairRequest,
  UpdateAffairRequest,
} from "@/validators/crudTypes";

export default function useDay() {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useGoogleCalendarContext();

  const postAffair = useCallback(
    async (data: PostAffairRequest, timeZone: string) => {
      if (loading) return;
      setLoading(true);
      const jsonData = JSON.stringify(data);
      const res = await fetch(`/api/days`, {
        method: "POST",
        headers: { accessToken, timeZone },
        body: jsonData,
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error);
      }
      return;
    },
    [accessToken, loading],
  );

  const updateAffair = useCallback(
    async (data: UpdateAffairRequest, timeZone: string) => {
      if (loading) return;
      setLoading(true);
      const jsonData = JSON.stringify(data);
      const res = await fetch(`/api/days`, {
        method: "PUT",
        headers: { accessToken, timeZone },
        body: jsonData,
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error);
      }
      return;
    },
    [accessToken, loading],
  );

  return {
    postAffair,
    updateAffair,
    setLoading,
    loading,
  };
}
