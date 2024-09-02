import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getAllWhishList() {
  const response = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return response.data.data;
}

export const useFetchWishList = () => {
  return useQuery({
    queryKey: ["allWishList"],
    queryFn: getAllWhishList,
  });
};
