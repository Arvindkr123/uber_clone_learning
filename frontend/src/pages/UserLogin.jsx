import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  if (user !== null) {
    navigate("/home");
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex">
      <div className="hidden sm:block left bg-cover bg-center bg-[url(https://images.pexels.com/photos/1525612/pexels-photo-1525612.jpeg)] h-screen justify-between flex-col w-[70%]"></div>
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
            New here?{" "}
            <Link to="/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/captain-login"
            className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
