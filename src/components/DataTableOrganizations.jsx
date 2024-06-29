import axios from "axios";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DataTableOrganizations = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const [organizations, setOrganizations] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getOrganizationDetails();
  }, []);

  const getOrganizationDetails = () => {
    axios
      .get(`${import.meta.env.VITE_PUBLIC_API_URL}/organizations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setOrganizations(response.data));
  };

  const deleteOrganization = (organization) => {
    axios
      .delete(
        `${import.meta.env.VITE_PUBLIC_API_URL}/Organizations/${
          organization?._id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => getOrganizationDetails());
  };

  const editOrganization = (organization) => {
    navigate("/editorganization", { state: { orgId: organization._id } });
  };

  const addOrganization = () => {
    navigate("/addorganization");
  };

  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="bg-white flex-grow rounded-lg p-8 flex gap-6 justify-between">
        <div className="w-full">
          <h1 className="text-3xl text-gray-400 font-bold p-2 mb-2">
            Organizations
          </h1>

          {organizations.length > 0 && <Searchbar />}

          {organizations.length > 0 && (
            <button
              onClick={() => addOrganization()}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Organization
            </button>
          )}

          <div className="overflow-x-auto mt-5">
            {organizations.length > 0 && (
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-center">ID</th>
                    <th className="px-4 py-2 border-b text-center">Name</th>
                    <th className="px-4 py-2 border-b text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.map((organization) => (
                    <tr key={organizations._id}>
                      <td className="px-4 py-2 border-b text-center">
                        {organization._id}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        {organization.name}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        <button
                          onClick={() => editOrganization(organization)}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteOrganization(organization)}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {organizations.message && (
              <div className="text-center text-gray-500 py-4">
                <div className="text-3xl text-red-600 font-bold p-2 mb-2">
                  {organizations.message}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableOrganizations;
