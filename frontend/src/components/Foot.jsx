import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { theme } from './Theme';
import { Link } from 'react-router-dom';

const foot = {
  '&>div': {
      mt: '2rem',
      backgroundImage: "url('/image/footer.png')",
      backgroundRepeat: 'no-repeat',
      minHeight: '70vh',
      backgroundPosition: 'center',
      backgroundSize: '100% 100%',
      [theme.breakpoints.down('md')]: {
        minHeight: '50vh'
      },
      [theme.breakpoints.down('sm')]: {
        minHeight: '30vh'
      },

      '&>h2': {
        color: theme.palette.common.white,
        fontWeight: '700',
        fontFamily: 'Lato',
        [theme.breakpoints.down('sm')]: {
          fontSize: '2.1rem'
        },
      },

      '&>a': {
        ...theme.invest1,
        display: 'inline-block',
        mx: 'auto',
        transition: '0.3s',
        [theme.breakpoints.down('sm')]: {
          p: '0.5rem 2rem'
        },
        '&:hover': {
          backgroundColor: theme.palette.primary.dark
        }
      }
    }
}

const Foot = () => {
  return (
    <>
    <Grid item container sx={foot}>
      <Grid item xs={12} container direction='column' justifyContent='space-around'>
        <Typography variant='h2' align="center">
          What are you waiting for?
        </Typography>
          <Button variant="contained" component={Link} to='/invest'>
            Invest
          </Button>
      </Grid>
    </Grid>
    </>
  )
}

export default Foot