import { Typography, useTheme, useMediaQuery, Box } from "@mui/material";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import FooterEntries from "./FooterEntries";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isSmallScreens = useMediaQuery("(max-width: 500px");
    return (
        <Box
            display='flex'
            sx={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'black',
            }}
        >
            <Box
                display='grid'
                width="90%"
                sx={{
                    alignItems: 'center',
                    padding: '2rem',
                    paddingLeft: isSmallScreens ? '4rem' : '2rem',
                    gridTemplateColumns: isNonMobileScreens ? (
                        'repeat(4, 1fr)'
                    ) : ( 
                        isSmallScreens ? '1fr' : '1fr 1fr'
                    ),
                    justifyItems: isSmallScreens ?'left' : 'center'
                }}
            >
                <FooterEntries>Home</FooterEntries>
                <FooterEntries>Rules</FooterEntries>
                <FooterEntries>Free Agents</FooterEntries>
                <FooterEntries>Forum Post</FooterEntries>
                <FooterEntries>Register</FooterEntries>
                <FooterEntries>Mappool</FooterEntries>
                <FooterEntries>Teams</FooterEntries>
                <FooterEntries>Discord</FooterEntries>
                <FooterEntries>Apply to staff</FooterEntries>
                <FooterEntries>Bracket</FooterEntries>
            </Box>
            <Typography
                variant='h2'
                sx={{
                    fontWeight: 600,
                    color: theme.palette.neutral.light,
                    opacity: 0.6,
                    paddingBottom: '1.5rem'
                }}
            >
                Broccoli Cup 2023
            </Typography>
            
        </Box>
    )

}

export default Footer;