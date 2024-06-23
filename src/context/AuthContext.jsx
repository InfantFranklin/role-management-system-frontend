import { createContext, useState, useContext } from "react";
import axios from "axios";

// Create a context
const AuthContext = createContext();

// AuthProvider component that will wrap the app and provide the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    const userDetails = await axios.get(
      `${import.meta.env.VITE_PUBLIC_API_URL}/users`,
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );

    let data = userDetails.data[0];
    localStorage.setItem("token", JSON.stringify(userData.token));
    localStorage.setItem("userData", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
