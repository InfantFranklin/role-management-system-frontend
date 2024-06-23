import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div>
      <div className="bg-[#dde6ed] p-2.5 rounded-lg flex items-center w-full">
        <input
          type="text"
          placeholder="Search..."
          className="border-none outline-none bg-transparent p-1.5 w-full"
        />
        <FaSearch className="text-[#969393] text-2xl cursor-pointer transition ease-in-out duration-500" />
      </div>
    </div>
  );
};

export default Searchbar;
