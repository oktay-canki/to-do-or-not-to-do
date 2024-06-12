import ListView from "../components/ListView/ListView";
import LoggedInLayout from "./layouts/logged-in";

const Home = () => {
  return (
    <LoggedInLayout>
      <div className="flex flex-1 md:gap-10 w-11/12 items-center justify-center m-auto mt-4">
        <div className="min-h-full max-w-xs bg-black">
          <ListView />
        </div>
        <div className="min-h-full flex-1 bg-black">Middle Tasks Panel</div>
        <div className="min-h-full bg-black ">Right Side Details Panel</div>
      </div>
    </LoggedInLayout>
  );
};

export default Home;
