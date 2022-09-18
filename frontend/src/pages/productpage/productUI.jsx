import { theme } from '../../components/Theme';

export const prod = {
  px: '5rem',
  [theme.breakpoints.down('md')]:{
    px: '1rem'
  },
  mt: '2rem',
  minHeight: '85vh',
  direct: {
    mb: '4rem',
    px: '10rem',

    [theme.breakpoints.down('lg')]: {
      px: '5rem'
    },
    [theme.breakpoints.down('md')]: {
      px: '5rem'
    },
    [theme.breakpoints.down('sm')]: {
      px: '1rem'
    },
  },

  packages: {
    '& div.MuiBox-root': {
      fontSize: '1.8rem',
      fontWeight: '500',
      color: '#000000',
      textDecoration: 'none',
      cursor:'pointer'
    },
  },
  "& h1": {
    fontSize: '3rem',
    fontWeight: '700',
    fontFamily: "Lato",
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem'
    },
  },
  "&>h4": {
    fontSize: '1.5rem',
    fontWeight: '400',
    mb: '1rem',
  },
  "& .portion": {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    // px: '5rem',
    mb: '3rem',
    [theme.breakpoints.down('sm')]: {
      px: '0rem'
    },
    '&>div': {
      width: '12rem',
      height: '12rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)',
      [theme.breakpoints.down('lg')]: {
        width: '10rem',
        height: '10rem',
      }
    },
    '&>p': {
      // color: theme.palette.common.lemon1,
      fontFamily: 'Pacifico',
      cursor:'pointer'
    }
  },
  proceed: {
    mb: '2rem',
    '&>button': {
      bgcolor: theme.palette.primary.main,
      textTransform: 'none',
      '&:hover': {
        bgcolor: theme.palette.primary.dark,
      }
    }
  }
}