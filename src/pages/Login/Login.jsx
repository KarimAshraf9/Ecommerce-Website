import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { tokenContextObject } from "../../context/TokenContextProvider";

export default function Login() {
  const { setToken } = useContext(tokenContextObject);

  const navigate = useNavigate();

  const [isResponseError, setIsResponseError] = useState(null);
  const [isResponseTrue, setIsResponseTrue] = useState(null);

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
      email: "",
      password: "",
    },

    onSubmit: async (userData) => {
      await axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signin", userData)
        .then((correctResponse) => {
          setIsResponseTrue(correctResponse.data.user.name);
          setToken(correctResponse.data.token);
          localStorage.setItem("userToken", correctResponse.data.token);
          setTimeout(() => {
            setIsResponseTrue(false);
            navigate("/products");
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
      email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 charachters"),
    }),
  });

  return (
    <section className="signInSection flex justify-center items-center bg-gradient-to-r from-[rgba(255,255,255,1)] to-[rgba(152,255,152,1)] overflow-hidden min-h-[calc(100vh-55px)] ">
      <div className="container mx-auto">
        <form
          className="w-3/4 md:w-1/2 mx-auto bg-white p-5 rounded-lg drop-shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h3 className="text-center text-3xl font-bold mb-2 text-black">
            Sign In
          </h3>

          {isResponseError && (
            <div
              className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">Incorrect email or password</span>
            </div>
          )}

          {isResponseTrue && (
            <div
              className="text-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
              role="alert"
            >
              <span className="font-medium">{`Welcome ${isResponseTrue}`}</span>
            </div>
          )}

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
          <span className="block text-center mb-3">
            <Link to="/forgot-password">
              <span className="cursor-pointer text-blue-700 hover:border-b hover:border-blue-700">
                Forgotten password?
              </span>
            </Link>
          </span>

          <button
            type="submit"
            className="mx-auto flex justify-center text-center text-white w-1/2 text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  py-2.5 h-12 disabled:bg-slate-400"
            disabled={!(dirty && isValid)}
          >
            {isSubmitting ? (
              <LoadingScreen width={28} height={28} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
