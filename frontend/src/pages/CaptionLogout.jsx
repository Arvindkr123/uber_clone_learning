import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptionLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("token");
        navigate("/captions/logout");
      }
    });
  return <div>UserLogout</div>;
};
export default CaptionLogout;
