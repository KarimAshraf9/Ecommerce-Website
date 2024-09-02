import { Link } from "react-router-dom";
import RatingStars from "./../RatingStars/RatingStars";
import useAddToWhishList from "../../CustomHooks/useAddToWhishList";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useAddToCart from "../../CustomHooks/useAddToCart";
import { useRemoveFromWishList } from "../../CustomHooks/useRemoveFromWishList";
import useRemoveFromCart from "../../CustomHooks/useRemoveFromCart";

export default function ProductCard({ product, inWishlist, inCart }) {
  const { mutate: mututeAddToWishlist } = useAddToWhishList();
  const { mutate: mututeRemoveFromWishlist } = useRemoveFromWishList();
  const { mutate: mutateAddToCart } = useAddToCart();
  const { mutate: mutateRemoveFromCart } = useRemoveFromCart();
  const queryClient = useQueryClient();

  const handleWishlistClick = (event, productId) => {
    event.stopPropagation();
    event.preventDefault();
    const mutateFunction = inWishlist
      ? mututeRemoveFromWishlist
      : mututeAddToWishlist;

    const loadingToastId = toast.loading("Adding...");

    mutateFunction(productId, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["allWishList"],
          refetchType: "inactive",
        });
        toast.dismiss(loadingToastId);
        toast.success(data.data.message, { duration: 1500 });
      },
      onError: () => {
        toast.dismiss(loadingToastId);
        toast.error("Something went wrong. Please try again.", {
          duration: 1500,
        });
      },
    });
  };

  const handleCartClick = (event, productId) => {
    event.stopPropagation();
    event.preventDefault();

    const loadingToastId = toast.loading("Adding...");
    const mutateFunction = inCart ? mutateRemoveFromCart : mutateAddToCart;
    mutateFunction(productId, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["cart"],
          refetchType: "inactive",
        });
        toast.dismiss(loadingToastId);
        toast.success(data.data.message || 'Product removed successfully from your cart', { duration: 1500 });
      },

      onError: () => {
        toast.dismiss(loadingToastId);
        toast.error("Something went wrong. Please try again.", {
          duration: 1500,
        });
      },
    });
  };

  return (
    <Link to={`/productDetails/${product._id}`}>
      <figure className="relative border rounded-lg  hover:shadow-lg hover:shadow-teal-100 duration-500 cursor-pointer">
        <img
          src={product.imageCover}
          className="mx-auto w-3/4 md:w-full h-[400px] md:h-[300px] rounded-lg object-contain"
          alt={product.title}
        />
        {product.priceAfterDiscount && (
          <p className="border rounded-lg border-red-500 absolute w-1/4 text-red-500 bg-white top-2 end-2 text-center">
            SALE
          </p>
        )}
        <figcaption className="relative border border-transparent pt-10 pb-4 px-4">
          <span
            onClick={(event) => {
              handleCartClick(event, product._id);
            }}
            className="bg-white rounded-lg flex justify-center items-center border w-max p-2 absolute top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-lg"
          >
            <i className="fa-solid fa-cart-shopping text-2xl pe-2 text-gray-500 border-e border-e-gray-400"></i>
            <span className="ps-2 text-red-500 font-bold text-xs">
              {inCart ? "REMOVE FROM CART" : "ADD TO CART"}
            </span>
          </span>
          <div>
            <div className="flex justify-between items-center text-xl">
              <h2 className="text-lg font-bold">
                {product.title.split(" ", 2).join(" ")}
              </h2>
              <i
                className={`${
                  inWishlist ? "fa-solid text-red-500" : "fa-regular"
                } fa-heart hover:text-red-500 cursor-pointer `}
                onClick={(event) => handleWishlistClick(event, product._id)}
              ></i>
            </div>
            <p className="line-clamp-2 text-gray-500 h-12">
              {product.description}
            </p>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="price">
              <span className="text-xl md:text-lg xl:text-xl text-gray-700 font-bold block scale-y-[1.8]">
                LE {product.price}
              </span>
            </div>
            <div className="rating">
              <RatingStars value={product.ratingsAverage} />
            </div>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}
