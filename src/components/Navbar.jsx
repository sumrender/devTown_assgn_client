import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Pinterest from "../assets/pinterest.png";

const linkStyle = {
  textDecoration: "none",
  color: "rgb(235, 102, 124)",
  fontSize: "1.5rem",
};

const Navbar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0",
        }}
      >
        <a style={{ textDecoration: "none", fontSize: "2rem" }} href="/">
          <div
            className="logo"
            style={{ display: "flex", alignItems: "center", color: "black" }}
          >
            <img width="50px" src={Pinterest} alt="logo" />
            <span style={{ marginLeft: "5px" }}>Pinterest</span>
          </div>
        </a>

        <nav
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {user && (
            <>
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                }}
              >
                {user.name}
              </span>
              <Link
                style={{
                  textDecoration: "underline",
                  color: "black",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                }}
                to="/upload"
              >
                upload new image
              </Link>
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                }}
                onClick={handleClick}
              >
                log out
              </span>
            </>
          )}
          {!user && (
            <>
              <a style={linkStyle} href="/login">
                Login
              </a>
              <a style={linkStyle} href="/register">
                Register
              </a>
            </>
          )}
        </nav>
      </div>
      <hr />
    </header>
  );
};

export default Navbar;
