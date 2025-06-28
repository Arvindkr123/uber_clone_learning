import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptionSignup from "./pages/CaptionSignup"
import CaptionLogin from "./pages/CaptionLogin"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<UserLogin/>}></Route>
        <Route path='/signup' element={<UserSignup/>}></Route>
        <Route path='/caption-signup' element={<CaptionSignup/>}></Route>
        <Route path='/captain-login' element={<CaptionLogin/>}></Route>
      </Routes>
  </div>
  )
}
export default App