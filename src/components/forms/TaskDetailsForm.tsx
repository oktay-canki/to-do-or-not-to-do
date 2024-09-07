import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { z } from "zod";
import Input from "../ui/Input";
import useCurrentTask from "../../hooks/useCurrentTask";
import { useEffect } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import updateTask from "../../services/firebase/tasks/updateTask";
import useCurrentUser from "../../hooks/useCurrentUser";
import useCurrentTaskGroup from "../../hooks/useCurrentTaskGroup";
import { firebaseErrorMessage, isRequestError } from "../../utils/main";
import { toast } from "react-toastify";
import { useTaskDetailsStore } from "../../stores/taskDetailsStore";

const formSchema = z.object({
  taskName: z
    .string()
    .min(1, "")
    .max(250, "Task can not be longer than 250 characters"),
  dueDate: z.string().optional(),
  description: z
    .string()
    .max(500, "Task description can not be longer than 500 characters")
    .optional(),
});

type TaskDetailsFormFields = z.infer<typeof formSchema>;

const TaskDetailsForm = () => {
  const currentUser = useCurrentUser();
  const currentTaskGroup = useCurrentTaskGroup();
  const currentTask = useCurrentTask();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TaskDetailsFormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: currentTask.title,
      dueDate: currentTask.dueDate ? currentTask.dueDate : undefined,
      description: currentTask.description,
    },
  });
  const { setSelectedTask } = useTaskDetailsStore();

  useEffect(() => {
    if (currentTask.title) setValue("taskName", currentTask.title);
    setValue("dueDate", currentTask.dueDate ?? undefined);
    setValue("description", currentTask.description ?? "");
  }, [
    currentTask.title,
    currentTask.dueDate,
    currentTask.description,
    setValue,
  ]);

  const onSubmit: SubmitHandler<TaskDetailsFormFields> = async (data) => {
    if (
      currentTask.title === data.taskName &&
      currentTask.description === data.description &&
      currentTask.dueDate === data.dueDate
    )
      return;

    console.log(data.dueDate, " ", currentTask.dueDate);

    try {
      const updatedTask = {
        ...currentTask,
        title: data.taskName,
        description: data.description,
        dueDate: data.dueDate ?? "",
      };
      await updateTask(currentUser.id, currentTaskGroup.id, updatedTask);
      setSelectedTask(updatedTask);
    } catch (error) {
      if (isRequestError(error)) {
        toast.error(firebaseErrorMessage(error));
      } else {
        toast.error("An unknown error occurred.");
      }
      reset();
      console.log(error);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.type === "blur") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      {isSubmitting && (
        <span className="mr-2">
          <LoadingSpinner />
        </span>
      )}
      <div className="flex items-center">
        <BiEditAlt size={30} />
        <Input
          {...register("taskName")}
          type="text"
          autoComplete="off"
          className={`bg-transparent hover:bg-primary focus:bg-primary py-2 px-1 ml-1 text-xl ${
            errors.taskName && "border-2 border-danger"
          }`}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
      </div>
      <div className="mt-4">
        <Input
          {...register("dueDate")}
          className={`${errors.dueDate && "border-2 border-danger"}`}
          type="date"
          label="Due Date"
          autoComplete="off"
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
      </div>
      <div className="mt-4">
        <label className="mt-4">Description</label>
        <textarea
          {...register("description")}
          className="w-full h-32 bg-primary rounded-md p-4 mt-2 outline-none"
          onBlur={handleBlur}
          disabled={isSubmitting}
        ></textarea>
      </div>
    </form>
  );
};

export default TaskDetailsForm;
