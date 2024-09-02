import React from "react";
import useFetchCart from "./useFetchCart";

const useGetCartItemsSet = () => {
  const { data } = useFetchCart();

  return React.useMemo(() => {
    return new Set(data?.data?.data?.products?.map((e) => e.product._id));
  }, [data]);
};

export default useGetCartItemsSet;
