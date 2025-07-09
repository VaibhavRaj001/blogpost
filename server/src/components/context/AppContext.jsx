import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// ✅ Set base URL for backend API
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Fetch all blogs from API
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Run on app load: set token + fetch blogs
  useEffect(() => {
    fetchBlogs();

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYXJtYTcxM3ByaXlhQGdtYWlsLmNvbSIsImlhdCI6MTc1MTgxNjQ2MSwiZXhwIjoxNzU0NDA4NDYxfQ.wfIEswWWX-ZnPS7EAUSacBlc6VwLWfZuwngJhGvghNc";
    localStorage.setItem("token", token);
    if (token) {
      setToken(token);

      // 🛡 Safely set Authorization header
      if (!axios.defaults.headers.common) {
        axios.defaults.headers.common = {};
      };

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // ✅ Context values available to the whole app
  const value = {
    axios,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ✅ Custom hook to access the context anywhere
export const useAppContext = () => {
  return useContext(AppContext);
};