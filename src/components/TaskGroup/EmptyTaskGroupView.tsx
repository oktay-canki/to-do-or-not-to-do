const EmptyTaskGroupView = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="w-36 h-32 bg-gray-500 p-2 rounded-full lg:w-64 lg:h-60 flex shrink-0">
        <img src="/images/task-illustration.svg" />
      </div>
      <h3 className="text-secondary-text mt-6 lg:mt-16 text-lg">
        Add new tasks to your list &#128203;
      </h3>
    </div>
  );
};

export default EmptyTaskGroupView;
