import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrganizationForm = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //  const [organizationName, setOrganizationName] = useState("");
  const navigate = useNavigate();

  const cancelOrg = () => {
    navigate("/organizations");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/organizations`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/organizations");
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
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className=" bg-cyan-600 py-3 my-6 rounded font-nsans-bold"
      >
        Add Organization
      </button>
      <button
        onClick={() => cancelOrg()}
        className=" bg-red-600 py-3 rounded font-nsans-bold"
      >
        Cancel
      </button>
    </form>
  );
};

export default OrganizationForm;
