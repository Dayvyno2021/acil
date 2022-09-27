import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import Progress from "../../components/Progress";
import SnackBar from "../../components/Snackbar";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderAction } from "../../actions/orderActions";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { orderui, sendUI } from './orderUI';
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import { CANCEL_PLACEORDER, RESET_ORDER } from "../../constants/orderConstants";
import HomeIcon from '@mui/icons-material/Home';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { theme } from "../../components/Theme";
import { makeWithdrawalAction } from "../../actions/userActions";
import { MAKE_WITHDRAWAL_RESET } from "../../constants/userConstants";
import Notification from "../../components/notification/Notification";

const Order = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [ready, setReady] = useState(false);
  const [req, setReq] = useState(false);
  const getOrderReducer = useSelector((state) => state.getOrderReducer);

  const { loading, order:orderDetails, error, success: successO } = getOrderReducer;

  const placeOrderReducer = useSelector((state) => state.placeOrderReducer);
  const { success } = placeOrderReducer;

  const makeWithdrawalReducer = useSelector(state => state.makeWithdrawalReducer);
  const { loading: loadingW, success: successW, error: errorW } = makeWithdrawalReducer;

  const resetPlaceorder = ()=>{
    dispatch({ type: RESET_ORDER });
    navigate('/')
  }

  const getDate = (time) => {
    const d = new Date(time);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${day}-${month}-${year}`
  }

  const dueDate = (due) => {
    const dueTime = new Date(due).getTime();
    if (Date.now() >= dueTime) {
      return true;
    }
    return false;
  }

  const handlePayout = (withdrawalDate) => {
    const d = getDate(orderDetails && orderDetails.payoutDate);
    if (dueDate(withdrawalDate)) {
      dispatch(makeWithdrawalAction(orderDetails && orderDetails._id))
    } else {
      alert(`Your payout is not yet due, due date is ${d}`)
    }
  }

  const disablebtn = (sample) => {
    if (sample) {
      return false;
    }
    return true;
      
  }


  useEffect(() => {
    if (!successO || (orderDetails && orderDetails._id !== params.id)) {
      dispatch(getOrderAction(params.id));
    } else {
      if (success) {
        setReady(true);
        dispatch({ type: CANCEL_PLACEORDER });
      } 
      if (successW) {
        setReq(true);
        dispatch({type: MAKE_WITHDRAWAL_RESET})
      }
    }

  }, [dispatch, success, params, successO, successW, orderDetails])
  


  return (
    <Box sx={{minHeight: '85vh'}}>
      {(loading || loadingW) && <Progress />}
      {(error || errorW) && <SnackBar message={error || errorW} />}
      {ready && <SnackBar message={'Payment Successful'} severity='success' />}
      {req && <SnackBar message={'Request Sent'} severity='success' />}
      <Grid container justifyContent='space-between' sx={{ px:'3rem', pt: '2rem'}}>
        <Grid item onClick={resetPlaceorder}>
          <HomeIcon  sx={{color:'#000', '&:hover':{cursor: 'pointer'}}} />
        </Grid>
        <Typography variant='h5' sx={{ fontFamily: 'Lato', fontWeight: '700' }}>
          INVESTMENT DETAILS
        </Typography>
        <Notification/>
      </Grid>
      {
        orderDetails && orderDetails.isPaidOut ? '' : (
        <Grid container justifyContent='center' sx={sendUI}>
          <Typography variant='h5' color='#808080' sx={{ fontFamily: 'Lato', fontWeight: '700' }}>
            Request for payout
          </Typography>
            <Button variant='contained' disabled={disablebtn(orderDetails && orderDetails.payment && orderDetails.payment.isPaid)}
              onClick={() => handlePayout(orderDetails && orderDetails.payoutDate)}
            sx={{ bgcolor: dueDate(orderDetails && orderDetails.payoutDate) ? 'rgba(0,128,0,0.8)' : 'rgba(255,0,0,0.8)', '&:hover':{bgcolor: dueDate(orderDetails && orderDetails.payoutDate)? 'rgba(0,128,0,1)':'rgba(250,0,0,1)'} }}>
            Request
            <SendIcon sx={sendUI.icon} />
          </Button>
        </Grid>
        )
      }
      <Box sx={orderui}>
        <Grid container justifyContent='center'>
          <Grid item container direction='column' xs={10} md={6} >
            <Typography variant='h4' color='#808080' >Product Details</Typography>
            <Typography variant='p' fontSize='11px' color={theme.palette.primary.dark}>
              (payment confirmation is usually within 5mins to 24hrs)
            </Typography>
            <List sx={orderui.product}>
              <ListItem >
                <ListItemText>Product Name:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.pack && orderDetails.pack.name}
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>Order ID:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails._id}
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>Order Date:{' '}</ListItemText>
                <ListItemText>
                  {getDate(orderDetails && orderDetails.createdAt)}
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>ROI:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.pack && orderDetails.pack.ROI}%
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Package:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.pack && orderDetails.pack.packageType}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Maturity:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.pack && orderDetails.pack.maturity}{' Days'}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Amount Invested:{' '}</ListItemText>
                <ListItemText >&#8358;
                  {orderDetails && orderDetails.pack && orderDetails.pack.amount && orderDetails.pack.amount.toLocaleString()}
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid container justifyContent='center'>
          <Grid item container direction='column' xs={10} md={6} >
            <Typography variant='h4' color='#808080'>Payment Details</Typography>
            <List sx={orderui.product}>
              <ListItem >
                <ListItemText>Payment Method:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.paymentType}
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>Payment Confirmation:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.payment&& orderDetails.payment.paymentStatus}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Payment Status:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.payment && orderDetails.payment.isPaid ?
                    (<CheckIcon sx={{ color:'green'}}/>)
                    :
                    (<ClearIcon sx={{color:'red'}}/>)
                  }
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Payment ID:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.paystack && orderDetails.paystack.reference}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Payment Date:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.payment && orderDetails.payment.paymentDate}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Payment Confirmation Date:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.payment && orderDetails.payment.confirmDate}
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid container justifyContent='center'>
          <Grid item container direction='column' xs={10} md={6} >
            <Typography variant='h4' color='#808080'>Payout Details</Typography>
            <List sx={orderui.product}>
              <ListItem >
                <ListItemText>Payout:{' '}</ListItemText>
                <ListItemText>&#8358;
                  {orderDetails && orderDetails.payout && orderDetails.payout.toLocaleString()}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Payout Status:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.isPaidOut?
                    (<CheckIcon sx={{ color:'green'}}/>)
                    :
                    (<ClearIcon sx={{color:'red'}}/>)
                  }
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>Payout Date:{' '}</ListItemText>
                <ListItemText>
                  {orderDetails && orderDetails.payoutDate}
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Order;