import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const gui = {
  p: '2rem 2rem',
  nav: {
    mb: '5rem'
  }
}

const Guide = () => {
  return (
    <Box sx = {{minHeight: '85vh'}}>
      <Grid container>
        <Grid item container direction='column' sx={gui}>
            <Grid item sx={gui.nav} container justifyContent='left' alignItems='center'>
              <Box component={Link} to='/invest'>
                <ArrowBackIcon sx={{color: '#000000'}} />
              </Box>
            </Grid>
          <Grid item container>
            <iframe width='420' height='315' src='https://www.youtube.com/embed/HigbxcLmJCE'
              title='ACIL Guide'
              style={{border: 'none', borderRadius: '5px'}}
            >  
            </iframe>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Guide