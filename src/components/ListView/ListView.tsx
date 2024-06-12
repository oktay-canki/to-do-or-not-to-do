import ListViewItem from "./ListViewItem";

const ListView = () => {
  return (
    <>
      <h3 className="text-xl text-center p-3">Task Lists</h3>
      <hr className="border-[var(--dark-accent)]" />
      <ul className="w-full p-0 m-0">
        <ListViewItem />
        <ListViewItem />
        <ListViewItem />
        <ListViewItem />
      </ul>
    </>
  );
};

export default ListView;
