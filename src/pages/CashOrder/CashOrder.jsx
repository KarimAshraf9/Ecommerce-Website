import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useFetchCart from "../../CustomHooks/useFetchCart";
import { useQueryClient } from "@tanstack/react-query";

export default function CashOrder() {
  const navigate = useNavigate();

  const [isResponseError, setIsResponseError] = useState(false);
  const [isResponseTrue, setIsResponseTrue] = useState(false);
  const { data } = useFetchCart();
  const quertClient = useQueryClient();

  const [isCash, setIsCash] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  async function PaymentCash(userAddressInfo) {
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${data.data.cartId}`,
        {
          shippingAddress: userAddressInfo,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then(() => {
        quertClient.invalidateQueries({
          queryKey: ["cart"],
          refetchType: "all",
        });
        setIsResponseTrue(true);
        setIsCash(false);
        setTimeout(() => {
          setIsResponseTrue(false);
          navigate("/products");
        }, 2000);
      })
      .catch(() => {
        setIsResponseError(true);
        setIsCash(false);
        setTimeout(() => {
          setIsResponseError(false);
        }, 2000);
      });
  }

  async function onlinePayment(userAddressInfo) {
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${data.data.cartId}`,
        {
          shippingAddress: userAddressInfo,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
          params: {
            url: import.meta.env.VITE_DEPLOYMENT_URL,
          },
        }
      )
      .then((response) => {
        window.open(response.data.session.url, "_self");
        setIsOnline(false);
      })
      .catch(() => {
        setIsResponseError(true);
        setIsOnline(false);
        setTimeout(() => {
          setIsResponseError(false);
        }, 2000);
      });
  }

  function handlePayment(userAddressInfo) {
    if (isCash) {
      PaymentCash(userAddressInfo);
    }
    if (isOnline) {
      onlinePayment(userAddressInfo);
    }
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (userAddressInfo) => {
      handlePayment(userAddressInfo);
    },

    validationSchema: Yup.object({
      details: Yup.string()
        .required("Details is required")
        .matches(
          /^[A-Za-z0-9 -\/]{5,}$/,
          "Details must be at least 5 characters!"
        ),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^01[0125][0-9]{8}$/, "Phone is not valid"),
      city: Yup.string()
        .required("City is required")
        .matches(/^[A-Za-z0-9 -\/]{3,}$/, "city must be at least 3 characters!")
        .max(20, "This city name is way too long"),
    }),
  });
  return (
    <section className="signUpSection bg-gradient-to-r from-[rgba(255,255,255,1)] to-[rgba(152,255,152,1)] bg-no-repeat overflow-hidden min-h-screen ">
      <div className="container mx-auto">
        <form
          className="w-3/4 md:w-1/2 mx-auto mt-2 bg-white p-5 rounded-lg drop-shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h3 className="text-center text-3xl font-bold mb-2 text-black">
            Payment Details
          </h3>

          {isResponseError && (
            <div
              className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">
                {"Something went wrong. Please try again."}
              </span>
            </div>
          )}

          {isResponseTrue && (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">
                {" "}
                Your order has been created! We will ship it to your address
                soon.
              </span>
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Address:
            </label>
            <input
              value={values.details}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="details"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            {touched.details && errors.details && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops! {errors.details}</span>
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone:
            </label>
            <input
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              type="tel"
              id="phone"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            {touched.phone && errors.phone && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops! {errors.phone}</span>
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your city:
            </label>
            <input
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="city"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            {touched.city && errors.city && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops! {errors.city}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            onClick={() => {
              setIsCash(true);
            }}
            className="mx-auto flex justify-center text-center text-white sm:w-1/2 w-3/4 text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-12 disabled:bg-slate-400"
            disabled={!((dirty && isValid) || isOnline)}
          >
            Cash Payment
          </button>

          <button
            type="submit"
            onClick={() => {
              setIsOnline(true);
            }}
            className="mx-auto mt-2 flex justify-center text-center text-white sm:w-1/2 w-3/4 text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-12 disabled:bg-slate-400"
            disabled={!(dirty && isValid) || isCash}
          >
            Online Payment
          </button>
        </form>
      </div>
    </section>
  );
}
