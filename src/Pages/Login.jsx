import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { localTokenKey, reqTokenHederKey } from "../constants";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!username) return toast("Username is required!", { type: "error" });
    if (!password) return toast("Password is required!", { type: "error" });
    if (password.length < 6)
      return toast("Password must be at least 6 characters long!", {
        type: "error",
      });
    setLoading(true);
    try {
      let {
        data: { token },
      } = await axios.post("/auth", { username, password });

      localStorage.setItem(localTokenKey, token);
      toast("Logged in successfully", { type: "success" });
      axios.defaults.headers.common[reqTokenHederKey] = token;
      navigate("/login");
    } catch (error) {
      toast("Username or password is incorrect", { type: "error" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const token = localStorage.getItem(localTokenKey);
  if (token) return <Navigate to="/home" />;

  return (
    <section className="bg-secondary vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row bg-white gx-3 rounded-4 overflow-hidden">
          <div className="col-md-6 text-center text-bg-dark p-5">
            <i className="fa-solid fa-blog fa-8x text-primary"></i>
            <p className="mt-5">Welcome back to</p>
            <h1 className="display-1">Shopping List</h1>
          </div>
          <div className="col-md-6 p-5">
            <h2 className="text-primary text-center">Sign In</h2>
            <form className="d-grid gap-3 my-3" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="eshmatjon123"
                  onChange={(e) => setUserName(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="******"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <button
                className="btn btn-primary w-100 rounded-pill"
                disabled={loading}
              >
                {loading ? <Spinner /> : "Login"}
              </button>
            </form>
            <p>
              No account yet?
              <span className="text-primary">
                <Link to="/register">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
