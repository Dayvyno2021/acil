import React, {useEffect} from 'react';
import { Link} from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { tables } from './investmentUI';
import { useDispatch, useSelector } from 'react-redux';
import { myordersAction } from '../../actions/orderActions';
import { useNavigate } from 'react-router-dom';
import SnackBar from '../../components/Snackbar';
import Progress from '../../components/Progress';
import Notification from '../../components/notification/Notification';
// import { getDownlinesAction } from '../../actions/userActions';

const Investment = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myordersReducer = useSelector(state => state.myordersReducer);
  const { loading, myorders, error } = myordersReducer;

  const loginReducer = useSelector(state => state.loginReducer);
  const { acilDetails } = loginReducer;

  // const getDownlinesReducer = useSelector(state => state.getDownlinesReducer);
  // const { downlines } = getDownlinesReducer;

  const navOrder = (id) => {
    navigate(`/order/${id}`)
  }

  // const calcTPO = () => {
  //   const downlineP = downlines && downlines.filter(downline => downline && downline.isPaidOut)
  //     .map(each => each.refPayout);
      
  //   const paIDOut = myorders && myorders.filter((order) => {
  //     return order && order.isPaidOut
  //   }).map((value, index)=>value && value.payout)

  //   if (downlineP && paIDOut) {
  //     let tot = downlineP.concat(paIDOut);
  //       tot = tot.reduce((total, value) => total + value);
  //     return tot
  //   }
  // }
  
  useEffect(() => {
    if (acilDetails) {
      dispatch(myordersAction())
      // dispatch(getDownlinesAction(acilDetails && acilDetails.refCode))
    }
  }, [dispatch, acilDetails])

  return (
    <Box sx={tables}>
      {error && <SnackBar message={error} />}
      {loading && <Progress/>}
      <Grid container justifyContent='space-between' sx={{my: '2rem'}}>
        <Grid item component={Link} to={`/profile`}>
          <ArrowBackIcon  sx={{color:'#000'}} />
        </Grid>
        <Typography sx={tables.heading}>
          Investments
        </Typography>
        <Notification/>
      </Grid>
      {
        (myorders && myorders.length < 1) && 
        <Typography variant='h5' color='#FF0000'>You have not subscribed to any investment</Typography>
      }
      {
        myorders && myorders.map((order) => (
          <Box key={order && order._id} sx={tables.table}>
            <Typography variant='h1' align='center' sx={{mb:'0.5rem'}}>
              {order && order.pack && order.pack.name}
            </Typography>
            <TableContainer component={Paper} sx={tables.container}>
              <Table aria-label="simple table">
                <TableHead sx={{bgcolor: '#000000'}}>
                  <TableRow>
                    <TableCell>Amount Invested(&#8358;)</TableCell>
                    <TableCell align="left">Maturity</TableCell>
                    <TableCell align="left">Due Date</TableCell>
                    <TableCell align="left">Payout(&#8358;)</TableCell>
                    <TableCell align="left">View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      {order && order.pack && order.pack.amount && order.pack.amount.toLocaleString()}
                    </TableCell>
                    <TableCell align="left">{order && order.pack && order.pack.maturity}</TableCell>
                    <TableCell align="left">{order && order.payoutDate}</TableCell>
                    <TableCell align="left">{order && order.payout && order.payout.toLocaleString()}</TableCell>
                    <TableCell align="left" >
                      <VisibilityIcon onClick={() => navOrder(order && order._id)} sx={{'&:hover':{cursor:'pointer'}}} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))
      }
    </Box>
  )
}

export default Investment