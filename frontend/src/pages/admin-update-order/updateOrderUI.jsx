import { theme } from "../../components/Theme";

export const UpdateOrderUI = {
  mt: '2rem',
  '&>div': {
    mb: '2rem'
  },
  product: {
    bgcolor: theme.palette.secondary.light,
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
  },
  confirm: {
    my: '0.5rem',
    border: `2px dotted ${theme.palette.secondary.main}`,
    '& button': {
      textTransform: 'none',
      color: theme.palette.secondary.main
    }
  }
}