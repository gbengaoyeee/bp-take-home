import { Box, Typography } from '@mui/material'
import React from 'react'
import {errormark} from '../../assets'

const ErrorComponent = ({error}) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 8, justifyContent:'center', alignItems:'center'}}>
        <img src={errormark} alt="checkmark" style={{width: '200px', height: '200px'}} />
        <Typography variant='h6'>{error.message}</Typography>
    </Box>
  )
}

export default ErrorComponent