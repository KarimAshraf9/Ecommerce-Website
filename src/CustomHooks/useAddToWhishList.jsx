import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function addToWhishList(id) {
  return axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
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

export default function useAddToWhishList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToWhishList,
    onSuccess: () => {
      queryClient.refetchQueries(["allWishList"]);
    },
  });
}
