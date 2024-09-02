import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import SearchInput from "../../components/SearchInput/SearchInput";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useLocation } from "react-router-dom";
import useFetchProducts from "../../CustomHooks/useFetchProducts";
import useGetWishlistItemsSet from "../../CustomHooks/useGetWishlistItemsSet";
import useGetCartItemsSet from "../../CustomHooks/useGetCartItemsSet";

export default function Products({ showHeading = true }) {
  const [inputSearchvalue, setInputSearchValue] = useState("");
  const [filterData, setFilterData] = useState([]);
  const wishlistSet = useGetWishlistItemsSet();
  const cartItemsSet = useGetCartItemsSet();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryID = searchParams.get("category");
  const brandID = searchParams.get("brand");

  const { isLoading, isError, data } = useFetchProducts(categoryID, brandID);

  useEffect(() => {
    if (data) {
      setFilterData(
        data.data.data.filter((product) =>
          product.title.toLowerCase().includes(inputSearchvalue.toLowerCase())
        )
      );
    }
  }, [data, inputSearchvalue]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-55px)]">
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
    <section className="productsSection">
      <div className="container mx-auto px-5 sm:px-16 md:px-5 py-10">
        {showHeading && (
          <div className="text-center">
            <h1 className="inline-block mb-10 pb-2 px-4 text-4xl font-bold text-emerald-600  border-b-4 rounded-b-2xl">
              All Products
            </h1>
          </div>
        )}
        <div className="searchBar md:w-3/4 lg:w-1/2 mx-auto mb-6 relative">
          <SearchInput setInputSearchValue={setInputSearchValue} />
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 md:gap-x-5 gap-y-7">
          {filterData.length ? (
            filterData.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                inWishlist={wishlistSet.has(product._id)}
                inCart={cartItemsSet.has(product._id)}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
