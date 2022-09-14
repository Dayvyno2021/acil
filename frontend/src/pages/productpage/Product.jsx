import React, {useEffect, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
// import queryString from 'query-string';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { prod } from './productUI';
import { useDispatch, useSelector } from 'react-redux';
import { singleProductAction } from '../../actions/productActions';
import Progress from '../../components/Progress';
import SnackBar from '../../components/Snackbar';
import { choosePackageAction } from '../../actions/packageActions';
import { theme } from '../../components/Theme';

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [item, setItem ] = useState({});
  const [dd, setDd] = useState('');

  const singleProductReducer = useSelector(state => state.singleProductReducer);
  const {loading, product, error} = singleProductReducer

  const packs = [
    {package: 'Bronze', amount:'50,000', selected: false},
    {package: 'Silver', amount:'500,000', selected: false},
    {package: 'Gold', amount:'800,000', selected: false},
    {package: 'Platinum', amount:'1,000,000', selected: false},
    {package: 'Diamond', amount:'3,000,000', selected: false},
    {package: 'Agro King', amount:'5,000,000', selected: false},
  ]

  const params = useParams();

  const investmentType = (type, id) => {
    dispatch(choosePackageAction(type, id));
    navigate('/payment')
  }

  const selectItem = (type, id, items) => {
    setItem(type);
    setDd(id);
    items.map((item) => item.selected = false);
    type.selected = true;
  }
  
  useEffect(() => {
    if (!product || (product._id !== params.id)) {
      dispatch(singleProductAction(params.id))
    }
  },[dispatch, params, product])

  return (
    <Box>
      {loading && <Progress />}
      {error && <SnackBar message={error}/>}
      <Grid container direction='column' sx={prod}>
        <Grid item container justifyContent='space-between' sx={prod.direct}>
          <Box component={Link} to='/invest'>
            <ArrowBackIcon sx={{color: '#000000'}} />
          </Box>
          <Typography variant='h1' align='center'>{product.name}</Typography>
          <Box component={Link} to='/notification'>
            <NotificationsIcon sx={{color: '#000000'}} />
          </Box>
        </Grid>
        <Grid item container justifyContent='center' sx={{mb:'2rem'}} >
          <Grid item container xs={8} sm={5} md={3}>
            <Box component='img' src={product.img} width='100%'/>
          </Grid>
        </Grid>
        <Typography variant='h4' align='center'>Choose Package</Typography>
        <Grid item container sx={prod.packages}>
          {
            packs && packs.map((pack) => (
              <Grid item container direction='column' key={`${pack.package}`}
                sx={{
                  backgroundColor: pack.selected ? theme.palette.primary.main : null,
                }}
                xs={6} md={4} className="portion"
                onClick={() => {selectItem(pack, params.id, packs)}}
              >
                <Box sx={{fontSize:'1.8rem', fontWeight: '500'}}>&#8358;{pack.amount}</Box>
                <Typography variant='body1' sx={{fontSize: '1.8rem', fontWeight:'500'}}>
                  {pack.package}
                </Typography>
              </Grid>
            ))
          }
          <Grid item container sx={prod.proceed} justifyContent='center'>
            <Button variant='contained' 
              onClick={() => investmentType(item, dd)}
            >
              Proceed To Payment
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Product