import {
    TextField,
    useTheme,
    Box,
    Typography,
    InputBase,
    IconButton,
    useMediaQuery
} from "@mui/material";
import React, { useRef, useState, useEffect } from 'react'

import { CloseSharp, SettingsEthernet } from "@mui/icons-material";

import hexToRgba from "ulility/hexToRgba";


const RegisteringTeamMember = ({ playerIndex, onChangeOsuId, onChangeDiscordId, onDeletePlayer, enumval }) => {
    // validationType denotes whether data is discordId or osuId
    const theme = useTheme();
    const [osuId, setOsuId] = useState("");
    const [discordId, setDiscordId] = useState("");
    const isNonMobileScreens = useMediaQuery("(min-width: 750px)");
    const controlPressRef = useRef(false);
    const titleColor = theme.palette.neutral.dark;


    const handleOsuIdChange = (event) => {
        setOsuId(event.target.value)
        onChangeOsuId(playerIndex, event.target.value);
    }

    const handleDiscordIdChange = (event) => {

        setDiscordId(event.target.value)
        onChangeDiscordId(playerIndex, event.target.value);
    }


    const [syntheticTrigger, setSyntheticTrigger] = useState(false)

    const handleDeletePlayer = (event) => {
        setSyntheticTrigger(true);
        // const interval = setInterval(() => {
        //     clearInterval(interval)
        //     onDeletePlayer(playerIndex);
        // }, 1000);
    }

    const osuInputValidation = (event) => {
        if (event.ctrlKey) {
            controlPressRef.current = true;
            
        }
        
        if (!/[0-9]/.test(event.key) && event.key.length == 1) {
            if (
                !(
                    controlPressRef.current &&
                    (event.key == 'a' || event.key == 'c' || event.key == 'v')
                )
            ) {
            
                event.preventDefault();
            }

        }
    }

    const discordInputValidation = (event) => {
        if (!/^[A-Za-z0-9_.@]$/.test(event.key) && event.key.length == 1) {
            event.preventDefault();
        }
    }

    const inputStyles = {
        fontSize: theme.typography.h4.fontSize,
        '& input': {
            borderBottom: '2px solid',
            borderColor: hexToRgba(titleColor, 0.7),
            paddingBottom: '3px',
            transition: 'border-color 0.3s, color 0.6s, padding-bottom 0.2s, opacity 0.4s, padding-left 0.2s',
            opacity: isNonMobileScreens ? 0.4 : 0.6,
            '&:not(:placeholder-shown)': {
                opacity: 1,
            },
            '&:focus': {

                borderColor: hexToRgba(titleColor, 1),
            }
        }
    }




    const osuStyles = isNonMobileScreens ? {
        width: '200px', paddingRight: '2rem'
    } : {
        width: '90%', paddingBottom: '1.5rem'
    }
    const discordStyles = isNonMobileScreens ? {
        width: '300px', paddingRight: '1.2rem'
    } : {
        width: '90%', paddingBottom: '1.5rem'
    }


    const [isExpandReady, setIsExpandReady] = useState(false);

    const expandingStyles = isExpandReady ? {
        paddingBottom: '2rem',
        height: 'auto'
    } : {
        height: 0
    }

    // const firstUpdate = useRef(true)

    useEffect(() => {
        console.log('event triggered!, id = ', playerIndex)
        // console.log(firstUpdate.current, lastUpdate.current)
        // if (firstUpdate.current) {
        //     firstUpdate.current = false;
        //     return;
        // }
        if (!syntheticTrigger) {
            setIsExpandReady(true);
            
        }
        else {
            setIsExpandReady(false);
            const interval = setInterval(() => {
                clearInterval(interval)
                onDeletePlayer(playerIndex);
            }, 200);
        }
    })

    //osu id to the left, discord id to the right
    return (
        <Box
            display='flex'

            key={playerIndex}
            sx={{
                transition: 'height 0.2s ease, padding 0.2s ease, transform 0.2s ease, margin 0.2s ease',
                flexDirection: isNonMobileScreens ? 'row' : "column",
                alignItems: 'center',
                borderRadius: '10px',
                overflow: 'hidden',
                width: '88vw',
                backgroundColor: isNonMobileScreens ? theme.palette.background.default : theme.palette.neutral.light,
                transform: isExpandReady ? 'scaleY(1)' : 'scaleY(0)',
                paddingBottom: isExpandReady ? '2rem' : 0,
                marginTop: isExpandReady ? '1rem' : 0,
                marginBottom: isExpandReady ? '1rem' : 0,
                height: isExpandReady ? (isNonMobileScreens ? '4rem' : '12rem') : 0,
            }}
        >
            {isNonMobileScreens && (
                <Typography
                    variant="h3"
                    sx={{
                        paddingRight: '2rem',
                        fontWeight: '500',
                        width: '55px'
                    }}
                >
                    {enumval}
                </Typography>
            )}
            {!isNonMobileScreens && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',

                        width: '100%',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            paddingLeft: '1rem',
                            paddingTop: '0.7rem',
                            fontWeight: '600',
                            width: '55px'
                        }}
                    >
                        {enumval}
                    </Typography>
                    <IconButton
                        onClick={handleDeletePlayer}
                        sx={{
                            marginTop: '0rem'
                        }}
                        disableRipple={true}
                    >
                        <CloseSharp fontSize="large" sx={{
                            color: 'black',

                        }} />
                    </IconButton>
                </Box>
            )}

            <InputBase
                placeholder='osu! Id'
                onChange={handleOsuIdChange}
                onKeyDown={osuInputValidation}
                onKeyUp={
                    (event) => {
                        //console.log('released: ', event.key)
                        if (event.key == 'Control' || event.key == 'Command') {
                            controlPressRef.current = false;
                            //console.log('ctrl key up')
                        }
                    }
                }
                sx={{ ...inputStyles, ...osuStyles }}
            />
            <InputBase
                placeholder='Discord Tag'
                onChange={handleDiscordIdChange}
                onKeyDown={discordInputValidation}
                sx={{ ...inputStyles, ...discordStyles }}
            />

            {isNonMobileScreens && (
                <IconButton
                    onClick={handleDeletePlayer}
                    sx={{
                        marginBottom: '0.3rem'
                    }}
                    disableRipple={true}
                >
                    <CloseSharp fontSize="large" sx={{
                        color: 'black',

                    }} />
                </IconButton>
            )}
        </Box>
    )

}

export default RegisteringTeamMember;