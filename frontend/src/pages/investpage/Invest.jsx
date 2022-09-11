import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link, useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CloseIcon from '@mui/icons-material/Close';
import { invest } from './investUI';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';

const products = [
  { name: "Cocoa Seeds", img:'/image/cocoa.jpg', ROI: 30, maturity: 2 },
  { name: "Cashew Nuts", img:'/image/cashew.jpg', ROI: 30, maturity: 2 },
  { name: "Ginger", img:'/image/ginger.jpg', ROI: 30, maturity: 2 },
  { name: "Soya Bean",img:'/image/soyabeans.jpg', ROI: 30, maturity: 2 },
  { name: "Soya Beans Oil", img:'/image/soyabeansoil.jpg', ROI: 30, maturity: 2 },
  { name: "Sesame Seed",img:'/image/sesame.jpg', ROI: 30, Mmturity: 2 },
  { name: "Bitter Kola", img: '/image/bitterkola.jpg', ROI: 30, maturity: 2 },
  {name: "Kola Nuts", img:'/image/kolanut.jpg', ROI: 30, maturity: 2}
]

const Invest = () => {
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const investment = () => {
    handleClose();
    navigate('/investment/id');
  }

  const downline = () => {
    handleClose();
    navigate('/downline/id');
  }

  return (
    <Box>
      <Grid container direction='column' sx={invest}>
        <Grid item sx={invest.logos} container justifyContent='space-between' alignItems='center'>
          <Box component={Link} to='/'>
            <Box component='img' src='/image/logo.png' />
          </Box>
          <NotificationsIcon fontSize='large' />
        </Grid>
        <Grid item sx={invest.actions} container justifyContent='space-between'>
          <Grid item >
            <CardGiftcardIcon sx={{mx:'auto', display:'block'}} fontSize='large' />
            <Typography variant='body1'>Guide</Typography>
          </Grid>
          <Grid item >
            <EmailIcon sx={{mx:'auto', display:'block'}} fontSize='large'  />
            <Typography variant='body1'>Invite</Typography>
          </Grid>
          <Grid item onClick={handleOpen}>
            <AccountBoxIcon sx={{mx:'auto', display:'block'}} fontSize='large' />
            <Typography variant='body1'>
              Profile
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={invest.items} container>
          {
            products.map((product)=>(
              <Grid item xs={5.8} md={3.8} key={`${product.name}`}>
                <Box component={Link} to={`/invest/${product.name}/?image=${product.img}`}>
                  <Box component='img' src={product.img} alt={product.name} />
                </Box>
                <Typography variant='body1'>{product.name}</Typography>
                <Typography variant='body1'>ROI:{product.ROI}%</Typography>
                <Typography variant='body1'>Maturity: {product.maturity} Months </Typography>
              </Grid>
            ))
          }
          {/* <Grid item sm={3.8}></Grid> */}
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={invest.style}>
          <Grid container justifyContent='center' sx={{ position: 'relative' }}>
            <CloseIcon onClick={handleClose} className='close'/>
            <Avatar>
              {'U'}
            </Avatar>
          </Grid>
          <Typography align='center' variant="h6" component="h2">
            User Name
          </Typography>
          <Typography align='center' sx={{ mt: 2 }}>
            Invitation Code: 
          </Typography>
          <Grid container justifyContent='space-between' className='cl4'>
            <Typography onClick={investment}>
              Investments
            </Typography>
            <Typography onClick={downline} >Downline</Typography>
          </Grid>
          <Grid container justifyContent='space-between' className='cl5'>
            <Typography>Payout</Typography>
            <Typography>&#8358;999,999</Typography>
          </Grid>
        </Box>
      </Modal>
    </Box>
  )
}

export default Invest;