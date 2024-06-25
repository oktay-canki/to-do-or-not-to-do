import { IoMdSearch } from "react-icons/io";

type SearchFormProps = {
  className: string;
};

const SearchForm = ({ className }: SearchFormProps) => {
  return (
    <form className={className}>
      <div className="flex justify-center items-center pl-4">
        <input
          type="text"
          placeholder="Search"
          className="min-w-0 flex-1 outline-none bg-primary text-xl px-4 py-2"
        />
        <button type="submit" className="text-2xl h-12 px-3">
          <IoMdSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
