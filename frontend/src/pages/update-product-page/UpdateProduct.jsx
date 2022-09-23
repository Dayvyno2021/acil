import Box from "@mui/system/Box";
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from "@mui/material/Grid";
import { Link, useNavigate, useParams} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { theme } from '../../components/Theme';
import Progress from '../../components/Progress';
import SnackBar from '../../components/Snackbar';
import { updateUI } from "./updateProductUI";
import { RESET_UPDATE_PRODUCT } from "../../constants/productConstants";
import { singleProductAction, updateProductAction } from "../../actions/productActions";


const UpdateSingleProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const singleProductReducer = useSelector((state) => state.singleProductReducer);
  const { loading, product, error, success: successP } = singleProductReducer;


  const [name, setName] = useState('');
  const [ROI, setROI] = useState('');
  const [maturity, setMaturity] = useState('');

  const disableSubmit = () => {
    if (!name || !ROI || !maturity) return true
  }

  const updateProductReducer = useSelector((state) => state.updateProductReducer);
  const { loading: loadingU, success, error: errorU } = updateProductReducer;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAction({ name, ROI, maturity, id: params.id }));
  }

  useEffect(() => {
    if (!successP || (product && product._id !== params.id)) {
      dispatch(singleProductAction(params.id));
    } else {
      setName(product && product.name);
      setMaturity(product && product.maturity);
      setROI(product && product.ROI);
      if (success) {
        dispatch({type: RESET_UPDATE_PRODUCT})
        navigate('/admin/products')
      } 
    }
    

  }, [dispatch, success, navigate, params, product, successP])

  return (
    <Box sx={{ minHeight: '85vh' }}>
      {(loading || loadingU) && <Progress />}
      {(error || errorU) && <SnackBar message={error || errorU} />}
      <Grid sx={updateUI} container>
        <Grid md={6} item sx={updateUI.register} container direction='column'>
          <Grid item sx={updateUI.register1} justifyContent='center' container>
            <Box component={Link} to='/'>
              <Box component='img' src='/image/logo.png'/> 
            </Box>
          </Grid>
          <Grid item sx={updateUI.heading} justifyContent='center' container>
            <Typography variant="h1">
              Create New Product
            </Typography>
          </Grid>
          <Grid item container direction='column' sx={updateUI.register2} component='form'
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

            <Grid item container sx={{ mb: '1rem' }} >
              <Grid item container direction='column' xs={12}>
                <Button variant='contained' sx={updateUI.btn} type='submit'
                  disabled = {disableSubmit()}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid md={6} item sx={updateUI.image}>
          <Box component='img' src='/image/login.jpg'/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UpdateSingleProduct