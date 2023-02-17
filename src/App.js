
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { Box } from '@mui/material';

import Home from './Pages/Home';

export default function App() {

  return (
    <HashRouter>
      <Box className="min-h-screen" onContextMenu={(e) => e.preventDefault()}
        sx={{background: "linear-gradient(225.43deg, #5C6AE1 -191.21%, rgba(92, 106, 225, 0) 68.75%), #0B0E27;"}}>
        <Routes>
          <Route path="home" exact element={<Home />} />

          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Box>
    </HashRouter>
  );
}