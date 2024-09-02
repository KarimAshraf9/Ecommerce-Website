import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider2.css";
import Slider from "react-slick";

import image1 from "../../assets/images/slider-image-3.jpeg";
import image2 from "../../assets/images/slider-image-2.jpeg";
import image3 from "../../assets/images/slider-image-1.jpeg";
import image4 from "../../assets/images/slider-2.jpeg";
import image5 from "../../assets/images/grocery-banner-2.jpeg";
import image6 from "../../assets/images/grocery-banner.png";

const images = [image1, image2, image3, image4, image5, image6];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        top: "50%",
        right: "20px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        top: "50%",
        left: "5px",
        backgroundColor: "transparent",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

export default function Slider2() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              className="w-full inline-block h-80 object-cover"
              alt=""
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
