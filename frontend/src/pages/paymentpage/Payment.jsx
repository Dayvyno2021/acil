import React, {useEffect} from 'react';
import { useNavigate, Link, useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
// import queryString from 'query-string';
// import HomeIcon from '@mui/icons-material/Home';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { payment } from './paymentUI';
import { useSelector, useDispatch } from 'react-redux';
import { placeOrderAction } from '../../actions/orderActions';
import { usePaystackPayment } from 'react-paystack';
 import axios from 'axios';
import { useState } from 'react';
import Progress from '../../components/Progress';
import SnackBar from '../../components/Snackbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CHOOSE_PACKAGE_RESET } from '../../constants/packageConstants';
import { myProfileAction } from '../../actions/userActions';
import Notification from '../../components/notification/Notification';

const Payment = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

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
    initializePayment(onSuccess, onClose);
  }

  const disablePayment = () => {
    if (!pack) return true;
    return false;
  }

  useEffect(() => {
    setReady(true);
    const reactKey = async() => {
      const {data} = await axios.get('/paystack-key');
      setPaystackKey(data);
    }
    reactKey();
    setReady(false);
    if (orderDetails && orderDetails._id) {
      localStorage.removeItem('pack');
      dispatch(myProfileAction())
      dispatch({type: CHOOSE_PACKAGE_RESET})
      navigate(`/order/${orderDetails && orderDetails._id}`)
    } 
  }, [dispatch, navigate, orderDetails, pack])


  return (
    <Box sx={{ minHeight: '85vh' }}>
      {(loading || ready) && <Progress />}
      {error && <SnackBar message={error}/>}
      <Grid container justifyContent='space-between' sx={{my: '2rem', px:'3rem'}}>
        <Grid item component={Link} to={`/invest/${params.id}`}>
          <ArrowBackIcon  sx={{color:'#000'}} />
        </Grid>
        <Typography variant='h3'>Make Payment</Typography>
        <Notification/>
      </Grid>
      <Box>
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
              <Button variant='contained' onClick={placeorder}
                disabled = {disablePayment()}
              >
                Complete Payment
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Payment