import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';
import {Typography} from '@mui/material';
const MappoolPage = () => {
    return (
        <PageWrapBox>
            <Box>
                <Navbar />
                <Box
                    alignItems='center'
                    display='flex'
                    flexDirection='column'
                    paddingTop='10%'
                    paddingLeft='10%'
                    paddingRight='10%'
                >
                    <Typography
                    variant='h1'
                    color='black'
                    fontWeight='500'
                    textAlign='center'
                >
                    The mappool section is currently under development.
                </Typography>
                </Box>
            </Box>
            <Footer />
        </PageWrapBox>
    )
}

export default MappoolPage