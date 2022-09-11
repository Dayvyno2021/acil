import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { prod } from './productUI';

const Product = () => {

  const location = useLocation();
  
  const parsed = queryString.parse(location.search);

  const packs = [
    {package: 'Bronze', amount:'50,000'},
    {package: 'Silver', amount:'500,000'},
    {package: 'Gold', amount:'800,000'},
    {package: 'Platinum', amount:'1,000,000'},
    {package: 'Diamond', amount:'3,000,000'},
    {package: 'Agro King', amount:'5,000,000'},
  ]

  const params = useParams();
  return (
    <Box>
      <Grid container direction='column' sx={prod}>
        <Grid item container justifyContent='space-between' sx={prod.direct}>
          <Box component={Link} to='/invest'>
            <ArrowBackIcon sx={{color: '#000000'}} />
          </Box>
          <Typography variant='h1' align='center'>{params.id}</Typography>
          <Box component={Link} to='/notification'>
            <NotificationsIcon sx={{color: '#000000'}} />
          </Box>
        </Grid>
        <Grid item container justifyContent='center' sx={{mb:'2rem'}} >
          <Grid item container xs={8} sm={5} md={3}>
            <Box component='img' src={parsed.image} width='100%'/>
          </Grid>
        </Grid>
        <Typography variant='h4' align='center'>Choose Package</Typography>
        <Grid item container sx={prod.packages}>
          {
            packs && packs.map((pack) => (
              <Grid item container direction='column' key={`${pack.package}`}
                sx={prod.portion} xs={6} md={4} component={Link}
                to={`/payment/?name=${params.id}&price=${pack.amount}&package=${pack.package}`}
              >
                <Box sx={{fontSize:'1.8rem', fontWeight: '500'}}>&#8358;{pack.amount}</Box>
                <Typography variant='body1' sx={{fontSize: '1.8rem', fontWeight:'500'}}>
                  {pack.package}
                </Typography>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default Product