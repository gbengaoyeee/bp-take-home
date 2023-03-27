import { Box, Typography } from '@mui/material'
import React from 'react'
import {checkmark} from '../../assets'

const SubmittedComponent = ({}) => {
  return (
    <Box className='flex flex-col items-center gap-7 p-5 text-center'>
        <img src={checkmark} alt="checkmark" style={{width: '200px', height: '200px'}} />
        <Typography variant='h6'>You have submitted the questionnaire. One of our representative will reach out to you.</Typography>
    </Box>
  )
}

export default SubmittedComponent