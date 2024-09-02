import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function removeWhishList(id) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}
export const useRemoveFromWishList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeWhishList,
    onSuccess: () => {
      queryClient.refetchQueries(["allWishList"]);
    },
  });
};
