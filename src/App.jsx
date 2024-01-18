import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import { setGroups } from "./Store/Slices/group";
import MainLayout from "./Layout/MainLayout";
import { localTokenKey } from "./constants";
import { useDispatch } from "react-redux";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";
import Groups from "./Pages/Groups";
import { useEffect } from "react";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      if (localTokenKey) {
        const { data: groupss } = await axios.get(`/groups`);
        dispatch(setGroups(groupss));
      }
    })();
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MainLayout />}>
          <Route
            path="/home/groups/:groupId"
            element={
              <PrivateRoute>
                <Groups />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notfound" element={<NotFound />} />

        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
