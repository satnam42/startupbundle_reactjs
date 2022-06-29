import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { isValidEmail } from "../../utilities/formValidations/formValidations";
import { post } from "../../utilities/services/newServices";
import { FORGOT_PASSWORD } from "../../utilities/services/constants/apiLinks";
import "./forget.css";

const Forget = () => {
  const history = useHistory();
  const data = {
    email: "",
  };
  const errData = {
    email: "",
  };

  const [user, setUser] = useState(data);
  const [errors, setErrors] = useState(errData);
  const mailRef = useRef(null);
  const { email } = user;
  var emValid;
  const [isValid, setIsValid] = useState(null);

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
    }
  };

  const formValidate = async (e) => {
    e.preventDefault();
    if (errors.email === true) {
      const successActions = (res) => {
        localStorage.setItem("otpToken", res.token);
        alert("OTP sent successfully");
        history.push("/otp");
      };

      post(FORGOT_PASSWORD, user, successActions);
    }
  };

  return (
    <div
      className="login_content d-flex "
      style={{ justifyContent: "center", marginTop: "20vh" }}
    >
      <form className="mx-auto w-50">
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Enter Your Registred E-mail
        </p>

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

          <small style={{ color: "red", marginLeft: "5vw" }}>
            {errors.email}
          </small>
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
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forget;
