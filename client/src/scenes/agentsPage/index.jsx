import React, { useEffect, useState } from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box, Typography } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';
import TextInput from 'components/TextInput';
import CustomSearchBar from 'components/CustomSearchBar';
import RegisterNotification from 'components/RegisterNotification';
import MainButton from 'components/MainButton';
import { useNavigate } from 'react-router-dom';

const AgentsTableElement = ({ children, itemId }) => {

    const data = children;
    const osuName = data.osuName;
    const avatarLink = 'https://a.ppy.sh/' + data.osuId;
    const rank = data.rankWithBWS;
    const discord = data.discordId;
    const strengthsFlag = data.strengthsFlag;
    const isNonMobileScreens = useMediaQuery("(min-width:950px)")
    const isNonSmallScreen = useMediaQuery("(min-width:600px)")

    const skillBitPositions = {
        streams: 0, // 2^0
        stamina: 1, // 2^1
        aim: 2,     // 2^2
        tech: 3,    // 2^3
        speed: 4,   // 2^4
        control: 5, // 2^5
        reading: 6, // 2^6
    };
    // Create an array of capitalized skill flags based on strengthsFlag
    const capitalizedSkills = Object.keys(skillBitPositions)
        .filter(skill => (strengthsFlag & (1 << skillBitPositions[skill])) !== 0)
        .map(skill => skill.charAt(0).toUpperCase() + skill.slice(1));

    // Join the array into a string with comma delimiter
    const skillsString = capitalizedSkills.join(', ');


    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: isNonMobileScreens ? 'repeat(4, 1fr)' : (isNonSmallScreen ? '1fr 1fr' : '1fr'),
                marginY: isNonMobileScreens ? '0' : '1.2rem',
                paddingY: isNonMobileScreens ? '1.2rem' : '0.8rem',
                paddingX: isNonMobileScreens ? 0 : '1.8rem',
                borderBottom: isNonMobileScreens ? '1px solid #cccccc' : '0',
                alignItems: 'center',
                background: isNonMobileScreens ? null : '#eaeaea',
                borderRadius: isNonMobileScreens ? 0 : '13px',
            }}
        >
            {/* Username section */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: isNonMobileScreens ? 0 : '0.5rem'
                }}

            >
                <img src={avatarLink} style={{
                    display: 'inline',
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    marginRight: '0.7rem'
                }} />
                <Typography
                    variant='h5'
                    sx={{
                        display: 'inline',
                        fontWeight: isNonMobileScreens ? 500 : 600
                    }}
                >
                    {osuName}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                {!isNonMobileScreens && <Typography
                    variant='h5'
                    sx={{
                        paddingTop: isNonMobileScreens ? 0 : '0.5rem',
                        fontWeight: 600,
                        paddingRight: '0.7rem'
                    }}
                >
                    Rank
                </Typography>}
                <Typography
                    variant='h5'
                    sx={{
                        paddingTop: isNonMobileScreens ? 0 : '0.5rem'
                    }}
                >
                    {`#${Math.ceil(rank).toLocaleString()}`}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                {!isNonMobileScreens && <Typography
                    variant='h5'
                    sx={{
                        paddingTop: isNonMobileScreens ? 0 : '0.5rem',
                        fontWeight: 600,
                        paddingRight: '0.7rem'
                    }}
                >
                    Discord
                </Typography>}
                <Typography
                    variant='h5'
                    sx={{
                        paddingTop: isNonMobileScreens ? 0 : '0.5rem'
                    }}
                >
                    {discord}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                {!isNonMobileScreens && <Typography
                    variant='h5'
                    sx={{
                        paddingTop: isNonMobileScreens ? 0 : '0.5rem',
                        fontWeight: 600,
                        paddingRight: '0.7rem'
                    }}
                >
                    Strengths
                </Typography>}
                <Typography
                    variant='h5'
                    sx={{
                        paddingTop: isNonMobileScreens ? 0 : '0.5rem'
                    }}
                >
                    {skillsString}
                </Typography>
            </Box>
        </Box>
    )
}

const AgentsTable = ({ data, tableTitle }) => {
    const isNonMobileScreens = useMediaQuery("(min-width:950px)")

    if (data.length < 1) {
        return (<></>)
    }
    return (
        <Box
            sx={{
                width: '100%'
            }}
        >

            <Typography
                variant='h2'
                sx={{
                    paddingTop: '3rem',
                    paddingBottom: isNonMobileScreens ? '2rem' : 0
                }}
            >
                {tableTitle}
            </Typography>
            {isNonMobileScreens &&
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        paddingBottom: '1.5rem'
                    }}
                >
                    <Typography variant='h3' sx={{ fontWeight: [600, "!important"] }}>Nickname</Typography>
                    <Typography variant='h3' sx={{ fontWeight: [600, "!important"] }}>Rank</Typography>
                    <Typography variant='h3' sx={{ fontWeight: [600, "!important"] }}>Discord</Typography>
                    <Typography variant='h3' sx={{ fontWeight: [600, "!important"] }}>Strengths</Typography>
                </Box>
            }
            {data.map((item, index) => {
                return <AgentsTableElement key={index}>{item}</AgentsTableElement>
            })}

        </Box>

    )
}


