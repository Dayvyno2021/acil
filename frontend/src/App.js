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


function App() {
  return (
    <Box className="App">
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/invest" element={<Invest/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/howitworks" element={<h1>HOW it works</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/payment/:id" element={<Payment/>} />
        <Route path="/invest/:id" element={<Product/>} />
        <Route path="/investment/:id" element={<Investment/>} />
        <Route path="/downline/:id" element={<Downline/>} />
        <Route path="/contactus" element={<h1>Contact Us</h1>} />
      </Routes>
      <Footer/>
    </Box>
  );
}

export default App;
