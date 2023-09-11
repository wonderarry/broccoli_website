import { styled } from "@mui/system";
import { Typography, useTheme, Box } from "@mui/material";
import { colorTokens } from "theme";

const FooterSection = ({ children, title }) => {
    const theme = useTheme();

    return (
        <Box
            display='flex'
            flexDirection='column'
        > 
        <Typography

            variant='h4'
            sx={{
                color: "#32fa32",
                userSelect: 'none',
                paddingBottom: '0.8rem'
            }}
        >
            {title}
        </Typography>
            {children}
        </Box>
    )
}
export default FooterSection;