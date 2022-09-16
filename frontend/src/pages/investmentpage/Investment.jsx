import React from 'react';
import { Link } from 'react-router-dom';

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
import { tables } from './investmentUI';

const orders = [
  {
    pName: "Cocoa Beans",
    img: '/image/cocoa.jpg',
    ROI: 30,
    maturity: 2,
    packageType: 'Gold',
    amount: 800000,
    payout: 1040000
  },
  {
    pName: "Cashew Nuts",
    img: '/image/cashew.jpg',
    ROI: 30,
    maturity: 3,
    packageType: 'Silver',
    amount: 500000,
    payout: 650000
  },
  {
    pName: "Ginger",
    img: '/image/ginger.jpg',
    ROI: 30,
    maturity: 2,
    packageType: 'Platinum',
    amount: 1000000,
    payout: 1300000
  },
]

const Investment = () => {
  return (
    <Box sx={tables}>
      <Grid container justifyContent='space-between' sx={{my: '2rem'}}>
        <Grid item component={Link} to='/invest'>
          <ArrowBackIcon  sx={{color:'#000'}} />
        </Grid>
        <Typography sx={{fontWeight:'700', fontFamily:'Lato', fontSize: '1.5rem'}}>
          Investment
        </Typography>
        <NotificationsIcon/>
      </Grid>
      {
        orders && orders.map((order) => (
          <Box key={order.pName} sx={tables.table}>
            <Typography variant='h1' align='center'>
              {order && order.pName}
            </Typography>
            <TableContainer component={Paper} sx={tables.container}>
              <Table aria-label="simple table">
                <TableHead sx={{bgcolor: '#000000'}}>
                  <TableRow>
                    <TableCell>Amount(&#8358;)</TableCell>
                    <TableCell align="left">Due</TableCell>
                    <TableCell align="left">Payout(&#8358;)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">{order.amount}</TableCell>
                    <TableCell align="left">{order.maturity}</TableCell>
                    <TableCell align="left">{order.payout}</TableCell>
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