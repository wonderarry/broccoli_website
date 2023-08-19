import {
    Box,
    useTheme,
    Typography,
    Icon,
    IconButton,
    Checkbox
} from "@mui/material";

import { useState, useRef } from "react";
import { CheckBoxSharp } from "@mui/icons-material";

const TickboxOption = ({ children, defaultState=false, disabled=false, onClickAction }) => {
    const theme = useTheme();
    const usedColor = theme.palette.neutral.dark; // to be changed when used on dark bgs
    const [isToggled, setIsToggled] = useState(defaultState);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                opacity: disabled ? 0.4 : 1,
                transition: 'opacity 0.3s ease',
                pointerEvents: disabled ? 'none' : 'auto'
            }}
            onClick={() => {
                onClickAction(!isToggled);
                setIsToggled(!isToggled);
            }}
        >
            <Box>
                <Checkbox
                    checked={isToggled}
                    size="large"
                    disabled={disabled}
                    sx={{
                        '&.Mui-checked': {
                            color: usedColor
                        },
                        '&:hover':{
                            backgroundColor: 'transparent!important'
                        }
                    }}
                disableRipple />
            </Box>
            <Typography
                variant='h4'

                sx={{
                    paddingLeft: isToggled ? '0.5rem' : 0,
                    transition: 'padding-left 0.5s',
                    color: usedColor,
                    paddingBottom: '0.07rem',
                    userSelect: 'none',
                }}
            >
                {children}
            </Typography>
        </Box>
    )
}

export default TickboxOption;