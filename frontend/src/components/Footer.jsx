import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { theme } from './Theme';

const footerDown = {
    '&>div': {
      backgroundColor: "#000014",
      p: '1rem 10rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        p: '1rem 2rem'
      },
      [theme.breakpoints.down('sm')]: {
        p: '1rem 0.5rem'
      },
      '&>p': {
        color: theme.palette.common.white,
        [theme.breakpoints.down('sm')]: {
          fontSize: '0.8rem'
        },
      },
      '&>img': {
        width: '7rem',
        [theme.breakpoints.down('sm')]: {
          width: '4rem'
        },
      }
    }
  }

const Footer = () => {
  return (
    <Box>
      <Grid item container sx={footerDown}>
        <Grid item xs={12} container>
          <Box component='img' src='/image/logo.png'></Box>
          <Typography variant='body1'>@2022 all rights reserved</Typography>
          <Typography variant='body1'>Terms & Conditions</Typography>
          <Typography variant='body1'>Privacy Policy</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Footer