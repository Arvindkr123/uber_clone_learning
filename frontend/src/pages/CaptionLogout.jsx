import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptionLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/captions/logout`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      } catch (err) {
        console.error("Logout error:", err.message);
      } finally {
        localStorage.removeItem("token");
        setIsLoggingOut(false);
        navigate("/captain-login");
      }
    };

    logout();
  }, [token, navigate]);

  return <div>{isLoggingOut ? "Logging out..." : null}</div>;
};

export default CaptionLogout;
