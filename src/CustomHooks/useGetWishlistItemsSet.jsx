import React from "react";
import { useFetchWishList } from "./useFetchWishList";

const useGetWishlistItemsSet = () => {
  const { data } = useFetchWishList();

  return React.useMemo(() => {
    return new Set(data?.map((e) => e.id));
  }, [data]);
};

export default useGetWishlistItemsSet;
