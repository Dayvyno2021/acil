import React, {useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({message, severity}) => {

  const [alert, setAlert] = useState(true)


  const handleClose = () => {
    setAlert(false);
  };
  
  return (
    <Stack spacing={2} sx={{ width: '100%', zIndex:2000 }}>
      <Snackbar 
        open={alert} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      
    </Stack>
  )
}

SnackBar.defaultProps = {
  severity: 'error'
}

export default SnackBar