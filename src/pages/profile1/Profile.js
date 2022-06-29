import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import ImgUpload from '../../components/imgupload/ImgUpload';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  large: {
    width: theme.spacing(23),
    height: theme.spacing(23),
  }
}));

const Profile = ({ className, fullName, avt, refreshFn, ...rest }) => {
  const classes = useStyles();
  const [avtr, setAvtr] = useState("")
  useEffect(() => {
    setAvtr(avt)
  }, [avt])


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="body1"
          align="right"
          paragraph
        >
          <Link to="/changepass">Change Password</Link>
        </Typography>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >

          <Avatar
            className={classes.large}
            src={avtr}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {fullName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`Chandigarh India`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <ImgUpload refreshFn={refreshFn} />
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
