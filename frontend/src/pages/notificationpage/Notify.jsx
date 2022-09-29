import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import DeleteIcon from '@mui/icons-material/Delete';
import { theme } from '../../components/Theme';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Progress from '../../components/Progress';
import SnackBar from '../../components/Snackbar';
import { deleteNotificationAction } from '../../actions/userActions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const nt = {
  minHeight: '85vh',
  backgroundImage: `linear-gradient(to bottom, #000, ${theme.palette.primary.light})`,
  icon: {
    color: '#FF6666',
    cursor: 'pointer'
  },
  mess: {
    pl: '10rem',
    mb: '5rem',
    [theme.breakpoints.down('sm')]: {
      pl: '2rem'
    }
  },
  body: {
    pl: '10rem',
    mb: '2rem',
    [theme.breakpoints.down('sm')]: {
      px: '1rem'
    }
  }
}

const Notify = () => {
  const dispatch = useDispatch();

  const deleteNotificationReducer = useSelector((state) => state.deleteNotificationReducer);
  const { loading, success, error } = deleteNotificationReducer;

  const delNotif = (id) => {
    dispatch(deleteNotificationAction(id))
  }

  const loginReducer = useSelector((state) => state.loginReducer);
  const { acilDetails: { notification } } = loginReducer;

  useEffect(() => {
    
  }, [success])

  return (
    <Box sx={nt}>
      {loading && <Progress />}
      {error && <SnackBar message={error} />}
      <Grid container justifyContent='center' sx={{pt:'1rem'}}>
        <Grid item container direction='column'  >
          <Grid item component={Link} to={`/invest`} sx={nt.mess}>
            <ArrowBackIcon  sx={{color:'#FFF'}} />
          </Grid>
          {notification && notification.length > 0? 
          (notification && notification.map((notice) => (
            <Grid item container key={notice && notice._id} sx={nt.body} >
              <Grid item container xs={12} md={11} >
                <Brightness1Icon sx={{color: theme.palette.secondary.dark, mr: '1rem'}} />
                <Typography  variant='body1' sx={{mr: 'auto', color: '#FFF'}}>
                  {notice && notice.notice}
                </Typography>
              </Grid>
              <Grid item xs={12} md={1} justifyContent='end' container>
                <DeleteIcon sx={nt.icon} onClick={()=>delNotif(notice && notice._id)} />
              </Grid>
            </Grid>
          ))) : (
              <Typography color='#FF6666'>==={'>'}No notifications yet</Typography>
          )
}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Notify