import { ThreeDots } from "react-loader-spinner";

const PageLoading = () => {
  return (
    <div className="flex h-dvh w-full items-center justify-center text-2xl">
      <ThreeDots
        visible={true}
        height="60"
        width="60"
        color="#fff"
        radius="7"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default PageLoading;
