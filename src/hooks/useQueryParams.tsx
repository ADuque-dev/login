import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const { search } = useLocation();

  return useMemo(() => {
    const params = new URLSearchParams(search);
    return {
      token: params.get("token") || "",
      origin: params.get("origin") || "",
    };
  }, [search]);
};

export default useQueryParams;
