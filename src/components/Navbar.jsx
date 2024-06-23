import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <h1>
        <Link to="/dashboard">User mangement System</Link>
      </h1>

      <div>
        <Link to="/login">
          <button className="capitalize pr-4">login</button>
        </Link>

        <Link to="/signup">
          <button className="capitalize bg-red-600 px-6 py-2 cursor-pointer rounded">
            sign up
          </button>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
