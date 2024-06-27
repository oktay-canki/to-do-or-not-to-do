import Button from "../components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { SiWindowsxp } from "react-icons/si";
import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForms";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden lg:flex flex-col justify-between w-full lg:w-6/12 min-h-dvh border-r-2 border-secondary-text">
        <div className="flex-none w-full lg:p-20 xl:p-28">
          <h2 className="text-5xl font-bold tracking-wider mb-2">
            Login to your account
          </h2>
          <p className="text-2xl text-secondary-text tracking-wide">
            Please enter your credentials to access your tasks
          </p>
        </div>
        <img
          className="w-2/4 mr-auto ml-4"
          src="/images/task-illustration.svg"
        />
      </div>
      <div className="w-full lg:w-6/12 min-h-dvh py-14 md:p-28">
        <div className="w-8/12 m-auto">
          <LoginForm />
          <div className="w-full">
            <p className="text-text text-center">
              Don't have an account?
              <Link
                to="/out/register"
                className="text-secondary-text ml-2 underline"
              >
                Sign Up Now!
              </Link>
            </p>
          </div>
          <div className="w-full text-center mb-2 mt-2">
            <a href="#" className="text-lg text-secondary-text underline">
              Forget your password?
            </a>
          </div>
          <div className="flex items-center justify-center w-full gap-4 mb-6">
            <hr className="flex-grow bg-text" />
            <span>or</span>
            <hr className="flex-grow bg-text" />
          </div>
          <Button className="w-full flex justify-center items-center bg-white text-black mb-6 rounded-sm">
            <FcGoogle size={30} className="mr-2" /> Login With Google
          </Button>
          <Button className="w-full flex justify-center items-center bg-white text-black mb-6 rounded-sm">
            <SiWindowsxp size={30} className="mr-2" />
            Login With Microsoft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
