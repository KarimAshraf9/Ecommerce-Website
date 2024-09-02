import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useRef } from "react";
import Slider from "react-slick";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import useAllCategories from "../../CustomHooks/useFetchAllCategories";

function Slider1() {
  let sliderRef = useRef(null);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 500,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { isLoading, isError, data } = useAllCategories();

  if (isLoading) {
    return (
      <div className="bg-white flex justify-center items-center h-[284px]">
        <LoadingScreen width={50} height={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white flex justify-center items-center h-[284px]">
        <LoadingScreen width={50} height={50} />
      </div>
    );
  }

  return (
    <div className="slider-container mt-16 px-4">
      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
        {data.data.data.map((product) => (
          <div key={product._id}>
            <img
              src={product.image}
              className="object-cover h-64 mx-auto"
              alt="product.name"
            />
            <h6 className="text-center text-lg font-bold">{product.name}</h6>
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default Slider1;
