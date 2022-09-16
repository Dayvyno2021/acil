import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ShareIcon from '@mui/icons-material/Share';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
// import CheckIcon from '@mui/icons-material/Check';
import { reg } from "./registerUI";
import { theme } from '../../components/Theme';
import { registerAction } from '../../actions/userActions';
import Progress from '../../components/Progress';
import SnackBar from '../../components/Snackbar';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search? location.search.split('=')[1] : '';

  const registerReducer = useSelector((state) => state.registerReducer);
  const { loading, acilDetails, error } = registerReducer;

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');

  const [psw, setPsw] = useState('');
  const [pswValid, setPswValid] = useState('');

  const [cpassword, setCpassword] = useState('');
  const [cpValid, setCpValid] = useState('');

  const [refCode, setRefCode] = useState('');
  const [phone, setPhone] = useState('');
  
  const validate = (event) => {
    let valid;
    switch (event.target.id) {
      case 'password':
        setPsw(event.target.value);
        valid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(event.target.value);
        if (valid) {
          setPswValid('');
        } else {
          setPswValid("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
        }
        break;
      
      case 'cpassword':
        setCpassword(event.target.value);
        if (psw===event.target.value) {
          setCpValid('');
        } else {
          setCpValid('Passwords must match');
        }
        break;
    
      default:
        break;
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerAction({ username, email, psw, refCode, phone }));
    
  }
  
  const disableRegister = () => {
    if (!username || !email || !psw || !cpassword) return true;
    return false;
  }

  useEffect(() => {
    if (acilDetails && acilDetails.username) {
      navigate(`/${redirect}`)
    }
  }, [navigate, acilDetails, redirect])
  

  return (
    <Box>
      {loading && <Progress />}
      {error && <SnackBar message={error}/>}
      <Grid sx={reg} container>
        <Grid md={6} item sx={reg.register} container direction='column'>
          <Grid item sx={reg.register1} justifyContent='center' container>
            <Box component={Link} to='/'>
              <Box component='img' src='/image/logo.png'/> 
            </Box>
          </Grid>
          <Grid item container direction='column' sx={reg.register2} component='form'
            onSubmit={handleRegister}
          >
            <Grid item container direction='row' >
              <Grid item container xs={11}>
                <PersonIcon sx={reg.icon} />
                <TextField variant="outlined" type='text' id='username'
                  placeholder="Username" autoComplete='true' required value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item container direction='row' >
              <Grid item container xs={11}>
                <EmailIcon sx={reg.icon}/>
                <TextField variant="outlined" type='email' name='email' id='email' 
                  placeholder="Email" autoComplete='true' value={email}
                  onChange = {(e)=>setEmail(e.target.value)} required
                  />
              </Grid>
            </Grid>

            <Grid item container alignItems='center'>
              <Grid item container xs={11}>
                <LockOutlinedIcon sx={reg.icon}/>
                <TextField variant="outlined" type='password' name='password' id='password'
                  placeholder="Password" autoComplete='true' required value={psw}
                  onChange={validate} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  error={Boolean(pswValid)}
                  helperText= {pswValid}
                />   
              </Grid>
              <Grid item container xs={1} alignItems='center'>
                {/* {pswValid ?
                  (<CheckIcon sx={{ color: '#E6E6E6', mr: '2rem' }} />)
                  :
                  (<CheckIcon sx={{ color: '#53c653', mr: '2rem' }} />)
                } */}
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container xs={11}>
                <LockOutlinedIcon sx={reg.icon}/>
                <TextField variant="outlined" type='password' name='cpassword' id='cpassword'
                  placeholder="Confirm Password" autoComplete='true' value={cpassword}
                  onChange={validate} error={Boolean(cpValid)}
                  helperText={cpValid}
                />
              </Grid>
                <Grid item container xs={1}>
                  {/* {cpValid ?
                    (<CheckIcon sx={{ color: '#E6E6E6', mr: '2rem' }} />)
                    :
                    (<CheckIcon sx={{ color: '#53c653', mr: '2rem' }} />)
                  } */}
                </Grid>
            </Grid>
            <Grid item container>
              <Grid item container xs={11}>
                <ShareIcon sx={reg.icon} />
                <TextField variant="outlined" type='text' name='refcode' id='refcode'
                  placeholder="Referral Code" autoComplete='true' value={refCode}
                  onChange={(e)=>setRefCode(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container xs={11}>
                <PhoneIcon sx={reg.icon} />
                <TextField variant="outlined" type='tel' name='phone' id='phone'
                  placeholder="Phone Number" autoComplete='true' value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item container sx={{ mb: '1rem' }} >
              <Grid item container direction='column' xs={11}>
                <Button variant='contained' sx={reg.btn} type='submit'
                  disabled = {disableRegister()}
                >
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
        </Grid>
        <Grid md={6} item sx={reg.image}>
          <Box component='img' src='/image/login.jpg'/>
        </Grid>
      </Grid>
    </Box>
  )
}


export default Register;