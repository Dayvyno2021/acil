import {theme} from '../../components/Theme'

export const home = {
  main: {
    backgroundImage: "url('/image/mainbg.png')",
    // height: 'minContent',
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    zIndex: '-1',
    pb:'10rem'
  },
  invest: {
    color: theme.palette.common.white,
    ml: '8.75rem',
    mt: '14.4rem',
    fontFamily: 'Lato',
    fontWeight: '700',
    [theme.breakpoints.down('sm')]: {
      fontSize: '4rem',
      mt: '15rem',
      ml: '1rem',
      mr: '1rem',
      mb: '1rem',
      textAlign: 'center'
    }
  },
  make: {
    m: "3.75rem 8.75rem",
    fontSize: '1.5rem',
    color: 'common.white',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      m: '10rem 5rem'
    },
  },
  buttons:{
    ml: '8.75rem',
    [theme.breakpoints.down('sm')]: {
      m: '1rem auto',
      justifyContent: 'center'
    }
  },
  buttonInv: {
    ...theme.invest1,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  buttonMore: {
    ...theme.learnMore1
  },
  who: {
    // mb: '5rem',
    mt: '5rem',
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      // mt:'15rem',
    }
  },
  who1Cover: {
    display: 'block',
    m: '0 auto',
    pl: '5rem',
    pr: '5rem',
    // backgroundColor: 'red',
    [theme.breakpoints.down('md')]: {
      px: '0rem',
    },
    [theme.breakpoints.down('sm')]: {
      px: '0rem',
    },
  },
  who1: {
    width: '567px',
    height: '750px',
    position: 'relative',
    // backgroundColor: 'red',
    [theme.breakpoints.down('lg')]: {
      width: '396.9px',//
      height: '525px',//
      display: 'flex',
      alignItems: 'center'
    },
    [theme.breakpoints.down('md')]: {
      width: '340.2px',//
      height: '450px',//
      display: 'flex',
      alignItems: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      width: '340px',
      height: '450px',
      mr:'1.5rem'
    },
    '&>div': {
      width: '90%',
      height: '90%',
      position: 'absolute',
      backgroundColor: theme.palette.common.lemon2,
      [theme.breakpoints.down('lg')]:{
        width: '100%',
        height:'100%'
      },
      [theme.breakpoints.down('md')]: {
        width: '100%',
        height:'100%',
        left:'50%',
        transform:'translateX(-50%)'
      },
      [theme.breakpoints.down('sm')]: {
        width: '90%',
        height:'90%',
      }
    },
    '&>img': {
      display:'block',
      width: '90%',
      height: '90%',
      transform: 'translate(15px,-15px)',
      position: 'absolute',
      [theme.breakpoints.down('lg')]:{
        width: '100%',
        height:'100%'
      },
      [theme.breakpoints.down('md')]: {
                width: '100%',
        height:'100%',
        left:'50%',
        transform:'translate(-45%, -4%)'
      },
      [theme.breakpoints.down('sm')]: {
        width: '90%',
        height:'90%',
      }
    }
  },
  who2: {
    // backgroundColor: 'yellow',
    pl: '3rem',
    pr:'3rem',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center',
    },
    // alignItems: 'start',
    '&>h2': {
      mb: '2rem',
      fontWeight: '700',
      fontFamily: 'Lato',
      textAlign: 'center',
      [theme.breakpoints.down('md')]: {
        fontSize: '2.5rem',
        mb: '0.5rem',
        mt: '2rem'
      }
    }
  },
  whoButton: {
    ...theme.learnMore2,
    width: '12rem',
    mt: '2rem',
    display: 'inline-block',
    [theme.breakpoints.down('md')]: {
      mx: 'auto'
    }
  },
  why: {
    mt: '5rem',
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      // mt:'15rem',
    }
  },
  why1: {
    // backgroundColor: 'yellow',
    pl: '3rem',
    pr:'3rem',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center',
    },
    '& h2': {
      fontWeight: '700',
      fontFamily: 'Lato',
      [theme.breakpoints.down('md')]: {
        fontSize: '2.5rem',
        textAlign: 'center'
      }
    },
    '& h3': {
      fontWeight: '700',
      fontFamily: 'Lato',
      [theme.breakpoints.down('md')]: {
        fontSize: '2rem'
      }
    },
  },
  why2Cover: {
    // display: 'block',
    m: '0 auto',
    display: 'flex',
    justifyContent: 'end',
    // pl: '5rem',
    // pr: '5rem',
    // backgroundColor: 'red',
    [theme.breakpoints.down('lg')]: {
      pr: '5rem'
    },
    [theme.breakpoints.down('md')]: {
      mt: '5rem',
      px: '0rem',
    },
    [theme.breakpoints.down('sm')]: {
      px: '0rem',
    },
  },
  why2: {
    width: '567px',
    height: '750px',
    position: 'relative',
    // backgroundColor: 'red',
    [theme.breakpoints.down('lg')]: {
      width: '396.9px',
      height:'525px'
    },

    [theme.breakpoints.down('md')]: {
      width: '340.2px',
      height: '450px',
      // display: 'flex',
      // alignItems: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      width: '306.18px',
      height: '405px',
      transform: 'translateX(15px)',
      // ml:'1.5rem'
    },

    '&>div': {
      display:'block',
      width: '510.3px',
      height: '675px',
      position: 'absolute',
      backgroundColor: theme.palette.common.lemon2,
      [theme.breakpoints.down('lg')]:{
        width: '396.9px',
        height:'525px'
      },
      [theme.breakpoints.down('md')]: {
        width: '340.2px',
        height: '450px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '306.18px',
        height:'405px',
      }
    },

    '&>img': {
      display:'block',
      width: '510.3px',
      height: '675px',
      transform: 'translate(-15px,-15px)',
      position: 'absolute',
      [theme.breakpoints.down('lg')]:{
        width: '396.9px',
        height:'525px'
      },
      [theme.breakpoints.down('md')]:{
        width: '340.2px',
        height: '450px',
      },
      [theme.breakpoints.down('sm')]:{
        width: '306.18px',
        height: '405px',
      }
    }
  },
  whyButton: {
    ...theme.invest1,
    width: '12rem',
    mt: '2rem',
    display: 'inline-block',
    [theme.breakpoints.down('md')]: {
      mx: 'auto'
    },
    
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },

  world: {
    width: '1440px',
    height: '680px',
    maxWidth: '100%',
    maxHeight: '100%',
    [theme.breakpoints.down('lg')]: {
      width: '1200px',
      height: '550px',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    [theme.breakpoints.down('md')]: {
      width: '900px',
      height: '400px',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '600px',
      height: '280px',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    [theme.breakpoints.down('400')]: {
      width: '400px',
      height: '220px',
      maxWidth: '100%',
      maxHeight: '100%',
    }
  },
  contact: {
    p: '0rem 5rem 5rem 5rem',

    [theme.breakpoints.down('md')]: {
      p:'0rem 3rem 3rem 3rem'
    },
    [theme.breakpoints.down('sm')]: {
      p:'0rem 1rem'
    }
  },
  contact1: {
    mt: '5rem',
    [theme.breakpoints.down('sm')]: {
      mt: '2rem'
    },
    '& h2': {
      fontWeight: '700',
      fontFamily: 'Lato',
    }
  },
  contact2: {
    boxShadow: '0 4px 8px 0  rgba(0, 0, 0, 0.5)',
    p: '5px',

    // [theme.breakpoints.down('md')]: {
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center'
    // }

  },
  contact2A: {
    p: '1rem',
    backgroundColor: '#000014', 
    borderRadius: '4px',
    '& *': {
      color: theme.palette.common.white,
      fontFamily: 'Lato',
    },
    '& p': {
      mb: '3.9rem'
    },
    '& div': {
      mb: '3.9rem'
    },
    '& a': {
      textDecoration: 'none'
    }
  },
  contact2B: {
    p: '1.5rem'
  },
  '& .MuiInputBase-input': {
    fontSize: '1.5rem',

  },
  '& .label': {
    fontSize: '1.2rem'
  },

  submit: {
    ...theme.invest1,
    textTransform: 'none',
    display: 'inline-block',
    textAlign: 'center',
    ml: 'auto',
    p: '4rem 4rm',
    transition: '0.3s',
    [theme.breakpoints.down('md')]: {
      mx: 'auto'
    },

    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }, 
  '& .control': {
    [theme.breakpoints.down('md')]: {
      mb: '1rem'
    }
  },
  footerUp: {
    '&>div': {
      mt: '2rem',
      backgroundImage: "url('/image/footer.png')",
      backgroundRepeat: 'no-repeat',
      height: '70vh',
      backgroundPosition: 'center',
      backgroundSize: '100% 100%',
      [theme.breakpoints.down('md')]: {
        height: '50vh'
      },
      [theme.breakpoints.down('sm')]: {
        height: '30vh'
      },

      '&>h2': {
        color: theme.palette.common.white,
        fontWeight: '700',
        fontFamily: 'Lato',
        [theme.breakpoints.down('sm')]: {
          fontSize: '2.1rem'
        },
      },

      '&>button': {
        ...theme.invest1,
        display: 'inline-block',
        mx: 'auto',
        transition: '0.3s',
        [theme.breakpoints.down('sm')]: {
          p: '0.5rem 2rem'
        },
        '&:hover': {
          backgroundColor: theme.palette.primary.dark
        }
      }
    }
  },
}