import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";

export default function Brands() {
  const navigate = useNavigate();
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
  });

  function handleClick(brandID) {
    navigate(`/products?brand=${brandID}`);
  }

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
    <section className="brandsSection">
      <div className="container mx-auto px-5 sm:px-16 md:px-14 py-10">
        <div className="text-center">
          <h1 className="inline-block mb-5 pb-2 px-4 text-4xl font-bold text-emerald-600  border-b-4 rounded-b-2xl">
            All Brands
          </h1>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 md:gap-x-5 gap-y-7">
          {data.data.data.map((brand) => (
            <figure
              onClick={() => handleClick(brand._id)}
              key={brand._id}
              className="border border-transparent rounded-lg cursor-pointer hover:shadow-lg hover:shadow-teal-100 duration-500"
            >
              <img
                src={brand.image}
                className="mx-auto w-3/4 md:w-full h-[200px] rounded-lg"
                alt={brand.name}
              />
              <figcaption className="text-center my-3 text-2xl font-bold text-emerald-600">
                <p>{brand.name}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
