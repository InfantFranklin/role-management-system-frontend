import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create a context
const AuthContext = createContext();

// AuthProvider component that will wrap the app and provide the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load initial auth state from localStorage on first render
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser); 
    }

    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
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
      localStorage.setItem("isLoggedIn", "true");

      setUser(data);
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}{" "}
      {/* Render children only after checking auth state */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
