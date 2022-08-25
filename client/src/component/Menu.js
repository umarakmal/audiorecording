import React from "react";
import logo from "../images/logo3.png";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div>
      <aside
        style={{ fontSize: "12px" }}
        className="main-sidebar sidebar-dark-primary elevation-4"
      >
        <a href="#" className="brand-link">
          <img
            src={logo}
            alt="Logo"
            className="brand-image"
            style={{ opacity: ".9", maxHeight: "45px" }}
          />
          <span className="brand-text font-weight-light invisible">Cogent</span>
        </a>
        <div className="sidebar">
          <nav className="mt-5">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item mb-2">
                <Link to="/admin" className="nav-link ">
                  <i
                    className="nav-icon fas fa-microphone"
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>
                    Voice Record
                    {/* <i className="right fas fa-angle-left" /> */}
                  </p>
                </Link>
              </li>

              <li className="nav-item  mb-2">
                <Link to="/users" className="nav-link">
                  <i
                    className="nav-icon fas fa-users"
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>Manage Users</p>
                </Link>
              </li>

              <li className="nav-item  mb-2">
                <Link to="/report" className="nav-link">
                  <i
                    className="nav-icon fas fa-envelope"
                    style={{ color: "white" }}
                  />
                  <p style={{ color: "white" }}>Report</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div id="overlay-scrollbar"></div>
    </div>
  );
};

export default Menu;
