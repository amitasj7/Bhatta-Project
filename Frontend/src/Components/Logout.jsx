import { useNavigate } from "react-router-dom";
import axios from "axios";

// Base URL for backend request
const baseUrl = import.meta.env.VITE_BASE_URL;

const LogoutButton = () => {
  const navigate = useNavigate();

  // Logout function backend request ke liye
  const handleLogout = async () => {
    try {
      // Backend logout request

      const response = await axios.post(`${baseUrl}/auth/logout`, null, {
        withCredentials: true,
      });

      // Logout successful hone ke baad navigate karein
      console.log("logout response : ", response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.response.data.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
