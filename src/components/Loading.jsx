import { Box } from '@mui/material'
import React from 'react'
import { RingLoader } from 'react-spinners'

const Loading = () => {
  return (
  <Box sx={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <RingLoader size={80} color="#000000" />
  </Box>
  )
}

export default Loading