import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptionSignup from "./pages/CaptionSignup";
import CaptionLogin from "./pages/CaptionLogin";
import UserLogout from "./pages/UserLogout.jsx";
import CaptionLogout from "./pages/CaptionLogout.jsx";
import Start from "./pages/Start";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainHome from "./pages/CaptainHome.jsx";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/signup" element={<UserSignup />}></Route>
        <Route path="/caption-signup" element={<CaptionSignup />}></Route>
        <Route path="/captain-login" element={<CaptionLogin />}></Route>
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        ></Route>
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        ></Route>
        <Route
          path="/caption-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        ></Route>
        <Route
          path="/caption/logout"
          element={
            <CaptainProtectWrapper>
              <CaptionLogout />
            </CaptainProtectWrapper>
          }
        ></Route>
      </Routes>
    </div>
  );
};
export default App;
