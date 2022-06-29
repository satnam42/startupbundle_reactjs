import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from './Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { GET_USER } from "../../utilities/services/constants/apiLinks";
import { get, put } from "../../utilities/services/newServices";
import { useHistory } from 'react-router-dom';
import Loader from '../../components/Loader'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const history = useHistory();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [fullName, setFullName] = useState("")
  const [avatar, setAvatar] = useState("")

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true)
  const loaderMargin = {
    marginTop: "50vh"
  }

  const getUser = () => {
    const successActions = (userData) => {
      setUserData(userData);
      setLoading(false);
      var fullname =
        setFullName(`${userData.firstName} ${userData.lastName}`)
      var avatar = userData.avatar
      setAvatar(userData.avatar);


    };

    const errActions = (err) => {
      alert(err);
      history.push("/login");
    };

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    get(`${GET_USER}${id}`, successActions, errActions, token);
  };

  useEffect(() => {
    getUser();
  }, [refresh]);

  const refreshFn = () => {
    setRefresh(!refresh)
  }



  return (
    <>
      {
        loading ? <Loader loaderMargin={loaderMargin}
        /> : <div style={{ marginTop: "15vh" }}>
            <Page
              className={classes.root}
              title="Account"
            >
              <Container maxWidth="lg">
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    <Profile fullName={fullName} avt={avatar} refreshFn={refreshFn} />
                  </Grid>
                  <Grid
                    item
                    lg={8}
                    md={6}
                    xs={12}
                  >
                    <ProfileDetails fName={userData.firstName} lName={userData.lastName} emailAdd={userData.email} phone={userData.phoneNumber} />
                  </Grid>
                </Grid>
              </Container>
            </Page>
          </div>
      }
    </>
  );
};

export default Account;
