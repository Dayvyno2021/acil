import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/headerComp/Header";
import { allReferralAction, deleteReferralAction } from "../../actions/referralActions";


// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Progress from "../../components/Progress";
import SnackBar from "../../components/Snackbar";
import PhoneIcon from '@mui/icons-material/Phone';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from "react-router-dom";
// import { theme } from "../../components/Theme";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import { adminRefUI } from "./adminReferPayoutUI";
import { useNavigate } from "react-router-dom";


const AdminReferPayouts = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { acilDetails } = loginReducer;

  const allReferralReducer = useSelector((state) => state.allReferralReducer);
  const { loading, allRef, error } = allReferralReducer;

  const deleteReferralReducer = useSelector((state) => state.deleteReferralReducer);
  const { loading: loadingD, deleted, error: errorD } = deleteReferralReducer;

  const labels = [
    {label: 'Home', link:'/', acilDetails: false},
    { label:"About", link: '/about', acilDetails: false},
    { label:"Invest", link: "/invest", acilDetails: false},
    { label: "Contact Us", link: "#contactus", acilDetails: false },
    {label: "Register", link:"/register", acilDetails: acilDetails},
    {label: "Profile", link:`/profile`, acilDetails: !acilDetails},
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
    {label: "Profile", link:`/profile`, acilDetails: !acilDetails},
  ]

  const getDate = (time) => {
    const d = new Date(time);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${day}-${month}-${year}`
  }

  const handleEdit = (id) => {
    navigate(`/admin/ref-payouts/${id}`)
  }

  const deleteRef = (id) => {
    if (window.confirm("Do you want to delete referrals?")) {
      dispatch(deleteReferralAction(id))      
    }
  }

  useEffect(() => {
    if (acilDetails && acilDetails.isAdmin === true) {
      dispatch(allReferralAction());
    } else {
      navigate('/');
    }

  }, [dispatch, deleted, acilDetails, navigate])
  

  return (
    <Box sx={{ minHeight: '85vh' }}>
      {(loading || loadingD) && <Progress />}
      {(error || errorD) && <SnackBar message={error || errorD}/>}
      <Grid item container direction='column' sx={adminRefUI}>
        <Grid item xs={12} >
          <Box sx={adminRefUI.header}>
            <Header labels={labels} labels1={labels1} />
          </Box>
        </Grid>
        <Grid item xs={12} container justifyContent='center' sx={adminRefUI.heading}>
          <Typography variant="h1">All Referrals</Typography>
        </Grid>
        <Grid item container justifyContent='center' direction='column' sx={adminRefUI.mainTable}>
          
          <Box sx={adminRefUI.table}>
            <TableContainer component={Paper}>
              <Table sx={{width:'100%'}}>
                <TableHead sx={{bgcolor: '#000000'}}>
                  <TableRow >
                    <TableCell>Referrers</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="left"><PhoneIcon color='success' /></TableCell>
                    <TableCell align="left">Product Name</TableCell>
                    <TableCell align="left">Maturity</TableCell>
                    <TableCell align="left">Package</TableCell>
                    <TableCell align="left">Ref. Payout</TableCell>
                    <TableCell align="left">Due Date</TableCell>
                    <TableCell align="left">Paid?</TableCell>
                    
                    <TableCell align="left">Created</TableCell>
                    <TableCell align="left">Updated</TableCell>
                    <TableCell align="left">Edit</TableCell>
                    <TableCell align="left">Del</TableCell>
                  </TableRow>
                </TableHead>
                {allRef && allRef.map((ref) => (
                  <TableBody key={ref && ref._id} sx={adminRefUI.body}>
                    <TableRow>
                      <TableCell align="left">{ref && ref.referral && ref.referral.name}</TableCell>
                      <TableCell align="left">{ref && ref.referral && ref.referral.email}</TableCell>
                      <TableCell align="left">{ref && ref.referral && ref.referral.phone}</TableCell>
                      <TableCell align="left">{ref && ref.pack && ref.pack.name}</TableCell>
                      <TableCell align="left">{ref && ref.pack && ref.pack.maturity}</TableCell>
                      <TableCell align="left">{ref && ref.pack && ref.pack.packageType}</TableCell>
                      <TableCell align="left">{ref && ref.refPayout}</TableCell>
                      <TableCell align="left">{ref && ref.PayOutDate}</TableCell>
                      <TableCell align="left">
                        {
                          ref && ref.isPaidOut ?
                          (<CheckIcon sx={{ color: 'green' }} />)
                          :
                          (<ClearIcon sx={{color:'red'}}/>)
                        }
                      </TableCell>
                      <TableCell align="left">{getDate(ref && ref.createdAt)}</TableCell>
                      <TableCell align="left">{getDate(ref && ref.updatedAt)}</TableCell>
                      <TableCell align="left" sx={{cursor:'pointer'}}>
                        <EditIcon sx={{ color: '#808080' }}
                          onClick={() => handleEdit(ref && ref._id)}
                        />
                      </TableCell>
                      <TableCell align="left" sx={{cursor:'pointer'}}>
                        <DeleteIcon sx={{ color: '#ff6666' }}
                          onClick={()=>deleteRef(ref && ref._id)}
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
        {
         ( !allRef || (allRef && allRef.length < 1)) && (
            <Typography color='#FF6666' align='center'>
              There are no Referrals
            </Typography>
          )
        }
      </Grid>
    </Box>
  )
}

export default AdminReferPayouts;