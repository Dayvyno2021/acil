import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductAction, getProductsAction } from "../../actions/productActions";
import Header from "../../components/headerComp/Header";
import Progress from "../../components/Progress";
import SnackBar from "../../components/Snackbar";


import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
// import { theme } from "../../components/Theme";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { adminP } from "./adminProductsUI";



const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { acilDetails } = loginReducer;

  const getProductsReducer = useSelector(state => state.getProductsReducer);
  const { loading, products, error } = getProductsReducer;
  
  const deleteProductReducer = useSelector((state) => state.deleteProductReducer);
  const { loading: loadingD, success, error: errorD } = deleteProductReducer;

  const labels = [
    {label: 'Home', link:'/', acilDetails: false},
    { label:"About", link: '/about', acilDetails: false},
    { label:"Invest", link: "/invest", acilDetails: false},
    { label: "Contact Us", link: "#contactus", acilDetails: false },
    {label: "Register", link:"/register", acilDetails: acilDetails},
    {label: "Profile", link:`/profile`, acilDetails: !acilDetails},
    {label: "Login", link:"/login", acilDetails: acilDetails},
    { label: "Logout", link: "/", acilDetails: !acilDetails },
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

  const editProduct = (id) => {
    navigate(`/update-product/${id}`)
  }

  const deleteProduct = (id) => {
    if (window.confirm("Do you want to delete products?")) {
      dispatch(deleteProductAction(id))
    }
  }

  const getDate = (time) => {
    const d = new Date(time);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${day}-${month}-${year}`
  }

  const handleNew = () => {
    navigate('/create-new-product')
  }

  useEffect(() => {
    if (acilDetails && acilDetails.isAdmin === true) {
      dispatch(getProductsAction());
    } else {
      navigate('/')
    }
  }, [dispatch, success, navigate, acilDetails])

  return (
    <Box sx={{ minHeight: '85vh' }}>
      {(loading || loadingD) && <Progress />}
      {(error || errorD) && <SnackBar message={error || errorD}/>}
          <Grid item container direction='column' sx={adminP}>
        <Grid item xs={12} >
          <Box sx={adminP.header}>
            <Header labels={labels} labels1={labels1} />
          </Box>
        </Grid>
        <Grid item xs={12} container justifyContent='center' sx={adminP.heading}>
          <Typography variant="h1">All Products</Typography>
        </Grid>
        <Grid item container justifyContent='center' direction='column' sx={adminP.mainTable}>
          <Grid item container justifyContent={'flex-end'}>
            <Button variant='contained' sx={adminP.create} onClick={handleNew}>
              new <AddIcon/>
            </Button>
          </Grid>
          
          <Box sx={adminP.table}>
            <TableContainer component={Paper}>
              <Table sx={{width:'100%'}}>
                <TableHead sx={{bgcolor: '#000000'}}>
                  <TableRow >
                    <TableCell>Products</TableCell>
                    <TableCell align="left">ROI(%)</TableCell>
                    <TableCell align="left">Maturity(Days)</TableCell>
                    <TableCell align="left">Created</TableCell>
                    <TableCell align="left">Updated</TableCell>
                    <TableCell align="left">Edit</TableCell>
                    <TableCell align="left">Del</TableCell>
                  </TableRow>
                </TableHead>
                {products && products.map((product) => (
                  <TableBody key={product && product._id} sx={adminP.body}>
                    <TableRow>
                      <TableCell align="left">{product && product.name}</TableCell>
                      <TableCell align="left">{product && product.ROI}</TableCell>
                      <TableCell align="left">{product && product.maturity}</TableCell>
                      <TableCell align="left">
                        {getDate(product && product.createdAt)}
                      </TableCell>
                      <TableCell align="left">
                        {getDate(product && product.updatedAt)} 
                      </TableCell>
                      <TableCell align="left" sx={{cursor:'pointer'}}>
                        <EditIcon sx={{ color: '#808080' }}
                          onClick={() => editProduct(product && product._id)}
                        />
                      </TableCell>
                      <TableCell align="left" sx={{cursor:'pointer'}}>
                        <DeleteIcon sx={{ color: '#FF6666' }}
                          onClick={()=>deleteProduct(product && product._id)}
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

export default AdminProducts;