// import { useEffect } from 'react';
import { memo } from 'react';
import Box from '@mui/material/Box';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const notee = {
  cursor: 'pointer',
  position: 'relative',
  right: '1.5rem',
  top: '-1rem',
  '&>h2': {
    color: '#FF3333',
    fontSize: '0.9rem',
    position: 'absolute',
    left: '0',
    top: '0'
  },
  '& svg': {
    position: 'absolute',
    left: '0',
    top: '0'
  }
}

const Notification = () => {

  const loginReducer = useSelector(state => state.loginReducer);
  const { acilDetails: { notification } } = loginReducer;

  return (
    <Box>
      <Grid item container justifyContent='center' sx={notee} component={Link} to='/notify'>
        <NotificationsIcon sx={{color: '#808080', fontSize:'2rem'}} />
        <Typography variant='h2'>
          {notification && notification.length > 0? notification.length : ''}
        </Typography>
      </Grid>
    </Box>
  )
}

export default memo(Notification);