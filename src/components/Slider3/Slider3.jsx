import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import "./slider3.css";

export default function Slider3({ restImages }) {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={restImages[i]}
            className="w-full md:h-[100px] object-cover"
          />
        </a>
      );
    },
    dots: true,
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container mb-40">
      <Slider {...settings}>
        {restImages.map((image, idx) => (
          <div key={idx}>
            <img src={image} className="w-3/4 mx-auto md:h-[500px]" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
