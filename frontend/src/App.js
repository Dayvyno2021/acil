import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Homepage from './pages/homepage/Homepage';
import Box from '@mui/material/Box';
import About from "./pages/aboutpage/About";
import Invest from "./pages/investpage/Invest";
import Register from "./pages/registerpage/Register";
import Login from "./pages/loginpage/Login";
import Product from "./pages/productpage/Product";
import Payment from "./pages/paymentpage/Payment";
import Investment from "./pages/investmentpage/Investment";
import Downline from "./pages/downlinepage/Downline";
import Order from "./pages/orderpage/Order";
import Profile from "./pages/profile/Profile";
import Referral from "./pages/referralpage/Referral";
import AdminInvestors from "./pages/admininvestotor/AdminInvestors";
import AdminInvestments from "./pages/admininvestments/AdminInvestments";
import AdminReferPayouts from "./pages/adminreferpayout/AdminReferPayouts";
import AdminProducts from "./pages/adminproducts/AdminProducts";
import UpdateUser from "./pages/updateuser/UpdateUser";
import AdminEditUser from "./pages/admin-edit-user/AdminEditUser";
import CreateNew from "./pages/create-new-page/CreateNew";
import UpdateSingleProduct from "./pages/update-product-page/UpdateProduct";


function App() {
  return (
    <Box className="App">
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/invest" element={<Invest/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/payment/:id" element={<Payment/>} />
        <Route path="/order/:id" element={<Order/>} />
        <Route path="/invest/:id" element={<Product/>} />
        <Route path="/profile/" element={<Profile/>} />
        <Route path="/investment/:id" element={<Investment/>} />
        <Route path="/downline/:id" element={<Downline/>} />
        <Route path="/referral/:id" element={<Referral/>} />
        <Route path="/admin/investors" element={<AdminInvestors/>} />
        <Route path="/admin/products" element={<AdminProducts/>} />
        <Route path="/contactus" element={<h1>Contact Us</h1>} />
        <Route path="/admin/investments" element={<AdminInvestments/>} />
        <Route path="/admin/ref-payouts" element={<AdminReferPayouts/>} />
        <Route path="/update-profile" element={<UpdateUser/>} />
        <Route path="/update-profile/:id" element={<AdminEditUser/>} />
        <Route path="/create-new-product" element={<CreateNew/>} />
        <Route path="/update-product/:id" element={<UpdateSingleProduct/>} />
      </Routes>
      <Footer/>
    </Box>
  );
}

export default App;
