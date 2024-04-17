import { useContext } from "react";

import { RefreshContext } from "@/providers/RefreshProvider";

export default function useRefreshContext() {
  const { refresh, setRefresh } = useContext(RefreshContext);
  if (refresh === null || setRefresh === null) {
    throw new Error("your components need to be wrapped within the provider");
  }
  const onRefresh = () => setRefresh((prev) => !prev);
  return {
    refresh,
    onRefresh,
  };
}
