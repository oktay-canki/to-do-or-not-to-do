import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { FcGoogle } from "react-icons/fc";
import { SiWindowsxp } from "react-icons/si";
import { GoMail } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden lg:flex flex-col justify-between flex-1 min-h-dvh border-r-2 border-secondary-text">
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
      <div className="flex-1 min-h-dvh py-14 md:p-28">
        <div className="w-8/12 m-auto">
          <form action="">
            <h2 className="text-4xl font-bold mb-6">Login</h2>
            <div className="mb-6">
              <Input
                type="email"
                label="E-mail"
                placeholder="Enter your email"
                className="p-5"
                icon={<GoMail size={24} />}
              />
            </div>
            <div className="mb-6">
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                className="p-5"
                icon={<IoKeyOutline size={24} />}
              />
            </div>
            <Button className="w-full p-5 mb-6 rounded-sm">
              Login to account
            </Button>
          </form>
          <div className="w-full text-center mb-6">
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
          <div className="w-full">
            <p className="text-text text-center">
              Don't have an account?
              <a href="#" className="text-secondary-text ml-2 underline">
                Sign Up Now!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
