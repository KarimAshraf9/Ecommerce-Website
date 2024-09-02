import { useQueryClient } from "@tanstack/react-query";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import toast from "react-hot-toast";
import { useFetchWishList } from "../../CustomHooks/useFetchWishList";
import { useRemoveFromWishList } from "../../CustomHooks/useRemoveFromWishList";
import emptyWhislist from "../../assets/images/Empty Whislist.png";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const client = useQueryClient();

  const { isLoading, isError, data } = useFetchWishList();
  const { mutate, isPending } = useRemoveFromWishList();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-55px)] flex justify-center items-center">
        <LoadingScreen width={50} height={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-56px)] w-full ">
        <div className="text-2xl bg-white text-black shadow-md shadow-black p-10 text-center">
          <p>Something went wrong. Please try again later!</p>
        </div>
      </div>
    );
  }

  return (
    <section className="wishList Section">
      {data.length ? (
        <>
          <div className="text-center py-3 mb-5">
            <i className="fa-regular fa-heart text-5xl mb-2 text-gray-700"></i>
            <h1 className="text-5xl font-bold text-gray-700">Your Wishlist</h1>
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
                    Remove
                  </th>
                  <th
                    scope="col"
                    className="min-w-[160px] text-center md:w-auto md:px-6 md:py-3"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((whishList) => (
                  <tr
                    key={whishList._id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <img
                        src={whishList.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full mx-auto"
                        alt={whishList.title}
                      />
                    </td>
                    <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center font-semibold text-gray-900">
                      {whishList.title}
                    </td>
                    <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center font-semibold text-gray-900">
                      LE {whishList.price}
                    </td>
                    <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          mutate(whishList._id, {
                            onSuccess: (data, variables) => {
                              client.setQueryData(["allWishList"], (oldData) =>
                                oldData.filter(
                                  (product) => product.id !== variables
                                )
                              );
                              toast.success(data.data.message);
                            },
                            onError: () => {
                              toast.error(
                                "Unexpected error while removing product from your wish list. Try again later!"
                              );
                            },
                          });
                        }}
                        disabled={isPending}
                        className="text-red-600 font-medium border border-red-600 rounded-lg text-sm px-2 py-2 text-center inline-flex items-center "
                      >
                        Remove
                      </button>
                    </td>
                    <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center">
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                      >
                        Add to cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-55px)]">
          <img src={emptyWhislist} alt="Empty Whislist" />

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-8 text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2.5 text-center"
          >
            Return To Products
          </button>
        </div>
      )}
    </section>
  );
}
