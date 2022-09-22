import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Header from "../../components/headerComp/Header";


const admin = {
  header: {
    width: '100%',
    height: '7rem',
    bgcolor: 'rgba(0, 0, 0, 0.9)',
  }
}

const AdminReferPayouts = () => {

  const loginReducer = useSelector((state) => state.loginReducer);
  const { acilDetails } = loginReducer;

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
    {label: "Profile", link:`/profile`, acilDetails: !acilDetails},
  ]

  return (
    <Box sx={{ minHeight: '85vh' }}>
      <Grid item container direction='column' sx={admin}>
        <Grid item xs={12} >
          <Box sx={admin.header}>
            <Header labels={labels} labels1={labels1} />
          </Box>
          <h1>Ref Payouts</h1>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminReferPayouts;