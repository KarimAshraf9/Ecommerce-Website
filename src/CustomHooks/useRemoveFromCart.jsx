import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function removeFromCart(id) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}
export default function useRemoveFromCart() {
  return useMutation({
    mutationFn: removeFromCart,
  });
}
