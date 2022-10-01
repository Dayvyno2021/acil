import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search'
import { theme } from '../Theme';
import InputLabel from '@mui/material/InputLabel';
import { useState, memo } from 'react';

const form = {
  px: '2rem',
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiInputBase-root': {
  },
  '& .MuiInputBase-input': {
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.common.lemon1,
    }
  },
  icon: {
    color: theme.palette.primary.main,
    border: '2px solid #808080',
    borderRadius: '5px',
    fontSize: '2rem',
    cursor: 'pointer'
  },
  '& .MuiTextField-root': {
    width: '100%',
    pr: '0.5rem',
    [theme.breakpoints.down('md')]: {
      pr: '0',
      mb:'0.5rem'
    }
  },
  hidden: {
    display: 'none'
  }
}


const Search = () => {
  const navigate = useNavigate();
  
  const [orderID, setOrderID] = useState('');
  const [username, setUsername] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    // console.log({username, product, date1, date2})
    navigate(`/admin/investments/?id=${orderID}&username=${username}&start1=${date1}&end=${date2}`);

  }

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={form} component='form' onSubmit={onSearch} >
        <Grid container justifyContent='center' alignItems='end'>
          <Grid item xs={10} md={11}  container sx={{display: 'none'}}>
            <InputLabel htmlFor='order_id'>Order ID</InputLabel>
            <TextField type='search' id='order_id' size='small' sx={{ width: '90%' }}
              value= {orderID} onChange={(e)=>setOrderID(e.target.value)}
            />
          </Grid>
          <Grid item xs={10}  md={2.7} container >
            <InputLabel htmlFor='product'>Username</InputLabel>
            <TextField type='search' id='product' size='small'
              value={username} onChange={(e)=>setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={10} md={2.7} container sx={{display: 'none'}}>
            <InputLabel htmlFor='date-start'>Start Date</InputLabel>
            <TextField type='date' id='date-start' size='small'
              value={date1} onChange={e=>setDate1(e.target.value)}
            />
          </Grid>
          <Grid item xs={10} md={2.7} container sx={{display: 'none'}}>
            <InputLabel htmlFor='date-end'>Date End</InputLabel>
            <TextField type='date' id='date-end' size='small'
              value={date2} onChange = {e=>setDate2(e.target.value)}
            />
          </Grid>

          <Grid item container xs={2} md={1} justifyContent='end'>
            <Button type='submit'>
              <SearchIcon sx={form.icon} />
            </Button>
          </Grid>

        </Grid>
      </Box>
    </Box>
  )
}

export default memo(Search);