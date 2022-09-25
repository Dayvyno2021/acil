import { theme } from "../../components/Theme"

export const editUI = {
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
    bgcolor: theme.palette.secondary.light,
    p: '2rem',

    '& p': {
      fontSize: '1.2rem',
      fontWeight: '700',
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
  },
  admin: {
    mt: '2rem',
    border: `2px dotted ${theme.palette.secondary.main}`,
    p: '2rem 5rem',
    '& button': {
      color: theme.palette.secondary.main,
      textTransform: 'none',
      ml: '4rem',
      transition: '0.5s',
      '&:hover': {
        color: theme.palette.secondary.dark,
      }
    },
    '& p': {
      fontSize: '1.2rem',
      fontFamily: 'Lato',
      fontWeight: '700'
    }
  }
}
