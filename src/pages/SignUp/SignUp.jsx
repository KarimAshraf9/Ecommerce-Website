import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
export default function SignUp() {
  const navigate = useNavigate();

  const [isResponseError, setIsResponseError] = useState(null);
  const [isResponseTrue, setIsResponseTrue] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },

    onSubmit: async (userData) => {
      await axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signup", userData)
        .then(() => {
          setIsResponseTrue(true);
          setTimeout(() => {
            setIsResponseTrue(false);
            navigate("/login");
          }, 2000);
        })
        .catch((errorResponse) => {
          setIsResponseError(errorResponse.response.data.message);
          setTimeout(() => {
            setIsResponseError(null);
          }, 2000);
        });
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .matches(
          /^[A-Z][a-z -]{2,20}$/,
          "Name must be 3-20 characters, starting with a capital letter!"
        ),
      email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^01[0125][0-9]{8}$/, "Phone is not valid"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 charachters"),
      rePassword: Yup.string()
        .required("Repassword is required")
        .oneOf([Yup.ref("password")], "Inavlid confirmation"),
    }),
  });
  return (
    <section className="signUpSection flex justify-center items-center bg-gradient-to-r from-[rgba(255,255,255,1)] to-[rgba(152,255,152,1)] bg-no-repeat overflow-hidden min-h-[calc(100vh-55px)] ">
      <div className="container mx-auto">
        <form
          className="w-3/4 md:w-1/2 mx-auto bg-white p-5 rounded-lg drop-shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h3 className="text-center text-3xl font-bold mb-2 text-black">
            Sign Up
          </h3>

          {isResponseError && (
            <div
              className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{isResponseError}</span>
            </div>
          )}

          {isResponseTrue && (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
              role="alert"
            >
              <span className="font-medium">Congrats</span>
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your name:
            </label>
            <input
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {touched.name && errors.name && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Oops! {errors.name}</span>
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email:
            </label>
            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {touched.email && errors.email && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Oops! {errors.email}</span>
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your phone:
            </label>
            <input
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              type="tel"
              id="phone"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {touched.phone && errors.phone && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Oops! {errors.phone}</span>
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password:
            </label>
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {touched.password && errors.password && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Oops! {errors.password}</span>
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Repeat password:
            </label>
            <input
              value={values.rePassword}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              id="rePassword"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {touched.rePassword && errors.rePassword && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Oops! {errors.rePassword}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mx-auto flex justify-center text-center text-white w-1/2 text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  py-2.5 h-12 disabled:bg-slate-400"
            disabled={!(dirty && isValid)}
          >
            {isSubmitting ? (
              <LoadingScreen width={28} height={28} />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
