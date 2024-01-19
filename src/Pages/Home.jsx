import { useNavigate } from "react-router-dom";
import { localTokenKey } from "../constants";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const token = localStorage.getItem("token");
  if (token == null) {
    return <Navigate to="/login" />;
  }

  const navigate = useNavigate();

  const { data: user, isLoading } = useFetch("/auth");

  const copyName = async () => {
    try {
      await navigator.clipboard.writeText(user.name);
      toast("Copiled UserName Successfuly", { type: "success" });
    } catch (err) {
      toast(err.request, { type: "success" });
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete("/users", {
        headers: {
          Authorization: `Bearer ${localTokenKey}`,
        },
      });
      toast("User Delete Successfuly", { type: "success" });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      toast(err.request), { type: "error" };
      console.log(err);
    }
  };

  return (
    <main className="p-0 showcase-wrapper overflow-hidden rounded-top-5 d-flex flex-column">
      {isLoading ? (
        <Spinner />
      ) : (
        user && (
          <section className="bg-white showcase p-4 py-3 rounded-5">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Your Profile</h1>
              <div className="d-flex gap-1">
                <button className="btn btn-primary" onClick={copyName}>
                  <i className="fa-solid fa-copy"></i> Copy Username
                </button>
                <button className="btn btn-danger" onClick={deleteUser}>
                  <i className="fa-solid fa-trash"></i> Delete Account
                </button>
              </div>
            </div>
            <form>
              <div className="row align-items-center d-flex">
                <div className="col-lg-2">
                  <div
                    id="profile-avatar"
                    className="display-1 user-avatar border border-3 text-bg-danger rounded-circle"
                  >
                    {user.name.slice(0, 1).toUpperCase()}
                  </div>
                </div>
                <div className="col-lg-10">
                  <h2 className="text-capitalize d-flex align-items-start gap-3">
                    {user.name}{" "}
                    <span className="fs-6 badge bg-success">{user.status}</span>
                  </h2>
                  <p className="text-secondary">{user.username}</p>
                </div>
              </div>
            </form>
          </section>
        )
      )}
    </main>
  );
};

export default Home;
