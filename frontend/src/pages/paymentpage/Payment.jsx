import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { theme } from '../../components/Theme';
import queryString from 'query-string';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';

const payment = {
  
  item: {
    mt: '5rem',
    p: '2.5rem 2rem',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    width: '75%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      p: '2.5rem 0.5rem'
    },
    '& button': {
      ...theme.invest1,
      height: '3rem',
      width: '5rem',
      transition: '0.5s',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      },
      [theme.breakpoints.down('sm')]: {
        p: '1rem 3rem'
      },
    }
  },
  item1: {
    '& img': {
      width: '80%',
      height: '5rem',
      // backgroundColor: 'red',
    }
  },
  item2: {
    '& h5': {
      color:"#808080",
      fontSize: '0.8rem'
    }
  }
}

const Payment = () => {
  const location = useLocation();

  const parsed = queryString.parse(location.search)
  return (
    <Box sx={{ minHeight: '85vh' }}>
      <Grid container justifyContent='space-between' sx={{my: '2rem', px:'5rem'}}>
        <Grid item component={Link} to='/invest'>
          <ArrowBackIcon  sx={{color:'#000'}} />
        </Grid>
        <Typography sx={{fontWeight:'700', fontFamily:'Lato', fontSize: '1.5rem'}}>
          Make Payment
        </Typography>
        <NotificationsIcon/>
      </Grid>
      <Grid container direction='column' sx={payment} alignItems='center'>
        <Grid item sx={payment.item} container justifyContent='center' alignItems='center'>
          <Grid item xs={5} md={5} sx={payment.item1}>
            <Box component='img' src='/image/paystack2.svg'/>
          </Grid>
          <Grid item xs={4} md={4} sx={payment.item2}>
            <Typography variant='h5'>Product: {parsed.name} </Typography>
            <Typography variant='h5'>Package: {parsed.package} </Typography>
            <Typography variant='h5'>Amount: {parsed.price} </Typography>
          </Grid>
          <Grid item xs={3} md={3}>
            <Button variant='contained'>Pay</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Payment