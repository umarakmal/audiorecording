import React from "react";
import { useHistory, Link, matchPath } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";

const Header = () => {
  const history = useHistory();
  const isActive = (path) => {
    if (matchPath.path === path) {
      return { color: "#000" };
    } else {
      return { color: "#fff" };
    }
  };
  return (
    <div style={{ fontSize: "13px" }}>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {isAuth() && isAuth().role === "admin" && (
            <li className="nav-item">
              <Link className="nav-link" style={isActive("/admin")} to="#">
                <div
                  style={{
                    marginTop: "10px",
                    alignItems: "center",
                    fontSize: "15px",
                  }}
                >
                  {isAuth().name}
                </div>
                {/* {photo =  */}
                {/* <div> <img src={'./uploads/'+isAuth().photo} className="dp-icon" alt="icon"></img></div> */}
              </Link>
            </li>
          )}

          {isAuth() && (
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "black" }}
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
