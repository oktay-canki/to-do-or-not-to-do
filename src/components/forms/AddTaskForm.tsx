import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { IoIosAdd } from "react-icons/io";
import LoadingSpinner from "../common/LoadingSpinner";
import { firebaseErrorMessage, isRequestError } from "../../utils/main";
import useCurrentUser from "../../hooks/useCurrentUser";
import addTask from "../../services/firebase/tasks/addTask";
import useCurrentTaskGroup from "../../hooks/useCurrentTaskGroup";

const formSchema = z.object({
  taskName: z
    .string()
    .min(1, "")
    .max(250, "Task can not be longer than 250 chracters"),
});

type AddTaskFormFields = z.infer<typeof formSchema>;

const AddTaskForm = () => {
  const currentUser = useCurrentUser();
  const selectedTaskGroup = useCurrentTaskGroup();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddTaskFormFields>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<AddTaskFormFields> = async (data) => {
    try {
      const newTask = await addTask(
        currentUser.id,
        selectedTaskGroup.id,
        data.taskName
      );
      reset();
    } catch (error) {
      if (isRequestError(error)) {
        toast.error(firebaseErrorMessage(error));
      } else {
        toast.error("An unknown error occurred.");
      }
      console.log(error);
    }
  };

  if (errors.taskName && errors.taskName.message != "") {
    toast.error(errors.taskName.message);
  }

  return (
    <form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("taskName")}
        className="rounded-r-none"
        placeholder="Add a new task"
        autoComplete="off"
      />
      <Button className="rounded-l-none px-4" disabled={isSubmitting}>
        {isSubmitting ? <LoadingSpinner /> : <IoIosAdd size={30} />}
      </Button>
    </form>
  );
};

export default AddTaskForm;
