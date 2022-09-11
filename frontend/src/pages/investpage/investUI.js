import { theme } from '../../components/Theme';

export const invest = {
  logos: {
    px: '10rem',
    mt: '1rem',
    mb: '5rem',
    [theme.breakpoints.down('md')]: {
      px: '5rem'
    },
    [theme.breakpoints.down('sm')]: {
      px: '3rem'
    },
    '& img': {
      width: '9rem',
      maxWidth: '9rem',
      [theme.breakpoints.down('md')]: {
        width: '7rem',
        maxWidth: '7rem',
      },
      [theme.breakpoints.down('sm')]: {
        width: '5rem',
        maxWidth: '5rem',

      }
    }
  },
  actions: {
    px: '21.8rem',
    mb: '5rem',
    [theme.breakpoints.down('lg')]: {
      px: '15rem'
    },
    [theme.breakpoints.down('md')]: {
      px: '10rem'
    },
    [theme.breakpoints.down('sm')]: {
      px: '5rem'
    },
    '& div': {
      p: '0.5rem 1rem',
      color: '#000000',
      borderRadius: '4px',
      textDecoration: 'none',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }
    }
  },
  items: {
    px: '10rem',
    [theme.breakpoints.down('md')]: {
      px: '5rem'
    },
    [theme.breakpoints.down('sm')]: {
      px: '1rem'
    },
    // display: 'flex',
    // flexWrap: 'wrap',
    // backgroundColor:'red',
    '&>div': {
      mr: '1.69rem',
      width: '100%',
      overflow: 'hidden',
      display: 'inline-block',
      mx: 'auto',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      transition: '0.3s',
      mb: '1.69rem',
      borderRadius: '4px',
      '&:hover':{
        boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
      },
      //   "&:not(:last-of-type)": {
      //     mb: '3.75rem'
      // },
      '& img': {
        pb: '1.5rem',
        width: '100%',
        // height: '10rem'
      },
      '& p':{
        pl: '1.5rem',
        pb: '1.5rem',
        [theme.breakpoints.down('md')]: {
          pl: '1rem',
          pb: '1rem'
        },
      }
    }
  },
  style : {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

    '& .close': {
      position: 'absolute',
      right: '-25px',
      top: '-25px',
      fontSize: '2rem',
      color: '#FF0000',
      cursor: 'pointer'
    },

    '& .MuiAvatar-root':{
      width:'7rem', 
      height: '7rem', 
      bgcolor: theme.palette.common.lemon1
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
        transition: '0.5s',
        '&:hover': {
          transform: 'translateY(-2px)'
        }
      }
    },
    '& .cl5': {
      mt: '2rem',
      boxShadow: '-4px 4px 4px 0 rgba(0,0,0,.2)',
      p: '2rem',

      '& p': {
        fontSize: '1.2rem',
        fontWeight: '700',
      }
    }
  }
}