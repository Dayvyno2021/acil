import React, { useState, useEffect } from 'react';
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
import Nav from '../navbutton/Nav'

const Header = ({labels}) => {
  const location = useLocation();

  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const [value, setValue] = useState(0);
  const [anchor, setAnchor] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = () => {
    setAnchor(!anchor);
  }

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setValue(0);
        break;
      case `/about`:
        setValue(1);
        break;
      case `/review`:
        setValue(2);
        break;
      case '/howitworks':
        setValue(3)
        break;
      case '/contactus': 
        setValue(4);
        break;
      default:
        setValue(0);
        break;
    }
  }, [location])
  
  const tabs = (
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
      textColor="primary" sx={head.tabs} indicatorColor='primary' className='tabs'
    >
      {
        labels.map((label, i) => (
          <Tab label={label.label} key={`label${i}`} value={i} sx={head.tab}
            component='a' href={label.link} className={`tab${i}`}
          />
        ))
      }
    </Tabs>
  )

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
            labels.map((label, i) => (
              <ListItem key={`label2${i}`} component={Link} to={label.link}
                onClick={()=>setAnchor(false)} selected={i===value} className={`tab${i}`}
              >
                {label.label}
              </ListItem>
            ))
          }
        </List>   
      </SwipeableDrawer>
    </Box>
  )

  return (
    <Box sx={head}>
      <Grid container sx={head.tabCover} justifyContent='space-between' alignItems='center'>
        <Grid item md={3} sx={head.logo} to='/' component={Link}> 
          <img src="/image/logo.png" alt=""/>
        </Grid>
        <Grid item md={9}>
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

export default Header