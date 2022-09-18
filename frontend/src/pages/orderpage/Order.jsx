import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import { ord } from "./orderUI";
import Progress from "../../components/Progress";
import SnackBar from "../../components/Snackbar";
import { useParams } from "react-router-dom";
import { getOrderAction } from "../../actions/orderActions";

const Order = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const getOrderReducer = useSelector((state) => state.getOrderReducer);

  const { loading, order, success, error } = getOrderReducer;

  useEffect(() => {
    if (!success) {
      dispatch(getOrderAction(params.id))
    }
  }, [dispatch, success, params])
  


  return (
    <Box>
      {loading && <Progress />}
      {error && <SnackBar message={error}/>}
      <Grid container sx={ord} direction='column' alignItems='center'>
        <Grid item container xs={10} md={6}>
          <p>{JSON.stringify(order, null, 4)} </p>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Order;