import React, { useState } from "react";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { SIGNUP } from "../../utilities/services/constants/apiLinks";
import {
  Avatar,
  Grid,
  Container,
  CssBaseline,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { CssTextField, useStyles } from "../../styles";
import { useForm } from "react-hook-form";
import { post } from "../../utilities/services/newServices";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RegisterForm = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [respMessage, setRespMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const history = useHistory();

  const onSubmit = async (data) => {
    setLoading(true);
    const successActions = () => {
      alert("Successfully Registered");
      setLoading(false);
      history.push("/login");
    };
    const errActions = (error) => {
      setLoading(false);
      setOpen(true);
      setAlertType("error");
      setRespMessage(error);
    };
    const netErrActions = () => {
      setOpen(true);
      setLoading(false);
      setAlertType("error");
      setRespMessage("Please Check Your Internet Connection");
    };

    post(
      SIGNUP,
      { ...data, roleId: "5ff5a043c51e0042898fe15e" },
      successActions,
      errActions,
      netErrActions
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon style={{ fontSize: 45 }} />
        </Avatar>
        <Typography component="h1" variant="h4">
          Register Here
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert onClose={handleClose} severity="error">
              {respMessage}
            </Alert>
          </Snackbar>
          <CssTextField
            name="firstName"
            label="First Name"
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: "You must provide the First Name!",
              pattern: {
                value: /^[A-Za-z\\s]+$/,
                message: "You must provide the First Name!",
              },
            })}
            autoComplete="firstName"
            error={!!errors.firstName}
            className={classes.margin}
            fullWidth
            autoFocus
          />
          {errors.firstName && (
            <span className={classes.error}>{errors.firstName.message}</span>
          )}

          <CssTextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: "You must provide the Last Name!",
              pattern: {
                value: /^[A-Za-z\\s]+$/,
                message: "You must provide the Last Name!",
              },
            })}
            autoComplete="lastName"
            error={!!errors.lastName}
            className={classes.margin}
            fullWidth
            autoFocus
          />
          {errors.lastName && (
            <span className={classes.error}>{errors.lastName.message}</span>
          )}

          <CssTextField
            name="email"
            label="Email Address"
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: "You must provide the email address!",
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "You must provide a valid email address!",
              },
            })}
            autoComplete="email"
            error={!!errors.email}
            className={classes.margin}
            fullWidth
            autoFocus
          />
          {errors.email && (
            <span className={classes.error}>{errors.email.message}</span>
          )}
          <CssTextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: "You must provide a password.",
              minLength: {
                value: 6,
                message: "Your password must be greater than 6 characters",
              },
            })}
            error={!!errors.password}
            fullWidth
            autoComplete="current-password"
          />
          {errors.password && (
            <span className={classes.error}>{errors.password.message}</span>
          )}

          <Grid container>
            <Grid item xs>
              <Link to="/forgot" variant="body2" className={classes.link}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>

          {loading ? (
            <div style={{ marginLeft: "10vw", marginBottom: "2vh" }}>
              <CircularProgress disableShrink />
            </div>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!!errors.email || !!errors.password}
              className={classes.submit}
            >
              Sign Up
            </Button>
          )}
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2" className={classes.link}>
                {"Already Having An Account ? Login Here"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegisterForm;
