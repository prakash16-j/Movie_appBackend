import Navbar from './Navbar'
import { Box } from '@mui/material'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Box sx={{ mt: '80px' }}>
        {children}
      </Box>
    </>
  )
}
