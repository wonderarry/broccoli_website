import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box } from '@mui/material';
import MainButton from 'components/MainButton';
import TextButton from 'components/TextButton';
import MappoolEntry from 'components/MappoolEntry';
import TextInput from 'components/TextInput';
import TickboxOption from 'components/TickboxOption';
import Footer from 'scenes/widgets/footer';
import PageWrapBox from 'components/PageWrapBox';

const HomePage = () => {
    return (
        <PageWrapBox>
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
            <TextInput
                title="Enter your osu! ID"
                placeholder="osu! ID"
                validationType="osu"

            />
            <TickboxOption onClickAction={() => console.log("tickbox triggered")}>Agree to the terms of the Tournament</TickboxOption>

        </Box>
        <Footer />
        </PageWrapBox>
    )
}

export default HomePage; 