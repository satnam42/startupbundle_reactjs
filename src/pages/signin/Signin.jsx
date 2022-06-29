import React, { useState, useRef } from "react";
import {
  isValidEmail,
  passwordPattern,
} from "../../utilities/formValidations/formValidations";
import { useHistory } from "react-router-dom";
import { post } from "../../utilities/services/newServices";
import { Link } from "react-router-dom";
import "./signin.css";

const Signin = () => {
  const history = useHistory();

  const data = {
    email: "",
    password: "",
  };
  const errData = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(data);
  const [errors, setErrors] = useState(errData);

  var emValid = "";
  const mailRef = useRef(null);
  const passRef = useRef(null);

  const { email, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email": {
        emValid = isValidEmail(value);

        if (emValid !== true) {
          setErrors({ ...errors, [name]: "Enter a valid Email" });
          mailRef.current.classList = "invalid";
        } else if (emValid === true) {
          setErrors({ ...errors, [name]: true });
          mailRef.current.classList = "valid";
        }

        setUser({ ...user, [name]: value });
        break;
      }

      case "password": {
        const emValid = passwordPattern(value);

        if (emValid !== true) {
          setErrors({ ...errors, [name]: "Enter a valid Password" });
          passRef.current.classList = "invalid";
        } else if (emValid === true) {
          setErrors({ ...errors, [name]: true });
          passRef.current.classList = "valid";
        }

        setUser({ ...user, [name]: value });
        break;
      }
      default: {
      }
    }
  };

  const formValidate = async (e) => {
    e.preventDefault();
    if (errors.email === true) {
      try {
        const res = await post("/login", user);
        if (res.isSuccess === true) {
          localStorage.setItem("id", res.data._id);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.firstName);
          history.push("/profile");
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div
      className="login_content d-flex "
      style={{ justifyContent: "center", marginTop: "20vh" }}
    >
      <form className="mx-auto w-50">
        <h3 style={{ textAlign: "center", marginBottom: "5vh" }}>
          Welcome to startUp bundle
        </h3>
        <div className="form-group" ref={mailRef}>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
          />
          <br />

          <small style={{ color: "red" }}>{errors.email}</small>
          {errors.email === "Enter a valid Email" && (
            <i
              className="fa fa-exclamation-circle"
              style={{ color: "red" }}
            ></i>
          )}
          {errors.email === true && (
            <i className="fa fa-check-square-o" style={{ color: "green" }}></i>
          )}
        </div>
        <div className="form-group" ref={passRef}>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <br />

          <small style={{ color: "red" }}>{errors.password}</small>
          {errors.password === "Enter a valid Password" && (
            <i
              className="fa fa-exclamation-circle"
              style={{ color: "red" }}
            ></i>
          )}
          {errors.password === true && (
            <i className="fa fa-check-square-o" style={{ color: "green" }}></i>
          )}
        </div>

        <div className="d-flex">
          <button
            onClick={(e) => formValidate(e)}
            disabled={errors.email === true ? false : true}
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#staticBackdrop"
          >
            Sign in
          </button>
        </div>
        <div className="an_account">
          <p>Already Having an account?</p>
          <Link style={{ textDecoration: "none" }} to="/login">
            Log In Here{" "}
          </Link>
        </div>
        <div className="an_account">
          <p>Forgot your password?</p>
          <Link style={{ textDecoration: "none" }} to="/forgot">
            Reset Here{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
