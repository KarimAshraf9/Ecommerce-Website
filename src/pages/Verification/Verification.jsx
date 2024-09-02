import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Verification() {
  const navigate = useNavigate();

  const [isResponseError, setIsResponseError] = useState(null);

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
      resetCode: "",
    },

    onSubmit: async (userData) => {
      await axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          userData
        )
        .then(() => {
          navigate("/reset-password");
        })
        .catch((errorResponse) => {
          console.log(errorResponse);

          setIsResponseError(errorResponse.response.data.message);
          setTimeout(() => {
            setIsResponseError(null);
          }, 2000);
        });
    },

    validationSchema: Yup.object({
      resetCode: Yup.string().required("verification code is required"),
    }),
  });
  return (
    <section className="verificationSection flex justify-center items-center bg-gradient-to-r from-[rgba(255,255,255,1)] to-[rgba(152,255,152,1)] overflow-hidden min-h-[calc(100vh-55px)] ">
      <div className="container mx-auto">
        <form
          className="w-3/4 md:w-1/2 mx-auto bg-white p-5 rounded-lg drop-shadow-2xl"
          onSubmit={handleSubmit}
        >
          <p className="text-md mb-2 text-black">
            Please enter your verification code.
          </p>

          {isResponseError && (
            <div
              className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{isResponseError}</span>
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="resetCode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your code:
            </label>
            <input
              value={values.resetCode}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="resetCode"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            {touched.resetCode && errors.resetCode && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops! {errors.resetCode}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mx-auto flex justify-center text-center text-white w-1/2 text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-12 disabled:bg-slate-400"
            disabled={!(dirty && isValid)}
          >
            {isSubmitting ? <LoadingScreen width={28} height={28} /> : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}
