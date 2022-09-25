import { theme } from "../../components/Theme";

export const profileUI1 = {
  minHeight: '85vh',
  mb: '5rem',

}

export const profileUI = {
  px: '10rem',
  [theme.breakpoints.down('md')]: {
    px: '5rem'
  },
  [theme.breakpoints.down('sm')]: {
    px: '1rem'
  },
  mt: '2rem',
  '& .MuiAvatar-root':{
    width:'7rem', 
    height: '7rem',
  },
    
  '& .cl4': {
    mt: '2rem',
    '& p': {
      boxShadow: '-4px 4px 4px 0 rgba(0,0,0,.2)',
      p: '1rem 2rem',
      fontSize: '1.2rem',
      fontWeight: '700',
      color: 'grey.900',
      textDecoration: 'none',
      cursor: 'pointer',
      bgcolor: theme.palette.secondary.light,
      transition: '0.5s',
      '&:hover': {
        transform: 'translateY(-2px)'
      }
    }
  },
  '& .cl5': {
    mt: '2rem',
    // boxShadow: '-4px 4px 4px 0 rgba(0,0,0,.2)',
    // backgroundImage: `linear-gradient(to right, ${theme.palette.common.lemon2}, ${theme.palette.primary.light})`,
    bgcolor: theme.palette.common.lemon2,
    p: '2rem',

    '& p': {
      fontSize: '1.2rem',
      fontWeight: '700',
      // color: '#FFF'
      color: theme.palette.secondary.dark
    }
  },
  imgStyle: {
    '&>label': {
      textTransform: 'none',
      color: '#808080'
    },
    '&>button': {
      textTransform: 'none',
      borderColor: theme.palette.common.lemon1, 
      // color: 'red',
      color: theme.palette.common.lemon1,
      opacity: '0.8',
      transition: '0.3s',
      "&:hover": {
        color: theme.palette.common.lemon1,
        borderColor: theme.palette.common.lemon1, 
        opacity: '1',
      }
    }
  },
  update: {
    borderColor: '#808080', 
    color: '#808080', 
    mt: '1rem',
    textTransform: 'capitalize'
  }
}
