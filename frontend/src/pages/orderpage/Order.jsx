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
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { orderui } from './orderUI';
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check';
import { CANCEL_PLACEORDER, RESET_ORDER } from "../../constants/orderConstants";
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Order = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [ready, setReady] = useState(false);
  const getOrderReducer = useSelector((state) => state.getOrderReducer);

  const { loading, order:orderDetails, error } = getOrderReducer;

  const placeOrderReducer = useSelector((state) => state.placeOrderReducer);
  const { success } = placeOrderReducer;

  const cancelPlaceorder = ()=>{
    dispatch({ type: RESET_ORDER });
    navigate('/')
  }

  useEffect(() => {
    if (success) {
      setReady(true)
      dispatch(getOrderAction(params.id));
      dispatch({type: CANCEL_PLACEORDER})
    } else {
      dispatch(getOrderAction(params.id));
    }
  }, [dispatch, success, params])
  


  return (
    <Box sx={{minHeight: '85vh'}}>
      {loading && <Progress />}
      {error && <SnackBar message={error} />}
      {ready && <SnackBar message={'Payment Successful'} severity='success' />}
      <Grid container justifyContent='space-between' sx={{my: '2rem', px:'3rem'}}>
        <Grid item onClick={cancelPlaceorder}>
          <HomeIcon  sx={{color:'#000', '&:hover':{cursor: 'pointer'}}} />
        </Grid>
        <Typography variant='h5' sx={{ fontFamily: 'Lato', fontWeight: '700' }}>
          INVESTMENT DETAILS
        </Typography>
        <NotificationsIcon/>
      </Grid>
      <Box sx={orderui}>
        <Grid container justifyContent='center'>
          <Grid item container direction='column' xs={10} md={6} >
            <Typography variant='h4' >Product Details</Typography>
            <Typography variant='p' fontSize='9px' color='yellowgreen'>
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
                  {orderDetails && orderDetails.createdAt}
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
            <Typography variant='h4'>Payment Details</Typography>
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
            <Typography variant='h4'>Payout Details</Typography>
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