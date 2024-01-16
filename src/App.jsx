import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/home";
import Register from "./Pages/Register/register";
import Login from "./Pages/Login/login";
import Groups from "./Pages/Groups/groups";

function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main/groups" element={<Groups />} />
      </Routes>
    </>
  );
}

export default App;
