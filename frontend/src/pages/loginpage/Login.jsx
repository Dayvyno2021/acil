import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { log } from './loginUI';
// import Stack from "@mui/material/Stack";
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { theme } from '../../components/Theme';


const Login = () => {
  return (
    <Box>
      <Grid sx={log} container>
        <Grid md={6} item sx={log.register} container direction='column'>
          <Grid item sx={log.register1} justifyContent='center' container>
            <Box component={Link} to='/'>
              <Box component='img' src='/image/logo.png'/> 
            </Box>
          </Grid>
          <Grid item container direction='column' sx={log.register2} component='form'>
            <Grid item container direction='row' >
              <PersonIcon sx={log.icon} />
              <TextField variant="outlined" type='text' name='username' id='username'
                placeholder="Username" autoComplete='true'
              />
            </Grid>
            <Grid item container direction='row'>
              <LockOutlinedIcon sx={log.icon}/>
              <TextField variant="outlined" type='password' name='password' id='password'
                placeholder="Password" autoComplete='true'
              />
            </Grid>

            <Grid item container sx={{mb:'1rem'}} direction='column'>
              <Button variant='contained' sx={log.btn}>
                Sign In
              </Button>
              <Grid item container justifyContent='center' sx={{mt:'.5rem'}}>
                <Typography sx={{ mr: '0.2rem', color: 'grey.600', fontSize: '0.8rem' }}>
                  Don't have an account? Sign Up
                </Typography>
                <Box component={Link} to='/register' 
                  sx={{textDecoration: 'none', color:theme.palette.primary.main, fontSize:'0.8rem'}}
                >
                  here
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid md={6} item sx={log.image}>
          <Box component='img' src='/image/login.jpg'/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login