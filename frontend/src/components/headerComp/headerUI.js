import { theme } from '../Theme';

export const head = {
  logo: {
    '&>img': {
      width: '10rem',
    }
  },
  m: '.3rem 10rem',
  [theme.breakpoints.down('sm')]: {
    m: '.3rem 1rem'
  },
  tabCover: {
    px: '2rem'
  },
  "& .MuiTabs-flexContainer": {
    // backgroundColor: 'red',
    display:'flex',
    justifyContent: 'end'
  },
  tabs: {
    "& a": {
      color: theme.palette.common.white,
      fontFamily: 'Lato',
      textTransform: 'none',
      fontSize: '1.2rem',
      '&.Mui-selected': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        border: `1.5px solid ${theme.palette.primary.main}`,
        borderRadius: '4px'
      },
    },
    "& .MuiTabs-indicator": {
      backgroundColor: 'transparent'
    }
  },
  tab: {
    
  },

  menu:{
    fontSize: '3rem',
    // mr: '1rem',
    color: theme.palette.common.white,
    cursor: 'pointer',
  },
  drawer: {
    "& .MuiDrawer-paper": {
      width: '70vw',
      backgroundColor: `rgba(0, 0, 0, 0.9)`,
      '& a': {
        color: theme.palette.common.white,
        mt: '2rem',
        fontSize: '1.8rem',
        fontFamily: 'Lato',
        fontWeight: '700',
      }
    },
    '& ul': {
      ml: '5rem',
      mt: '5rem',
      '& a.Mui-selected': {
        color: theme.palette.primary.main
      }
    }
  }
}