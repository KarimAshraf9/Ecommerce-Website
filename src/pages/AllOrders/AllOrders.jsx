import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getOrderProductsCount(items) {
  return items.reduce((acc, cur) => acc + cur.count, 0);
}

function getorderProductDate(date) {
  return new Date(date).toLocaleDateString("en-GB");
}

export default function AllOrders() {
  const [modalOrderID, setModalOrderID] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  async function getAllOrders(userId) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ["allOrders"],
    queryFn: () => {
      return getAllOrders(userId);
    },
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
    <div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center px-2 py-3">
                #
              </th>
              <th
                scope="col"
                className="min-w-[160px] text-center md:w-auto md:px-6 md:py-3"
              >
                order id
              </th>
              <th
                scope="col"
                className="min-w-[160px] text-center md:w-auto md:px-6 md:py-3"
              >
                date
              </th>
              <th
                scope="col"
                className="min-w-[160px] text-center md:w-auto md:px-6 md:py-3"
              >
                items
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
                payment method
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
            {data.data.map((order, index) => (
              <tr
                key={index}
                className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th className="text-center px-6 py-4">{index + 1}</th>
                <th
                  scope="row"
                  className="w-min-[160px] md:w-auto text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order.id}
                </th>
                <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center">
                  {getorderProductDate(order.createdAt)}
                </td>

                <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center">
                  {getOrderProductsCount(order.cartItems)}
                </td>
                <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center">
                  LE {order.totalOrderPrice}
                </td>
                <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center">
                  {order.paymentMethodType}
                </td>
                <td className="w-min-[160px] md:w-auto md:px-6 md:py-4 text-center">
                  <button
                    onClick={() => setModalOrderID(order._id)}
                    className="font-medium  text-blue-600 dark:text-blue-500"
                  >
                    Details
                  </button>
                </td>
                <Modal
                  show={modalOrderID === order._id}
                  onClose={() => setModalOrderID(null)}
                  position={"center"}
                  theme={{
                    body: {
                      base: "h-[500px] md:h-[400px] overflow-y-scroll p-6",
                    },
                    root: {
                      base: "sm:w-3/4 mx-auto",
                    },
                  }}
                >
                  <Modal.Header>Order Datails</Modal.Header>
                  <Modal.Body>
                    {order.cartItems.map((subOrder, subIndex) => (
                      <div key={subIndex}>
                        <div className="py-2 text-center flex justify-around items-center flex-wrap">
                          <div className="w-[100%] md:w-[50%]">
                            <img
                              src={subOrder.product.imageCover}
                              className="h-[150px] inline-block "
                              alt={subOrder.product.title}
                            />
                          </div>
                          <div className="w-[100%] md:w-[50%]">
                            <h2 className="text-lg font-bold text-gray-500">
                              {subOrder.product.title}
                            </h2>
                            <p className="text-lg font-bold text-gray-500">
                              Count: {subOrder.count}
                            </p>
                            <p className="text-lg font-bold text-gray-500">
                              Unit Price: LE {subOrder.price}
                            </p>
                            <a
                              className="text-blue-500 hover:border-b hover:border-b-blue-500 cursor-pointer"
                              onClick={() => {
                                navigate(
                                  `/productDetails/${subOrder.product._id}`
                                );
                              }}
                            >
                              Go to product full details
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Modal.Body>

                  <div className="text-center border-y border-gray-100 my-3">
                    <button
                      type="button"
                      onClick={() => setModalOrderID(false)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Close
                    </button>
                  </div>
                </Modal>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
