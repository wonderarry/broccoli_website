import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    InputLabel,
    Icon
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { DarkMode, LightMode, Menu, Close, KeyboardArrowDownSharp } from "@mui/icons-material"


const CustomDesktopMenuButton = ({ children, toWhere }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const neutralDark = theme.palette.neutral.dark;
    const neutralMain = theme.palette.neutral.main;
    return (
        <Typography
            variant="h4"
            color={neutralDark}
            onClick={() => navigate(toWhere)}
            sx={{
                color: neutralDark,
                userSelect: 'none',
                "&:hover": {
                    color: neutralMain,
                    cursor: "pointer"
                }
            }}
        >
            {children}
        </Typography>
    )
}

const CustomMobileMenuButton = ({ children, toWhere }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const neutralDark = theme.palette.neutral.dark;
    const neutralMain = theme.palette.neutral.main;
    const neutralMedium = theme.palette.neutral.medium;
    return (
        <Typography
            variant="h3"
            color={neutralDark}
            onClick={() => navigate(toWhere)}
            sx={{
                color: neutralDark,
                paddingLeft: '8%',
                paddingBottom: '1.2rem',
                paddingTop: '1.2rem',
                borderColor: neutralMedium,
                fontWeight: '400',
                userSelect: 'none',
                textDecoration: "underline",
                "&:hover": {
                    color: neutralMain,
                    cursor: "pointer"
                }
            }}
        >
            {children}
        </Typography>
    )
}

const RegisterOverlay = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const neutralLight = theme.palette.neutral.light;
    const neutralDarkMain = theme.palette.neutral.darkMain;
    const neutralDark = theme.palette.neutral.dark;
    const neutralVeryLight = theme.palette.neutral.veryLight;
    const neutralMain = theme.palette.neutral.main;
    const neutralAlmostDark = theme.palette.neutral.almostDark;
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"

        >
            {/* LEFT BOX - Register as a free agent */}
            <Box
                backgroundColor={neutralDark}
                width="50vw"
                height="30vh"
                onClick={() => navigate('/register/agent')}
                sx={{
                    '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: neutralAlmostDark
                    }
                }}
            >
                <Typography
                    variant="h1"
                    color={neutralVeryLight}
                    fontWeight={600}
                    marginTop="clamp(20px, 8%, 70px)"
                    marginLeft="clamp(20px, 8%, 100px)"
                    sx={{
                        userSelect: 'none'
                    }}
                >
                    Register as<br /> Free Agent
                </Typography>
            </Box>
            {/* RIGHT BOX - Register as a team */}
            <Box

                backgroundColor={neutralDarkMain}
                width="50vw"
                height="30vh"
                onClick={() => navigate('/register/team')}
                sx={{
                    '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: neutralMain
                    }
                }}
            >
                <Typography
                    variant="h1"
                    color={neutralVeryLight}
                    fontWeight={600}
                    marginTop="clamp(20px, 8%, 70px)"
                    marginLeft="clamp(20px, 8%, 100px)"
                    sx={{
                        userSelect: 'none'
                    }}
                >
                    Register as<br /> Team Captain
                </Typography>
            </Box>
        </Box>
    )
}



const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenu] = useState(false);
    const [isRegisterButtonClicked, setIsRegisterButton] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    //const isNonMobileScreens = false;
    const theme = useTheme();
    const lightGrey = theme.palette.neutral.light;
    const neutralDark = theme.palette.neutral.dark;
    const background = theme.palette.neutral.default;
    const primaryLight = theme.palette.primary.light;
    const primaryMain = theme.palette.primary.main;
    const neutralMain = theme.palette.neutral.main;
    const neutralMedium = theme.palette.neutral.medium;
    return (
        <Box
            flexDirection="column"
        >
            <FlexBetween
                padding="1rem 6%"
                backgroundColor={lightGrey}
                borderBottom="1px solid"
                borderColor={neutralMedium}
            >
                <FlexBetween>
                    <Typography
                        fontWeight="600"
                        fontSize="clamp(1rem, 2rem, 2.25rem)"
                        color={primaryMain}
                        onClick={() => navigate("/")}
                        sx={{
                            userSelect: 'none',
                            whiteSpace: 'nowrap',
                            "&:hover": {
                                color: primaryLight,
                                cursor: "pointer",
                            }
                        }}
                    >
                        Broccoli Cup 3
                    </Typography>
                </FlexBetween>
                {/* DESKTOP NAVIGATION */}
                {/* If the device is not mobile, this gets shown */}
                {isNonMobileScreens && <FlexBetween sx={{ flexBasis: "max(600px, 60%)" }}>
                    { /* Plan with the register button is to work on Typography's onClick event */}
                    <FlexBetween
                        onClick={() => setIsRegisterButton(!isRegisterButtonClicked)}
                        sx={{
                            marginRight: "-0.5rem",
                            color: neutralDark,
                            userSelect: 'none',
                            "&:hover": {
                                color: neutralMain,
                                cursor: "pointer"
                            }
                        }}
                    >
                        <Typography variant="h4">
                            Register
                        </Typography>
                        <KeyboardArrowDownSharp />
                    </FlexBetween>
                    <CustomDesktopMenuButton toWhere="/teams">Teams </CustomDesktopMenuButton>
                    <CustomDesktopMenuButton toWhere="/agents">Free Agents</CustomDesktopMenuButton>
                    <CustomDesktopMenuButton toWhere="/bracket">Bracket</CustomDesktopMenuButton>
                    <CustomDesktopMenuButton toWhere="/rules">Rules</CustomDesktopMenuButton>
                    <CustomDesktopMenuButton toWhere="/mappool">Mappool</CustomDesktopMenuButton>
                    <FlexBetween gap="2rem">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: neutralDark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>}
                {/* MOBILE NAVIGATION */}
                {!isNonMobileScreens && (
                    <FlexBetween gap="25px">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: neutralDark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <IconButton onClick={() => setIsMobileMenu(!isMobileMenuToggled)}>
                            {!isMobileMenuToggled ? (
                                <Menu sx={{ fontSize: "25px" }} />
                            ) : (
                                <Close sx={{ fontSize: '25px' }} />
                            )}

                        </IconButton>
                    </FlexBetween>
                )}





            </FlexBetween>
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    sx={{
                        position: 'fixed',
                        width: '100%',
                        backgroundColor: lightGrey,
                        paddingTop: '5%',
                        paddingBottom: '8%',
                        zIndex: 20,
                    }}
                >
                    <CustomMobileMenuButton toWhere='/teams'>Teams</CustomMobileMenuButton>
                    <CustomMobileMenuButton toWhere='/agents'>Agents</CustomMobileMenuButton>
                    <CustomMobileMenuButton toWhere='/bracket'>Bracket</CustomMobileMenuButton>
                    <CustomMobileMenuButton toWhere='/rules'>Rules</CustomMobileMenuButton>
                    <CustomMobileMenuButton toWhere='/mappool'>Mappool</CustomMobileMenuButton>
                    <CustomMobileMenuButton toWhere='/register/agent'>Agent Registration</CustomMobileMenuButton>
                    <CustomMobileMenuButton toWhere='/register/team'>Team Registration</CustomMobileMenuButton>
                </Box>
            )}
            {isNonMobileScreens && isRegisterButtonClicked && <RegisterOverlay />}
        </Box>
    )
}

export default Navbar;