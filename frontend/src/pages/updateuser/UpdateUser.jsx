import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
// import CheckIcon from '@mui/icons-material/Check';
import { upd } from './updateUserUI';
import { theme } from '../../components/Theme';
import Progress from '../../components/Progress';
import SnackBar from '../../components/Snackbar';
import { updateUserAction } from '../../actions/userActions';
import { RESET_USER_UPDATE } from '../../constants/userConstants';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  
  const registerReducer = useSelector((state) => state.registerReducer);
  const { loading, acilDetails, error } = registerReducer;

  const updateUserReducer = useSelector(state => state.updateUserReducer);

  const {loading:loadingU, success, error: errorU} = updateUserReducer

  const [psw, setPsw] = useState('');
  const [pswValid, setPswValid] = useState('');

  const [cpassword, setCpassword] = useState('');
  const [cpValid, setCpValid] = useState('');

  const [phone, setPhone] = useState('');
  const [fullname, setFullname] = useState('');
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('');
  
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

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserAction({
      fullname,
      account,
      bank,
      psw, 
      phone, 
      id:acilDetails && acilDetails.id}))
  }
  
  const disableUpdate = () => {
    if (!fullname || !bank || !account) return true;
    return false;
  }

  useEffect(() => {
    if (acilDetails && acilDetails.isAdmin === true) {
      if (success) {
        navigate(`/profile`);
        dispatch({type:RESET_USER_UPDATE})
      } else {
        setFullname(acilDetails && acilDetails.fullname);
        setAccount(acilDetails && acilDetails.account);
        setBank(acilDetails && acilDetails.bank);
        setPhone(acilDetails && acilDetails.phone)
      }
    } else {
      navigate('/')
    }
  }, [navigate, success, dispatch, acilDetails])
  

  return (
    <Box sx={{minHeight: '85vh'}}>
      {(loading || loadingU) && <Progress />}
      {(error || errorU) && <SnackBar message={error || errorU}/>}
      <Grid sx={upd} container>
        <Grid md={6} item sx={upd.register} container direction='column'>
          <Grid item sx={upd.register1} justifyContent='center' container>
            <Box component={Link} to='/'>
              <Box component='img' src='/image/logo.png'/> 
            </Box>
          </Grid>
          <Grid item sx={upd.register1} justifyContent='center' container>
            <Typography variant='h2' sx={upd.update}>Update Profile</Typography>
          </Grid>
          <Grid item container direction='column' sx={upd.register2} component='form'
            onSubmit={handleUpdate}
          >
            <Grid item container direction='row' >
              <Grid item container xs={12} justifyContent='center'>
                <PersonIcon sx={{mr: '1.5rem'}} />
                <Box >{acilDetails && acilDetails.username} </Box>
              </Grid>
            </Grid>

            <Grid item container alignItems='center'>
              <Grid item container xs={12}>
                <PersonIcon sx={upd.icon}/>
                <TextField variant="outlined" type='text' name='fullname' id='fullname'
                  label="Full Name" autoComplete='true' required value={fullname}
                  onChange={(e)=>setFullname(e.target.value)}
                />   
              </Grid>
            </Grid>
            <Grid item container alignItems='center'>
              <Grid item container xs={12}>
                <LockOutlinedIcon sx={upd.icon}/>
                <TextField variant="outlined" type='number' name='account' id='account'
                  label="Account Number" autoComplete='true' required value={account}
                  onChange={(e)=>setAccount(e.target.value)}
                />   
              </Grid>
            </Grid>
            <Grid item container alignItems='center'>
              <Grid item container xs={12}>
                <LockOutlinedIcon sx={upd.icon}/>
                <TextField variant="outlined" type='text' name='bank' id='bank'
                  label="Bank Name" autoComplete='true' required value={bank}
                  onChange={(e)=>setBank(e.target.value)}
                />   
              </Grid>
            </Grid>
            <Grid item container alignItems='center'>
              <Typography align='center' color='#FF6666' fontSize='0.9rem'>
                Disregard if you don't want to change password
              </Typography>
            </Grid>

            <Grid item container alignItems='center'>
              <Grid item container xs={12}>
                <LockOutlinedIcon sx={upd.icon}/>
                <TextField variant="outlined" type='password' name='password' id='password'
                  label="Password" autoComplete='true' required value={psw}
                  onChange={validate} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  error={Boolean(pswValid)}
                  helperText= {pswValid}
                />   
              </Grid>
              {/* <Grid item container xs={1} alignItems='center'>
                {pswValid ?
                  (<CheckIcon sx={{ color: '#E6E6E6', mr: '2rem' }} />)
                  :
                  (<CheckIcon sx={{ color: '#53c653', mr: '2rem' }} />)
                }
              </Grid> */}
            </Grid>
            <Grid item container>
              <Grid item container xs={12}>
                <LockOutlinedIcon sx={upd.icon}/>
                <TextField variant="outlined" type='password' name='cpassword' id='cpassword'
                  label="Confirm Password" autoComplete='true' value={cpassword}
                  onChange={validate} error={Boolean(cpValid)}
                  helperText={cpValid}
                />
              </Grid>
                {/* <Grid item container xs={1}>
                  {cpValid ?
                    (<CheckIcon sx={{ color: '#E6E6E6', mr: '2rem' }} />)
                    :
                    (<CheckIcon sx={{ color: '#53c653', mr: '2rem' }} />)
                  }
                </Grid> */}
            </Grid>
            <Grid item container>
              <Grid item container xs={12}>
                <PhoneIcon sx={upd.icon} />
                <TextField variant="outlined" type='tel' name='phone' id='phone'
                  label="Phone Number" autoComplete='true' value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item container sx={{ mb: '1rem' }} >
              <Grid item container direction='column' xs={12}>
                <Button variant='contained' sx={upd.btn} type='submit'
                  disabled = {disableUpdate()}
                >
                  Update
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
        <Grid md={6} item sx={upd.image}>
          <Box component='img' src='/image/login.jpg'/>
        </Grid>
      </Grid>
    </Box>
  )
}


export default UpdateUser;