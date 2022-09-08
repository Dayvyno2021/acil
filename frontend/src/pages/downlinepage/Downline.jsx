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
import { downlineT } from './downlineUI';

const downlines = [
  {
    name: "Seun",
    maturity: 2,
    payout: 1040000
  },
  {
    name: "Dada",
    maturity: 3,
    payout: 650000
  },
  {
    name: "Paul",
    maturity: 2,
    payout: 1300000
  },
]

const Downline = () => {
  return (
    <Box sx={downlineT}>
      <Grid container justifyContent='space-between' sx={{my: '2rem'}}>
        <Grid item component={Link} to='/invest'>
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
                <TableCell align="left">Due</TableCell>
                <TableCell align="left">Payout(&#8358;)</TableCell>
              </TableRow>
            </TableHead>
            {downlines && downlines.map((downline) => (
              <TableBody key={downline.name}>
                <TableRow>
                  <TableCell align="left">{downline.name}</TableCell>
                  <TableCell align="left">{downline.maturity}</TableCell>
                  <TableCell align="left">{downline.payout}</TableCell>
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