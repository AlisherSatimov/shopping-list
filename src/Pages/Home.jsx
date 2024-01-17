import { Navigate } from "react-router-dom";
import Header from "../Partials/Header";
import Sidebar from "../Partials/Sidebar";
import Showcase from "../Partials/Showcase";

const Home = () => {
  const token = localStorage.getItem("token");
  if (token == null) {
    return <Navigate to="/login" />;
  } else {
    console.log(token);
  }
  return (
    <div>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <Showcase />
      </div>
    </div>
  );
};

export default Home;
