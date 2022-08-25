import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
import { ToastContainer, toast } from "react-toastify";

const AddUser = () => {
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  const history = useHistory();
  const [inpval, setINP] = useState({
    name: "",

    email: "",
    role: "",
    password: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, email, role, password } = inpval;
    if (!name || !email || !role || !password) {
      return false;
    } else {
      const res = await fetch(`/api/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify({
          name,

          email,
          role,

          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        toast.error("Email already taken!");
      } else {
        history.push("/users");
        toast.success("User added successfully");
      }
    }
  };

  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <div
        style={{ minHeight: "36rem", fontSize: "13px" }}
        className="content-wrapper "
      >
        <NavLink
          style={{
            color: "#2980b9",
            fontWeight: "bolder",
          }}
          to="/users"
          className="btn btn"
        >
          <i
            style={{ marginRight: "5px" }}
            className="nav-icon fas fa-arrow-left"
          />
          User Management
        </NavLink>
        <center>
          <h3>Add User</h3>
        </center>
        <div className="content  mt-5 offset-4">
          <form className="needs-validation" onSubmit={addinpdata} noValidate>
            {/* <div className="row"> */}
            <div className="col-md-5 col-sm-12 col-xs-12 form-group ml-5 ">
              <label htmlFor="exampleInputName">Name</label>
              <input
                type="text"
                value={inpval.name}
                onChange={setdata}
                name="name"
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                required
              />
              <div className="invalid-feedback ">Please choose a name</div>
            </div>

            <div className="col-md-5 col-sm-12 col-xs-12 form-group ml-5">
              <label htmlFor="exampleInputEmail">Email</label>
              <input
                type="email"
                value={inpval.email}
                onChange={setdata}
                name="email"
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                required
              />
              <div className="invalid-feedback ">Please choose Email</div>
            </div>
            {/* </div> */}
            {/* <div className="row"> */}
            <div className="col-md-5 col-sm-12 col-xs-12 form-group ml-5">
              <label htmlFor="exampleFormControlSelect1">Role</label>
              <select
                name="role"
                value={inpval.role}
                onChange={setdata}
                className="form-control"
                id="exampleFormControlSelect1"
                aria-label=".form-select-lg example"
                required
              >
                <option defaultValue="" value="">
                  Select
                </option>
                <option>admin</option>
                <option>agent</option>
              </select>
              <div className="invalid-feedback ">Please choose Role</div>
            </div>

            <div className="col-md-5 col-sm-12 col-xs-12 form-group ml-5">
              <label htmlFor="exampleInputPass">Password</label>
              <input
                type="password"
                value={inpval.password}
                onChange={setdata}
                name="password"
                className="form-control"
                id="exampleInputPass"
                aria-describedby="emailHelp"
                required
              />
              <div className="invalid-feedback ">Please choose a password</div>
            </div>
            {/* </div> */}
            <button
              style={{ marginLeft: "23%" }}
              type="submit"
              // onClick={addinpdata}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AddUser;
