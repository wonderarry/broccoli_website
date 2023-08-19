import { styled } from "@mui/system";
import { Typography, useTheme } from "@mui/material";
import { colorTokens } from "theme";



const FooterEntries = styled(Typography)({
    
    color: colorTokens['grey'][100],
    fontWeight: 500,
    fontSize: 18
})
export default FooterEntries;