import { createTheme } from '@mui/material/styles';

const lemonDark = "#00CB77";
const lemonLight = "#C4E6D2";
const blackDark = "#000014";
const white = "#FFFFFF";
const red = " #FF0000"

export const theme = createTheme({
  palette: {
    common: {
      lemon1: lemonDark,
      lemon2: lemonLight,
      black: blackDark,
      white: white,
      red: red
    },
    primary: {
      main: lemonDark,
    },
    secondary: {
      main: lemonLight,
    },
  },
  learnMore1: {
    mr:'2rem', 
    p:'1rem 3rem', 
    borderColor: "#FFFFFF", 
    color: "#FFFFFF",
    opacity: '0.8',
    textTransform: 'none',
    transition: '0.3s',
    "&:hover": {
      color: "#FFFFFF",
      borderColor: "#FFFFFF", 
      opacity: '1',
    }
  },
  learnMore2: {
    mr:'2rem', 
    p:'1rem 3rem', 
    borderColor: lemonDark, 
    color: lemonDark,
    opacity: '0.8',
    textTransform: 'none',
    transition: '0.3s',
    "&:hover": {
      color: lemonDark,
      borderColor: lemonDark, 
      opacity: '1',
    }
  },
  invest1: {
    mr: '2rem', 
    p: '1rem 4rem', 
    textTransform: 'none',
    fontSize: '1.2rem',
    backgroundColor: lemonDark,
  },
  components:{
    MuiInput: {
      styleOverrides: {
        underline: {
          border: '1px solid red',
          outline: '1px solid red'
        }
      }
    }
  }
});