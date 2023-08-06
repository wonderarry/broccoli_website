import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box } from '@mui/material';
import MainButton from 'components/MainButton';
import TextButton from 'components/TextButton';
import MappoolEntry from 'components/MappoolEntry';

const HomePage = () => {
  return (
    <Box>
      <Navbar />
      <div>home</div>
      <MainButton onClickAction={() => console.log('actuated')}>Register as a Team Captain</MainButton>
      <TextButton onClickAction={() => console.log('text_actuated')}>Apply to staff</TextButton>
      <MappoolEntry
        mapper="Asphyxia"
        songName="Blue Zenith"
        songAuthor="Xi"
        mapType="NM2"
        mapsetId="292301"
        mapId="657917"
      />
    </Box>
  )
}

export default HomePage; 