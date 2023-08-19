import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';

const AgentsPage = () => {
    return (
        <PageWrapBox>
            <Box>
                <Navbar />
                <div>agents</div>
            </Box>
            <Footer />
        </PageWrapBox>

    )
}
/*
osu name, country, avatar, discord, bws rank
*/
export default AgentsPage