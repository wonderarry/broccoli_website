import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import MainButton from 'components/MainButton';
import TextButton from 'components/TextButton';
import Footer from 'scenes/widgets/footer';
import PageWrapBox from 'components/PageWrapBox';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
    const overrideFontSize = useMediaQuery("(min-width:750px)") ? 80 : 50;
    return (
        <PageWrapBox>
            <Box>
                <Navbar />
                <Box
                    marginLeft='6%'
                    paddingRight='6%'
                    display='flex'
                    flexDirection="column"
                    maxWidth='88vw'
                    alignItems="flex-start"
                >
                    <Typography
                        variant='h1'
                        fontWeight='500'
                        sx={{
                            paddingTop: '6%',
                            paddingBottom: '2rem',
                            fontSize: [overrideFontSize, "!important"]
                            
                        }}
                    >
                        Broccoli cup 3
                    </Typography>

                    <Typography
                        variant='h3'
                        paddingBottom='0.7rem'
                        paddingTop='1rem'
                    >
                        osu! tournament hosted by
                    </Typography>
                    <Typography
                        variant='h3'
                        fontWeight='600'
                        paddingBottom='2rem'
                    >
                        megahello & Stage
                    </Typography>
                    <Box
                    >
                        <MainButton
                            onClickAction={() => navigate('/register/team')}
                            overridePalette={{
                                bgColor: "#32fa32",
                                bgColorAlt:  "#00bd00",
                                textColor: "#000000",
                                activeColor:  "#009900",
                            }}
                        >
                            Team registration
                        </MainButton>
                        <Box
                            width='1rem'
                            display={isNonMobileScreens ? 'inline-block' : 'block'}
                        ></Box>
                        <MainButton
                            onClickAction={() => navigate('/register/agent')}
                        >
                            Agent registration
                        </MainButton>
                        <Box
                            width='1rem'
                            display={isNonMobileScreens ? 'inline-block' : 'block'}
                        ></Box>

                        <TextButton
                            onClickAction={() => { window.location.href = 'https://forms.gle/GeFp73jLDiri92VL7' }}
                        >
                            Apply to staff
                        </TextButton>

                    </Box>
                </Box>
            </Box>
            <Footer />
        </PageWrapBox>
    )
}

export default HomePage; 