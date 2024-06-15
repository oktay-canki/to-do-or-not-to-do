import Button from "../components/common/Button";
import Input from "../components/common/Input";
import LoggedOutLayout from "./layouts/logged-out";
import { FcGoogle } from "react-icons/fc";
import { SiWindowsxp } from "react-icons/si";
import { GoMail } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

const Register = () => {
  return (
    <LoggedOutLayout>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="flex flex-col flex-1 lg:min-h-dvh border-r-2 border-secondary-text">
          <div className="flex-none w-full p-10 lg:p-20 xl:p-28 mt-20 lg:mt-0">
            <h2 className="text-5xl font-bold tracking-wider mb-2 text-center lg:text-left">
              Create a new account
            </h2>
            <p className="text-2xl text-secondary-text tracking-wide text-center lg:text-left">
              Join in on productivity and save your self some precious time!
            </p>
          </div>
          <div className="flex w-full px-10 lg:px-20 xl:px-28">
            <ul className="flex flex-col gap-5 tracking-wide md:p-0 m-auto lg:m-0">
              <li className="flex gap-4 items-center text-2xl">
                <FaCheckCircle /> Plan ahead of time to be prepared
              </li>
              <li className="flex gap-4 items-center text-2xl">
                <FaCheckCircle />
                Keep track of your completed tasks
              </li>
              <li className="flex gap-4 items-center text-2xl">
                <FaCheckCircle />
                Group, order and orginize your todos
              </li>
              <li className="flex gap-4 items-center text-2xl">
                <FaCheckCircle />
                Get notified before your deadlines
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 min-h-dvh pt-10 pb-5 lg:pt-20 lg:pb-10">
          <div className="w-8/12 m-auto">
            <form action="">
              <h2 className="text-4xl font-bold mb-6">Register</h2>
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
              <div className="mb-6">
                <Input
                  type="password"
                  label="Verify Password"
                  placeholder="Enter your password again"
                  className="p-5"
                  icon={<RiLockPasswordLine size={24} />}
                />
              </div>
              <Button className="w-full p-5 mb-6">Create Account</Button>
            </form>
            <div className="w-full text-center mb-6">
              <a href="#" className="text-lg text-accent">
                Forget your password?
              </a>
            </div>
            <div className="flex items-center justify-center w-full gap-4 mb-6">
              <hr className="flex-grow bg-text" />
              <span>or</span>
              <hr className="flex-grow bg-text" />
            </div>
            <Button className="w-full flex justify-center items-center bg-white text-black mb-6">
              <FcGoogle size={30} className="mr-2" /> Login with Google
            </Button>
            <Button className="w-full flex justify-center items-center bg-white text-black mb-6">
              <SiWindowsxp size={30} className="mr-2" />
              Login with Microsoft
            </Button>
            <div className="w-full">
              <p className="text-text text-center">
                Don't have an account?
                <a href="#" className="text-accent ml-2">
                  Sign Up Now!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </LoggedOutLayout>
  );
};

export default Register;
