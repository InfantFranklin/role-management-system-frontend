import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditOrgForm = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [orgMonId, setOrgMonId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { orgId } = location.state || {};

  useEffect(() => {
    getOrgDetailsById(orgId);
  }, []);

  const cancelOrg = () => {
    navigate("/organizations");
  };

  const getOrgDetailsById = (id) => {
    axios
      .get(`${import.meta.env.VITE_PUBLIC_API_URL}/organizations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUpdateDetails(response.data));
  };

  const setUpdateDetails = (data) => {
    setName(data[0].name);
    setDescription(data[0].description.length > 0 ? data[0].description : "");
    setOrgMonId(data[0]._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_PUBLIC_API_URL}/organizations/${orgMonId}`,
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
      console.error("Organization creation failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
      <input
        className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
        type="text"
        placeholder="organization Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className=" bg-cyan-600 py-3 my-6 rounded font-nsans-bold"
      >
        Save
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

export default EditOrgForm;
