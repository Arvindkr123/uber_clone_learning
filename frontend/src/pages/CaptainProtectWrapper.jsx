import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserCaptionContext } from "../context/CaptionUserContext";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const { setCaption } = useUserCaptionContext();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captions/profile`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.status === 200) {
          setCaption(res.data.caption);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    };

    fetchProfile();
  }, [token, navigate, setCaption]);

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
