import React, { useState } from "react";
import { upload } from "../../utilities/services/newServices.js";
import { UPLOAD_IMAGES } from "../../utilities/services/constants/apiLinks";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ImgsUpload({ setToggle }) {
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState([]);
  const [imageRaw, setImageRaw] = useState([]);
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
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

  const Upload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const successActions = () => {
      setLoading(false);
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
    setToggle();
  };
  return (
    <center>
      <div style={{ marginTop: "7vh" }}>
        <h3>Upload Images</h3>
        {imagePreview ? (
          <div>
            {imagePreview.map((img, i) => (
              <div key={i}>
                <img src={img} alt="dummy" width="150" height="150" />
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
              <CircularProgress size={68} className={classes.fabProgress} />
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
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </div>
      </div>
    </center>
  );
}
