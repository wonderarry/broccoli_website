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
import hexToRgba from "ulility/hexToRgba";
import broccLogo from '../../../assets/logo.svg'

import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { DarkMode, LightMode, Menu, Close, KeyboardArrowDownSharp } from "@mui/icons-material"


const CustomDesktopMenuButton = ({ children, toWhere, color = '#000000' }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const neutralDark = color;
    const neutralMain = theme.palette.neutral.main;
    return (
        <Typography
            variant="h4"
            fontWeight='500'
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

const CustomMobileMenuButton = ({ children, toWhere, color = '#1a1a1a' }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const neutralDark = color;
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

const RegisterOverlay = ({ isOpen }) => {
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
            position="fixed"
            zIndex="15"
        >
            {/* LEFT BOX - Register as a free agent */}
            <Box
                backgroundColor={neutralDark}
                width="50vw"
                overflow='hidden'

                onClick={() => navigate('/register/agent')}
                sx={{
                    height: isOpen ? '30vh' : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: 'height 0.3s ease, opacity 0.4s ease',
                    '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: neutralAlmostDark
                    }
                }}
            >
                <Box
                    marginTop="clamp(20px, 8%, 70px)"
                    marginLeft="clamp(20px, 8%, 100px)"
                    width='60%'
                >
                    <Typography
                        variant="h0"
                        color={neutralVeryLight}
                        fontWeight={600}
                        sx={{
                            userSelect: 'none'
                        }}
                    >
                        Register as a Free Agent
                    </Typography>
                </Box>

            </Box>
            {/* RIGHT BOX - Register as a team */}
            <Box

                backgroundColor={neutralDarkMain}
                width="50vw"
                overflow='hidden'
                onClick={() => navigate('/register/team')}
                sx={{
                    height: isOpen ? '30vh' : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: 'height 0.3s ease, opacity 0.4s ease',
                    '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: neutralMain
                    }
                }}
            >
                <Box
                    marginTop="clamp(20px, 8%, 70px)"
                    marginLeft="clamp(20px, 8%, 100px)"
                    width='60%'
                >
                    <Typography
                        variant="h0"
                        color={neutralVeryLight}
                        fontWeight={600}
                        sx={{
                            userSelect: 'none'
                        }}
                    >
                        Register as a Team Captain
                    </Typography>
                </Box>
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
    const lightGrey = theme.palette.neutral.veryLight;
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


            >
                <FlexBetween>
                    <Box
                        onClick={() => navigate('/')}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }}
                    >
                        <img
                            src={broccLogo}

                        />

                    </Box>
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
                        <Typography variant="h4" fontWeight='500'>
                            Register
                        </Typography>
                        <KeyboardArrowDownSharp
                            sx={{
                                transform: isRegisterButtonClicked ? 'rotate(-180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                            }}
                        />
                    </FlexBetween>
                    <CustomDesktopMenuButton toWhere="/rules">Rules</CustomDesktopMenuButton>
                    <CustomDesktopMenuButton toWhere="/teams">Teams </CustomDesktopMenuButton>
                    <CustomDesktopMenuButton toWhere="/agents">Free Agents</CustomDesktopMenuButton>
                    <CustomDesktopMenuButton color={'#8b8b8b'} toWhere="/bracket">Bracket</CustomDesktopMenuButton>
                    <CustomDesktopMenuButton color={'#8b8b8b'} toWhere="/mappool">Mappool</CustomDesktopMenuButton>


                    {false &&
                        <FlexBetween gap="2rem">
                            <IconButton onClick={() => dispatch(setMode())}>
                                {theme.palette.mode === "dark" ? (
                                    <DarkMode sx={{ fontSize: "25px" }} />
                                ) : (
                                    <LightMode sx={{ color: neutralDark, fontSize: "25px" }} />
                                )}
                            </IconButton>
                        </FlexBetween>
                    }

                </FlexBetween>}
                {/* MOBILE NAVIGATION */}
                {!isNonMobileScreens && (
                    <FlexBetween gap="25px">
                        {false && (<IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: neutralDark, fontSize: "25px" }} />
                            )}
                        </IconButton>)}
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

                    <CustomMobileMenuButton toWhere='/rules'>Rules</CustomMobileMenuButton>
                    <CustomMobileMenuButton toWhere='/teams'>Teams</CustomMobileMenuButton>
                    <CustomMobileMenuButton toWhere='/agents'>Agents</CustomMobileMenuButton>
                    <CustomMobileMenuButton color={'#8b8b8b'} toWhere='/bracket'>Bracket</CustomMobileMenuButton>
                    <CustomMobileMenuButton color={'#8b8b8b'} toWhere='/mappool'>Mappool</CustomMobileMenuButton>
                    <CustomMobileMenuButton toWhere='/register/agent'>Agent Registration</CustomMobileMenuButton>
                    <CustomMobileMenuButton toWhere='/register/team'>Team Registration</CustomMobileMenuButton>

                </Box>
            )}
            {isNonMobileScreens && (
                <RegisterOverlay
                    isOpen={isRegisterButtonClicked}
                />
            )}
        </Box>
    )
}

export default Navbar;