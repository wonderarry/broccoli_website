import React, { useState, useEffect, useReducer } from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box, Typography } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';
import CustomSearchBar from 'components/CustomSearchBar';
import RegisterNotification from 'components/RegisterNotification';
import CaptainIcon from '../../assets/captainicon.svg'
import DiscordTeams from '../../assets/discordteams.svg'
import MainButton from 'components/MainButton';
import { useNavigate } from 'react-router-dom';

const TeamComponent = ({ data, onInteract, itemIndex }) => {
    const captainIndex = data.captainIndex;
    const leaderDiscord = data.leaderDiscord;
    //console.log(leaderDiscord);
    const isNonSmallScreen = useMediaQuery("(min-width:480px)") ? 1 : 0;

    const isVerySmallScreen = useMediaQuery("(max-width:360px)") ? 1 : 0;

    const [isExpanded, setIsExpanded] = useState(0);

    const handleDiscordButtonClick = () => {
        if (!(isExpanded === 3)) {
            setIsExpanded(1);
            onInteract(leaderDiscord);
        }
        else {
            onInteract(leaderDiscord);
        }
    }
    /* 
    Idea is we split the transition into discrete steps:
        1. The text moves outside the boundaries of the button upwards and becomes transparent
        2. Text gets translated below the button and the text is changed
        3. Text moves from below to original position and regains opacity
    */

    useEffect(() => {
        if (isExpanded === 1) {
            setTimeout(() => {
                setIsExpanded(2)
            }, 300);
        }
        else if (isExpanded === 2) {
            setTimeout(() => {
                setIsExpanded(3)
            }, 100)
        }
    }, [isExpanded])

    const typographyStyleStates = (isExpanded === 0) ? {
        transform: 'translateY(0)',
        opacity: 1,
        transition: '0.3s'
    } : ((isExpanded === 1) ? {
        transform: 'translateY(-1.4rem)',
        opacity: 0,
        transition: '0.3s'
    } : ((isExpanded === 2) ? {
        transform: 'translateY(2rem)',
        opacity: 0,
        transition: '0.1s',
    } : {
        transform: 'translateY(0)',
        opacity: 1,
        transition: '0.3s'
    }))

    return (
        <Box
            sx={{

                margin: '1rem',
                paddingY: '1rem',
                paddingLeft: '1.5rem',
                backgroundColor: '#eaeaea',
                borderRadius: '15px',

            }}
        >
            <Typography
                variant='h5'
                sx={{
                    display: 'inline',
                    paddingRight: '0.7rem',
                    color: '#33cc33'
                }}
            >
                {`#${itemIndex}`}
            </Typography>
            <Typography
                variant="h3"
                sx={{
                    display: 'inline',
                    paddingBottom: '0.5rem',
                    paddingLeft: '0.5rem',
                    paddingRight: '1rem',
                    fontWeight: 600
                }}
            >
                {data.teamName}
            </Typography>
            <Typography
                variant='h6'
                sx={{

                    paddingRight: '0.7rem',
                    color: '#888888',
                    wordWrap: 'nowrap'
                }}
            >
                {`Avg rank: ${data.averageRank}`}
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${isNonSmallScreen + 1}, 1fr)`,
                }}
            >
                {

                    data.members.map((item, index) => {
                        if (item === null) {
                            return (<></>);
                        }
                        // console.log(item, index)
                        const avatarLink = 'https://a.ppy.sh/' + item.osuId;
                        return (
                            <Box
                                key={item.osuId}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingY: '0.7rem',
                                    justifyContent: 'flex-start'
                                }}

                            >
                                <img src={avatarLink} style={{
                                    display: 'inline',
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    marginRight: '0.7rem',
                                    marginLeft: '0.5rem'
                                }} />
                                <Box
                                    sx={{
                                        display: 'inline',
                                        paddingRight: '1rem'
                                    }}
                                >
                                    <Typography
                                        variant='h5'
                                        sx={{
                                            fontWeight: 500,
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {item.osuName}
                                    </Typography>
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            fontWeight: 500,
                                            color: '#666666',
                                            marginTop: '-0.3rem'
                                        }}
                                    >
                                        {`#${Math.ceil(item.rankNoBWS).toLocaleString()}`}
                                    </Typography>
                                </Box>
                                {(index === captainIndex) &&
                                    <img
                                        src={CaptainIcon}
                                        style={{
                                            height: '10px',
                                            display: 'inline',
                                            paddingRight: '0.5rem',
                                            marginLeft: '-0.2rem',
                                            marginBottom: '1.2rem'
                                        }}
                                    />
                                }
                            </Box>
                        )
                    })
                }
            </Box>
            <Box
                sx={{
                    display: 'inline-flex',
                    marginTop: '1.5rem',
                    paddingLeft: '0.5rem',
                    marginRight: '1.5rem',
                    paddingY: '0.5rem',
                    alignItems: 'center',
                    border: '1px solid #aaaaaa',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    width: isVerySmallScreen ? '13rem' : '17.5rem',

                }}
                onClick={handleDiscordButtonClick}
            >
                <img
                    src={DiscordTeams}
                    style={{
                        height: '18px',
                        marginRight: '1.1rem',
                        marginLeft: '0.6rem',
                        marginBottom: '0.1rem'
                    }}
                />
                <Typography
                    variant='h5'
                    sx={{
                        fontWeight: 600,
                        display: 'inline',

                        fontSize: [18, '!important'],
                        paddingRight: '0.2rem',
                        ...typographyStyleStates
                    }}
                >
                    {(isExpanded < 2) ? 'Contact team captain' : leaderDiscord}
                </Typography>
            </Box>
        </Box>
    );
}

