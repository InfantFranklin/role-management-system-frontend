import { useEffect, useState } from "react";
import { BiBookAlt, BiHome } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { RiOrganizationChart } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [page, setPage] = useState("dashboard");

  useEffect(() => {}, []);

  const pageNavigate = (param) => {
    setPage(param);
    pageToNavigate(param);
  };

  const pageToNavigate = (param) => {
    navigate(`/${param}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <div className="menu">
        <div className="logo">
          <BiBookAlt size={50} />
          <h3 className="text-2xl font-bold text-black-700">
            Role Management System
          </h3>
        </div>

        <div className="menu-list ">
          <div className={page === "dashbord" ? "item active" : "item"}>
            <FaUserCircle size={20} />
            <button onClick={() => pageNavigate("dashboard")}>Dashboard</button>
          </div>
        </div>
        <div className="menu-list">
          <div className={page === "users" ? "item active" : "item"}>
            <BiHome size={20} />
            <button onClick={() => pageNavigate("users")}>Users</button>
          </div>
        </div>
        <div className="menu-list">
          <div className={page === "organizations" ? "item active" : "item"}>
            <RiOrganizationChart size={20} />
            <button onClick={() => pageNavigate("organizations")}>
              Organizations
            </button>
          </div>
        </div>
        <div className="menu-list">
          <div className="item ">
            <TbLogout size={20} />
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
