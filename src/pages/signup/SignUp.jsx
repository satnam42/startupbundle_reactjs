import React, { useState, useRef, useEffect } from "react";
import {
  isValidEmail,
  passwordPattern,
  nameValid,
} from "../../utilities/formValidations/formValidations";
import { post } from "../../utilities/services/newServices";
import { useHistory } from "react-router-dom";
import "./signup.css";
const SignUp = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "5ff5a043c51e0042898fe15e",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
    password: "",
    lastName: "",
  });
  const [isValid, setIsValid] = useState(null);
  const [formValid, setformValid] = useState(false);
  var count = 0;
  useEffect(() => {
    count++;
  }, []);

  var emValid = "";
  const mailRef = useRef(null);
  const passRef = useRef(null);
  const fNameRef = useRef(null);
  const lNameRef = useRef(null);

  const { firstName, lastName, email, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email": {
        emValid = isValidEmail(value);

        if (emValid !== true) {
          setIsValid(false);
          setErrors({ ...errors, [name]: "Enter a valid Email" });
          mailRef.current.classList = "invalid";
        } else if (emValid === true) {
          setIsValid(true);
          setErrors({ ...errors, [name]: true });
          mailRef.current.classList = "valid";
        }

        setUser({ ...user, [name]: value });
        break;
      }

      case "password": {
        const emValid = passwordPattern(value);

        if (emValid !== true) {
          setIsValid(false);
          setErrors({ ...errors, [name]: "Enter a Strong Password" });
          passRef.current.classList = "invalid";
        } else if (emValid === true) {
          setIsValid(true);
          setErrors({ ...errors, [name]: true });
          passRef.current.classList = "valid";
        }

        setUser({ ...user, [name]: value });
        break;
      }
      case "firstName": {
        const emValid = nameValid(value);
        if (emValid !== true) {
          setIsValid(false);
          setErrors({ ...errors, [name]: "Enter a valid First Name" });
          fNameRef.current.classList = "invalid";
        } else if (emValid === true) {
          setIsValid(true);
          setErrors({ ...errors, [name]: true });
          fNameRef.current.classList = "valid";
        }

        setUser({ ...user, [name]: value });
        break;
      }

      case "lastName": {
        const emValid = nameValid(value);
        if (emValid !== true) {
          setIsValid(false);
          setErrors({ ...errors, [name]: "Enter a Valid Last Name" });
          lNameRef.current.classList = "invalid";
        } else if (emValid === true) {
          setIsValid(true);
          setErrors({ ...errors, [name]: true });
          lNameRef.current.classList = "valid";
        }
        setUser({ ...user, [name]: value });
        break;
      }
    }
  };
  const formValidate = (e) => {
    e.preventDefault();

    if (
      errors.firstName &&
      errors.lastName &&
      errors.password &&
      errors.email === true
    ) {
      post("/users/create", user).then((res) => {
        if (res.isSuccess === true) {
          alert("Registered Successfuly Redirecting To Login Page");
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        }
      });
    } else {
    }
  };
  return (
    <div className="login_content d-flex " style={{ justifyContent: "center" }}>
      <form className="mx-auto w-50">
        <p style={{ textAlign: "center", padding: "10vh" }}>Register with us</p>
        <div className="form-group" ref={fNameRef}>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => handleChange(e)}
          />

          <br />

          <small style={{ color: "red" }}>{errors.firstName}</small>
          {errors.firstName === "Enter a valid First Name" && (
            <i
              className="fa fa-exclamation-circle"
              style={{ color: "red" }}
            ></i>
          )}
          {errors.firstName === true && (
            <i className="fa fa-check-square-o" style={{ color: "green" }}></i>
          )}
        </div>
        <div className="form-group" ref={lNameRef}>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => handleChange(e)}
          />
          <br />

          <small style={{ color: "red" }}>{errors.lastName}</small>
          {errors.lastName === "Enter a Valid Last Name" && (
            <i
              className="fa fa-exclamation-circle"
              style={{ color: "red" }}
            ></i>
          )}
          {errors.lastName === true && (
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
          {errors.password === "Enter a Strong Password" && (
            <i
              className="fa fa-exclamation-circle"
              style={{ color: "red" }}
            ></i>
          )}
          {errors.password === true && (
            <i className="fa fa-check-square-o" style={{ color: "green" }}></i>
          )}
        </div>
        <div className="form-group" ref={mailRef}>
          <input
            type="text"
            className="form-control"
            name="email"
            value={email}
            placeholder="E-Mail"
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
        <div className="d-flex">
          <button
            onClick={(e) => formValidate(e)}
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#staticBackdrop"
            disabled={
              errors.email === true &&
              errors.password === true &&
              errors.firstName === true &&
              errors.lastName === true
                ? false
                : true
            }
          >
            Sign up
          </button>
        </div>
        <div className="an_account">
          <p>Already Having an account?</p>
          <a style={{ textDecoration: "none" }} href="/login">
            Log In Here{" "}
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