const TeamsPage = () => {

    const navigate = useNavigate();

    const overrideFontSize = useMediaQuery("(min-width:800px)") ? 60 : 50;

    const atLeastSmallScreen = useMediaQuery("(min-width:500px)") ? 1 : 0;
    const atLeastMobileScreen = useMediaQuery("(min-width:1000px") ? 1 : 0;
    const atLeastMediumScreen = useMediaQuery("(min-width:1430px)") ? 1 : 0;
    const atLeastLargeScreen = useMediaQuery("(min-width:2000px)") ? 1 : 0;

    const repeatCount = atLeastSmallScreen + atLeastMobileScreen + atLeastMediumScreen + atLeastLargeScreen;

    const [popupContent, setPopupContent] = useState({
        isShown: false,
        text: '',
        color: '#000000'
    })
    const [searchQuery, setSearchQuery] = useState("");




    const [dataState, setDataState] = useState({
        teamsOriginal: [],
        teams: [],
        isFetchAttemptComplete: false,
        isFetchAttemptSuccessful: false
    });

    useEffect(() => {
        axios.get('/api/teams')
            .then((res) => {

                const teamsData = res.data.map((data) => {
                    const averageRank = data.members.reduce((acc, val) => {
                        if (val === null) {
                            return acc;
                        }
                        return acc + val.rankNoBWS;
                    }, 0) / data.members.filter((val) => { return val !== null }).length;
                    return { ...data, averageRank: Math.round((averageRank + Number.EPSILON) * 100) / 100 }
                }).sort((a, b) => {
                    if (a.averageRank > b.averageRank) {
                        return 1;
                    }
                    if (a.averageRank <= b.averageRank) {
                        return -1;
                    }
                })
                setDataState({
                    teamsOriginal: teamsData,
                    teams: teamsData,
                    isFetchAttemptComplete: true,
                    isFetchAttemptSuccessful: true
                })
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setDataState({
                    ...dataState,
                    isFetchAttemptComplete: true,
                    isFetchAttemptSuccessful: false
                })
                if (error.response) { // Received some other response
                    setPopupContent({
                        isShown: true,
                        text: 'Error. Received response code: ' + String(error.response.status),
                        color: '#B55050'
                    })
                }
                else if (error.request) { // Network error
                    setPopupContent({
                        isShown: true,
                        text: 'Network error, failed to receive response.',
                        color: '#B55050'
                    })
                }
                else { // Code execution error
                    setPopupContent({
                        isShown: true,
                        text: 'Unhandled code error.',
                        color: '#B55050'
                    })
                }
            });
    }, []);

    const handleClosePopup = () => {
        setPopupContent({
            ...popupContent,
            isShown: false
        })
    }

    useEffect(() => {
        setDataState({
            ...dataState,
            teams: dataState.teamsOriginal.filter((item) => {
                const lowerTeamName = item.teamName.toLowerCase();
                const lowerQuery = searchQuery.toLowerCase();
                return lowerTeamName.includes(lowerQuery);
            })
        })
    }, [searchQuery])

    const handleDiscordButtonClick = (leaderDiscordTag) => {
        navigator.clipboard.writeText(leaderDiscordTag)
        setPopupContent({
            isShown: true,
            text: 'Discord name of the captain copied to the clipboard!',
            color: '#33cc33'
        })
    }

    return (
        <PageWrapBox>
            <Box>
                {popupContent.isShown &&
                    <RegisterNotification
                        onClose={handleClosePopup}
                        color={popupContent.color}
                    >
                        {popupContent.text}
                    </RegisterNotification>
                }
                <Navbar />
                <Box
                    marginLeft='4%'
                    display='flex'
                    flexDirection="column"
                    width='92vw'
                    alignItems="flex-start"

                >

                    <Typography
                        variant='h1'
                        fontWeight='500'
                        sx={{
                            paddingTop: '6%',
                            paddingBottom: '',
                            fontSize: [overrideFontSize, "!important"]

                        }}
                    >
                        Teams
                    </Typography>
                    <Box
                        sx={{
                            height: '3rem'
                    }} />
                    <MainButton
                        overridePalette={{
                            bgColor: "#00ff80",
                            bgColorAlt: "#00bd00",
                            textColor: "#000000",
                            activeColor: "#00aa00",
                        }}
                        onClickAction={() => navigate('/register/team')}
                    >
                        Register as a team
                    </MainButton>
                    <Typography
                        variant='h4'
                        maxWidth='min(400px, 90%)'
                        sx={{
                            fontWeight: 400,
                            paddingTop: '2rem',
                            paddingBottom: '1rem'
                        }}
                    >
                        If you’re a captain and want to make changes to your team, please contact the moderators on our <span style={{ fontWeight: 600 }}>Discord Server</span>
                    </Typography>
                    <Box
                        sx={{
                            paddingTop: '2rem'
                        }}
                    >
                        <CustomSearchBar
                            placeholder="Search for teams"
                            onChangeAction={setSearchQuery}
                        />
                    </Box>
                    {/* Loading placeholder */}
                    {!dataState.isFetchAttemptComplete &&
                        <Typography
                            variant='h2'
                            sx={{
                                alignSelf: 'center',
                                marginTop: '6rem',
                                color: '#888888',
                                paddingBottom: '10vh'
                            }}
                        >
                            Loading...
                        </Typography>
                    }
                    {/* Teams component */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${repeatCount}, 1fr)`,
                            marginLeft: '-1rem',
                            paddingTop: '2.5rem'
                        }}
                    >
                        {dataState.teams.map((item, index) => {

                            return (
                                <TeamComponent
                                    key={item._id}
                                    data={item}
                                    captainIndex={dataState.teams.captainIndex}
                                    itemIndex={index + 1}
                                    onInteract={handleDiscordButtonClick}
                                />
                            );
                        })}
                    </Box>
                    {/* No matches component */}
                    <Typography
                        variant='h2'
                        sx={{
                            alignSelf: 'center',
                            marginTop: '6rem',
                            opacity: (dataState.isFetchAttemptComplete && (!dataState.isFetchAttemptSuccessful || dataState.teams.length == 0)) ? 0.5 : 0,
                            transition: (dataState.isFetchAttemptComplete && (!dataState.isFetchAttemptSuccessful || dataState.teams.length == 0)) ? '0.8s' : 0,
                            paddingBottom: '10vh'
                        }}
                    >
                        No matches found.
                    </Typography>
                </Box>

            </Box>
            <Footer />
        </PageWrapBox>
    )
}

export default TeamsPage