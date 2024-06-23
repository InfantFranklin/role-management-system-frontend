import "../styles/content.css";
import Searchbar from "./Searchbar";

const ContentHeader = () => {
  return (
    <>
      <div className="content-header">
        <h1 className="text-3xl text-gray-400 font-bold p-2 mb-2">Dashboard</h1>
        <Searchbar />
      </div>
    </>
  );
};

export default ContentHeader;
