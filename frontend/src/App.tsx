import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Profile } from "./pages/Profile"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/me" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
