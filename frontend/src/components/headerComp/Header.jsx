import React, { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ListItem from '@mui/material/ListItem';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {head} from './headerUI';
// import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from '../Theme';
import Nav from '../navbutton/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../actions/userActions';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styleMenu } from './headerUI';

const Header = ({labels, labels1}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { acilDetails } = loginReducer;

  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const [value, setValue] = useState(0);
  const [anchor, setAnchor] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = () => {
    setAnchor(!anchor);
  }



  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setValue(0);
        break;
      case `/about`:
        setValue(1);
        break;
      case `/invest`:
        setValue(2);
        break;
      case '/contactus':
        setValue(3)
        break;
      case '/profile': 
        setValue(4);
        break;
      case '/admin/investors':
        setValue(8);
        break;
      case '/admin/products':
        setValue(9);
        break;
      case'/admin/investments':
        setValue(10);
        break;
      case '/admin/ref-payouts' :
        setValue(11);
        break;
      case '/admin/packages' :
        setValue(12);
        break;
      default:
        setValue(0);
        break;
    }
  }, [location])

    const handleAnchorLogoutTab = (label) => {
      if (label && label.label === 'Logout') {
        dispatch(logoutAction())
      }
  }
  
  const tabs = (
    <Box sx={{display: 'flex', direction:'row'}}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
        textColor="primary" sx={head.tabs} indicatorColor='primary' className='tabs'
      >
        {
          labels && labels.map((label, i) => (
            <Tab label={label.label} key={`label${i}`} value={i}
            sx={{display: label && label.acilDetails? 'none':'inline-block' }}
            component='a' href={label.link} className={`tab${i}`} 
            onClick={()=>handleAnchorLogoutTab(label)}
            />
            ))
          }
      </Tabs>
      {
        acilDetails && acilDetails.isAdmin &&
      <Button variant='contained'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={head.menuBtn}
      >
        Admin
      </Button>
      }
      {/*This can be any where*/}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          onMouseLeave: handleClose
        }}
        sx={styleMenu}
      >
        <MenuItem onClick={handleClose} component={Link} to='/admin/investors'>
          Investors
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/admin/products'>
          Products
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/admin/investments'>
          Investments
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/admin/ref-payouts'>
          Ref. Payouts
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/admin/packages'>
          Packages
        </MenuItem>
      </Menu>
    </Box>
  )

  const handleAnchorLogout = () => {
    setAnchor(false);
    dispatch(logoutAction())
    
  }

  const small = (
    <Box onClick={()=>toggleDrawer()}>
      {anchor? <CloseIcon sx={head.menu}/> : <Nav/>}
            {/* This Drawer can be anywhere */}
      <SwipeableDrawer
        anchor='left'
        open={anchor}
        onClose={() => setAnchor(false)}
        onOpen={() => setAnchor(true)}
        sx={head.drawer}
      >
        <List>
          {
            labels1 && labels1.map((label, i) => (
              <ListItem key={`label2${i}`} component={Link} to={label.link}
                 selected={i===value} className={`tab${i}`}
                sx={{ display: label && label.acilDetails ? 'none' : 'inline-block' }}
              >
                {label.label}
              </ListItem>
            ))
          }
          {acilDetails && acilDetails.isAdmin &&
            <>
            <ListItem component={Link} to='/admin/investors' selected={value===8}>
              Investors
            </ListItem>
            <ListItem component={Link} to='/admin/products' selected={value===9}>
              Products
            </ListItem>
            <ListItem component={Link} to='/admin/investments' selected={value===10}>
              Investments
            </ListItem>
            <ListItem component={Link} to='/admin/ref-payouts' selected={value===11}>
              Ref. Payouts
            </ListItem>
            <ListItem component={Link} to='/admin/packages' selected={value===12}>
              Packages
            </ListItem>
            </>
          }

          {!acilDetails &&
            <>
              <ListItem component={Link} to='/login'>Login</ListItem>      
              <ListItem  component={Link} to='/register'>Register</ListItem>      
            </>
          }

          {acilDetails && acilDetails.id &&
            <ListItem component={Link} to='/' onClick={handleAnchorLogout}>
              Logout
            </ListItem>      
          }
        </List>
      </SwipeableDrawer>
    </Box>
  )
  return (
    <Box sx={head}>
      <Grid container sx={head.tabCover}  alignItems='center'>
        <Grid item md={2} sx={head.logo} to='/' component={Link}> 
          <img src="/image/logo.png" alt=""/>
        </Grid>
        <Grid item md={10} container justifyContent='end'>
          {
            matches ? 
              small
              :
              tabs
          }

        </Grid>
      </Grid>
    </Box>
  )
}

export default memo(Header);