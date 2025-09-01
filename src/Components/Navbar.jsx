import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("authToken");

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-light shadow-lg">
      <div className="container-fluid">
        <Link to="/" className="text-decoration-none text-dark">
          Auth-App
        </Link>

        <span className="float-end">
          {isAuth ? (
            <button
              onClick={handleLogOut}
              className="btn btn-danger btn-sm rounded-0"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline-dark mx-2 btn-sm rounded-0"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline-dark btn-sm rounded-0"
              >
                Register
              </Link>
            </>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
