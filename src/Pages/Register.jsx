import { localTokenKey, reqTokenHederKey } from "../constants";
import { Link, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const token = localStorage.getItem(localTokenKey);
  if (token) return <Navigate to="/home" />;

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerAcc(e) {
    e.preventDefault();
    if (!name) return toast("Name is required!", { type: "error" });
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
      } = await axios.post("/users", { name, username, password });

      localStorage.setItem(localTokenKey, token);
      toast("Logged in successfully", { type: "success" });
      axios.defaults.headers.common[reqTokenHederKey] = token;
      <Navigate to="/login" />;
    } catch (error) {
      toast("Username or password is incorrect", { type: "error" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
            <form className="d-grid gap-3 my-3" onSubmit={registerAcc}>
              <div>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="eshmatjon"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
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
                {loading ? <Spinner /> : "Sign Up"}
              </button>
            </form>
            <p>
              Already have an account?
              <span className="text-primary">
                <Link to="/login">Log In</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
