import React, { useState, useEffect } from "react";
import { GET_USER } from "../../utilities/services/constants/apiLinks";
import { get, put } from "../../utilities/services/newServices";
import { useStyles } from "./styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import ImgsUpload from "../../components/imgupload/ImgsUpload";
import { getUser } from "../../redux/user/actions";
import { useDispatch } from "react-redux";
import { upload } from "../../utilities/services/newServices.js";
import { UPLOAD_IMAGES } from "../../utilities/services/constants/apiLinks";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import Popup from "../../components/Popup";
import Controls from "../../components/controls/Controls";
import Axios from "axios";
import LazyLoad from "react-lazyload";
import LazyLoadImage from "react-lazy-load-image-component";
const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[600],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

const Gallary = () => {
  const classes = useStyles();
  const [toggle, settoggle] = useState(false);
  const [cards, setCard] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const setGallery = () => {
    const successActions = (userData) => {
      if (userData.gallery) {
        setCard((cards) => [...userData.gallery]);
      } else {
        setCard([]);
      }
      setLoading1(false);
    };

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    get(`${GET_USER}${id}`, successActions, token);
  };
  useEffect(() => {
    setGallery();
  }, [toggle]);

  const setToggle = () => {
    settoggle(!toggle);
  };
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState([]);
  const [imageRaw, setImageRaw] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [imageLink, setImageLink] = useState();
  const [delIndex, setDelIndex] = useState();
  const timer = React.useRef();
  let formData = new FormData();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    files.map((file) => {
      setImagePreview((imagePreview) => [
        ...imagePreview,
        URL.createObjectURL(file),
      ]);
    });
    setImageRaw(files);
  };

  const remove = (i) => {
    setImagePreview((img) => {
      img.splice(i, 1);
      return [...img];
    });
    imageRaw.splice(i, 1);
    setImageRaw([...imageRaw]);
  };

  const Upload = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const successActions = () => {
      setLoading(false);
      settoggle(!toggle);
    };
    const errActions = (err) => {
      alert(err);
      setLoading(false);
      setSuccess(false);
    };

    const length = imageRaw.length;

    for (let i = 0; i <= length; i++) {
      formData.append("file[]", imageRaw[i]);
    }

    formData.append("id", localStorage.getItem("id"));
    formData.append("imageFor", "user");

    upload(UPLOAD_IMAGES, formData, successActions, errActions);
    setImagePreview([]);
  };

  const removeImage = (link, imgId, imgIndex) => {
    setLoading2(true);
    setDelIndex(imgIndex);
    const index = link.indexOf("/1");
    const length = link.length;
    const name = link.slice(index + 1, length);
    const id = localStorage.getItem("id");
    Axios.put(
      `http://93.188.167.68:4500/api/images/remove/?id=${id}&imageId=${imgId}&image=${name}`
    )
      .then((res) => {
        settoggle(!toggle);
        setLoading2(false);
      })
      .catch((err) => {
        alert("error");
      });
  };

  //93.188.167.68:4500/api/images/remove/?id=601d19a785c60724aff54a27&imageId=601d1ca15f81a625dc8b414e&image=1612520608723askhdkj.png

  //93.188.167.68:4500/api/images/remove/?id=601d19a785c60724aff54a27&imageId=601d20e95f81a625dc8b414f&image=1612521703340shdvfhsd.png
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Grid container>
            <div style={{ marginTop: "20vh", marginLeft: "25vw" }}>
              <Grid item xs={6}>
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Welcome To Gallery
                </Typography>
              </Grid>
            </div>
            <div style={{ marginTop: "13vh", marginLeft: "5vw" }}>
              <Grid item xs={6}>
                <center>
                  <div style={{ marginTop: "7vh" }}>
                    <h3>Upload Images</h3>
                    {imagePreview ? (
                      <div>
                        {imagePreview.map((img, i) => (
                          <div key={i}>
                            <img
                              src={img}
                              alt="dummy"
                              width="150"
                              height="150"
                            />
                            <button onClick={() => remove(i)}> Remove</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <span className="fa-stack fa-2x mt-3 mb-2">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fas fa-store fa-stack-1x fa-inverse" />
                        </span>
                        <h5 className="text-center">Upload your photo</h5>
                      </div>
                    )}

                    <input
                      type="file"
                      id="upload-button"
                      onChange={(e) => handleChange(e)}
                      multiple
                    />
                    <br />
                    <div
                      style={{ marginLeft: "27%", marginTop: "5%" }}
                      className={classes.root}
                    >
                      <div className={classes.wrapper}>
                        <Fab
                          aria-label="save"
                          color="primary"
                          className={buttonClassname}
                          onClick={(e) => Upload(e)}
                        >
                          {success ? <CheckIcon /> : <SaveIcon />}
                        </Fab>
                        {loading && (
                          <CircularProgress
                            size={68}
                            className={classes.fabProgress}
                          />
                        )}
                      </div>
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={buttonClassname}
                          disabled={loading}
                          onClick={(e) => Upload(e)}
                        >
                          Upload
                        </Button>
                        {loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </center>
              </Grid>
            </div>
          </Grid>

          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            {loading1 ? (
              <Loader />
            ) : (
              <Grid container spacing={4}>
                {cards &&
                  cards.map((card, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <LazyLoad
                          height={200}
                          placeholder={
                            <h1 style={{ marginTop: "30vh" }}>Loading...</h1>
                          }
                        >
                          <CardMedia
                            className={classes.cardMedia}
                            image={card.image}
                            title="Image title"
                          />
                        </LazyLoad>

                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => {
                              setImageLink(card.image);
                              setOpenPopup(!openPopup);
                            }}
                            color="primary"
                          >
                            View
                          </Button>
                          {/* <Button
                            size="small"
                            onClick={(e) => removeImage(card.image, card._id)}
                            color="primary"
                          >
                            Delete
                          </Button> */}
                          {loading2 && index === delIndex ? (
                            <div
                              style={{
                                marginLeft: "50%",
                                marginBottom: "2vh",
                              }}
                            >
                              <CircularProgress disableShrink />
                            </div>
                          ) : (
                            <Button
                              size="small"
                              color="primary"
                              onClick={(e) =>
                                removeImage(card.image, card._id, index)
                              }
                            >
                              Delete
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            )}
          </Container>
          <Popup
            title="Image"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <div style={{ height: "100%", width: "100%" }}>
              <img src={imageLink} height="100%" width="100%" />
            </div>
          </Popup>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
};
export default Gallary;
