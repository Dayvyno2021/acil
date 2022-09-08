import { theme } from '../Theme';

export const head = {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,

  tabCover: {
    px: '5rem',
    pt: '0.5rem',
  },

  logo: {
    '&>img': {
      width: '10rem',
      [theme.breakpoints.down('lg')]: {
        width: '8rem'
      }
    }
  },

  "& .MuiTabs-flexContainer": {
    display:'flex',
    justifyContent: 'end'
  },
  tabs: {
    "& a": {
      color: theme.palette.common.white,
      fontFamily: 'Lato',
      textTransform: 'none',
      fontSize: '1rem',
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
  '& .tab0': {
    visibility: 'hidden'
  },
  menu:{
    fontSize: '3rem',
    color: theme.palette.common.white,
    cursor: 'pointer',
  },
  drawer: {
    // '& .tab0': {
    //   visibility: 'hidden'
    // },
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