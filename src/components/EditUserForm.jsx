import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditUserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [userMonId, setUserMonId] = useState("");
  const { userId } = location.state || {};

  useEffect(() => {
    getUserDetailsById(userId);
  }, []);

  // cancel button functionality
  const cancelUser = () => {
    navigate("/users");
  };

  const getUserDetailsById = (id) => {
    axios
      .get(`${import.meta.env.VITE_PUBLIC_API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUpdateDetails(response.data));
  };

  const setUpdateDetails = (data) => {
    setName(data[0].name);
    setEmail(data[0].email);
    setPassword(data[0].password);
    setRole(data[0].role.name);
    setOrganizationName(data[0].organization.name);
    setUserMonId(data[0]._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_PUBLIC_API_URL}/users/${userMonId}`,
        {
          email,
          password,
          name,
          role,
          organizationName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/users");
    } catch (error) {
      console.error("User creation failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
      <input
        className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
        type="text"
        placeholder="organization Name"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
      />
      <button
        type="submit"
        className=" bg-cyan-600 py-3 my-6 rounded font-nsans-bold"
      >
        Save
      </button>
      <button
        onClick={() => cancelUser()}
        className=" bg-red-600 py-3 rounded font-nsans-bold"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;
