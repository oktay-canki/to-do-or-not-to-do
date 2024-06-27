import Button from "../components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { SiWindowsxp } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <div className="flex flex-col flex-1 lg:min-h-dvh lg:border-r-2 border-secondary-text pb-28">
        <div className="flex-none w-full p-10 lg:p-20 xl:p-28 mt-20 lg:mt-0">
          <h2 className="text-5xl font-bold tracking-wider mb-2 text-center lg:text-left">
            Create a new account
          </h2>
          <p className="text-2xl text-secondary-text tracking-wide text-center lg:text-left">
            Join in on productivity and save your self some precious time!
          </p>
        </div>
        <div className="flex w-full px-10 lg:px-20 xl:px-28">
          <ul className="flex flex-col gap-7 tracking-wide md:p-0 m-auto lg:m-0">
            <li className="flex gap-6 items-center text-2xl">
              <FaCheckCircle /> Plan ahead of time to be prepared
            </li>
            <li className="flex gap-6  items-center text-2xl">
              <FaCheckCircle />
              Keep track of your completed tasks
            </li>
            <li className="flex gap-6  items-center text-2xl">
              <FaCheckCircle />
              Group, order and orginize your todos
            </li>
            <li className="flex gap-6  items-center text-2xl">
              <FaCheckCircle />
              Get notified before your deadlines
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full lg:w-6/12 min-h-dvh py-14 md:p-28">
        <div className="w-8/12 m-auto">
          <RegisterForm />
          <div className="w-full">
            <p className="text-text text-center">
              Already have an account?
              <Link
                to="/out/login"
                className="text-secondary-text ml-2 underline"
              >
                Go to Login
              </Link>
            </p>
          </div>
          <div className="w-full text-center mt-2 mb-2">
            <a href="#" className="text-secondary-text underline">
              Forget your password?
            </a>
          </div>
          <div className="flex items-center justify-center w-full gap-4 mb-6">
            <hr className="flex-grow bg-text" />
            <span>or</span>
            <hr className="flex-grow bg-text" />
          </div>
          <Button className="w-full flex justify-center items-center bg-white text-black mb-6 rounded-sm">
            <FcGoogle size={30} className="mr-2" /> Login with Google
          </Button>
          <Button className="w-full flex justify-center items-center bg-white text-black mb-6 rounded-sm">
            <SiWindowsxp size={30} className="mr-2" />
            Login with Microsoft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
