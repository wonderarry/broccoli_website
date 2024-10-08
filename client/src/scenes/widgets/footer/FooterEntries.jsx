import { styled } from "@mui/system";
import { Typography, useTheme, Box } from "@mui/material";
import { colorTokens } from "theme";


const FooterEntries = ({ onTap, children }) => {
    const theme = useTheme();
    return (
        <Typography
            onClick={onTap}
            variant='h4'
            sx={{
                color: colorTokens['grey'][100],
                "&:hover": {
                    color: colorTokens['grey'][200],
                    cursor: "pointer"
                },
                
                userSelect: 'none',
                paddingBottom: '0.8rem'
            }}
        >
            {children}
        </Typography>
    )
}
export default FooterEntries;