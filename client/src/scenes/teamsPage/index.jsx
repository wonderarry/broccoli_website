import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box, Typography } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';
import {useMediaQuery} from '@mui/material';

const TeamsPage = () => {
    const overrideFontSize = useMediaQuery("(min-width:750px)") ? 80 : 50;
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
                    sx={{
                        fontSize: [overrideFontSize, "!important"]
                    }}
                >
                    The teams section is currently under development.
                </Typography>
                </Box>
            </Box>
            <Footer />
        </PageWrapBox>

    )
}

export default TeamsPage