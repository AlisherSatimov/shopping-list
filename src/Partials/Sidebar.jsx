import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { Spinner } from "react-bootstrap";

const Sidebar = () => {
  const { data: groups, isLoading } = useFetch("/groups");
  // console.log(groups);

  const [showMoreGoup, setShowMoreGoup] = useState(false);

  const handleShowGroup = () => {
    setShowMoreGoup(!showMoreGoup);
  };
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
                  to={"/main"}
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
                    showMoreGoup ? "d-none" : "list-unstyled ps-3 d-grid gap-3 "
                  }
                >
                  <li>
                    <button className="navigation-link btn btn-light w-100 text-start">
                      <i className="fa-solid fa-add text-primary"></i> Create
                      Group
                    </button>
                  </li>
                  {groups.map((group) => {
                    return (
                      <li
                        key={group._id}
                        className="navigation-link btn btn-light w-100 text-start"
                      >
                        {group.name}
                        {/* {console.log(group._id)} */}
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
