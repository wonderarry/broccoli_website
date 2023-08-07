import {
    Box,
    useTheme,
    Typography,
    Icon,
    IconButton,
    Checkbox
} from "@mui/material";

import { useState } from "react";
import { CheckBoxSharp } from "@mui/icons-material";

const TickboxOption = ({ children, defaultState = false, onClickAction }) => {
    const theme = useTheme();


    const usedColor = theme.palette.neutral.dark; // to be changed when used on dark bgs
    const [isToggled, setIsToggled] = useState(defaultState);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <Box
                onClick={() => {
                    onClickAction();
                    setIsToggled(!isToggled);
                }}
            >
                <Checkbox
                    checked={isToggled}
                    size="large"
                    sx={{
                        '&.Mui-checked': {
                            color: usedColor
                        },
                        '&:hover':{
                            backgroundColor: 'transparent!important'
                        }
                    }}
                />
            </Box>
            <Typography
                variant='h4'

                sx={{
                    paddingLeft: isToggled ? '0.5rem' : 0,
                    transition: 'padding-left 0.5s',
                    color: usedColor,
                    paddingBottom: '0.07rem'
                }}
            >
                {children}
            </Typography>
        </Box>
    )
}

export default TickboxOption;