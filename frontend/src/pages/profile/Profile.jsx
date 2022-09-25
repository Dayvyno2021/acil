import { useState, useEffect} from 'react';
import { uploadPixAction } from '../../actions/userActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from 'react-router-dom';
import { profileUI } from './profileUI';
import SnackBar from '../../components/Snackbar';
import Progress from '../../components/Progress';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UPLOAD_IMAGE_RESET } from '../../constants/userConstants';
// import IconButton from '@mui/material/IconButton';
// import { theme } from "../../components/Theme"
import { profileUI1 } from './profileUI';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const uploadPixReducer = useSelector(state => state.uploadPixReducer);
  const { loading, success, error } = uploadPixReducer;

  const loginReducer = useSelector(state => state.loginReducer);
  const { acilDetails } = loginReducer;

  const [image, setImage] = useState('');
  const [show, setShow] = useState(false)

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const uploadImage = (e) => {
    e.preventDefault();
    if (image.length < 1) {
      alert('field empty, please add image');
      return;
    } else {
      const imageData = new FormData();
      imageData.append('image', image);
      dispatch(uploadPixAction(imageData))
    }
  }

  useEffect(() => {
    if (success) {
      setShow(true);
      dispatch({type: UPLOAD_IMAGE_RESET})
    }
  },[dispatch, success])

  const investment = () => {
    navigate(`/investment/${acilDetails && acilDetails.id}`);
  }

  const downline = () => {
    navigate(`/downline/${acilDetails && acilDetails.id}`);
  }


  return (
    <Box sx={profileUI1}>
      {error && <SnackBar message={error} />}
      {show && <SnackBar message={"Image Updated, refresh page to update"} severity='success' />}
      {loading && <Progress/>}
      <Box sx={profileUI}>
        <Grid container justifyContent='space-between' sx={{my: '2rem'}}>
          <Grid item component={Link} to={`/invest`}>
            <ArrowBackIcon  sx={{color:'#000'}} />
          </Grid>
          <NotificationsIcon/>
        </Grid>
        <Grid container justifyContent='center' sx={{ position: 'relative' }}>
          <Avatar alt='name' src={`/api/user/profile-image/${acilDetails && acilDetails.id}` || 'https://via.placeholder.com/150'}/>
          
        </Grid>
        <Grid item container justifyContent='center' sx={profileUI.imgStyle}
          component='form' onSubmit={uploadImage}
        >
          <Button variant='standard' component='label'>
            Change profile pix(max: 200kb){' '} <EditIcon/>
            <input type='file' accept='image/*' onClick={handleImage}/>
          </Button>
          <Button type='submit' variant='standard'>upload</Button>
        </Grid>
        <Typography align='center' variant="h6" component="h2">
          {acilDetails && acilDetails.username}
        </Typography>
        <Grid item container sx={{ mt: 2 }} justifyContent='center'>
          <Typography align='center' >
            <strong>Referral Code:</strong> 
          </Typography>
          <Typography align='center' sx={{ml:'1rem', color: '#808080'}}>
            {acilDetails && acilDetails.refCode}
          </Typography>
        </Grid>
        <Typography align='center' sx={{ mt: '0.5rem' }}>
          <strong>Invitation Link:</strong>
        </Typography>
        <Typography align='center' sx={{ mt: '0.5rem', color:'#808080' }}>
          http://acil9ja.herokuapp.com/register/?referral={acilDetails && acilDetails.refCode}
        </Typography>
        <Typography align='center' sx={{ mt: '0.5rem', color: '#808080' }}>
          <Button variant='outlined' sx={profileUI.update}
            component={Link} to='/update-profile'>
            <EditIcon/> update Profile
          </Button>
        </Typography>
        <Grid container justifyContent='space-between' className='cl4'>
          <Typography onClick={investment}>
            Investments
          </Typography>
          <Typography onClick={downline} >Downlines</Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Username</Typography>
          <Typography>{acilDetails && acilDetails.username} </Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Email</Typography>
          <Typography>{acilDetails && acilDetails.email} </Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography><PhoneIcon color='success' /></Typography>
          <Typography>{acilDetails && acilDetails.phone} </Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Full Name</Typography>
          <Typography>{acilDetails && acilDetails.fullname} </Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Account Number</Typography>
          <Typography>{acilDetails && acilDetails.account} </Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Bank</Typography>
          <Typography>{acilDetails && acilDetails.bank} </Typography>
        </Grid>
        {
          acilDetails && acilDetails.isAdmin && (
            <Grid container justifyContent='space-between' className='cl5'>
              <Typography>Admin</Typography>
              <Typography>
                {
                  acilDetails && acilDetails.isAdmin ?
                    (<CheckIcon sx={{ color: 'green' }} />)
                    :
                    (<ClearIcon sx={{color:'red'}}/>)
                }
              </Typography>
            </Grid>

          )
        }
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Pending Payouts</Typography>
          <Typography>&#8358;</Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Received Payouts</Typography>
          <Typography>&#8358;</Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Total Payout</Typography>
          <Typography>&#8358;</Typography>
        </Grid>
      </Box>
    </Box>
  )
}

export default Profile