import { Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosAdd } from "react-icons/io";
import { z } from "zod";
import Button from "../ui/Button";
import { firebaseErrorMessage, isRequestError } from "../../utils/main";
import { toast } from "react-toastify";
import addTaskGroup from "../../services/firebase/task-groups/addTaskGroup";
import useCurrentUser from "../../hooks/useCurrentUser";
import LoadingSpinner from "../common/LoadingSpinner";
import { useTaskGroupStore } from "../../stores/taskGroupStore";
import { getDoc } from "firebase/firestore";
import TaskGroup from "../../types/TaskGroup";

const formSchema = z.object({
  groupName: z
    .string()
    .min(1, "Task group name is required")
    .max(100, "Task group name can not be more than 100 characters"),
});

type AddTaskGroupFormFields = z.infer<typeof formSchema>;

const AddTaskGroupForm = () => {
  const currentUser = useCurrentUser();
  const { setSelectedTaskGroup } = useTaskGroupStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddTaskGroupFormFields>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<AddTaskGroupFormFields> = async (data) => {
    try {
      const newTaskGroupRef = await addTaskGroup(
        currentUser.id,
        data.groupName
      );
      const newTaskGroupSnap = await getDoc(newTaskGroupRef);

      if (newTaskGroupSnap.exists()) {
        setSelectedTaskGroup({
          id: newTaskGroupRef.id,
          ...newTaskGroupSnap.data(),
        } as TaskGroup);
      }

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

  if (errors.groupName) {
    toast.error(errors.groupName.message);
  }

  return (
    <form className="flex h-12" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("groupName")}
        type="text"
        placeholder="Add new task group"
        className="h-12 flex-1 outline-none bg-primary text-lg px-3 py-1 hover:bg-primary focus:bg-primary"
        autoComplete="off"
      />
      <Button
        type="submit"
        className="flex justify-center items-center h-12 w-12 bg-accent"
        disabled={isSubmitting}
      >
        {isSubmitting ? <LoadingSpinner /> : <IoIosAdd size={24} />}
      </Button>
    </form>
  );
};

export default AddTaskGroupForm;
