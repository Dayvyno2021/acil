// import React, { useState, useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Link, useParams} from 'react-router-dom';
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import PersonIcon from '@mui/icons-material/Person';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import ShareIcon from '@mui/icons-material/Share';
// import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import CheckIcon from '@mui/icons-material/Check';
import { theme } from '../../components/Theme';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import Notification from "../../components/notification/Notification";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from "react-redux";
// import { registerAction } from '../../actions/userActions';
// import Progress from '../../components/Progress';
// import SnackBar from '../../components/Snackbar';
// import { refer } from './referralUI';


const refer = {
  '& p': {
    fontSize: '2.3rem',
    fontFamily: 'Lato',
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem'
    },
  },
  '& a': {
    fontSize: '2rem',
    fontFamily: 'Lato',
    fontWeight: '500',
    color: theme.palette.primary.dark,
    ml: '1.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem'
    },
  },
  logos: {
    px: '10rem',
    mt: '1rem',
    mb: '5rem',
    [theme.breakpoints.down('md')]: {
      px: '5rem'
    },
    [theme.breakpoints.down('sm')]: {
      px: '3rem'
    },
    '& img': {
      width: '9rem',
      maxWidth: '9rem',
      [theme.breakpoints.down('md')]: {
        width: '7rem',
        maxWidth: '7rem',
      },
      [theme.breakpoints.down('sm')]: {
        width: '5rem',
        maxWidth: '5rem',

      }
    }
  },
}

const Referral = () => {
  const params = useParams();
  const loginReducer = useSelector(state => state.loginReducer);
  const { acilDetails } = loginReducer;


  return (
    <Box sx={{minHeight: '85vh'}}>
      <Grid container sx={refer} direction='column'>
        <Grid item sx={refer.logos} container justifyContent='space-between' alignItems='center'>
          <Box component={Link} to='/invest'>
            <ArrowBackIcon sx={{color: '#000000'}} />
          </Box>
          { acilDetails && acilDetails && <Notification/> }
        </Grid>
        <Grid item container justifyContent='center' alignItems='center'>
          <Typography variant='body1'>Your Referral link:</Typography>
          <Typography component='a'>
            http://acil9ja.herokuapp.com/register/?referral={params.id}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Referral