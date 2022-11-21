import { theme } from "../../components/Theme";
export const adminIUI = {
  header: {
    width: '100%',
    height: '7rem',
    bgcolor: 'rgba(0, 0, 0, 0.9)',
  },
  heading: {
    mt: '1rem',
    '&>h1': {
      fontSize: '3rem',
      fontFamily: 'Lato',
      fontWeight: '700'
    }
  },
  // '&>li:nth-of-type(odd)'
  table: {
    "& th, & td":{p: '0.5rem'},
    '& th': {
      color: '#FFFFFF',
      border: `1px solid #000000`,
    },
    '& td': {
      border: `1px solid ${theme.palette.primary.main}`,
    }
  },
  body: {
    '&:nth-of-type(even)': {
      bgcolor: theme.palette.common.lemon2
      
    }
  },
  container: {
    // bgcolor: theme.palette.common.lemon2
  },
  mainTable: {
    overflowY: 'scroll',
    p: '2rem 1rem',
    [theme.breakpoints.down('lg')]: {
      p: '2rem 8rem'
    },
    [theme.breakpoints.down('md')]: {
      p: '2rem 3rem'
    },
    [theme.breakpoints.down('sm')]: {
      p: '2rem 1rem'
    },
  },
  '& .MuiTableHead-root': {
    '& th': {
      textAlign: 'center',
    }
  },
  create: {
    mb: '1rem',
    bgcolor: theme.palette.primary.main,
    textTransform: 'none',
    transition: '0.5s',
    '&:hover': {
      bgcolor: theme.palette.primary.dark
    }
  },
  excel: {
    pr: '5rem',
    '& button': {
      cursor: 'pointer',
      bgcolor: theme.palette.primary.light,
      borderColor: theme.palette.primary.main,
      borderRadius: '5px',
      p: '.5rem 1rem',
      color: '#FFF'
    }
  }
}