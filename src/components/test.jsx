import { useAuth } from "../context/AuthContext";
import DataTableUsers from "./DataTableUsers";
import DataTableOrganizations from "./DataTableOrganizations";
import { BiSearch } from "react-icons/bi";

const Users = () => {
  const { user } = useAuth();
  return (
    <>
      {user?.role?.name === "admin" ? (
        <div className="content-header">
          <h1 className="header-title">Admin Dashboard</h1>
          <div className="header-activity">
            <div className="searchbar">
              <input type="text" placeholder="Search here...." />
              <BiSearch className="icon" />
            </div>
          </div>
          {/* Admin specific views */}
          <DataTableOrganizations />
        </div>
      ) : (
        <div className="content-header">
          <h1 className="header-title">User Dashboard</h1>
          <div className="header-activity">
            <div className="searchbar">
              <input type="text" placeholder="Search here...." />
              <BiSearch className="icon" />
            </div>
          </div>
          <DataTableUsers />
          {/* User specific views */}
        </div>
      )}
    </>
  );
};

export default Users;



import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const DataTableUsers = () => {
  // const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const users = [
    {
      _id: "6676b21ff7a6784d4afafab7",
      name: "Admin",
      email: "admin@gmail.com",
      password: "$2b$10$opjE.lFU7H02sSqEYNZvX.4MvnF5pCtSrEfjVTVC2rxD1vjaZGxBu",
      role: {
        _id: "6676ac42b3942ec718dc0b3c",
        name: "admin",
        privileges: ["view all data", "edit all data", "delete all data"],
        __v: 0,
      },
      organization: {
        _id: "6676b21ff7a6784d4afafab5",
        name: "Org",
        users: [],
        __v: 0,
      },
      __v: 0,
    },
    {
      _id: "6676f2071e2c3933fbc67ebf",
      name: "Admin1",
      email: "admin1@gmail.com",
      password: "$2b$10$zXvUIyKkz7VPaGRdvA9XqusSn2lSHSuGZVfPYXH1MePkAmrXdtOEa",
      role: {
        _id: "6676ac42b3942ec718dc0b3c",
        name: "admin",
        privileges: ["view all data", "edit all data", "delete all data"],
        __v: 0,
      },
      organization: {
        _id: "6676b21ff7a6784d4afafab5",
        name: "Org",
        users: [],
        __v: 0,
      },
      __v: 0,
    },
    {
      _id: "6677090c438d5d66ab835500",
      name: "Admin2",
      email: "admin12@gmail.com",
      password: "$2b$10$uJLFU5lPiFcOPNbDlyppsulWO7npC4Ll6cHN7Wfm2Njc/UTaIch2y",
      role: {
        _id: "6676ac42b3942ec718dc0b3c",
        name: "admin",
        privileges: ["view all data", "edit all data", "delete all data"],
        __v: 0,
      },
      organization: {
        _id: "6676b21ff7a6784d4afafab5",
        name: "Org",
        users: [],
        __v: 0,
      },
      __v: 0,
    },
  ];

  //  useEffect(() => {
  //    const userData = JSON.parse(localStorage.getItem("userData"));

  //    const fetchOrganizations = async () => {
  //      try {
  //        console.log(`${import.meta.env.VITE_PUBLIC_API_URL}/organizations`);
  //        console.log(user?.role?.name);
  //        if (user?.role?.name === "admin") {
  //          const response = await axios.get(
  //            `${import.meta.env.VITE_PUBLIC_API_URL}/users`,
  //            {
  //              headers: {
  //                Authorization: `Bearer ${userData}`,
  //              },
  //            }
  //          );
  //          console.log(response);
  //          setUsers(response.data);
  //        }
  //      } catch (error) {
  //        console.error("Error fetching organizations", error);
  //      }
  //    };

  //    fetchOrganizations();
  //  }, [user]);

  // if (user?.role?.name !== "admin") {
  //   return <p>Access denied</p>;
  // }

  return (
    <>
      {users.map((user) => (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </>
  );
};

export default DataTableUsers;



import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const DataTableOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    const fetchOrganizations = async () => {
      try {
        console.log(`${import.meta.env.VITE_PUBLIC_API_URL}/organizations`);
        console.log(userData);
        console.log(user?.role?.name);
        if (user?.role?.name === "admin") {
          const response = await axios.get(
            `${import.meta.env.VITE_PUBLIC_API_URL}/organizations`,
            {
              headers: {
                Authorization: `Bearer ${userData}`,
              },
            }
          );
          console.log(response)
          setOrganizations(response.data);
        }
      } catch (error) {
        console.error("Error fetching organizations", error);
      }
    };

    fetchOrganizations();
  }, [user]);

  if (user?.role?.name !== "admin") {
    return <p>Access denied</p>;
  }

  return (
    <>
      <table>
        org
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org.id}>
              <td>{org._id}</td>
              <td>{org.name}</td>
              <td>{org.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DataTableOrganizations;

  import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_PUBLIC_API_URL}/users/register`, {
        email,
        password,
        name,
        organizationName,
      });
      navigate("/users");
    } catch (error) {
      console.error("User creation failed", error);
    }
  };
  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="flex-grow rounded-lg p-8 flex gap-6 justify-between">
        <div className="w-full">
          <h1 className="text-3xl text-gray-400 font-bold p-2 mb-2">
            Add User
          </h1>
          <div className="w-full h-screen">
            <div className="bg-blue/70 fixed h-screen w-full top-0 left-0" />
            <UserForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
<form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
                <input type="text" />
              <input
                className=""
                type="text"
                placeholder="Name"
                value=""
                
              />
              <input
                className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
                type="email"
                placeholder="Email"
                value=''
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
                type="password"
                placeholder="Password"

                value=''
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className=" bg-cyan-600 py-3 my-6 rounded font-nsans-bold"
              >
                Add User
              </button>
            </form>
