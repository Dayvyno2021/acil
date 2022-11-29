import { useState, useEffect  } from "react";
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import Header from '../../components/headerComp/Header';
import { useSelector, useDispatch } from "react-redux";
import { sendMessageAction } from "../../actions/userActions";
import Progress from "../../components/Progress";
import SnackBar from "../../components/Snackbar";
import { RESET_MESSAGE } from "../../constants/userConstants";

const Homepage = () => {
  const matchSM = useMediaQuery(theme.breakpoints.down('md'));
  const registerReducer = useSelector((state) => state.registerReducer);
  const { acilDetails } = registerReducer;
  const dispatch = useDispatch();

  const sendMessageReducer = useSelector(state => state.sendMessageReducer);
  const { loading, success, error } = sendMessageReducer;

  const labels = [
    {label: 'Home', link:'/', acilDetails: false},
    { label:"About", link: '/about', acilDetails: false},
    { label:"Invest", link: "/invest", acilDetails: false},
    { label: "Contact Us", link: "#contactus", acilDetails: false },
    {label: "Register", link:"/register", acilDetails: acilDetails},
    {label: "Profile", link:`/profile`, acilDetails: !acilDetails},
    {label: "Login", link:"/login", acilDetails: acilDetails},
    {label: "Logout", link: "/", acilDetails: !acilDetails },
    {acilDetails: true},
    {acilDetails: true},
    {acilDetails: true},
    {acilDetails: true},
  ]


  const labels1 = [
    {label: 'Home', link:'/', acilDetails: false},
    { label:"About", link: '/about', acilDetails: false},
    { label:"Invest", link: "/invest", acilDetails: false},
    { label: "Profile", link: `/profile`, acilDetails: !acilDetails },
  ]

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  //Takes care of popping up success when email form is successfully submitted
  const [ready, setReady] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log({ firstName, lastName, email, phone, message });
    dispatch(sendMessageAction({ firstName, lastName, email, phone, message }))
  }

  const disableSendEmail = () => {
    if (!firstName || !lastName || !email || !phone || !message) return true;
    return false;
  }

  useEffect(() => {
    if (success) {
      setReady(true)
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
      dispatch({type: RESET_MESSAGE})
    }
  },[dispatch, success])

  return (

    <Box sx={home}>
      {loading && <Progress />}
      {error && <SnackBar message={error} />}
      {ready && <SnackBar message='Message sent' severity='success'/> }
      <Grid container  >
        <Grid item container direction='column'>
          <Header labels={labels} labels1={labels1} />
          <Grid item container sx={home.main}>
            <Grid item>
              <Typography variant='h1' sx={home.invest}>
                Invest in {matchSM? <br/>: ''} Agro Capital
              </Typography>
              <Typography variant='body1' sx={home.make}>
                Make passive income through investments and referral bonuses
              </Typography>
                <Stack direction="row" spacing={4} sx={home.buttons}>
                <Button variant='contained' sx={home.buttonInv} 
                  component={Link} to='/invest'
                >
                    Invest
                  </Button>
                <Button component={Link} variant="outlined" sx={home.buttonMore}
                  to='/about'
                >
                    Learn More
                  </Button>
                </Stack>
            </Grid>
          </Grid>
          {/* Who section */}
          <Grid item sx={home.who} container id='about'>
            <Grid item md={6} sx={home.who1Cover}>
              <Box sx={home.who1}>
                <Box component='div'></Box>
                <Box component='img' src="/image/who.jpg" ></Box>
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
              <Button variant="outlined" sx={home.whoButton} component={Link} to='/about'>
                Learn More
              </Button>
            </Grid>
          </Grid>
          {/* Why Section */}
          <Grid item sx={home.why} container id='howitworks'>
            <Grid item md={6} sx={home.why1} >
              <Typography variant='h2' gutterBottom>Why You Should Invest</Typography>
              <Typography variant='body1' gutterBottom>
                We have stakeholders whose combined efforts has driven the company, but now we
                look to expand, so we need stakeholders which is why the gate is being thrown
                open to the members of the public
              </Typography>

              <Accordion sx={{mb:'1rem'}}>
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  >
                  <Typography variant="h4">Investments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>
                    Become a stake holder and generate passive income by investing in
                    our variety of products
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  >
                  <Typography variant="h4">Referal Bonus</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>
                    Invite people using the unique referral code that will be provided
                    to you to receive bonuses on each referral
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Button variant='contained' sx={home.whyButton} component={Link} to='/invest'>
                Invest
              </Button>
            </Grid>
            <Grid item md={6} sx={home.why2Cover}>
              <Box sx={home.why2}>
                <Box component='div'></Box>
                <Box component='img' src="/image/why.jpg" ></Box>
              </Box>
            </Grid>
          </Grid>
          {/* What Section */}
          <Box component='img' src='/image/world.png' sx={home.world} id='review' />
          {/* Contact Section */}
          <Grid item container direction='column' sx={home.contact} id='contactus'>
            <Grid item sx={home.contact1}>
              <Typography variant='h4' align='center' gutterBottom>Contact Us</Typography>
            </Grid>
            <Grid item container sx={home.contact2} justifyContent='center'>
              <Grid item md={3} xs={12} sx={home.contact2A}>
                <Typography variant='h4' sx={{mb:'1rem'}}>
                  Contact Information
                </Typography>
                <Typography variant='body1'>
                  Fill up the form and our team will get back to you within 24 hours
                </Typography>
                <Stack direction='row'>
                  <CallIcon sx={{mr:'1rem'}} />
                  <Box component='a' href='tel:+2348126898743'>+234{' '}812{' '}689{' '}8743</Box>
                </Stack>
                <Stack direction='row'>
                  <EmailIcon sx={{mr:'1rem'}} />
                  <Box component='a' href='mailto:info@domain.com'>info@domain.com</Box>
                </Stack>
                <Stack direction='row'>
                  <LocationOnIcon sx={{mr:'1rem'}} />
                  <Typography variant='body1'>
                    58, Akanbi Onitiri close off Eric Moore road, Surulere, Lagos.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item container md={4} xs={12} sx={home.contact2B} component='form'
                onSubmit={sendMessage} justifyContent='center'
              >
                <Grid item container  alignContent='center' justifyContent='center'>
                  <Grid xs={10} md={6} item sx={{ px: '0.5rem' }} className='control'>
                    <label style={{fontSize: '0.8rem'}} htmlFor="fname"  className="label">First Name</label>
                    <TextField required sx={{ width: '100%'}} color='success' id="fname" type='text'
                      size="small" value={firstName} onChange={(e)=>setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid xs={10} md={6} item sx={{ px: '0.5rem' }} className='control'>
                    <label style={{fontSize: '0.8rem'}}  htmlFor="lname" className="label">Last Name</label>
                    <TextField required sx={{ width: '100%' }} color='success' id='lname' type='text'
                      size='small' value={lastName} onChange={(e)=>setLastName(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item container justifyContent='center' >
                  <Grid xs={10} md={6} item sx={{ px: '0.5rem' }} className='control'>
                    <label style={{fontSize: '0.8rem'}}  htmlFor="fname" className="label">Email</label>
                    <TextField required sx={{ width: '100%' }} color='success' id="email"
                      size='small' value={email} onChange={(e)=>setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid xs={10} md={6} item sx={{ px: '0.5rem' }} className='control'>
                    <label style={{fontSize: '0.8rem'}}  htmlFor="phone" className="label">Phone</label>
                    <TextField required sx={{ width: '100%' }} id='phone' size="small" type='tel'
                      color= "success" value={phone} onChange={(e)=>setPhone(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid xs={10} md={12} item container className='control' direction='column'>
                  <label style={{fontSize: '0.8rem'}}  htmlFor="message" className="label">Message</label>
                  <TextField multiline rows={2} id='message' color='success'
                    value={message} onChange={(e)=>setMessage(e.target.value)}
                  />
                </Grid>
                <Grid item container  className='control'>
                  <Button variant='contained' sx={home.submit} type='submit'
                    disabled = {disableSendEmail()}
                  >
                    Get Started
                  </Button>
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
              <Button variant="contained" component={Link} to='/invest'>
                Invest
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Homepage