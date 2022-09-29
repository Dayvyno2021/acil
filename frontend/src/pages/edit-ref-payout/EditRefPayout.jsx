import { useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import Progress from "../../components/Progress";
import SnackBar from "../../components/Snackbar";
import { useParams, useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Checkbox from '@mui/material/Checkbox';
import { editRefPUI } from "./editRefPayoutUI";
import { refPayoutAction, updateRefPayoutAction } from "../../actions/referralActions";
import { UPDATE_REF_PAYOUT_RESET } from "../../constants/referralConstants";

const EditRefPayout = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paidOut, setPaidOut] = useState(false);

  const updateRefPayoutReducer = useSelector(state => state.updateRefPayoutReducer);
  const { loading, pay, error } = updateRefPayoutReducer;

  const refPayoutReducer = useSelector((state) => state.refPayoutReducer);
  const { loading: loadingD, details, error: errorD, success } = refPayoutReducer;

  const loginReducer = useSelector((state) => state.loginReducer);
  const { acilDetails } = loginReducer;
  //acilDetails && acilDetails.isAdmin === false

  const getDate = (time) => {
    const d = new Date(time);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${day}-${month}-${year}`
  }


  const confirmPaidOut = (e) => {
    e.preventDefault();
    // console.log(params.id)
    dispatch(updateRefPayoutAction({paidOut, id: params.id}))
  }

  useEffect(() => {
    if (acilDetails && acilDetails.isAdmin === true) {
      if (!success || (details && details._id !== params.id)) {
        dispatch(refPayoutAction(params.id))
      } else {
        setPaidOut(details && details.isPaidOut);
        if (pay) {
          dispatch({ type: UPDATE_REF_PAYOUT_RESET });
          navigate('/admin/ref-payouts')
        }
      }
    } else {
      navigate('/');
    }

  }, [dispatch, success, details, pay, navigate, params.id, acilDetails])
  
  return (
    <Box sx={{minHeight: '85vh'}}>
      {(loading || loadingD) && <Progress />}
      {(error || errorD) && <SnackBar message={error || errorD} />}
      <Grid container justifyContent='space-between' sx={{my: '2rem', px:'3rem'}}>
        <Grid item sx={{visibility: 'hidden'}}>
          <HomeIcon  sx={{color:'#000', '&:hover':{cursor: 'pointer'}}} />
        </Grid>
        <Typography variant='h5' sx={{ fontFamily: 'Lato', fontWeight: '700' }}>
          REFERRAL PAYOUT DETAILS
        </Typography>
        <NotificationsIcon/>
      </Grid>

      <Grid container justifyContent='center'> 
        <Grid item component='form' onSubmit={confirmPaidOut}  sx={editRefPUI.confirm}
        container alignItems='center' xs={10} md={6.1} justifyContent='center'
        >
          <Typography>Confirm Pay-Out:</Typography>
          <Checkbox color="success" sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }}
            checked={paidOut} onChange={(e)=>setPaidOut(e.target.checked)}
            />
          <Button type="submit">Confirm</Button>
        </Grid>
      </Grid>

      <Box sx={editRefPUI}>
        <Grid container justifyContent='center'>
          <Grid item container direction='column' xs={10} md={6} >
            <Typography variant='h4' color='#808080' >Product Details</Typography>
            <List sx={editRefPUI.product}>
              <ListItem >
                <ListItemText>Product Name:{' '}</ListItemText>
                <ListItemText>
                  {details && details.pack && details.pack.name}
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>Referral ID:{' '}</ListItemText>
                <ListItemText>
                  {details && details._id}
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>Refer Date:{' '}</ListItemText>
                <ListItemText>
                  {getDate(details && details.createdAt)}
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>ROI:{' '}</ListItemText>
                <ListItemText>
                  {details && details.pack && details.pack.ROI}%
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Package:{' '}</ListItemText>
                <ListItemText>
                  {details && details.pack && details.pack.packageType}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Maturity:{' '}</ListItemText>
                <ListItemText>
                  {details && details.pack && details.pack.maturity}{' Days'}
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid container justifyContent='center'>
          <Grid item container direction='column' xs={10} md={6} >
            <Typography variant='h4' color='#808080'>Referral Details</Typography>
            <List sx={editRefPUI.product}>
              <ListItem >
                <ListItemText>Referrer Name:{' '}</ListItemText>
                <ListItemText>
                  {details && details.referral && details.referral.name}
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>Referral Email:{' '}</ListItemText>
                <ListItemText>
                  {details && details.referral && details.referral.email}
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>Referral Phone:{' '}</ListItemText>
                <ListItemText>
                  {details && details.referral && details.referral.phone}
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>Referral Code:{' '}</ListItemText>
                <ListItemText>
                  {details && details.refCode}
                </ListItemText>
              </ListItem>

            </List>
          </Grid>
        </Grid>
        <Grid container justifyContent='center'>
          <Grid item container direction='column' xs={10} md={6} >
            <Typography variant='h4' color='#808080'>Payout Details</Typography>
            <List sx={editRefPUI.product}>
              <ListItem >
                <ListItemText>Payout:{' '}</ListItemText>
                <ListItemText>&#8358;
                  {details && details.refPayout && details.refPayout.toLocaleString()}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Payout Status:{' '}</ListItemText>
                <ListItemText>
                  {details && details.isPaidOut?
                    (<CheckIcon sx={{ color:'green'}}/>)
                    :
                    (<ClearIcon sx={{color:'red'}}/>)
                  }
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>Payout Date:{' '}</ListItemText>
                <ListItemText>
                  {details && details.payOutDate}
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default EditRefPayout;