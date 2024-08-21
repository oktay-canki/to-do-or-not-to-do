import { LuClipboardList } from "react-icons/lu";
import useCurrentTaskGroup from "../../hooks/useCurrentTaskGroup";
import Input from "../ui/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { firebaseErrorMessage, isRequestError } from "../../utils/main";
import LoadingSpinner from "../common/LoadingSpinner";
import useCurrentUser from "../../hooks/useCurrentUser";
import updateTaskGroupTitle from "../../services/firebase/task-groups/updateTaskGroupTitle";

const formSchema = z.object({
  groupName: z
    .string()
    .min(1)
    .max(100, "Task group name can not be more than 100 characters"),
});

type TaskGroupTitleFormFields = z.infer<typeof formSchema>;

const TaskGroupTitleForm = () => {
  const currentUser = useCurrentUser();
  const currentTaskGroup = useCurrentTaskGroup();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TaskGroupTitleFormFields>({ resolver: zodResolver(formSchema) });

  useEffect(() => {
    if (currentTaskGroup.title) {
      setValue("groupName", currentTaskGroup.title);
    }
  }, [currentTaskGroup.title, setValue]);

  const onSubmit: SubmitHandler<TaskGroupTitleFormFields> = async (data) => {
    if (data.groupName === currentTaskGroup.title) return;

    try {
      await updateTaskGroupTitle(
        currentUser.id,
        currentTaskGroup.id,
        data.groupName
      );
      console.log("New group name: " + data.groupName);
    } catch (error) {
      if (isRequestError(error)) {
        toast.error(firebaseErrorMessage(error));
      } else {
        toast.error("An unknown error occurred.");
      }
      setValue("groupName", currentTaskGroup.title);
      console.log(error);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.type === "blur") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      className="flex flex-1 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <LuClipboardList size={28} />
      <Input
        {...register("groupName")}
        type="text"
        autoComplete="off"
        className="bg-transparent  border-2 border-transparent py-[6px] px-2 text-2xl mr-2 focus:border-secondary-text"
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
      {isSubmitting && (
        <span className="mr-2">
          <LoadingSpinner />
        </span>
      )}
    </form>
  );
};

export default TaskGroupTitleForm;