const AgentsPage = () => {
    const navigate = useNavigate();
    const overrideFontSize = useMediaQuery("(min-width:800px)") ? 60 : 50;
    const [showLoadingPlaceholder, setShowLoadingPlaceholder] = useState(true);
    const [showNoMatch, setShowNoMatch] = useState(false);

    const splitIntoTiers = (data) => {
        return data.reduce((result, obj) => {
            const rank = obj.rankWithBWS;

            if (rank >= 750 && rank <= 2999) {
                result.tier1.push(obj);
            } else if (rank >= 3000 && rank <= 7999) {
                result.tier2.push(obj);
            } else if (rank >= 8000 && rank <= 50000) {
                result.tier3.push(obj);
            } else {
                result.others.push(obj);
            }

            return result;
        }, { tier1: [], tier2: [], tier3: [], others: [] });
    }

    const [popupContent, setPopupContent] = useState({
        isShown: false,
        text: '',
        color: '#000000'
    })
    const [fetchResults, setFetchResults] = useState({
        tier1: [],
        tier2: [],
        tier3: [],
        others: []
    });
    useEffect(() => {
        axios.get('/api/agents')
            .then((res) => {
                setFetchResults(splitIntoTiers(res.data));
                setShowLoadingPlaceholder(false);
                // setPopupContent({
                //     isShown: true,
                //     text: 'Successfully loaded!',
                //     color: '#000000'
                // })
            })
            .catch((error) => {
                setShowLoadingPlaceholder(false);
                setShowNoMatch(true);
                console.error('Error fetching data:', error);
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


    const [tiers, setTiers] = useState({
        tier1: [],
        tier2: [],
        tier3: [],
        others: []
    });
    const [searchQuery, setSearchQuery] = useState("");


    const filterFunction = (item) => {
        const compareValue = searchQuery.toLowerCase();
        const lowerCaseDiscord = item.discordId.toLowerCase();
        const lowerCaseOsu = item.osuName.toLowerCase();
        if (lowerCaseDiscord.includes(compareValue)) {
            return true;
        }
        if (lowerCaseOsu.includes(compareValue)) {
            return true;
        }
        return false;
    }
    useEffect(() => {


        if (fetchResults !== null && Object.keys(fetchResults).length > 0) {
            let filteredTiers = {};
            let filterCounter = 0;
            // Loop through each tier and filter its data
            for (const tierName in fetchResults) {
                if (Object.hasOwnProperty.call(fetchResults, tierName)) {
                    const tierData = fetchResults[tierName];
                    const filteredData = tierData.filter((item) => filterFunction(item, searchQuery));
                    filterCounter += filteredData.length;
                    filteredTiers[tierName] = filteredData;
                }
            }

            // Update the filtered tiers in state
            // console.log(filteredTiers);
            setTiers(filteredTiers);
            if (filterCounter > 0) {
                setShowNoMatch(false);
            }
            else {
                setShowNoMatch(true);
            }
        }
    }, [fetchResults, searchQuery]);


    const handleClosePopup = () => {
        setPopupContent({
            ...popupContent,
            isShown: false
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
                        Free Agents
                    </Typography>
                    <Box
                        sx={{
                            height: '3rem'
                    }} />
                    <MainButton
                        overridePalette={{
                            bgColor: "#45ff45",
                            bgColorAlt:  "#00bd00",
                            textColor: "#000000",
                            activeColor:  "#009900",
                        }}
                        onClickAction={() => navigate('/register/agent')}
                    >
                        Register as an agent
                    </MainButton>
                    <Box
                        sx={{
                            paddingTop: '2rem'
                        }}
                    >
                        <CustomSearchBar
                            placeholder="Search for players"
                            onChangeAction={setSearchQuery}
                        />
                    </Box>
                    {!showLoadingPlaceholder && !(tiers.tier1.length < 1 && tiers.tier2.length < 1 && tiers.tier3.length < 1 && tiers.others.length < 1) &&
                        <>
                            <AgentsTable data={tiers.tier1} tableTitle={'Tier 1'} />
                            <AgentsTable data={tiers.tier2} tableTitle={'Tier 2'} />
                            <AgentsTable data={tiers.tier3} tableTitle={'Tier 3'} />
                            <AgentsTable data={tiers.others} tableTitle={'Not fitting into tiers'} />
                        </>
                    }
                    {showLoadingPlaceholder &&
                        <Typography
                            variant='h2'
                            sx={{
                                alignSelf: 'center',
                                marginTop: '6rem',
                                color: '#888888'
                            }}
                        >
                            Loading...
                        </Typography>
                    }

                    <Typography
                        variant='h2'
                        sx={{
                            alignSelf: 'center',
                            marginTop: '6rem',
                            opacity: (showNoMatch && !showLoadingPlaceholder) ? 0.5 : 0,
                            transition: (showNoMatch && !showLoadingPlaceholder) ?'0.8s' : 0
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
/*
osu name, country, avatar, discord, bws rank
*/
export default AgentsPage