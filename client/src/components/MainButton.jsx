import { 
    Box,
    Paper,
    useTheme,
    Typography,
    
    } from "@mui/material";

const MainButton = ({ children, onClickAction, overridePalette=null, overrideWidth=null}) => {
    const theme = useTheme();
    
    
    const bgColor = !overridePalette ? theme.palette.neutral.light : overridePalette['bgColor'];
    const bgColorAlt = !overridePalette ? theme.palette.neutral.medium : overridePalette['bgColorAlt'];
    const textColor = !overridePalette ? theme.palette.neutral.dark : overridePalette['textColor'];

    const activeColor = !overridePalette ? theme.palette.neutral.main : overridePalette['activeColor'];

    let paperStyles = {
        borderRadius: '5px',
        marginBottom: '1rem',
        cursor: 'pointer',
        display: 'inline-block',
        transition: 'background-color 0.4s',
        backgroundColor: bgColor,
        '&:hover': {
            backgroundColor: bgColorAlt
        },
        '&:active': {
            backgroundColor: activeColor
        }
    }

    if (overrideWidth !== null) {
        paperStyles = {...paperStyles, width: overrideWidth};
    }

    return(
        <Paper
            elevation={0}
            onClick={onClickAction}
            sx={paperStyles}
        >
            <Typography
                variant='h5'
                align='center'
                sx={{
                    color: textColor,
                    userSelect: 'none',
                    padding: '1rem 3.5rem',
                    fontWeight: '500',
                }}
            >
                {children}
            </Typography>
        </Paper>
    )
}

export default MainButton;