import {
    TextField,
    useTheme,
    Box,
    Typography,
    InputBase
} from "@mui/material";
import React, { useRef, useState } from 'react'

import hexToRgba from "ulility/hexToRgba";



const TextInput = ({ title, placeholder, validationType, initialValue, onChangeAction }) => {
    // validationType denotes whether data is discordId or osuId
    const theme = useTheme();
    const [value, setValue] = useState(initialValue);

    const controlPressRef = useRef(false);
    const titleColor = theme.palette.neutral.dark;


    const handleValueChange = (event) => {
        setValue(event.target.value)
        onChangeAction(event.target.value);

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


    return (
        <Box
            sx={{
                display: 'column',
                paddingBottom: '2.5rem'
            }}
        >
            <Typography
                variant="h3"
                color={titleColor}
                fontWeight='500'
                sx={{
                    paddingBottom: '1rem'
                }}
            >
                {title}
            </Typography>

            <InputBase
                placeholder={placeholder}
                onChange={handleValueChange}
                onKeyDown={
                    validationType == 'osuId' ? osuInputValidation : discordInputValidation
                }
                onKeyUp={
                    (event) => {
                        //console.log('released: ', event.key)
                        if (event.key == 'Control' || event.key == 'Command') {
                            controlPressRef.current = false;
                            //console.log('ctrl key up')
                        }
                    }
                }
                sx={{
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
                            paddingBottom: '6px',
                            paddingLeft: '4px',
                            borderColor: hexToRgba(titleColor, 1),
                        }
                    }
                }}
            />
        </Box>
    )

}

export default TextInput;