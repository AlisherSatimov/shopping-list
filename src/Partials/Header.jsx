import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  // const { data: users, isLoading } = useFetch("/auth");
  // console.log(users);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    toast("Logged out successfully", { type: "success" });
  };
  return (
    <header
      id="main-header"
      className="py-2  shadow d-flex align-items-center bg-white sticky-top"
    >
      <nav className="container-fluid d-flex justify-content-between">
        <div className="d-flex gap-3 align-items-center">
          <a className="btn" href="/main">
            <i className="fa-solid fa-blog fa-2x text-primary"></i>
          </a>
          <button className="btn btn-primary rounded-pill py-1 px-4 shadow d-none d-md-block">
            + New
          </button>
        </div>
        <div className="d-flex w-50 position-relative">
          <input
            id="search-group"
            type="search"
            className="form-control"
            placeholder="Search group and join..."
          ></input>
        </div>
        <ul className="list-unstyled d-flex gap-3 m-0">
          <li className="d-flex"></li>
          <li>
            <button className="btn rounded-circle">
              <i className="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li>
            <button className="btn rounded-circle position-relative">
              <i className="fa-regular fa-bell"></i>
              <span className="badge bg-danger position-absolute rounded-pill">
                9+
              </span>
            </button>
          </li>
          <li>
            <Dropdown>
              <Dropdown.Toggle variant="white" id="dropdown-basic">
                <i className="fa-solid fa-cog"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogOut} href="/login">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
