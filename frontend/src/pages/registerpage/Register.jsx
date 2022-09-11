import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ShareIcon from '@mui/icons-material/Share';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { reg } from "./registerUI";
import { theme } from '../../components/Theme';

const Register = () => {
  return (
    <Box>
      <Grid sx={reg} container>
        <Grid md={6} item sx={reg.register} container direction='column'>
          <Grid item sx={reg.register1} justifyContent='center' container>
            <Box component={Link} to='/'>
              <Box component='img' src='/image/logo.png'/> 
            </Box>
          </Grid>
          <Grid item container direction='column' sx={reg.register2} component='form'>
            <Grid item container direction='row' >
              <PersonIcon sx={reg.icon} />
              <TextField variant="outlined" type='text' name='username' id='username'
                placeholder="Username" autoComplete='true'
              />
            </Grid>
            <Grid item container direction='row' >
              <EmailIcon sx={reg.icon}/>
              <TextField variant="outlined" type='email' name='email' id='email' 
                placeholder="Email" autoComplete='true'
                />
            </Grid>
            <Grid item container direction='row'>
              <LockOutlinedIcon sx={reg.icon}/>
              <TextField variant="outlined" type='password' name='password' id='password'
                placeholder="Password" autoComplete='true'
              />
            </Grid>
            <Grid item container direction='row'>
              <LockOutlinedIcon sx={reg.icon}/>
              <TextField variant="outlined" type='password' name='cpassword' id='cpassword'
                placeholder="Confirm Password"  autoComplete='true'
              />
            </Grid>
            <Grid item container>
              <ShareIcon sx={reg.icon} />
              <TextField variant="outlined" type='text' name='refcode' id='refcode'
                placeholder="Referral Code" autoComplete='true'
              />
            </Grid>
            <Grid item container>
              <PhoneIcon sx={reg.icon} />
              <TextField variant="outlined" type='tel' name='phone' id='phone'
                placeholder="Phone Number" autoComplete='true'
              />
            </Grid>
            <Grid item container sx={{mb:'1rem'}} direction='column'>
              <Button variant='contained' sx={reg.btn}>
                Register Now
              </Button>
              <Grid item container justifyContent='center' sx={{mt:'0.5rem'}}>
                <Typography sx={{ mr: '0.2rem', color: 'grey.600', fontSize: '0.8rem' }}>
                  Already have an account? Sign In
                </Typography>
                <Box component={Link} to='/login' 
                  sx={{textDecoration: 'none', color:theme.palette.primary.main, fontSize:'0.8rem'}}
                >
                  here
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid md={6} item sx={reg.image}>
          <Box component='img' src='/image/login.jpg'/>
        </Grid>
      </Grid>
    </Box>
  )
}


export default Register;