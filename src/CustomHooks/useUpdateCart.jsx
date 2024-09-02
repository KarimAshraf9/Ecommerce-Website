import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function updateCart({ productId, productCount }) {
  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      count: productCount,
    },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

export default function useUpdateCart() {
  return useMutation({
    mutationFn: updateCart,
  });
}
