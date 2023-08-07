import { 
    Box,
    Paper,
    useTheme,
    Typography,
    } from "@mui/material";

const MainButton = ({ children, isWhite=true, onClickAction }) => {
    const theme = useTheme();

    const bgColor = isWhite ? theme.palette.neutral.light : theme.palette.neutral.darkMain;
    const bgColorAlt = isWhite ? theme.palette.neutral.medium : theme.palette.neutral.main;
    const textColor = isWhite ? theme.palette.neutral.dark : theme.palette.neutral.light;
    return(
        <Paper
            elevation={0}
            onClick={onClickAction()}
            sx={{
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'inline-block',
                transition: 'background-color 0.4s',
                backgroundColor: bgColor,
                '&:hover': {
                    backgroundColor: bgColorAlt
                }
            }}
        >
            <Typography
                variant='h5'
                align='center'
                sx={{
                    color: textColor,
                    userSelect: 'none',
                    padding: '1rem 2.5rem',
                    fontWeight: '500',
                }}
            >
                {children}
            </Typography>
        </Paper>
    )
}

export default MainButton;