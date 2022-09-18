import React, {useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
// import queryString from 'query-string';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { payment } from './paymentUI';
import { useSelector, useDispatch } from 'react-redux';
import { placeOrderAction } from '../../actions/orderActions';
import { usePaystackPayment } from 'react-paystack';
 import axios from 'axios';
import { useState } from 'react';
import Progress from '../../components/Progress';
import SnackBar from '../../components/Snackbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { orderui } from './paymentUI';
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'

const Payment = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  // const navigate = useNavigate();

  const [paystackKey, setPaystackKey] = useState('');
  const [ready, setReady] = useState(false);


  const choosePackageReducer = useSelector(state => state.choosePackageReducer);
  const { pack } = choosePackageReducer;
  // const { ID, pName, img, ROI, maturity, packageType, amount } = pack;

  const placeOrderReducer = useSelector((state) => state.placeOrderReducer);
  const {loading, orderDetails, error} = placeOrderReducer


  // const parsed = queryString.parse(location.search)
  const config = {
    reference: (new Date()).getTime().toString(),
    email: "dayvynomer2021@gmail.com",
    amount: pack && pack.amount*100,
    publicKey: paystackKey,
  };

  const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
    dispatch(placeOrderAction({
      pack,
      paymentType: 'Paystack', 
      reference
    }));
  };

  const initializePayment = usePaystackPayment(config);

  const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
    alert("Payment failed")
  }

  const placeorder = () => {
    // dispatch(placeOrderAction(pack));
    initializePayment(onSuccess, onClose);
  }

  useEffect(() => {
    setReady(true);
    const reactKey = async() => {
      const {data} = await axios.get('/paystack-key');
      setPaystackKey(data);
    }
    reactKey();
    setReady(false);
  }, [])


  return (
    <Box sx={{ minHeight: '85vh' }}>
      {(ready || loading) && <Progress />}
      {error && <SnackBar message={error} />}
      {
        orderDetails && orderDetails._id ? 
          (<Box sx={orderui}>
            <Grid container justifyContent='center'>
              <Grid item container direction='column' xs={10} md={6} >
                <Typography variant='h4'>Product Details</Typography>
                <List sx={orderui.product}>
                  <ListItem >
                    <ListItemText>Name:{' '}</ListItemText>
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
          )
          :
          (
              
      <Box>
        <Grid container justifyContent='space-between' sx={{my: '2rem', px:'5rem'}}>
          <Grid item component={Link} to={`/invest/${params.id}`}>
            <ArrowBackIcon  sx={{color:'#000'}} />
          </Grid>
          <Typography sx={{fontWeight:'700', fontFamily:'Lato', fontSize: '1.5rem'}}>
            Make Payment
          </Typography>
          <NotificationsIcon/>
        </Grid>
        <Grid container direction='column' sx={payment} alignItems='center'>
          <Grid item sx={payment.item} container justifyContent='center' alignItems='center'>
            <Grid item xs={5} md={5} sx={payment.item1}>
              <Box component='img' src='/image/paystack2.svg'/>
            </Grid>
            <Grid item xs={4} md={4} sx={payment.item2}>
              <Typography variant='h5'>Product:{' '} {pack && pack.pName} </Typography>
              <Typography variant='h5'>Package:{' '} {pack && pack.packageType} </Typography>
              <Typography variant='h5'>Amount:{' '}&#8358;{pack && pack.amount && pack.amount.toLocaleString()} </Typography>
            </Grid>
            <Grid item xs={3} md={3}>
              <Button variant='contained' onClick={placeorder}>
                Pay
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
          )
      }
    </Box>
  )
}

export default Payment