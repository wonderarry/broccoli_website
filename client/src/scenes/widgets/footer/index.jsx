import { Typography, useTheme, useMediaQuery, Box } from "@mui/material";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import FooterEntries from "./FooterEntries";
import FooterSection from "./FooterSection";
import { useNavigate } from "react-router-dom";
import discordLogo from '../../../assets/discord.svg'
import discordMiniLogo from '../../../assets/discordmini.svg'
import osuMiniLogo from '../../../assets/osumini.svg'
import arrowUpIcon from '../../../assets/arrowup.svg'

const Footer = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    
    return (
        <Box
            display='flex'
            sx={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'black',
            }}
        >
            {isNonMobileScreens && (
                <Box
                    display='inline-flex'
                    width="70%"
                    sx={{
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        paddingTop: '2rem',
                        marginRight: '20vw',
                        rowGap: '4rem',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}
                >

                    <Box
                        onClick={() => { window.location.href = 'https://discord.gg/gqYdbYBRBN' }}
                    >
                        <img src={discordLogo} />
                    </Box>
                    {/* General - Home, Registers, Apply to staff, Forum post */}
                    <FooterSection title='General'>
                        <FooterEntries onTap={() => navigate('/')}>Home</FooterEntries>
                        <FooterEntries onTap={() => navigate('/register/agent')}>Register as Free Agent</FooterEntries>
                        <FooterEntries onTap={() => navigate('/register/team')}>Register as Team</FooterEntries>
                        <FooterEntries
                            onTap={() => {
                                window.location.href = 'https://forms.gle/GeFp73jLDiri92VL7'
                            }}
                        >
                            Apply to staff
                        </FooterEntries>
                        <FooterEntries onTap={() => {
                            window.location.href = 'https://www.google.com/search?q=forum+post&newwindow=1'
                        }}>Forum Post</FooterEntries>
                    </FooterSection>

                    {/* Information - Rules, Mappool, Bracket */}
                    <FooterSection title="Information">
                        <FooterEntries onTap={() => navigate('/rules')}>Rules</FooterEntries>
                        <FooterEntries onTap={() => navigate('/mappool')}>Mappool</FooterEntries>
                        <FooterEntries onTap={() => navigate('/bracket')}>Bracket</FooterEntries>
                    </FooterSection>
                    {/* Participants - Free agents, Teams */}
                    <FooterSection title="Participants">
                        <FooterEntries onTap={() => navigate('/agents')}>Free Agents</FooterEntries>
                        <FooterEntries onTap={() => navigate('/teams')}>Teams</FooterEntries>
                    </FooterSection>
                </Box>
            )}
            {!isNonMobileScreens && (
                <Box
                    width='92%'
                    display='flex'
                    gap='1rem'
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Box
                        onClick={() => { window.location.href = 'https://www.google.com/search?q=discord&newwindow=1' }}
                        sx={{
                            borderRadius: '6px',
                            padding: '24px',
                            border: '2px solid #00FF80'
                        }}
                    >
                        <img src={discordMiniLogo} style={{ userSelect: 'none' }} />
                    </Box>
                    <Box
                        onClick={() => { window.location.href = 'https://www.google.com/search?q=forum+post&newwindow=1' }}
                        sx={{
                            borderRadius: '6px',
                            paddingY: '22px',
                            paddingX: '24px',
                            border: '2px solid #00FF80'
                        }}
                    >
                        <img src={osuMiniLogo} style={{ userSelect: 'none' }} />
                    </Box>
                    <Box
                        onClick={() => {
                            document.body.scrollTop = 0; // For Safari
                            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        }}
                        sx={{
                            flex: 10,
                            borderRadius: '8px',
                            marginY: '1.5rem',
                            paddingY: '2rem',
                            border: '2px solid',
                            borderColor: 'white',
                            justifyContent: 'center',
                            display: 'flex',
                            transition: '0.3s ease',
                            '&:hover': {
                                borderColor: '#858585'
                            },
                            '&:active': {
                                borderColor: '#4D4D4D'
                            }
                        }}
                    >
                        <img src={arrowUpIcon} style={{ userSelect: 'none' }} />
                    </Box>
                </Box>
            )}

            <Typography
                variant='watermark'
                sx={{
                    fontWeight: 400,
                    color: theme.palette.neutral.light,
                    opacity: 0.6,
                    paddingBottom: '1.5rem'
                }}
            >
                © BROCCOLI CUP 2023
            </Typography>

        </Box>
    )

}

export default Footer;