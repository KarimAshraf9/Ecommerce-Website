import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import NotFound from "./pages/NotFound/NotFound";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import TokenContextProvider from "./context/TokenContextProvider";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import CashOrder from "./pages/CashOrder/CashOrder";
import AllOrders from "./pages/AllOrders/AllOrders";
import { Offline } from "react-detect-offline";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Verification from "./pages/Verification/Verification";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import OfflineToast from "./components/OfflineToast/OfflineToast";

function App() {
  const allRoutes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "whislist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "cashOrder",
          element: (
            <ProtectedRoute>
              <CashOrder />
            </ProtectedRoute>
          ),
        },
        {
          path: "orders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "allOrders",
          element: <Navigate to={"/orders"} />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "verification",
          element: <Verification />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        { path: "signUp", element: <SignUp /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  const queryClientObject = new QueryClient();

  return (
    <>
      <TokenContextProvider>
        <QueryClientProvider client={queryClientObject}>
          <ReactQueryDevtools />
          <RouterProvider router={allRoutes} />
          <Toaster />
          <Offline>
            <OfflineToast />
          </Offline>
        </QueryClientProvider>
      </TokenContextProvider>
    </>
  );
}

export default App;
