import Box from '@mui/material/Box';
import { Routes, Route } from "react-router-dom";
import Header from './components/headerComp/Header';
import Homepage from './pages/homepage/Homepage';

function App() {
  return (
    <Box className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/about" element={<h1>ABout Us</h1>} />
        <Route path="/review" element={<h1>Review</h1>} />
        <Route path="/howitworks" element={<h1>HOW it works</h1>} />
        <Route path="/contactus" element={<h1>Contact Us</h1>} />
      </Routes>
    </Box>
  );
}

export default App;
