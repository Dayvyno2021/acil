import {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

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
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { downlineT } from './downlineUI';
import { useDispatch, useSelector } from 'react-redux';
import { getDownlinesAction } from '../../actions/userActions';
import Progress from '../../components/Progress';
import SnackBar from '../../components/Snackbar';


// const downlines = [
//   {
//     name: "Seun",
//     maturity: 2,
//     payout: 1040000
//   },
//   {
//     name: "Dada",
//     maturity: 3,
//     payout: 650000
//   },
//   {
//     name: "Paul",
//     maturity: 2,
//     payout: 1300000
//   },
// ]

const Downline = () => {

  const dispatch = useDispatch();
  const params = useParams();
  
  const loginReducer = useSelector(state => state.loginReducer);
  const { acilDetails } = loginReducer;

  const  getDownlinesReducer = useSelector((state) => state.getDownlinesReducer);
  const { loading, downlines, error } = getDownlinesReducer;

  const maturityDate = (key) => {
    const maturity = key && key.pack && key.pack.maturity;
    const due = Date.now() + (maturity* 24 * 60 * 60 * 1000);
    return new Date(due).toDateString();
  }

  useEffect(() => {
    if (acilDetails && acilDetails.refCode) {
      dispatch(getDownlinesAction(acilDetails.refCode))
    }
  },[dispatch, acilDetails])

  return (
    <Box sx={downlineT}>
      {loading && <Progress />}
      {error && <SnackBar message={error}/>}
      <Grid container justifyContent='space-between' sx={{my: '2rem'}}>
        <Grid item component={Link} to={`/profile/${params.id}`}>
          <ArrowBackIcon  sx={{color:'#000'}} />
        </Grid>
        <Typography sx={{fontWeight:'700', fontFamily:'Lato', fontSize: '1.5rem'}}>
          Downlines
        </Typography>
        <NotificationsIcon/>
      </Grid>
      <Box sx={downlineT.table}>
        <TableContainer component={Paper} sx={downlineT.container}>
          <Table aria-label="simple table">
            <TableHead sx={{bgcolor: '#000000'}}>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell>Package</TableCell>
                <TableCell align="left">Due</TableCell>
                <TableCell align="left">Payout(&#8358;)</TableCell>
              </TableRow>
            </TableHead>
            {downlines && downlines.map((downline) => (
              <TableBody key={downline && downline._id}>
                <TableRow>
                  <TableCell align="left">{downline && downline.referral && downline.referral.name}</TableCell>
                  <TableCell align="left">{downline && downline.pack && downline.pack.packageType}</TableCell>
                  <TableCell align="left">{maturityDate(downline)}</TableCell>
                  <TableCell align="left">{downline && downline.refPayout && downline.refPayout.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            ))
            }
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Downline