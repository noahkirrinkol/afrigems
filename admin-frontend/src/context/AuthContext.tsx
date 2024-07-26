import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Admin } from "../types/admin";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  adminDetails: Admin | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("admin-access")
  );
  const [adminDetails, setAdminDetails] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchAdminDetails(token);
    }
  }, [isAuthenticated, token]);

  const fetchAdminDetails = async (token: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setAdminDetails(data.data);
      } else {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch admin details. Try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("admin-access", data.token);
        fetchAdminDetails(data.token);

        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Something went wrong! Try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("admin-access", data.token);
        fetchAdminDetails(data.token);

        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      } else {
        navigate("/login");
        toast.error(data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Something went wrong! Try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setAdminDetails(null);
    localStorage.removeItem("admin-access");
    toast.success("Logout successful!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const contextValue: AuthContextType = {
    token: token || "",
    logout,
    register,
    login,
    isAuthenticated,
    adminDetails,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      {/* <ToastContainer /> */}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
