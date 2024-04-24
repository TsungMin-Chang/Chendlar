import { useContext } from "react";

import { RefreshContext } from "@/providers/RefreshProvider";

export default function useRefreshContext() {
  const { refresh, setRefresh } = useContext(RefreshContext);
  if (refresh === null || setRefresh === null) {
    throw new Error("Component is not wrapped in the RefreshContext provider.");
  }
  const onRefresh = () => setRefresh((prev) => !prev);
  return {
    refresh,
    onRefresh,
  };
}
