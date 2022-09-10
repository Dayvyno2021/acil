import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { theme } from '../../components/Theme';


const prod = {
  minHeight: '85vh',
  "&>h1": {
    fontSize: '3rem',
    fontWeight: '700',
    fontFamily: "Lato",
    mb: '2rem'
  },
  "&>h4": {
    fontSize: '1.5rem',
    fontWeight: '400',
    mb: '1rem',
  },
  portion: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    px: '5rem',
    mb: '3rem',
    [theme.breakpoints.down('sm')]: {
      px: '0rem'
    },
    '&>div': {
      width: '16.75rem',
      height: '16.75rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)',
      [theme.breakpoints.down('lg')]: {
        width: '10rem',
        height: '10rem',
      }
    },
    '&>p': {
      // color: theme.palette.common.lemon1,
      fontFamily: 'Pacifico'
    }
  }
}

const Product = () => {

  const packs = [
    {package: 'Bronze', amount:'50,000'},
    {package: 'Silver', amount:'500,000'},
    {package: 'Gold', amount:'800,000'},
    {package: 'Platinum', amount:'1,000,000'},
    {package: 'Diamond', amount:'3,000,000'},
    {package: 'AgroKing', amount:'5,000,000'},
  ]

  const params = useParams();
  return (
    <Box>
      <Grid container direction='column' sx={prod}>
        <Typography variant='h1' align='center'>{params.id}</Typography>
        <Typography variant='h4' align='center'>Choose Package</Typography>
        <Grid item container>
          {
            packs && packs.map((pack) => (
              <Grid item container direction='column' key={`${pack.package}`} sx={prod.portion} xs={6} md={4}>
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