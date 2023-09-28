import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box, Typography } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';

const AgentsPage = () => {
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
                    The agents section is currently under development.
                </Typography>
                </Box>
            </Box>
            <Footer />
        </PageWrapBox>

    )
}
/*
osu name, country, avatar, discord, bws rank
*/
export default AgentsPage