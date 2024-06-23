import EditOrgForm from "./EditOrgForm";
import Sidebar from "./Sidebar";

const EditOrganization = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="bg-white flex-grow rounded-lg p-8 flex gap-6 justify-between">
        <div className="w-full">
          <h1 className="text-3xl text-gray-400 font-bold p-2 mb-2">
            Edit Organization
          </h1>
          <div className="w-full h-screen">
            <EditOrgForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrganization;
