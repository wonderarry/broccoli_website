import { 
    Box,
    useTheme,
    Typography,
   
    } from "@mui/material";



const TextButton = ({children, onClickAction}) => {
    const theme = useTheme();

    const textColor = theme.palette.neutral.dark;

    return (
        <Box
            sx={{
                display: 'inline-block'
            }}
            onClick={onClickAction()}
        >
            <Typography
                variant="h5"
                align='center'
                sx={{
                    color: textColor,
                    fontWeight: 500,
                    padding: '1rem'
                }}
            >
                {children}
            </Typography>
        </Box>

    )
}

export default TextButton;