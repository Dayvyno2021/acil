import Box from '@mui/material/Box';

const nav = {
  position: 'relative',
  width: '35px',
  height: '3.45px',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  transition: '0.3s',
  top: '-2rem',
  right: '-2rem',
  '&:after': {
    content: "''",
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    right: 0,
    height: '3.45px',
    width: '18.53px',
    top: '10px'
  }
}

const Nav = () => {
  
  return (
    <Box>
      <Box sx={nav}></Box>
    </Box>
  )
}

export default Nav