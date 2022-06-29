import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  isValidEmail,
  passwordPattern,
} from "../../utilities/formValidations/formValidations";
import { post } from "../../utilities/services/newServices";
import { CHANGE_PASSWORD } from "../../utilities/services/constants/apiLinks";
import "./changepass.css";

const ChangePass = () => {
  const history = useHistory();
  const data = {
    oldPassword: "",
    newPassword: "",
  };
  const errData = {
    oldPassword: "",
    newPassword: "",
  };

  const [user, setUser] = useState(data);
  const [errors, setErrors] = useState(errData);

  var emValid = "";
  const opassRef = useRef(null);
  const npassRef = useRef(null);

  const { oldPassword, newPassword } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "oldPassword": {
        emValid = passwordPattern(value);

        if (emValid !== true) {
          setErrors({ ...errors, [name]: "Password Pattern is Not Valid" });
          opassRef.current.classList = "invalid";
        } else if (emValid === true) {
          setErrors({ ...errors, [name]: true });
          opassRef.current.classList = "valid";
        }

        setUser({ ...user, [name]: value });
        break;
      }

      case "newPassword": {
        const emValid = passwordPattern(value);

        if (emValid !== true) {
          setErrors({ ...errors, [name]: "Enter minimum 6 characters" });
          npassRef.current.classList = "invalid";
        } else if (emValid === true) {
          setErrors({ ...errors, [name]: true });
          npassRef.current.classList = "valid";
        }

        setUser({ ...user, [name]: value });
        break;
      }
      default: {
      }
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (errors.oldPassword && errors.newPassword === true) {
      const token = localStorage.getItem("token");
      const successActions = () => {
        alert("Password Changed Successfully");
        localStorage.removeItem("otpToken");
        history.push("/login");
      };
      post(CHANGE_PASSWORD, user, successActions, token);
    }
  };

  return (
    <div>
      <div className="container">
        <div
          className="login_content d-flex "
          style={{ justifyContent: "center", marginTop: "20vh" }}
        >
          <form className="mx-auto w-50">
            <div className="form-group" ref={opassRef}>
              <input
                type="password"
                className="form-control"
                placeholder="Old Password"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => handleChange(e)}
              />
              <br />

              <small style={{ color: "red", marginLeft: "5vw" }}>
                {errors.oldPassword}
              </small>
              {errors.oldPassword === "Password Pattern is Not Valid" && (
                <i
                  className="fa fa-exclamation-circle"
                  style={{ color: "red" }}
                ></i>
              )}
              {errors.oldPassword === true && (
                <i
                  className="fa fa-check-square-o"
                  style={{ color: "green" }}
                ></i>
              )}
            </div>
            <div className="form-group" ref={npassRef}>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={newPassword}
                placeholder="New Password"
                onChange={(e) => handleChange(e)}
              />
              <br />

              <small style={{ color: "red", marginLeft: "5vw" }}>
                {errors.newPassword}
              </small>
              {errors.newPassword === "Enter minimum 6 characters" && (
                <i
                  className="fa fa-exclamation-circle"
                  style={{ color: "red" }}
                ></i>
              )}
              {errors.newPassword === true && (
                <i
                  className="fa fa-check-square-o"
                  style={{ color: "green" }}
                ></i>
              )}
            </div>

            <div className="d-flex">
              <button
                onClick={(e) => submit(e)}
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#staticBackdrop"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
