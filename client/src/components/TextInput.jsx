import {
    TextField,
    useTheme,
    Box,
    Typography,
    InputBase
} from "@mui/material";

import hexToRgba from "ulility/hexToRgba";



const TextInput = ({ title, placeholder, validationType, value, onChangeAction }) => {
    // validationType denotes whether data is discordId or osuId
    const theme = useTheme();

    const titleColor = theme.palette.neutral.dark;

    return (
        <Box
            sx={{
                display: 'column',
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
                sx={{
                    fontSize: theme.typography.h4.fontSize,
                    '& input': {
                        borderBottom: '2px solid',
                        borderColor: hexToRgba(titleColor, 0.4),
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