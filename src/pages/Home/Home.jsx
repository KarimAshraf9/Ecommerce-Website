import Slider1 from "../../components/Slider1/Slider1";
import Products from "../Products/Products";
import blog1 from "../../assets/images/blog-img-1.jpeg";
import blog2 from "../../assets/images/blog-img-2.jpeg";
import Slider2 from "../../components/Slider2/Slider2";

export default function Home() {
  
  return (
    <section className="homeSection overflow-hidden">
      <div className="container mx-auto flex flex-col gap-y-3 sm:flex-row px-4 mt-5">
        <div className="w-full sm:w-3/4">
          <Slider2 />
        </div>
        <div className="w-full sm:w-1/4">
          <img
            src={blog1}
            className="w-full h-44 sm:h-40 object-cover"
            alt="blog1"
          />
          <img
            src={blog2}
            className="w-full h-44 sm:h-40  object-cover"
            alt="blog2"
          />
        </div>
      </div>
      <Slider1 />
      <Products showHeading={false} showLoadingScreen={false} />
    </section>
  );
}
