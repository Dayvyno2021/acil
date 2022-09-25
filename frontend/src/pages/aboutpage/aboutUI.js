
import { theme } from '../../components/Theme';

export const about = {
  main: {
    backgroundImage: 'url("/image/abt.jpg")',
    // backgroundImage: 'url("/image/whopage.jpg")',
    minHeight: '100vh',
    backgroundSize: 'cover',
    mb:'5rem',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  main1: {    
    mt: '15rem',
    ml: '8rem',
    [theme.breakpoints.down('md')]: {
      ml:'5rem' 
    },
    [theme.breakpoints.down('sm')]: {
      mx: '2rem',
      textAlign: 'center'
    },
    color: theme.palette.common.white,
    '& h1': {
      mb:'2rem',
      fontFamily: 'Lato',
      fontWeight: '700',
      fontSize: '3rem'
    },
    '& p': {
      [theme.breakpoints.down('sm')]: {
        mt: '5rem'
      },
      lineHeight: '1.8'
    }
  },
  mission: {
    "& h2": {
      fontSize: '2.5rem',
      fontWeight: '700',
      fontFamily: 'Lato'
    },
    "& h4": {
      fontSize: '2rem',
      fontWeight: '700',
      fontFamily: 'Lato'
    },
  }
}