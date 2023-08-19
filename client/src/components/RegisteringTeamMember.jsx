import {
    TextField,
    useTheme,
    Box,
    Typography,
    InputBase,
    IconButton
} from "@mui/material";
import React, { useRef, useState } from 'react'


import { CloseSharp } from "@mui/icons-material";

import hexToRgba from "ulility/hexToRgba";



const RegisteringTeamMember = ({ playerIndex, onChangeOsuId, onChangeDiscordId, onDeletePlayer }) => {
    // validationType denotes whether data is discordId or osuId
    const theme = useTheme();
    const [osuId, setOsuId] = useState("");
    const [discordId, setDiscordId] = useState("");

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

    const osuInputValidation = (event) => {
        if (event.ctrlKey) {
            controlPressRef.current = true;
            //console.log('ctrl key down')
        }
        //console.log(event.key)
        //console.log(controlPressRef.current)
        if (!/[0-9]/.test(event.key) && event.key.length == 1) {
            if  (
                    !(
                        controlPressRef.current &&
                        (event.key == 'a' || event.key == 'c' || event.key == 'v')
                    )
                ){
                    //console.log('event prevented')
                    event.preventDefault();
                }
                
        }
    }

    const discordInputValidation = (event) => {
        //console.log(event.key)
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
            opacity: 0.4,
            '&:not(:placeholder-shown)': {
                opacity: 1,
            },
            '&:focus': {
                
                borderColor: hexToRgba(titleColor, 1),
            }
        }
    }

    //osu id to the left, discord id to the right
    return (
        <Box
            sx={{
                display: 'row',
                paddingBottom: '2.5rem'
            }}
        >
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
                sx={{...inputStyles, width: '150px', paddingRight: '1.6rem'}}
            />
            <InputBase 
                placeholder='Discord Tag'
                onChange={handleDiscordIdChange}
                onKeyDown={discordInputValidation}
                sx={{...inputStyles, paddingRight: '0.5rem'}}
            />
            <IconButton
                onClick={onDeletePlayer(playerIndex)}
            >
                <CloseSharp fontSize="large" sx={{color: 'black'}} />
            </IconButton>
        </Box>
    )

}

export default RegisteringTeamMember;