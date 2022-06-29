import React from "react";
import { useStyles } from "./styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const View = ({ imageLink }) => {
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

  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={imageLink}
            title="Image title"
          />
        </Card>
      </Grid>
    </>
  );
};

export default View;
