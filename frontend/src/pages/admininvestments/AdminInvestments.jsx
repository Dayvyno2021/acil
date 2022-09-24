import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Header from "../../components/headerComp/Header";
import {adminIUI} from './adminInvestmentUI'

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Progress from "../../components/Progress";
import SnackBar from "../../components/Snackbar";


// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
// import { theme } from "../../components/Theme";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { allOrdersAction, deleteOrderAction } from "../../actions/orderActions";


const AdminInvestments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { acilDetails } = loginReducer;
  //acilDetails && acilDetails.isAdmin === false

  const allOrdersReducer = useSelector((state) => state.allOrdersReducer);
  const { loading, allOrders, error } = allOrdersReducer;

  
  const getDate = (time) => {
    const d = new Date(time);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${day}-${month}-${year}`
  }


  const labels = [
    {label: 'Home', link:'/', acilDetails: false},
    { label:"About", link: '/about', acilDetails: false},
    { label:"Invest", link: "/invest", acilDetails: false},
    { label: "Contact Us", link: "#contactus", acilDetails: false },
    {label: "Profile", link:`/profile`, acilDetails: !acilDetails},
    {label: "Register", link:"/register", acilDetails: acilDetails},
    {label: "Login", link:"/login", acilDetails: acilDetails},
    { label: "Logout", link: "/", acilDetails: !acilDetails },
    {acilDetails: true},
    {acilDetails: true},
    {acilDetails: true},
    {acilDetails: true},
  ]

  const labels1 = [
    {label: 'Home', link:'/', acilDetails: false},
    { label:"About", link: '/about', acilDetails: false},
    { label:"Invest", link: "/invest", acilDetails: false},
    { label: "Contact Us", link: "#contactus", acilDetails: false },
    { label: "Profile", link: `/profile`, acilDetails: !acilDetails },
  ]

  const deleteOderReducer = useSelector((state) => state.deleteOderReducer);
  const { loading: loadingD, del, error: errorD } = deleteOderReducer;

  const editOrder = (id) => {
    navigate(`/update-order/${id}`)
  }

  const deleteOrder = (id) => {
    if (window.confirm("Delete investment?")) {
      dispatch(deleteOrderAction(id))
    }

  }
  
  useEffect(() => {
    if (acilDetails && acilDetails.isAdmin === false) {
      navigate('/')
    } else {
      dispatch(allOrdersAction())
    }
  },[dispatch, del, navigate, acilDetails])

  return (
    <Box sx={{ minHeight: '85vh' }}>
      {(loading || loadingD) && <Progress />}
      {(error || errorD ) && <SnackBar message={error || errorD}/>}
      <Grid item container direction='column' sx={adminIUI}>
        <Grid item xs={12} >
          <Box sx={adminIUI.header}>
            <Header labels={labels} labels1={labels1} />
          </Box>
        </Grid>
        <Grid item xs={12} container justifyContent='center' sx={adminIUI.heading}>
          <Typography variant="h1">All Investments</Typography>
        </Grid>
        <Grid item container justifyContent='center' direction='column' sx={adminIUI.mainTable}>  
          <Box sx={adminIUI.table}>
            <TableContainer component={Paper}>
              <Table sx={{width:'100%'}}>
                <TableHead sx={{bgcolor: '#000000'}}>
                  <TableRow >
                    <TableCell>Investor</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="left">ROI(%)</TableCell>
                    <TableCell align="left">Maturity(Days)</TableCell>
                    <TableCell align="left">Package</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Pay. Type</TableCell>
                    <TableCell align="left">Pay. Status</TableCell>
                    <TableCell align="left">Pay. Date</TableCell>
                    <TableCell align="left">Pay. Ref.</TableCell>
                    <TableCell align="left">Pay. Confirm</TableCell>
                    <TableCell align="left">Payout</TableCell>
                    <TableCell align="left">Payout Due</TableCell>
                    <TableCell align="left">PaidOut?</TableCell>
                    <TableCell align="left">Created</TableCell>
                    <TableCell align="left">Updated</TableCell>

                    <TableCell align="left">Edit</TableCell>
                    <TableCell align="left">Del</TableCell>
                  </TableRow>
                </TableHead>
                {allOrders && allOrders.map((order) => (
                  <TableBody key={order && order._id} sx={adminIUI.body}>
                    <TableRow>
                      <TableCell align="left">{order && order.investor && order.investor.name}</TableCell>
                      <TableCell align="left">{order && order.pack && order.pack.name}</TableCell>
                      <TableCell align="left">{order && order.pack && order.pack.ROI}</TableCell>
                      <TableCell align="left">{order && order.pack && order.pack.maturity}</TableCell>
                      <TableCell align="left">{order && order.pack && order.pack.packageType}</TableCell>
                      <TableCell align="left">{order && order.pack && order.pack.amount}</TableCell>
                      <TableCell align="left">{order && order.paymentType}</TableCell>
                      <TableCell align="left">{order && order.payment && order.payment.isPaid? 'true': 'false'}</TableCell>
                      <TableCell align="left">{getDate(order && order.payment && order.payment.paymentDate)}</TableCell>
                      <TableCell align="left">{order && order.paystack && order.paystack.reference}</TableCell>
                      <TableCell align="left">{order && order.payment && order.payment.paymentStatus}</TableCell>
                      <TableCell align="left">{order && order.payout}</TableCell>
                      <TableCell align="left">{order && order.payoutDate}</TableCell>
                      <TableCell align="left">{order && order.isPaidOut? 'true':'false'}</TableCell>

                      <TableCell align="left">
                        {getDate(order && order.createdAt)}
                      </TableCell>
                      <TableCell align="left">
                        {getDate(order && order.updatedAt)} 
                      </TableCell>
                      <TableCell align="left" sx={{cursor:'pointer'}}>
                        <EditIcon sx={{ color: '#808080' }}
                          onClick={() => editOrder(order && order._id)}
                        />
                      </TableCell>
                      <TableCell align="left" sx={{cursor:'pointer'}}>
                        <DeleteIcon sx={{ color: '#ff6666' }}
                          onClick={()=>deleteOrder(order && order._id)}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
                }
                </Table>
              </TableContainer>
          </Box>

        </Grid>
        {allOrders && allOrders.length < 1 ?
          (<Typography color='#FF3333' align='center'>You have no Investments</Typography>)
          :
          ('')
        }
      </Grid>
    </Box>
  )
}

export default AdminInvestments;