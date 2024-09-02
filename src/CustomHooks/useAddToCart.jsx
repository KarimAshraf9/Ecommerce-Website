import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.refetchQueries(["cart"]);
    },
  });
}
