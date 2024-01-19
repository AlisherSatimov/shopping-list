import { Button, OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const { data: groups, isLoading } = useFetch("/groups");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showMoreGoup, setShowMoreGoup] = useState(false);

  const handleShowGroup = () => {
    setShowMoreGoup(!showMoreGoup);
  };

  async function createGroup(e) {
    e.preventDefault();
    if (!name) return toast("Name is required!", { type: "error" });
    if (!password) return toast("Password is required!", { type: "error" });
    if (password.length < 6)
      return toast("Password must be at least 6 characters long!", {
        type: "error",
      });
    setLoading(true);
    try {
      await axios.post("/groups", { name, password }).then((res) => {
        const groupId = res.data.group._id;
        navigate(`/home/groups/${groupId}`);
      });

      toast("Group created successfully", { type: "success" });
    } catch (error) {
      toast(error.request, {
        type: "error",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h2">Groups name and password</Popover.Header>
      <Popover.Body>
        <form className="d-grid gap-2" onSubmit={createGroup}>
          <input
            value={name}
            type="text"
            name="name"
            className="form-control"
            placeholder="Group Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={password}
            type="password"
            name="password"
            className="form-control"
            placeholder="Group Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex gap-3">
            <Button
              type="submit"
              variant="primary"
              className="btn flex-fill"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Create"}
            </Button>
            <button type="button" className="btn btn-outline-primary flex-fill">
              Cancel
            </button>
          </div>
        </form>
      </Popover.Body>
    </Popover>
  );

  return (
    <aside
      id="main-sidebar"
      className="border-end py-3 sidebar-wrapper bg-white overflow-auto"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        groups && (
          <nav>
            <ul className="list-unstyled px-2 d-grid gap-3">
              <li>
                <Link
                  className="navigation-link btn btn-light w-100 text-start"
                  to={"/home"}
                >
                  <i className="fa-solid fa-user text-primary"></i> Profile
                </Link>
              </li>
              <li className="d-grid gap-3">
                <button
                  className="navigation-link btn btn-light w-100 text-start"
                  onClick={handleShowGroup}
                >
                  <i className="fa-regular fa-comments text-primary"></i> Groups
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
                <ul
                  id="group-links-wrapper"
                  className={
                    showMoreGoup
                      ? "overflow-hidden d-none"
                      : "list-unstyled ps-3 d-grid gap-3 "
                  }
                >
                  <li>
                    <OverlayTrigger
                      trigger="click"
                      placement="right"
                      overlay={popover}
                    >
                      <button className="navigation-link btn btn-light w-100 text-start">
                        <i className="fa-solid fa-add text-primary"></i> Create
                        Group
                      </button>
                    </OverlayTrigger>
                  </li>
                  {groups.map((currentGroup) => {
                    return (
                      <li key={currentGroup._id}>
                        <Link
                          className="navigation-link text-decoration-none w-100 text-dark btn btn-light text-start"
                          to={`/home/groups/${currentGroup._id}`}
                        >
                          {currentGroup.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        )
      )}
    </aside>
  );
};

export default Sidebar;
