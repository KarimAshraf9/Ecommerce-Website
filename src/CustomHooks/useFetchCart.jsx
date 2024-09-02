import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function getCartProducts() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}

export default function useFetchCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCartProducts,
  });
}
