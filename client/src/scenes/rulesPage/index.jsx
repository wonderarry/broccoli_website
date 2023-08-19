import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';

const RulesPage = () => {
    return (
        <PageWrapBox>
            <Box>
                <Navbar />
                <div>rules</div>
            </Box>
            <Footer />
        </PageWrapBox>

    )
}

export default RulesPage