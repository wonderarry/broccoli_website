import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';


const BracketPage = () => {
    return (
        <PageWrapBox>
            <Box>
                <Navbar />
                <div>bracket</div>
            </Box>
            <Footer />
        </PageWrapBox>

    )
}

export default BracketPage