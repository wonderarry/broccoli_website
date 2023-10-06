import {
    useTheme,
    Box,
    Typography,
    IconButton,
    useMediaQuery,
    Paper
} from "@mui/material";
import React, { useRef, useState, useEffect } from 'react';

const RegisterNotification = ({ children, onClose, color="#000000", autoCloseTimer = 8000 }) => {
    const [isClosed, setIsClosed] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [isShown, setIsShown] = useState(false);

    // useEffect that will start the closing animation and then call onClose
    useEffect(() => {
        if (isClosed) {
            setIsShown(false);
            console.log('internally closed, 300ms delay until external trigger')
            setTimeout(() => {
                onClose();
            }, 300)
        }
    }, [isClosed])

    // useEffect that will start the countdown for automatic close
    useEffect(() => {
        setTimeout(() => {
            if (!isClosed) {
                setIsClosed(true);
            }
        }, autoCloseTimer)
        setTimeout(() => {
            setIsShown(true);
        }, 300)
    }, [])

    useEffect(() => {
        console.log('isShown: ', isShown, '\nisClosed: ', isClosed)
    })


    const paperStyles = isNonMobileScreens ? {
        maxWidth: '88vw',
        right: '1.5%',
    } : {
        width: '88vw',
        left: '5dvw'
    };

    return (
        <Paper
            sx={{
                ...paperStyles,
                position: 'fixed',
                backgroundColor: '#f2f2f2',
                zIndex: 100,
                top: '5.5%',
                opacity: isShown ? 1 : 0,
                transform: isShown ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
            elevation={2}
            onClick={() => { console.log("clicked paper"); setIsClosed(true) }}
        >
            <Box
                sx={{
                    paddingX: '1rem',
                    paddingY: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant='h4'
                    fontWeight={400}
                    sx={{
                        color: color,
                        textAlign: 'center'
                    }}
                >
                    {children}
                </Typography>
                {!isNonMobileScreens &&
                    <Typography
                        sx={{
                            color: '#b2b2b2',
                            paddingTop: '0.6rem',
                            marginBottom: '-0.5rem'
                        }}
                    >
                        Tap to close
                    </Typography>
                }
            </Box>
        </Paper>
    )
}

export default RegisterNotification;