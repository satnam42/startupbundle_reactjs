import React, { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
export default function ImgUpload({ refreshFn }) {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setloading(true);
    let formData = new FormData();
    formData.append("file", image.raw);
    formData.append("id", localStorage.getItem("id"));
    formData.append("imageFor", "user");

    const res = await fetch(
      "http://93.188.167.68:4500/api/images/uploadSingle",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      }
    );
    setloading(false);
    refreshFn();
    setImage({ preview: "", raw: "" });
  };

  return (
    <center>
      <div>
        <h3>Change Profile</h3>
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="150" height="150" />
        ) : (
          <></>
        )}

        <input
          type="file"
          id="upload-button"
          onChange={(e) => handleChange(e)}
        />
        <br />
        {loading ? (
          <div style={{ marginLeft: "0vw", marginBottom: "2vh" }}>
            <CircularProgress disableShrink />
          </div>
        ) : (
          <Button
            type="submit"
            variant="contained"
            onClick={(e) => handleUpload(e)}
          >
            Upload
          </Button>
        )}
      </div>
    </center>
  );
}
