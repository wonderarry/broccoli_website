import { 
    Box,
    useTheme,
    Typography,
   
    } from "@mui/material";

import { useState } from "react";
import hexToRgba from "ulility/hexToRgba";

const TextButton = ({children, onClickAction}) => {
    const theme = useTheme();

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const textColor = theme.palette.neutral.dark;

    const underlineStyles = {
        height: '1.5px',
        width: isHovered ? '100%' : '0',
        backgroundColor: hexToRgba(textColor, 0.7),
        transition: 'width 0.3s ease-in-out',
    };

    return (
        <Box
            sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                padding: '0.2rem'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClickAction}
        >
            <Typography
                variant="h5"
                align="center"
                sx={{
                    color: textColor,
                    fontWeight: 500,
                    userSelect: 'none'
                }}
            >
                {children}
            </Typography>
            <div style={underlineStyles} />
        </Box>
    );
}

export default TextButton;