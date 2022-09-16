import { theme } from '../../components/Theme';

export const payment = {
  
  item: {
    mt: '5rem',
    p: '2.5rem 2rem',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    width: '75%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      p: '2.5rem 0.5rem'
    },
    '& button': {
      ...theme.invest1,
      height: '3rem',
      width: '5rem',
      transition: '0.5s',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      },
      [theme.breakpoints.down('sm')]: {
        p: '1rem 3rem'
      },
    }
  },
  item1: {
    '& img': {
      width: '80%',
      height: '5rem',
      // backgroundColor: 'red',
    }
  },
  item2: {
    '& h5': {
      color:"#808080",
      fontSize: '0.8rem'
    }
  }
}