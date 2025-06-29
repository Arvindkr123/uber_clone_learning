import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { UserDataContext } from '../context/UserContext'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserCaptionContext } from "../context/CaptionUserContext";

const CaptionLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {  setCaption } = useUserCaptionContext()
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captions/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setCaption(data.caption)
      localStorage.setItem("token", data.token);
      navigate("/caption-home");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="flex">
      <div className="hidden sm:block left bg-cover bg-center bg-[url(https://imgs.search.brave.com/V8P2mvq0gABuAJjGEWhHFIUx4Vh4PJX8gFa4XY_mfNE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9xOG12ZW5l/MXd6cTQvM3RFaHVq/d1RxWTRHNExYWjB5/Wmx0Ri9jNTQ0YWFm/ZmU1NGRlNzZhYWNj/ZTc0NmQ5ZGIzNGQ5/Yi9ob21lX3Bpbmtw/YWludF9zYWZldHku/anBnP3c9MTUwMCZx/PTYwJmZtPQ)] h-screen justify-between flex-col w-[70%]"></div>
      <div className="p-7 h-screen flex flex-col justify-center w-full lg:w-[30%]">
        <div>
          <img
            className="w-16 mb-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
          />

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>

            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="password"
            />

            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
              Login
            </button>
          </form>
          <p className="text-center my-5">
            Join a fleet?{" "}
            <Link to="/caption-signup" className="text-blue-600">
              Register as Caption
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/login"
            className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CaptionLogin;
