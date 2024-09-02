import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function getAllProducts(categoryID, brandID) {
  let queryParam = "";
  if (categoryID) {
    queryParam = `?category[in]=${categoryID}`;
  } else if (brandID) {
    queryParam = `?brand[in]=${brandID}`;
  }
  return axios.get(
    `https://ecommerce.routemisr.com/api/v1/products${queryParam}`
  );
}

const useFetchProducts = (categoryID, brandID) => {
  return useQuery({
    queryKey: categoryID
      ? ["allProducts", categoryID]
      : brandID
      ? ["allProducts", brandID]
      : ["allProducts"],
    queryFn: () => getAllProducts(categoryID, brandID),
  });
};

export default useFetchProducts;
