import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function addToCart(id) {
  return axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      productId: id,
    },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

export default function useAddToCart() {
  return useMutation({
    mutationFn: addToCart,
  });
}
