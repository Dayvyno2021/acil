import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { theme } from '../../components/Theme';
import { useDispatch, useSelector} from 'react-redux';
import { addPackageAction } from '../../actions/packageActions';
import { ADD_PACKAGE_RESET } from '../../constants/packageConstants';
import Progress from '../../components/Progress';
import SnackBar from '../../components/Snackbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const auPk = {
  arrow: {
    color: '#000000',
    ml: '1rem'
  },
  image: {
    '& img': {
      my:'1rem',
      width: '9rem'
    }
  },
  header: {
    mb: '2rem',
    '& h1': {
      fontSize: '2rem',
      fontWeight: '700',
      fontFamily: 'Lato'
    }
  },
  iContainer: {
    // bgcolor: 'red',
    '&>div': {
      mb:'1rem'
    },
    '& .MuiTextField-root': {
      width: '100%',
      mb: '1rem',
    },
    '& .MuiInputBase-input': {
      bgcolor: theme.palette.common.lemon2,
      // m: '0.2rem 0.5rem'
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.common.lemon1
      }
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.primary.main
    },
    '& button': {
      ...theme.invest1,
      '&:hover': {
        bgcolor: theme.palette.primary.dark
      }
    }
  }
}

const AdminUpdatePK = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [packageType, setPackageType] = useState('');
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState('')
  const addPackageReducer = useSelector((state) => state.addPackageReducer);
  const { loading, status, error } = addPackageReducer;

  const loginReducer = useSelector((state) => state.loginReducer);
  const { acilDetails } = loginReducer;

  const update = (e) => {
    e.preventDefault();
    dispatch(addPackageAction({packageType, amount}))
  }

  const disableUpdate = () => {
    if (!packageType || !amount) return true;
    return false;
  }

  useEffect(() => {
    if (acilDetails && acilDetails.isAdmin) {
      if (status === 'Package Successfully Added') {
        setPackageType('');
        setAmount('');
        setSuccess('Package Successfully Added')
        dispatch({type: ADD_PACKAGE_RESET})
      }
    } else {
      navigate('/')
    }
  }, [dispatch, status, navigate, acilDetails])
  

  return (
    <Box sx={{ minHeight: '85vh' }}>
      {loading && <Progress />};
      {error && <SnackBar message={error}/>}
      {success==='Package Successfully Added' ? <SnackBar message='Package Added. Refresh Page' severity='success'/> : ''}
      <Grid container direction='column' sx={auPk.main}>
        <Grid item >
          <Box component={Link} to='/admin/packages'>
            <ArrowBackIcon sx={auPk.arrow} />
          </Box>
        </Grid>
        <Grid item container sx={auPk.image}>
          <Grid item container component={Link} to='/' justifyContent='center'>
            <Box component='img' src='/image/logo.png'/>
          </Grid>
        </Grid>
        <Grid item container sx={auPk.header} justifyContent='center'>
          <Typography variant='h1' align='center'>Update Packages</Typography>
        </Grid>
        <Grid item container sx={auPk.iContainer}
          component='form' onSubmit={update} direction='column'
        >
          <Grid item container sx={auPk.inputs} justifyContent='center'>
            <Grid item xs={11} sm={8} md={5}>
              <TextField variant="outlined" type='text' name='packageType' id='packageType'
                label="Package Type" autoComplete='true' required value={packageType}
                onChange={(e)=>setPackageType(e.target.value)}
              />   
            </Grid>
          </Grid>
          <Grid item container sx={auPk.inputs} justifyContent='center'>
            <Grid item xs={11} sm={8} md={5}>
              <TextField variant="outlined" type='number' name='amount' id='amount'
                label="Amount" autoComplete='true' required value={amount}
                onChange={(e)=>setAmount(e.target.value)}
              />   
            </Grid>
          </Grid>
          <Grid item container sx={auPk.inputs} justifyContent='center'>
            <Button type='submit' variant='contained' disabled={disableUpdate()}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminUpdatePK