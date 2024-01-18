import { setUser } from "../Store/Slices/user";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../Partials/Sidebar";
import Header from "../Partials/Header";
import { useEffect } from "react";
import axios from "axios";

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const queries = [axios.get("/users"), axios.get("/groups")];

    Promise.all(queries).then(
      ([{ data: usersData }, { data: productsData }]) => {
        dispatch(setUser(usersData));
      }
    );
  }, [dispatch]);

  return (
    <div className="bg-light" id="main-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
