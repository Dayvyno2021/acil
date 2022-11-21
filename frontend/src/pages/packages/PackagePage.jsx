import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { Link } from 'react-router-dom';
import Header from '../../components/headerComp/Header';
import { useSelector, useDispatch } from 'react-redux';
import { allPackagesAction, delPackageAction } from '../../actions/packageActions';
import SnackBar from '../../components/Snackbar';
import Progress from '../../components/Progress';
import DeleteIcon from '@mui/icons-material/Delete';
import { theme } from '../../components/Theme';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

const p = {
  header: {
    width: '100%',
    height: '7rem',
    bgcolor: 'rgba(0, 0, 0, 0.9)',
  },
  heading: {
    '& h1': {
      fontSize: '2rem',
      fontFamily: 'Lato',
      fontWeight: '600',
      letterSpacing: '3px',
      mt: '2rem'
    }
  },
    table: {
    "& th, & td":{p: '0.5rem'},
    '& th': {
      color: '#FFFFFF',
      border: `1px solid #000000`,
    },
    '& td': {
      border: `1px solid ${theme.palette.primary.main}`,
    }
  },
  body: {
    '&:nth-of-type(even)': {
      bgcolor: theme.palette.common.lemon2
      
    }
  },
  mainTable: {
    overflowY: 'scroll',
    p: '2rem 1rem',
    [theme.breakpoints.down('lg')]: {
      p: '2rem 8rem'
    },
    [theme.breakpoints.down('md')]: {
      p: '2rem 3rem'
    },
    [theme.breakpoints.down('sm')]: {
      p: '2rem 1rem'
    },
  },
  '& .MuiTableHead-root': {
    '& th': {
      textAlign: 'center',
    }
  },
  add: {
    ...theme.learnMore2,
    mt: '2rem'
  }
}

const PackagePage = () => {

  const dispatch = useDispatch();

  const loginReducer = useSelector(state => state.loginReducer);
  const { acilDetails } = loginReducer;

  const allPackagesReducer = useSelector((state) => state.allPackagesReducer);
  const { loading, error, packages } = allPackagesReducer;

  const delPackageReducer = useSelector(state => state.delPackageReducer);
  const { loading: loadingDel, error: errorDel, success } = delPackageReducer;

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
    {acilDetails: true},
  ]

  const labels1 = [
    {label: 'Home', link:'/', acilDetails: false},
    { label:"About", link: '/about', acilDetails: false},
    { label:"Invest", link: "/invest", acilDetails: false},
    { label: "Contact Us", link: "#contactus", acilDetails: false },
    { label: "Profile", link: `/profile`, acilDetails: !acilDetails },
  ]

  const deletePackage = (id) => {
    if (window.confirm('Delete Package?')) {
      dispatch(delPackageAction(id));
    }
  }

  useEffect(() => {
    dispatch(allPackagesAction())
  }, [dispatch, success])
  
  return (
    <Box sx={{ minHeight: '85vh' }}>
      {loading && <Progress/>}
      {loadingDel && <Progress/>}
      {error && <SnackBar message={error}/>}
      {errorDel && <SnackBar message={errorDel}/>}
      <Grid container direction='column'>
        <Box sx={p.header}>
          <Header labels={labels} labels1={labels1}/>
        </Box>
        <Grid item container justifyContent='center' sx={p.heading}>
          <Typography variant='h1' align='center'>Packages</Typography>
        </Grid>
        <Grid item container justifyContent='end' >
          <Button variant='outlined' component={Link} to='/admin-update-package' sx={p.add}>
            Add Package +
          </Button>
        </Grid>
        <Grid item container direction='column' sx={p.mainTable}>
          {
            (packages && packages.length < 1) && 
            <Typography variant='h5' color='#FF0000'>You have not subscribed to any investment</Typography>
          }
          <Box sx={p.table}>
            <TableContainer component={Paper}>
              <Table sx={{width:'100%'}}>
                <TableHead sx={{bgcolor: '#000000'}}>
                  <TableRow >
                    <TableCell>Index</TableCell>
                    <TableCell>Package</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Del</TableCell>
                  </TableRow>
                </TableHead>
                {packages && packages.map((pk, i) => (
                  <TableBody key={pk && pk._id} sx={p.body}>
                    <TableRow>
                      <TableCell align="left">{i+1}</TableCell>
                      <TableCell align="left">{pk && pk.packageType}</TableCell>
                      <TableCell align="left">{pk && pk.amount}</TableCell>
                      <TableCell align="left" sx={{cursor:'pointer'}}>
                        <DeleteIcon sx={{ color: '#ff6666' }}
                          onClick={()=>deletePackage(pk && pk._id)}
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

export default PackagePage