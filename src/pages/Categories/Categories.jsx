import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import useAllCategories from "../../CustomHooks/useFetchAllCategories";

export default function Categories() {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useAllCategories();

  function handleClick(categoryID) {
    navigate(`/products?category=${categoryID}`);
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
    <section className="categoriesSection">
      <div className="container mx-auto px-5 sm:px-16 md:px-14 py-10">
        <div className="text-center">
          <h1 className="inline-block mb-10 pb-2 px-4 text-4xl font-bold text-emerald-600  border-b-4 rounded-b-2xl">
            All Categories
          </h1>
        </div>
        <div className="grid md:grid-cols-3 md:gap-x-5 gap-y-7">
          {data.data.data.map((category) => (
            <figure
              key={category._id}
              onClick={() => {
                handleClick(category._id);
              }}
              className="border border-transparent rounded-lg cursor-pointer  hover:shadow-lg hover:shadow-teal-100 duration-500 "
            >
              <img
                src={category.image}
                className="w-full h-[300px] rounded-lg"
                alt={category.name}
              />
              <figcaption className="text-center my-3 text-2xl font-bold text-emerald-600">
                <p>{category.name}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
