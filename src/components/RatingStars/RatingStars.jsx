import ReactStars from "react-rating-stars-component";
export default function RatingStars({ value }) {
  return (
    <ReactStars
      count={5}
      size={18}
      activeColor="#ffd700"
      isHalf={true}
      emptyIcon={<i className="fa-regular fa-star"></i>}
      halfIcon={<i className="fa-solid fa-star-half-stroke"></i>}
      filledIcon={<i className="fa-solid fa-star"></i>}
      value={value}
      edit={false}
    />
  );
}
