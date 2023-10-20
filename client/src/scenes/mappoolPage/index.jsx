import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';
import { Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';


const MappoolEntry = () => {
    return <></>;
}


const MappoolPage = () => {
    // const overrideFontSize = useMediaQuery("(min-width:800px)") ? 60 : 50;
    const overrideFontSize = useMediaQuery("(min-width:800px)") ? 80 : 28;
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
                        The mappool section is currently under development.
                    </Typography>
                </Box>
                {false &&
                    <Box
                        marginLeft='4%'
                        display='flex'
                        flexDirection="column"
                        width='92vw'
                        alignItems="flex-start"

                    >

                        <Typography
                            variant='h1'
                            fontWeight='500'
                            sx={{
                                paddingTop: '6%',
                                paddingBottom: '',
                                fontSize: [overrideFontSize, "!important"]

                            }}
                        >
                            Mappool
                        </Typography>
                        <MappoolEntry />

                    </Box>
                }
            </Box>
            <Footer />
        </PageWrapBox>)


}

export default MappoolPage