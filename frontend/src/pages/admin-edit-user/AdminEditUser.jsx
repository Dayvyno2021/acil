import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import queryString from 'query-string';
import { editUI } from "./adminEditUserUI";
import { useDispatch, useSelector } from 'react-redux';
import { makeAdminAction, profileAction } from "../../actions/userActions";
import SnackBar from '../../components/Snackbar';
import Progress from '../../components/Progress';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { RESET_MAKE_ADMIN } from "../../constants/userConstants";

const AdminEditUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = params.id;

  const loginReducer = useSelector(state => state.loginReducer);
  const { acilDetails } = loginReducer;

  // acilDetails && acilDetails.isAdmin === false

  const profileReducer = useSelector(state => state.profileReducer);
  const { loading, userDetails, error } = profileReducer;
  
  const makeAdminReducer = useSelector((state) => state.makeAdminReducer);
  const { loading: loadingU, success, error: errorU } = makeAdminReducer;
  
  const [status, setStatus] = useState(false);

  const makeAdmin = (e) => {
    e.preventDefault();
    // console.log({status, id})
    dispatch(makeAdminAction({status, id}))
  }
  
  useEffect(() => {
    if (acilDetails && acilDetails.isAdmin === true) {
      if (!userDetails || (userDetails && userDetails._id !== id)) {
        dispatch(profileAction(id));
      }else {
        setStatus(userDetails && userDetails.isAdmin);
        if (success) {
          dispatch({ type: RESET_MAKE_ADMIN });
          navigate('/admin/investors')
        }
      }
    } else {
      navigate('/')
    }
  }, [dispatch, id, userDetails, navigate, success, acilDetails])

  return (
    <Box sx={{ minHeight: '85vh', mb: '5rem' }}>
      {(error || errorU) && <SnackBar message={error || errorU} />}
      {(loading || loadingU) && <Progress/>}
      <Box sx={editUI}>
        <Grid container justifyContent='space-between' sx={{my: '2rem'}}>
          <Grid item component={Link} to={`/admin/investors`}>
            <ArrowBackIcon  sx={{color:'#000'}} />
          </Grid>
          <NotificationsIcon/>
        </Grid>
        <Grid container justifyContent='center' sx={{ position: 'relative' }}>
          <Avatar alt='name' src={`/api/user/profile-image/${userDetails && userDetails._id}` || 'https://via.placeholder.com/150'}/>
        </Grid>
        <Typography align='center' variant="h6" component="h2">
          {userDetails && userDetails.username}
        </Typography>
        <Grid item container sx={{ mt: 2 }} justifyContent='center'>
          <Typography align='center' >
            <strong>Referral Code:</strong> 
          </Typography>
          <Typography align='center' sx={{ml:'1rem', color: '#808080'}}>
            {userDetails && userDetails.refCode}
          </Typography>
        </Grid>
        <Typography align='center' sx={{ mt: '0.5rem' }}>
          <strong>Invitation Link:</strong>
        </Typography>
        <Typography align='center' sx={{ mt: '0.5rem', color:'#808080' }}>
          http://acil9ja.herokuapp.com/register/?referral={userDetails && userDetails.refCode}
        </Typography>
        <Grid item container justifyContent='center'>
          <Box component='form'onSubmit={makeAdmin} alignItems='center' sx={editUI.admin}>
            <Typography>Make {userDetails && userDetails.name} an Admin:</Typography>
            <Checkbox color="success" sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }}
              checked={status} onChange={(e)=>setStatus(e.target.checked)}
              />
            <Button type="submit">Submit</Button>

          </Box>
        </Grid>

        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Username</Typography>
          <Typography>{userDetails && userDetails.name} </Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Email</Typography>
          <Typography>{userDetails && userDetails.email} </Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography><PhoneIcon color='success' /></Typography>
          <Typography>{userDetails && userDetails.phone} </Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Full Name</Typography>
          <Typography>{userDetails && userDetails.fullname} </Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Account Number</Typography>
          <Typography>{userDetails && userDetails.account} </Typography>
        </Grid>
        <Grid container justifyContent='space-between' className='cl5'>
          <Typography>Bank</Typography>
          <Typography>{userDetails && userDetails.bank} </Typography>
        </Grid>
        {
          userDetails && userDetails.isAdmin && (
            <Grid container justifyContent='space-between' className='cl5'>
              <Typography>Admin</Typography>
              <Typography>
                {
                  userDetails && userDetails.isAdmin ?
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

export default AdminEditUser