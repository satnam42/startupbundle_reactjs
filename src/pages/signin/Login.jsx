import React, { useState } from "react";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { LOGIN } from "../../utilities/services/constants/apiLinks";
import {
  Avatar,
  Grid,
  Container,
  CssBaseline,
  FormControlLabel,
  Button,
  CircularProgress,
  Checkbox,
  Typography,
} from "@material-ui/core";
import { CssTextField, useStyles } from "../../styles";
import { useForm } from "react-hook-form";
import { post } from "../../utilities/services/newServices";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignInForm = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [respMessage, setRespMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  const history = useHistory();

  const successActions = (res) => {
    setLoading(false);
    localStorage.setItem("id", res.id);
    localStorage.setItem("token", res.token);
    localStorage.setItem("name", res.firstName);
    history.push("/profile");
  };
  const errActions = (error) => {
    // alert(error);
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

  const onSubmit = (data) => {
    setLoading(true);

    post(LOGIN, data, successActions, errActions, netErrActions);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
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
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon style={{ fontSize: 45 }} />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <Grid item>
              <FormControlLabel
                label="Remember me"
                name="remember"
                control={
                  <Checkbox
                    className={classes.checkBox}
                    inputRef={register()}
                  />
                }
              />
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
              Sign In
            </Button>
          )}
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2" className={classes.link}>
                {"New to this platform? Create an Acount."}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignInForm;
