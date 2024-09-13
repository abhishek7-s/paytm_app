import {BrowserRouter , Routes ,Route} from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        {/* <Route path="/signin" element={<Signin/>}/> */}
        {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        {/* <Route path="/send" element={<SendMoney/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
