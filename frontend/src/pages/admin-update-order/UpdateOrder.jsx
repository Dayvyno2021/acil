import { useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import Progress from "../../components/Progress";
import SnackBar from "../../components/Snackbar";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderAction, updatePayoutAction, updateToPaidAction } from "../../actions/orderActions";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { UpdateOrderUI } from "./updateOrderUI";
import Checkbox from '@mui/material/Checkbox';
import { RESET_ORDER_PAID, RESET_PAYOUT } from "../../constants/orderConstants";

const UpdateOrder = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paid, setPaid] = useState(false)
  const [paidOut, setPaidOut] = useState(false)
  
  const getOrderReducer = useSelector((state) => state.getOrderReducer);
  const { loading, order: orderDetails, success, error } = getOrderReducer;
  
  const updateToPaidReducer = useSelector(state => state.updateToPaidReducer);
  const { loadingPD, order: orderPD, error: errorPD } = updateToPaidReducer;

  const updatePayoutReducer = useSelector(state => state.updatePayoutReducer);
  const { loadingPO, po, errorPO } = updatePayoutReducer
  
  const loginReducer = useSelector(state => state.loginReducer);
  const { acilDetails } = loginReducer;

  // acilDetails && acilDetails.isAdmin === false

  const getDate = (time) => {
    const d = new Date(time);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${day}-${month}-${year}`
  }

  const confirmPaid = (e) => {
    e.preventDefault();
    // console.log({paid, id: params.id})
    dispatch(updateToPaidAction({paid, id: params.id}))
  }

  const confirmPaidOut = (e) => {
    e.preventDefault();
    dispatch(updatePayoutAction({paidOut, id: params.id}))
  }

  useEffect(() => {
    if (acilDetails && acilDetails.isAdmin === false) {
      navigate('/')
    } else {
      
          if (!success || (orderDetails && orderDetails._id !== params.id)) {
            dispatch(getOrderAction(params.id));
          } else {
            if (orderPD) {
              dispatch({ type: RESET_ORDER_PAID });
              navigate('/admin/investments')
            }
            if (po) {
              dispatch({ type: RESET_PAYOUT });
              navigate('/admin/investments')
            }
            setPaid(orderDetails && orderDetails.payment && orderDetails.payment.isPaid)
            setPaidOut(orderDetails && orderDetails.isPaidOut)
          }
      
    }

  }, [dispatch, params, orderDetails, success, orderPD, po, navigate, acilDetails])
  
  return (
    <Box sx={{minHeight: '85vh'}}>
      {(loading || loadingPD) && <Progress />}
      { loadingPO && <Progress />}
      {(error || errorPD) && <SnackBar message={error || errorPD} />}
      {errorPO && <SnackBar message={errorPO} />}
      {(orderPD) && <SnackBar message={'Updated Payment'} severity='success' />}
      {po && <SnackBar message={'Updated Payment'} severity='success' />}
      <Grid container justifyContent='space-between' sx={{my: '2rem', px:'3rem'}}>
        <Grid item sx={{visibility: 'hidden'}}>
          <HomeIcon  sx={{color:'#000', '&:hover':{cursor: 'pointer'}}} />
        </Grid>
        <Typography variant='h5' sx={{ fontFamily: 'Lato', fontWeight: '700' }}>
          INVESTMENT DETAILS
        </Typography>
        <NotificationsIcon/>
      </Grid>

      <Grid container justifyContent='center'> 
        <Grid item component='form' onSubmit={confirmPaid}  sx={UpdateOrderUI.confirm}
        container alignItems='center' xs={10} md={6.1} justifyContent='center'
        >

            <Typography>Confirm Payment:</Typography>
            <Checkbox color="success" sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }}
              checked={paid} onChange={(e)=>setPaid(e.target.checked)}
              />
            <Button type="submit">Confirm</Button>

        </Grid>
        {orderDetails && orderDetails.payment && orderDetails.payment.paymentStatus ==="Confirmed"
          && (
          <Grid item component='form'onSubmit={confirmPaidOut} sx={UpdateOrderUI.confirm}
            container alignItems='center' xs={10} md={6.1} justifyContent='center'
            >

                <Typography>Confirm Paid-Out:</Typography>
                <Checkbox color="success" sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }}
                  checked={paidOut} onChange={(e)=>setPaidOut(e.target.checked)}
                  />
                <Button type="submit">Confirm</Button>

            </Grid>

          )
        }
      </Grid>

      <Box sx={UpdateOrderUI}>
        <Grid container justifyContent='center'>
          <Grid item container direction='column' xs={10} md={6} >
            <Typography variant='h4' color='#808080' >Order Details</Typography>
            <List sx={UpdateOrderUI.product}>
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
            <List sx={UpdateOrderUI.product}>
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
            <List sx={UpdateOrderUI.product}>
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

export default UpdateOrder;