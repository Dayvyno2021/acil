import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { theme } from '../../components/Theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { home } from "./homepageUI";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Homepage = () => {
  const matchSM = useMediaQuery(theme.breakpoints.down('md'));

  return (

    <Box sx={home}>
      <Grid container  >
        <Grid item container direction='column'>
          <Grid item container sx={home.main}>
            <Grid item>
              <Typography variant='h1' sx={home.invest}>
                Invest in {matchSM? <br/>: ''} Agro Capital
              </Typography>
              <Typography variant='body1' sx={home.make}>
                Make passive income through investments and referral bonuses
              </Typography>
                <Stack direction="row" spacing={4} sx={home.buttons}>
                  <Button variant='contained' sx={home.buttonInv}>
                    Invest
                  </Button>
                  <Button variant="outlined"  sx={home.buttonMore} >
                    Learn More
                  </Button>
                </Stack>
            </Grid>
          </Grid>
          {/* Who section */}
          <Grid item sx={home.who} container>
            <Grid item md={6} sx={home.who1Cover}>
              <Box sx={home.who1}>
                <Box component='div'></Box>
                <Box component='img' src="/image/who.svg" ></Box>
              </Box>
            </Grid>
            <Grid item md={6} sx={home.who2}>
              <Typography variant='h2' >
                Who We Are
              </Typography>
              <Typography variant='body1' >
                We are a company that deals in the business of exporting agro products.
                <br/><br/>
                We
                engage farmers at different production levels of different agric products
                through the help of our agents with common interests, who get the product
                from them, gather in our different ware houses and storage facilities,
                then export to our exporting partners in Asia and part of Europe. <br />
                <br/>
                We also provide financial assistance in form of agricloans to snallholder
                farmer operations for purchasing agricultural machines which boost
                production, job creation, economic growth, zero hunger, social &
                financial inclusion.
              </Typography>
              <Button variant="outlined" sx={home.whoButton}>Learn More</Button>
            </Grid>
          </Grid>
          {/* Why Section */}
          <Grid item sx={home.why} container>
            <Grid item md={6} sx={home.why1} >
              <Typography variant='h2' gutterBottom>Why You Should Invest</Typography>
              <Typography variant='body1' gutterBottom>
                We have stake holders whose combined efforts has driven the company, but now we
                look to expand, so we need stake holders which is why the gate is being thrown
                open to the members of the public
              </Typography>
              <Typography variant='h3'>Investments</Typography>
              <Typography variant="body1" gutterBottom>
                Become a stake holder and generate passive income by investing in our variety of
                products
              </Typography>
              <Typography variant='h3'>Referal Bonus</Typography>
              <Typography variant='body1' gutterBottom>
                Invite people using the unique referral code that will provided to you to receive
                bonuses on each referal
              </Typography>
              <Button variant='contained' sx={home.whyButton} >Invest</Button>
            </Grid>
            <Grid item md={6} sx={home.why2Cover}>
              <Box sx={home.why2}>
                <Box component='div'></Box>
                <Box component='img' src="/image/why.svg" ></Box>
              </Box>
            </Grid>
          </Grid>
          {/* What Section */}
          <Box component='img' src='/image/what.svg' sx={home.world} />
          {/* Contact Section */}
          <Grid item container direction='column' sx={home.contact}>
            <Grid item sx={home.contact1}>
              <Typography variant='h2' align='center' gutterBottom>Contact Us</Typography>
            </Grid>
            <Grid item container sx={home.contact2}>
              <Grid item md={5} xs={12} sx={home.contact2A}>
                <Typography variant='h4' sx={{mb:'1rem'}}>
                  Contact Information
                </Typography>
                <Typography variant='body1'>
                  Fill up the form and our team will get back to you within 24 hours
                </Typography>
                <Stack direction='row'>
                  <CallIcon sx={{mr:'1rem'}} />
                  <Box component='a' href='tel:+2348166815635'>+2348166815635</Box>
                </Stack>
                <Stack direction='row'>
                  <EmailIcon sx={{mr:'1rem'}} />
                  <Box component='a' href='mailto:agrocapitalinvestment@gmail.com'>agrocapitalinvestment@gmail.com</Box>
                </Stack>
                <Stack direction='row'>
                  <LocationOnIcon sx={{mr:'1rem'}} />
                  <Box >Acil Address</Box>
                </Stack>
              </Grid>
              <Grid item container md={7} xs={12} sx={home.contact2B} component='form'>
                <Grid item container  >
                  <Grid xs={12} md={6} item sx={{ px: '0.5rem' }} className='control'>
                    <label htmlFor="fname"  className="label">First Name</label>
                    <TextField required sx={{ width: '100%'}} color='success' id="fname"
                      size="small" 
                    />
                  </Grid>
                  <Grid xs={12} md={6} item sx={{ px: '0.5rem' }} className='control'>
                    <label htmlFor="lname" className="label">Last Name</label>
                    <TextField required sx={{ width: '100%' }} color='success' id='lname'
                      size='small'
                    />
                  </Grid>
                </Grid>
                <Grid item container  >
                  <Grid xs={12} md={6} item sx={{ px: '0.5rem' }} className='control'>
                    <label htmlFor="fname" className="label">Email</label>
                    <TextField required sx={{ width: '100%' }} color='success' id="email"
                      size='small'
                    />
                  </Grid>
                  <Grid xs={12} md={6} item sx={{ px: '0.5rem' }} className='control'>
                    <label htmlFor="phone" className="label">Phone</label>
                    <TextField required sx={{ width: '100%' }} id='phone' size="small"
                      color= "success"
                    />
                  </Grid>
                </Grid>
                <Grid item container  className='control' direction='column'>
                  <label htmlFor="message" className="label">Message</label>
                  <TextField multiline rows={4} id='message' color='success' />
                </Grid>
                <Grid item container  className='control'>
                  <Button variant='contained' sx={home.submit}>Get Started</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* FooterUp Section */}
          <Grid item container sx={home.footerUp}>
            <Grid item xs={12} container direction='column' justifyContent='space-around'>
              <Typography variant='h2' align="center">
                What are you waiting for?
              </Typography>
              <Button variant="contained">Invest</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Homepage