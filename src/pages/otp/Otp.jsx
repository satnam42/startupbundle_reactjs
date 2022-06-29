import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  passwordPattern,
  otpValid,
} from "../../utilities/formValidations/formValidations";
import { post } from "../../utilities/services/newServices";
import { OTP_VERIFY } from "../../utilities/services/constants/apiLinks";

const Forget = () => {
  const history = useHistory();
  const initialData = {
    otp: "",
    newPassword: "",
  };
  const initialErrData = {
    otp: "",
    newPassword: "",
  };

  const [otpObj, setOtpObj] = useState(initialData);
  const [errors, setErrors] = useState(initialErrData);
  const otpRef = useRef(null);
  const passRef = useRef(null);
  const { otp, newPassword } = otpObj;
  var emValid;
  const [isValid, setIsValid] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "otp": {
        emValid = otpValid(value);

        if (emValid !== true) {
          setIsValid(false);
          setErrors({ ...errors, [name]: "Otp format not Valid" });
          otpRef.current.classList = "invalid";
        } else if (emValid === true) {
          setIsValid(true);
          setErrors({ ...errors, [name]: true });
          otpRef.current.classList = "valid";
        }

        setOtpObj({ ...otpObj, [name]: value });
        break;
      }
      case "newPassword": {
        emValid = passwordPattern(value);

        if (emValid !== true) {
          setIsValid(false);
          setErrors({
            ...errors,
            [name]:
              "Enter a Strong Password with 1 upper & lower case letter, 1 special char and 1 number",
          });
          passRef.current.classList = "invalid";
        } else if (emValid === true) {
          setIsValid(true);
          setErrors({ ...errors, [name]: true });
          passRef.current.classList = "valid";
        }

        setOtpObj({ ...otpObj, [name]: value });
        break;
      }
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("otpToken");
    if (errors.otp === true) {
      const successActions = () => {
        alert("Password changed successfully");
        history.push("/login");
      };

      post(OTP_VERIFY, otpObj, successActions, token);
    }
  };

  return (
    <div
      className="login_content d-flex "
      style={{ justifyContent: "center", marginTop: "20vh" }}
    >
      <form className="mx-auto w-50">
        <div className="form-group" ref={otpRef}>
          <input
            type="number"
            className="form-control"
            placeholder="Enter your four digit OTP here"
            name="otp"
            value={otp}
            onChange={(e) => handleChange(e)}
          />
          <br />

          <small style={{ color: "red" }}>{errors.otp}</small>
          {errors.otp === "Otp format not Valid" && (
            <i
              className="fa fa-exclamation-circle"
              style={{ color: "red" }}
            ></i>
          )}
          {errors.otp === true && (
            <i className="fa fa-check-square-o" style={{ color: "green" }}></i>
          )}
        </div>
        <div className="form-group" ref={passRef}>
          <input
            type="password"
            className="form-control"
            placeholder="Enter new password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => handleChange(e)}
          />
          <br />

          <small style={{ color: "red" }}>{errors.newPassword}</small>
          {errors.newPassword ===
            "Enter a Strong Password with 1 upper & lower case letter, 1 special char and 1 number" && (
            <i
              className="fa fa-exclamation-circle"
              style={{ color: "red" }}
            ></i>
          )}
          {errors.newPassword === true && (
            <i className="fa fa-check-square-o" style={{ color: "green" }}></i>
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
  );
};

export default Forget;
