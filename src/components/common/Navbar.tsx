const Navbar = () => {
  return (
    <nav className="flex justify-between items-center md:w-11/12 m-auto p-4">
      <h2 className="text-2xl font-bold">To do or not to do</h2>
      <button className="flex gap-3 items-center">
        <span className="flex items-center justify-center text-xl w-10 h-10 rounded-full">
          DJ
        </span>
        <span>Dohn Joe</span>
      </button>
    </nav>
  );
};

export default Navbar;
