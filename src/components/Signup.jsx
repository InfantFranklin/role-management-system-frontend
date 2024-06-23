import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [rememberLogin, setRememberLogin] = useState("");
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
          organizationName,
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="bg-blue/70 fixed h-screen w-full top-0 left-0" />

      <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[600px] mx-auto bg-white/80 rounded-lg">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className=" text-3xl font-nsans-bold">Signup</h1>

            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
                type="text"
                placeholder="Name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="p-3 my-2 bg-gray-500 rounded text-white focus:outline-none"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className=" bg-cyan-600 py-3 my-6 rounded font-nsans-bold"
              >
                Sign up
              </button>

              <div className="flex items-center justify-between text-gray-600">
                <p>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={rememberLogin}
                    onChange={() => setRememberLogin(!rememberLogin)}
                  />
                  Remember Me
                </p>
                <p>Need Help?</p>
              </div>

              <p className="my-4">
                <span className="text-gray-600 mr-2">
                  Already have account?
                </span>
                <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
