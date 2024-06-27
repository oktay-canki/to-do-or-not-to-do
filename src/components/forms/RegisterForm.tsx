import { GoMail } from "react-icons/go";
import Input from "../ui/Input";
import { IoKeyOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import Button from "../ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username cannot be more than 20 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password can not be more than 16 characters"),
    verifyPassword: z.string(),
  })
  .refine((data) => data.password === data.verifyPassword, {
    path: ["verifyPassword"],
    message: "Passwords do not match",
  });

type RegisterFormFields = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const {
    register: rhfRegister,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    /*setError("root", {
        message: "This email is already taken",
      });*/
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-4xl font-bold mb-6">Register</h2>
      {errors.root && (
        <p className="text-danger px-2 mb-2">* {errors.root.message}</p>
      )}
      <div className="mb-6">
        <Input
          {...rhfRegister("username")}
          type="text"
          name="username"
          label="Username"
          placeholder="Enter your username"
          className="p-5"
          icon={<GoMail size={24} />}
          error={errors.username && errors.username.message}
        />
      </div>
      <div className="mb-6">
        <Input
          {...rhfRegister("email")}
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
          {...rhfRegister("password")}
          type="password"
          label="Password"
          placeholder="Enter your password"
          className="p-5"
          icon={<IoKeyOutline size={24} />}
          error={errors.password && errors.password.message}
        />
      </div>
      <div className="mb-6">
        <Input
          {...rhfRegister("verifyPassword")}
          type="password"
          label="Verify Password"
          placeholder="Enter your password again"
          className="p-5"
          icon={<RiLockPasswordLine size={24} />}
          error={errors.verifyPassword && errors.verifyPassword.message}
        />
      </div>
      <Button disabled={isSubmitting} className="w-full p-5 mb-6 rounded-sm">
        {isSubmitting ? "Creating..." : "Create Account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
