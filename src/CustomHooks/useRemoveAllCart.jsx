import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function removeAllCart() {
  return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}
export default function useRemoveAllCart() {
  return useMutation({
    mutationFn: removeAllCart,
  });
}
