import { RotatingLines } from "react-loader-spinner";

export default function LoadingScreen({ width, height }) {
  return (
    <RotatingLines
      visible={true}
      height={height}
      width={width}
      color="grey"
      strokeWidth="5"
      animationDuration="0.75"
    />
  );
}
