import { IoKeyOutline } from "react-icons/io5";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { GoMail } from "react-icons/go";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase/main";
import { firebaseErrorMessage, isRequestError } from "../../utils/main";
import RequestError from "../../types/RequestError";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});

type LoginFormFields = z.infer<typeof formSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email.trim(), data.password);
    } catch (error) {
      if (isRequestError(error)) {
        toast.error(firebaseErrorMessage(error));
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-4xl font-bold mb-6">Login</h2>
      {errors.root && (
        <p className="text-danger px-2 mb-2">* {errors.root.message}</p>
      )}
      <div className="mb-6">
        <Input
          {...register("email")}
          type="email"
          label="E-mail"
          placeholder="Enter your email"
          className="p-5"
          icon={<GoMail size={24} />}
          error={errors.email && errors.email.message}
        />
      </div>
      <div className="mb-6">
        <Input
          {...register("password")}
          type="password"
          label="Password"
          placeholder="Enter your password"
          className="p-5"
          icon={<IoKeyOutline size={24} />}
          error={errors.password && errors.password.message}
        />
      </div>
      <Button disabled={isSubmitting} className="w-full p-5 mb-6 rounded-sm">
        {isSubmitting ? "Logging in..." : "Login to account"}
      </Button>
    </form>
  );
};

export default LoginForm;
