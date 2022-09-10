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
    [theme.breakpoints.down('md')]: {
      px: '10rem'
    },
    [theme.breakpoints.down('sm')]: {
      px: '5rem'
    },
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
}