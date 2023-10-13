import {
    TextField,
    useTheme,
    Box,
    Typography,
    InputBase
} from "@mui/material";
import React, { useRef, useState } from 'react';
import searchIcon from '../assets/searchicon.svg';

const CustomSearchBar = ({ placeholder, onChangeAction }) => {
    const theme = useTheme();
    const [value, setValue] = useState("");

    const handleValueChange = (event) => {
        setValue(event.target.value);
        onChangeAction(event.target.value);
    }

    return (
        <Box
            sx={{
                borderBottom: '1px solid #000B0F'
                
            }}
        >
            <InputBase 
                placeholder={placeholder}
                onChange={handleValueChange}
                sx={{
                    paddingRight: '0.8rem',
                    fontSize: [16, '!important']
                }}
                inputProps={{
                    maxLength: 48
                }}
            />
            <img src={searchIcon} style={{
                height: '16px',
                width: '16px',
                marginBottom: '-0.1rem',
                marginRight: '0.3rem'
            }}/>
        </Box>
    )
}

export default CustomSearchBar;