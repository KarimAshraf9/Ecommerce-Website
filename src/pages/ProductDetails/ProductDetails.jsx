import { useParams } from "react-router-dom";
import Slider3 from "../../components/Slider3/Slider3";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import RatingStars from "../../components/RatingStars/RatingStars";
import useAddToCart from "../../CustomHooks/useAddToCart";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const { mutate: mututaCart } = useAddToCart();
  const queryClient = useQueryClient();

  const handleAddToCartClick = (productId) => {
    const loadingToastId = toast.loading("Adding...");

    mututaCart(productId, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["cart"],
          refetchType: "inactive",
        });
        toast.dismiss(loadingToastId);
        toast.success(data.data.message);
      },

      onError: () => {
        toast.dismiss(loadingToastId);
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ["product", id],
    queryFn: getAllProducts,
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-55px)] flex justify-center items-center">
        <LoadingScreen width={50} height={50} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-55px)] w-full ">
        <div className="text-2xl bg-white text-black shadow-md shadow-black p-10 text-center">
          <p>Something went wrong. Please try again later!</p>
        </div>
      </div>
    );
  }

  return (
    <section className="productDetailsSection">
      <div className="container mx-auto md:flex py-3">
        <div className="productImages md:w-[40%]">
          <Slider3
            imageCover={data.data.data.imageCover}
            restImages={data.data.data.images}
          />
        </div>

        <div className="productInfo md:w-[60%]">
          <h1 className="text-xl font-bold">{data.data.data.title}</h1>
          <ul className="mt-3 mb-3 space-y-5">
            <li className="text-lg">
              <p className="font-semibold">
                Category:
                <span className="text-gray-500 ms-2 font-normal border-2 border-emerald-600 rounded-md p-1">
                  {data.data.data.category.name}
                </span>{" "}
              </p>
            </li>
            <li>
              <p className="font-semibold">
                SubCategory:
                <span className="text-gray-500 ms-2 font-normal border-2 border-emerald-600 rounded-md p-1">
                  {data.data.data.subcategory[0].name}
                </span>{" "}
              </p>
            </li>
            <li>
              <p className="font-semibold">
                Brand:
                <span className="text-gray-500 ms-2 font-normal border-2 border-emerald-600 rounded-md p-1">
                  {data.data.data.brand.name}
                </span>{" "}
              </p>
            </li>
          </ul>
          <p className="font-semibold mt-5">Product Detail:</p>
          <p className="text-gray-500 mt-2 text-lg">
            {data.data.data.description}
          </p>
          <p className="font-semibold mt-5 flex items-center ">
            Rating:
            <span className="flex items-center ms-2 border-2 border-emerald-600 rounded-md p-1">
              <span className="me-2 text-gray-500">
                {data.data.data.ratingsAverage}
              </span>
              <span>
                <RatingStars value={data.data.data.ratingsAverage} />
              </span>
            </span>
          </p>
          {data.data.data.priceAfterDiscount && (
            <p className="font-semibold mt-5">
              Price befor discount:
              <span className="text-gray-500 ms-2 text-lg font-bold border-2 border-emerald-600 rounded-md p-1">
                LE {data.data.data.priceAfterDiscount}
              </span>
            </p>
          )}
          <p className="font-semibold mt-5">
            Price:
            <span className="text-gray-500 ms-2 text-lg font-bold border-2 border-emerald-600 rounded-md p-1">
              LE {data.data.data.price}
            </span>
          </p>
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                handleAddToCartClick(id);
              }}
              className="w-3/4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex justify-center items-center mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-3.5 h-5 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 21"
              >
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
