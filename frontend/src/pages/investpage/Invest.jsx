import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link} from 'react-router-dom';
import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
// import CloseIcon from '@mui/icons-material/Close';
import { invest } from './investUI';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction } from '../../actions/productActions';
import Progress from '../../components/Progress';
import SnackBar from '../../components/Snackbar';
import Notification from '../../components/notification/Notification';
// import { theme } from '../../components/Theme';

const Invest = () => {
  const dispatch = useDispatch();

  const getProductsReducer = useSelector((state) => state.getProductsReducer);
  const {loading, products, error} = getProductsReducer;

  const loginReducer = useSelector(state => state.loginReducer);
  const { acilDetails } = loginReducer;

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch])
  
  // <Avatar alt='name' src='/profile-image'/>

  return (
    <Box sx={{minHeight: '85vh'}}>
      {loading && <Progress />}
      {error && <SnackBar message={JSON.stringify(error)}/>}
      <Grid container direction='column' sx={invest}>
        <Grid item sx={invest.logos} container justifyContent='space-between' alignItems='center'>
          <Box component={Link} to='/'>
            <Box component='img' src='/image/logo.png' />
          </Box>
          {
            acilDetails && acilDetails && <Notification/>
          }
          
          {/* <NotificationsIcon fontSize='large' /> */}
        </Grid>
        <Grid item sx={invest.actions} container
          justifyContent={acilDetails && acilDetails.id? 'space-between': 'center'}
        >
          <Grid item >
            <CardGiftcardIcon sx={{mx:'auto', display:'block'}} fontSize='large' />
            <Typography variant='body1'>Guide</Typography>
          </Grid>
          {
          acilDetails && (
          <Grid item component={Link} to={`/referral/${acilDetails && acilDetails.refCode}`} >
            <EmailIcon sx={{mx:'auto', display:'block'}} fontSize='large'  />
            <Typography variant='body1'>Invite</Typography>
          </Grid>
          )
          }
          {
            acilDetails && (
            <Grid item component={Link} to={`/profile`}>
              <AccountBoxIcon sx={{mx:'auto', display:'block'}} fontSize='large' />
              <Typography variant='body1'>
                Profile
              </Typography>
            </Grid>
            )
          }
        </Grid>
        <Grid item sx={invest.items} container>
          {
            products && products.map((product)=>(
              <Grid item xs={5.8} md={3.8} key={`${product && product.name}`} >
                <Box component={Link} to={`/invest/${product && product._id}`}>
                  <Box component='img' src={product && product.img} alt={product && product.name} />
                </Box>
                <Typography variant='body1'>{product && product.name}</Typography>
                <Typography variant='body1'>ROI:{product && product.ROI}%</Typography>
                <Typography variant='body1'>Maturity: {product && product.maturity} Days </Typography>
              </Grid>
            ))
          }
          {/* <Grid item sm={3.8}></Grid> */}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Invest;