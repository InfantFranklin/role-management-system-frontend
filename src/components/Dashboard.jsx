import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "../App.css";


const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="flex gap-5">
        <Sidebar />
        <div className="bg-white flex-grow rounded-lg p-8 flex gap-6 justify-between">
          
          { <Content />}
          
        </div>
      </div>
    </>
  );
};

export default Dashboard;
