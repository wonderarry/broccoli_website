import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box } from '@mui/material';
import MainButton from 'components/MainButton';

const HomePage = () => {
  return (
    <Box>
      <Navbar />
      <div>home</div>
      <MainButton onClickAction={() => console.log('actuated')}>Register as a Team Captain</MainButton>
    </Box>
  )
}

export default HomePage; 