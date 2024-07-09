const TaskGroupListSkeleton = () => {
  return (
    <div className="animate-pulse px-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="rounded-md bg-accent w-6 h-6"></div>
        <div className="rounded-md bg-primary h-8 flex-1"></div>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <div className="rounded-md bg-accent w-6 h-6"></div>
        <div className="rounded-md bg-primary h-8 flex-1"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-accent w-6 h-6"></div>
        <div className="rounded-md bg-primary h-8 flex-1"></div>
      </div>
    </div>
  );
};

export default TaskGroupListSkeleton;
