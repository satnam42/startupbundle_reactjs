import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "./dashboard.css";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(8),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  // const [videoFilePath, setVideoFileURL] = useState(null);
  // const handleVideoUpload = (event) => {
  //   setVideoFileURL(URL.createObjectURL(event.target.files[0]));
  // };

  return (
    <>
      <main>
        {/* Hero unit */}
        <div style={{ marginTop: "5vh" }} className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Welcome To StartUp Bundle
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
              repellat expedita totam voluptatum eius debitis
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center"></Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item sm={8}>
              <CardMedia
                className={classes.cardMedia}
                image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80"
                title="Image title"
              />
            </Grid>
            <Grid item sm={4}>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                <div className="3">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eligendi repellat expedita totam voluptatum eius debitis
                </div>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Dashboard;
