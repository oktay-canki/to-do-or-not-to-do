import { Oval } from "react-loader-spinner";

type LoadingSpinnerProps = {
  width?: number;
  height?: number;
};

const LoadingSpinner = ({ width, height }: LoadingSpinnerProps) => {
  return (
    <Oval
      visible={true}
      height={height ?? 30}
      width={width ?? 30}
      color="#fff"
      secondaryColor="#848587"
      ariaLabel="oval-loading"
      strokeWidth={5}
    />
  );
};

export default LoadingSpinner;
