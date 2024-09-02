import { Link, NavLink } from "react-router-dom";
import navLogo from "../../assets/images/freshcart-logo.svg";
import { useContext, useRef } from "react";
import { tokenContextObject } from "../../context/TokenContextProvider";

export default function Navbar() {
  const { token, setToken } = useContext(tokenContextObject);
  const burgerMenuList = useRef();

  function handleClickMenu() {
    burgerMenuList.current.classList.toggle("hidden");
  }

  function handleClickLinks() {
    if (!burgerMenuList.current.classList.contains("hidden")) {
      burgerMenuList.current.classList.add("hidden");
    }
  }

  function handleLogOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setToken(null);
  }

  return (
    <nav className="bg-gray-100">
      <div className="container flex justify-between items-center mx-auto py-3 px-10">
        <div className="navLogo">
          <Link to="home">
            <img src={navLogo} className="w-full" alt="Fresh cart logo" />
          </Link>
        </div>

        {token && (
          <ul className="navLinks space-x-5 hidden lg:block">
            <NavLink to="home">Home</NavLink>
            <NavLink to="cart">Cart</NavLink>
            <NavLink to="whislist">Wishlist</NavLink>
            <NavLink to="products">Products</NavLink>
            <NavLink to="categories">Categories</NavLink>
            <NavLink to="brands">Brands</NavLink>
          </ul>
        )}

        <ul className="space-x-5 flex items-center">
          <i
            onClick={handleClickMenu}
            className="fa-solid fa-bars cursor-pointer text-2xl h-[30px] lg:hidden "
          ></i>

          {token ? (
            <div className="hidden lg:block">
              <div className="flex items-center space-x-5 ">

              {/* <i className="fa-solid fa-cart-shopping text-2xl h-[30px]"></i> */}
              <Link onClick={handleLogOut} to="/login">
                <span>Logout</span>
              </Link>
              </div>
            </div>
          ) : (
            <div className="space-x-5 hidden lg:block">
              <Link to="signUp">Sign Up</Link>
              <Link to="login">Log In</Link>
            </div>
          )}
        </ul>
      </div>
      <ul
        ref={burgerMenuList}
        className="burgerNavLinks hidden absolute start-0 end-0 top-[55px] bg-gray-100 z-50 text-center space-y-3 py-2"
      >
        {token ? (
          <>
            <Link onClick={handleClickLinks} className="block hover:bg-white" to="home">
              Home
            </Link>
            <Link onClick={handleClickLinks} className="block hover:bg-white" to="cart">
              Cart
            </Link>
            <Link onClick={handleClickLinks} className="block hover:bg-white" to="whislist">
              Wishlist
            </Link>
            <Link onClick={handleClickLinks} className="block hover:bg-white" to="products">
              Products
            </Link>
            <Link onClick={handleClickLinks} className="block hover:bg-white" to="categories">
              Categories
            </Link>
            <Link onClick={handleClickLinks} className="block hover:bg-white" to="brands">
              Brands
            </Link>
            <Link
              onClick={() => {
                handleClickLinks();
                handleLogOut();
              }}
              className="block hover:bg-white"
              to="/login"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link onClick={handleClickLinks} className="block hover:bg-white" to="signUp">
              Sign Up
            </Link>
            <Link onClick={handleClickLinks} className="block hover:bg-white" to="login">
              Log In
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

