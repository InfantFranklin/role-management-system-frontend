import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataTableUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRole = userData.role.name;

  useEffect(() => {
    getUserDetails();
    checkUserRole();
  }, []);

  const checkUserRole = () => {
    if (userRole === "admin") {
      console.log (userRole,"Role check")
      setIsButtonDisabled(false);
    }else {
       console.log(userRole, 'user');
    }
  };

  const getUserDetails = () => {
    axios
      .get(`${import.meta.env.VITE_PUBLIC_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUsers(response.data));
  };

  const editUser = (user) => {
    navigate("/edituser", { state: { userId: user._id } });
  };

  const addUser = () => {
    navigate("/adduser");
  };

  const deleteUser = (user) => {
    axios
      .delete(`${import.meta.env.VITE_PUBLIC_API_URL}/users/${user?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => getUserDetails());
  };

  return (
    <div>
      <div className="overflow-x-auto mt-5">
        {!isButtonDisabled && (
          <button
            onClick={() => addUser()}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add User
          </button>
        )}
        {users.length > 0 ? (
          <table className="min-w-full mt-8 bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-center">ID</th>
                <th className="px-4 py-2 border-b text-center">Name</th>
                <th className="px-4 py-2 border-b text-center">Email</th>
                {!isButtonDisabled && (
                  <th className="px-4 py-2 border-b text-center">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border-b text-center">{user._id}</td>
                  <td className="px-4 py-2 border-b text-center">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {user.email}
                  </td>
                  {!isButtonDisabled && (
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        onClick={() => editUser(user)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteUser(user)}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-4">No results found</div>
        )}
      </div>
    </div>
  );
};

export default DataTableUsers;
