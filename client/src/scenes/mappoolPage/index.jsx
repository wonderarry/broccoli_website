import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';

const MappoolPage = () => {
    return (
        <PageWrapBox>
            <Box>
                <Navbar />
                <div>mappool</div>
            </Box>
            <Footer />
        </PageWrapBox>
    )
}

export default MappoolPage