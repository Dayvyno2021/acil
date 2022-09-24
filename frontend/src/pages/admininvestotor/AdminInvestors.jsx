import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/headerComp/Header";
import { adminUsersAction, deleteUserAction, profileAction } from "../../actions/userActions";
import Progress from "../../components/Progress";
import SnackBar from "../../components/Snackbar";
import PhoneIcon from '@mui/icons-material/Phone';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
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

import { invs } from "./aminInvestorUI";

const AdminInvestors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { acilDetails } = loginReducer;

  const adminUsersReducer = useSelector((state) => state.adminUsersReducer);
  const { loading, investors, error } = adminUsersReducer;

  const deleteUserReducer = useSelector((state) => state.deleteUserReducer);
  const { loading: loadingD, del, error: errorD } = deleteUserReducer;

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
    {label: "Profile", link:`/profile`, acilDetails: !acilDetails},
  ]

  const makeAdmin = (id) => {
    dispatch(profileAction(id));
    navigate(`/update-profile/${id}`)
  }

  const deleteUser = (id) => {
    dispatch(deleteUserAction(id));
  }

  const getDate = (time) => {
    const d = new Date(time);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${day}-${month}-${year}`
  }


  useEffect(() => {
    if (acilDetails && acilDetails.isAdmin) {
      dispatch(adminUsersAction())
    }
  }, [dispatch, acilDetails, del])

  return (
    <Box sx={{ minHeight: '85vh' }}>
      {(loading || loadingD)&& <Progress />}
      {(error || errorD) && <SnackBar message={error || errorD}/>}
      <Grid item container direction='column' sx={invs}>
        <Grid item xs={12} >
          <Box sx={invs.header}>
            <Header labels={labels} labels1={labels1} />
          </Box>
        </Grid>
        <Grid item xs={12} container justifyContent='center' sx={invs.heading}>
          <Typography variant="h1">All Investors</Typography>
        </Grid>
        <Grid item container justifyContent='center' direction='column' sx={invs.mainTable}>
          
          <Box sx={invs.table}>
            <TableContainer component={Paper}>
              <Table sx={{width:'100%'}}>
                <TableHead sx={{bgcolor: '#000000'}}>
                  <TableRow >
                    <TableCell>Users</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="left">RefCode</TableCell>
                    <TableCell align="left"><PhoneIcon color='success' /></TableCell>
                    <TableCell align="left">Admin?</TableCell>
                    <TableCell align="left">Created</TableCell>
                    <TableCell align="left">Updated</TableCell>
                    <TableCell align="left">Edit</TableCell>
                    <TableCell align="left">Del</TableCell>
                  </TableRow>
                </TableHead>
                {investors && investors.map((investor) => (
                  <TableBody key={investor && investor._id} sx={invs.body}>
                    <TableRow>
                      <TableCell align="left">{investor && investor.name}</TableCell>
                      <TableCell align="left">{investor && investor.email}</TableCell>
                      <TableCell align="left">{investor && investor.refCode}</TableCell>
                      <TableCell align="left">{investor && investor.phone}</TableCell>
                      <TableCell align="left">
                        {
                          investor && investor.isAdmin ?
                          (<CheckIcon sx={{ color: 'green' }} />)
                          :
                          (<ClearIcon sx={{color:'red'}}/>)
                        }
                      </TableCell>
                      <TableCell align="left">{getDate(investor && investor.createdAt)}</TableCell>
                      <TableCell align="left">{getDate(investor && investor.updatedAt)}</TableCell>
                      <TableCell align="left" sx={{cursor:'pointer'}}>
                        <EditIcon sx={{ color: '#808080' }}
                          onClick={() => makeAdmin(investor && investor._id)}
                        />
                      </TableCell>
                      <TableCell align="left" sx={{cursor:'pointer'}}>
                        <DeleteIcon sx={{ color: '#ff6666' }}
                          onClick={()=>deleteUser(investor && investor._id)}
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
      </Grid>
    </Box>
  )
}

export default AdminInvestors;