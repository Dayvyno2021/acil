import { theme } from '../../components/Theme';

export const tables = {
  minHeight: '80vh',
  px: '15rem',
  [theme.breakpoints.down('md')]:{
    px: '5rem'
  },
  [theme.breakpoints.down('sm')]:{
    px: '1rem'
  },
  pb: '2rem',
  '& h1': {
    fontWeight: '700',
    fontFamily: 'Lato',
    fontSize: '2rem',
    mt: '2rem'
  },
  container: {
    bgcolor: theme.palette.common.lemon2
  },
  '& th': {
    color: '#FFFFFF',
    border: `1px solid #000000`,
  },
  '& td': {
    border: `1px solid ${theme.palette.primary.main}`,
  }
}