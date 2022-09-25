import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { theme } from './Theme';

const pro = {
  position: 'absolute',
  backgroundColor: 'rgba(0,0,0,0.5)',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const Progress = () => {
  return (
    <Box sx={pro}>
      <CircularProgress sx={{color: theme.palette.primary.main}} />
    </Box>
  )
}

export default Progress