import React from 'react';
import {useEffect} from 'react';
import Navbar from 'scenes/widgets/navbar';
import { Box, Typography } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';
import {useMediaQuery} from '@mui/material';

const BracketPage = () => {
    useEffect(() => {  
        window.location.href = 'https://challonge.com/BC23'
    }, [])
    return (
        <></>
    )
}

export default BracketPage