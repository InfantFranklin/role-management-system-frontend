import Sidebar from "./Sidebar";
import UserForm from "./UserForm";

const AddUser = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />

      <div className="bg-white flex-grow rounded-lg p-8 flex gap-6 justify-between">
        <div className="w-full">
          <h1 className="text-3xl text-gray-400 font-bold p-2 mb-2">
            Add User
          </h1>
          <div className="w-full h-screen">
            <UserForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
