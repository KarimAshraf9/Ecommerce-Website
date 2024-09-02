import toast from "react-hot-toast";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import useFetchCart from "../../CustomHooks/useFetchCart";
import useRemoveFromCart from "../../CustomHooks/useRemoveFromCart";
import { useQueryClient } from "@tanstack/react-query";
import useRemoveAllCart from "../../CustomHooks/useRemoveAllCart";
import useUpdateCart from "../../CustomHooks/useUpdateCart";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emptyCart from "../../assets/images/empty cart.png";

export default function Cart() {
  const [isClicked, setIsClicked] = useState(false);

  const { isLoading, isError, data } = useFetchCart();
  const { mutate } = useRemoveFromCart();
  const { mutate: mutateClearCart } = useRemoveAllCart();
  const { mutate: mutateUpdateCart } = useUpdateCart();
  const quertClient = useQueryClient();

  const navigate = useNavigate();

  const handleRemoveProductButton = (productId) => {
    const loadingToastId = toast.loading("Loading...");

    mutate(productId, {
      onSuccess: async () => {
        await quertClient.invalidateQueries({
          queryKey: ["cart"],
          refetchType: "active",
        });
        toast.dismiss(loadingToastId);
        toast.success("Product deleted!");
        setIsClicked(false);
      },

      onError: () => {
        toast.dismiss(loadingToastId);
        toast.error("Something went wrong. Please try again.");
        setIsClicked(false);
      },
    });
  };

  const handleClearCartButton = (param) => {
    const loadingToastId = toast.loading("Loading...");

    mutateClearCart(param, {
      onSuccess: async () => {
        await quertClient.invalidateQueries({
          queryKey: ["cart"],
          refetchType: "active",
        });
        toast.dismiss(loadingToastId);
        toast.success("Your cart deleted!");
        setIsClicked(false);
      },

      onError: () => {
        toast.dismiss(loadingToastId);
        toast.error("Something went wrong. Please try again.");
        setIsClicked(false);
      },
    });
  };

  const handleUpdateButtonIncrement = (productId, productCount) => {
    const loadingToastId = toast.loading("Loading...");

    mutateUpdateCart(
      { productId, productCount },
      {
        onSuccess: async () => {
          await quertClient.invalidateQueries({
            queryKey: ["cart"],
            refetchType: "active",
          });
          toast.dismiss(loadingToastId);
          toast.success("Your product count updated");
          setIsClicked(false);
        },

        onError: () => {
          toast.dismiss(loadingToastId);
          toast.error("Something went wrong. Please try again.");
          setIsClicked(false);
        },
      }
    );
  };

  const handleUpdateButtondecrement = (productId, productCount) => {
    const loadingToastId = toast.loading("Loading...");

    mutateUpdateCart(
      { productId, productCount },
      {
        onSuccess: async () => {
          await quertClient.invalidateQueries({
            queryKey: ["cart"],
            refetchType: "active",
          });
          toast.dismiss(loadingToastId);
          toast.success("Your product count updated");
          setIsClicked(false);
        },

        onError: () => {
          toast.dismiss(loadingToastId);
          toast.error("Something went wrong. Please try again.");
          setIsClicked(false);
        },
      }
    );
  };

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

  localStorage.setItem("userId", data.data.data.cartOwner);

  return (
    <section className="cart Section">
      {data.data.data.totalCartPrice ? (
        <>
          <div
            className={`text-center py-5 mb-5 flex flex-col md:flex-row md:justify-around md:items-center`}
          >
            <h1 className="text-5xl font-bold text-gray-700">Your Cart</h1>

            <div className="my-3 md:my-0">
              <p className="text-md font-bold text-gray-700">
                Number of different products:
                <span className="ms-1 text-lg text-red-600">
                  {data.data.numOfCartItems}
                </span>
              </p>
              <p className="text-md font-bold text-gray-700">
                Total Price:
                <span className="ms-1 text-lg text-red-600">
                  LE {data.data.data.totalCartPrice}
                </span>
              </p>
            </div>
            <Link to="/cashOrder">
              <button
                type="button"
                disabled={isClicked}
                className="mx-auto md:mx-0 w-32 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2.5 text-center disabled:bg-gray-500"
              >
                Checkout
              </button>
            </Link>
          </div>
          <div className="relatvive overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-[400px] sm:w-full  text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th
                    scope="col"
                    className="min-w-[160px] text-center md:w-auto md:px-6 md:py-3"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="min-w-[160px] text-center md:w-auto md:px-6 md:py-3"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="min-w-[160px] text-center md:w-auto md:px-6 md:py-3"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="min-w-[160px] text-center md:w-auto md:px-6 md:py-3"
                  >
                    Remove
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.data.data.products.map((product) => (
                  <tr
                    key={product.product._id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full mx-auto"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center font-semibold text-gray-900">
                      {product.product.title}
                    </td>
                    <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center font-semibold text-gray-900">
                      LE {product.price}
                    </td>
                    <td className="w-min-[160px] md:w-auto md:px-6 md:py-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => {
                            handleUpdateButtondecrement(
                              product.product._id,
                              product.count - 1
                            );
                            setIsClicked(true);
                          }}
                          className="inline-flex items-center justify-center p-1 text-md font-medium h-6 w-6 text-black bg-white border border-gray-300 rounded-full  hover:bg-gray-100 "
                          type="button"
                          disabled={product.count == 1 || isClicked}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div className="ms-3 text-center bg-gray-50 w-14 border border-gray-300 text-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1">
                          {product.count}
                        </div>
                        <button
                          onClick={() => {
                            handleUpdateButtonIncrement(
                              product.product._id,
                              product.count + 1
                            );
                            setIsClicked(true);
                          }}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-md font-medium text-black bg-white border border-gray-300 rounded-full  hover:bg-gray-100 "
                          type="button"
                          disabled={isClicked}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          handleRemoveProductButton(product.product._id);
                          setIsClicked(true);
                        }}
                        disabled={isClicked}
                        className="text-red-600 font-medium border border-red-600 rounded-lg text-sm px-2 py-2 text-center inline-flex items-center"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!!data.data.data.totalCartPrice && (
              <button
                onClick={() => {
                  handleClearCartButton();
                }}
                type="button"
                disabled={isClicked}
                className="mx-auto w-40 block my-4 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 text-center "
              >
                Clear Cart
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-55px)] w-full text-center">
          <img
            src={emptyCart}
            className="w-[150px] h-[150px]"
            alt="Empty cart"
          />
          <p className="text-2xl sm:text-4xl font-bold mt-4">
            Your Cart Is Currently Empty!
          </p>
          <div className="my-8 text-gray-500 space-y-2">
            <p className="">
              Before proceed to checkout you must add some products to your
              shopping cart.
            </p>
            <p>
              You will find alot of interesting products on our "products" page.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2.5 text-center"
          >
            Return To Products
          </button>
        </div>
      )}
    </section>
  );
}
