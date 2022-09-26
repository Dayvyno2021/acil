import { theme } from "../../components/Theme";

export const sendUI = {
  my: '2rem',
  px: '3rem',

  '&>button, &>a': {
    textTransform: 'none',
    ml: '2rem'
  },
  icon: { color: '#FFF', 
    ml: '.5rem', 
    transform: 'rotate(-25deg)', 
    position: 'relative',
    top: '-0.3rem'
  }
}

export const orderui = {
  mt: '2rem',
    '& h4': {
    fontSize: '1.4rem'
  },
  '&>div': {
    mb: '2rem'
  },
  product: {
    bgcolor: theme.palette.primary.main,
    borderRadius: '3px',
    p: '1rem',
    '&>li': {
      px: '2rem',
      mb: '1rem',
      '&>div:last-child': {
        textAlign: 'end',
        color: '#808080'
      }
    },
    '&>li:nth-of-type(odd)': {
      bgcolor: '#FFFFFF',
      borderRadius: '40px'
    },
    '&>li:nth-of-type(even)': {
      border: '1.5px solid #FFFFFF',
      borderRadius: '40px'
    }
  }
}