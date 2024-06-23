import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataTableUsers = () => {
  // const users = [
  //   {
  //     _id: "6676b21ff7a6784d4afafab7",
  //     name: "Admin",
  //     email: "admin@gmail.com",
  //     password: "$2b$10$opjE.lFU7H02sSqEYNZvX.4MvnF5pCtSrEfjVTVC2rxD1vjaZGxBu",
  //     role: {
  //       _id: "6676ac42b3942ec718dc0b3c",
  //       name: "admin",
  //       privileges: ["view all data", "edit all data", "delete all data"],
  //       __v: 0,
  //     },
  //     organization: {
  //       _id: "6676b21ff7a6784d4afafab5",
  //       name: "Org",
  //       users: [],
  //       __v: 0,
  //     },
  //     __v: 0,
  //   },
  //   {
  //     _id: "6676f2071e2c3933fbc67ebf",
  //     name: "Admin1",
  //     email: "admin1@gmail.com",
  //     password: "$2b$10$zXvUIyKkz7VPaGRdvA9XqusSn2lSHSuGZVfPYXH1MePkAmrXdtOEa",
  //     role: {
  //       _id: "6676ac42b3942ec718dc0b3c",
  //       name: "admin",
  //       privileges: ["view all data", "edit all data", "delete all data"],
  //       __v: 0,
  //     },
  //     organization: {
  //       _id: "6676b21ff7a6784d4afafab5",
  //       name: "Org",
  //       users: [],
  //       __v: 0,
  //     },
  //     __v: 0,
  //   },
  //   {
  //     _id: "6677090c438d5d66ab835500",
  //     name: "Admin2",
  //     email: "admin12@gmail.com",
  //     password: "$2b$10$uJLFU5lPiFcOPNbDlyppsulWO7npC4Ll6cHN7Wfm2Njc/UTaIch2y",
  //     role: {
  //       _id: "6676ac42b3942ec718dc0b3c",
  //       name: "admin",
  //       privileges: ["view all data", "edit all data", "delete all data"],
  //       __v: 0,
  //     },
  //     organization: {
  //       _id: "6676b21ff7a6784d4afafab5",
  //       name: "Org",
  //       users: [],
  //       __v: 0,
  //     },
  //     __v: 0,
  //   },
  // ];
  const navigate = useNavigate();
  const [users, setUsers] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRole = userData.role.name;

  useEffect(() => {
    getUserDetails();
    checkUserrole();
  }, []);

  const checkUserrole = () => {
    if (userRole === "admin") {
      setIsButtonDisabled(false);
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
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add User
          </button>
        )}
        {users.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300">
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
