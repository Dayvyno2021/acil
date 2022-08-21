import Box from '@mui/material/Box';
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <Box className="App">
      <h1>APP SETTINGS</h1>
      <Routes>
        <Route path="/" element={<div>GOOD</div>} />
      </Routes>
    </Box>
  );
}

export default App;
