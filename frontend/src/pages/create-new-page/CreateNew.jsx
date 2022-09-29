import Box from "@mui/system/Box";
import { create } from "./createNewUI";
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from "@mui/material/Grid";
import { Link, useNavigate} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createProductAction } from "../../actions/productActions";
// import { theme } from '../../components/Theme';
import Progress from '../../components/Progress';
import SnackBar from '../../components/Snackbar';
import { RESET_CREATE_PRODUCT } from "../../constants/productConstants";


const CreateNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [ROI, setROI] = useState('');
  const [maturity, setMaturity] = useState('');
  const [imgPath, setImgPath] = useState('')

  const [show, setShow] = useState(false)

  const createProductReducer = useSelector(state => state.createProductReducer);
  const { loading, success, error } = createProductReducer;

  const loginReducer = useSelector((state) => state.loginReducer);
  const { acilDetails } = loginReducer;

  const disableSubmit = () => {
    if (!name || !ROI || !maturity || !imgPath) return true
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProductAction({name, ROI, maturity, imgPath}))
    // console.log({name, ROI, maturity, imgPath})
  }

  useEffect(() => {
    if (acilDetails && acilDetails.isAdmin === true) {
      if (success) {
        setShow(true);
        setName('');
        setImgPath('');
        setMaturity('');
        setROI('');
        dispatch({ type: RESET_CREATE_PRODUCT });
        navigate('/admin/products')
      }
    } else {
      navigate('/')
    }
  }, [dispatch, success, navigate, acilDetails])


  return (
    <Box sx={{ minHeight: '85vh' }}>
      {loading && <Progress />}
      {error && <SnackBar message={error} />}
      {show && <SnackBar severity='success' message='Successful'/>}
      <Grid sx={create} container>
        <Grid md={6} item sx={create.register} container direction='column'>
          <Grid item sx={create.register1} justifyContent='center' container>
            <Box component={Link} to='/'>
              <Box component='img' src='/image/logo.png'/> 
            </Box>
          </Grid>
          <Grid item sx={create.heading} justifyContent='center' container>
            <Typography variant="h1">
              Create New Product
            </Typography>
          </Grid>
          <Grid item container direction='column' sx={create.register2} component='form'
            onSubmit={handleSubmit}
          >
            <Grid item container direction='row' >
              <Grid item container xs={12}>
                <TextField variant="outlined" type='text' id='name'
                  label="Product name " autoComplete='true' value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid item container direction='row' >
              <Grid item container xs={12}>
                <TextField variant="outlined" type='number' name='ROI' id='ROI' 
                  label="ROI" autoComplete='true' value={ROI}
                  onChange = {(e)=>setROI(e.target.value)} 
                  />
              </Grid>
            </Grid>

            <Grid item container alignItems='center'>
              <Grid item container xs={12}>
                <TextField variant="outlined" type='number' name='maturity' id='maturity'
                  label="Maturity" autoComplete='true' value={maturity}
                  onChange={(e)=>setMaturity(e.target.value)} 
                />   
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container xs={12}>
                <TextField variant="outlined" type='text' name='img' id='img'
                  label="Img Path" autoComplete='true' value={imgPath}
                  onChange={(e)=>setImgPath(e.target.value)} 
                />
              </Grid>
            </Grid>
            <Grid item container sx={{ mb: '1rem' }} >
              <Grid item container direction='column' xs={12}>
                <Button variant='contained' sx={create.btn} type='submit'
                  disabled = {disableSubmit()}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid md={6} item sx={create.image}>
          <Box component='img' src='/image/login.jpg'/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateNew