import { theme } from '../../components/Theme';

export const log = {
  register: {
    mb: '2rem',
    justifyContent: 'center'
  },
  px: '10rem',
  [theme.breakpoints.down('sm')]: {
    px:'2rem'
  },
  register1: {
    py: '1rem',
    '& img': {
      width: '9rem',
      maxWidth: '9rem'
    }
  },
  register2: {
    p: '0 1rem',
    // '& div.MuiFormControl-root': {
      //   width: '100%',
      
      // },
      '& .MuiTextField-root': {
        width: '100%',
        mb: '1rem',

      },
    '& .MuiInputBase-root': {
        pl: '2rem',
        
      },
      '& .MuiInputBase-input': {
        
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.common.lemon1
        }
      },
      '& .MuiOutlinedInput-input': {
        
    },
      
      '&>div': {
        position: 'relative',
      },
    },
  icon: {
    position: 'absolute',
    top: '1rem',
    left: '0.5rem',
    color: 'grey.600'
  },
  image: {
      [theme.breakpoints.down('md')]: {
      display: 'block',
      mx: 'auto'
    },
    '& img': {
      width: '100%',
      height: '40rem',
      maxHeight: '40rem',
    }
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    textTransform: 'none',
    py: '0.5rem',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  }
}
