import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/users/register`,
        {
          email,
          password,
          name,
          role,
          organizationName,
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
        Add User
      </button>
      <button className=" bg-red-600 py-3 rounded font-nsans-bold">
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
