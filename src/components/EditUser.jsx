import EditUserForm from "./EditUserForm";
import Sidebar from "./Sidebar";

const EditUser = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />

      <div className="bg-white flex-grow rounded-lg p-8 flex gap-6 justify-between">
        <div className="w-full">
          <h1 className="text-3xl text-gray-400 font-bold p-2 mb-2">
            Edit User
          </h1>
          <div className="w-full h-screen">
            <EditUserForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
