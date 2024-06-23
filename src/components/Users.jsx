import DataTableUsers from "./DataTableUsers";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";

const Users = () => {
  return (
    <>
      <div className="flex gap-5">
        <Sidebar />
        <div className="bg-white flex-grow rounded-lg p-8 flex gap-6 justify-between">
          <div className="w-full">
            <h1 className="text-3xl text-gray-400 font-bold p-2 mb-2">
              Users Dashboard
            </h1>
            <Searchbar />
            <DataTableUsers />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
