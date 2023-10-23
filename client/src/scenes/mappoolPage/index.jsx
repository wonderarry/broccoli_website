import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';
import {
    useMediaQuery,
    Box,
    Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterNotification from 'components/RegisterNotification';
import OrderedDropdownSelector from 'components/OrderedDropdownSelector';
import DuplicateIcon from 'assets/duplicate.svg';
import ArrowDownload from 'assets/arrowdl.svg';
import SuccessCheckmark from 'assets/checkmark.svg';

const MappoolEntry = ({ data, onCopying }) => {
    const isNonMobileScreen = useMediaQuery("(min-width:570px)");
    const isVerySmallScreen = useMediaQuery("(max-width:400px)");

    const [isCopied, setIsCopied] = useState(false);

    const handleCopyMap = () => {
        const copiedText = 'https://osu.ppy.sh/beatmaps/' + data.map.beatmapid;
        navigator.clipboard.writeText(copiedText)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 3000);
                onCopying(null);
            })
            .catch((error) => {
                console.error('Clipboard write error.', error);
                onCopying(error);
            });

    }

    const [isExpanded, setIsExpanded] = useState(false);
    if (data.map === null) {
        return <></>
    }

    const dataDescriptionStyle = {
        fontWeight: 600,
        paddingRight: '0.6rem',
        fontSize: [16, '!important'],
        userSelect: 'none'
    }

    const dataValueStyle = {
        fontWeight: 400,
        paddingRight: '1rem',
        fontSize: [16, '!important'],
        userSelect: 'none'
    }
    const colorMapping = {
        NM: '#9FC5E8',
        HD: '#FFE599',
        HR: '#EA9999',
        DT: '#B4A7D6',
        FM: '#B6D7A8',
        TB: '#D5A6BD',
    }

    const modToColor = (mod) => {
        return colorMapping[mod];
    }




    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 'min(750px, 90%)',
            backgroundColor: (isExpanded && !isNonMobileScreen) ? modToColor(data.category) + 'b0' : modToColor(data.category) + '40',
            transition: '0.5s',
            borderRadius: '10px',
            overflow: 'hidden',
            marginY: '0.4rem',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
    >
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <img src={'https://b.ppy.sh/thumb/' + data.map.beatmapid + 'l.jpg'} style={{
                marginRight: isVerySmallScreen ? '0.4rem' : '1.1rem',
                maxWidth: isVerySmallScreen ? '10%' : '20%',
                transition: '0.3s',
                objectFit: 'cover',

            }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '65%',
                }}
            >
                <Typography
                    variant='h3'
                    sx={{
                        fontWeight: 600,
                        paddingTop: '0.8rem',
                        userSelect: 'none',

                        wordWrap: 'break-word'
                    }}
                >{data.map.title}</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Typography
                        variant='h5'
                        sx={{
                            fontWeight: '400',
                            maxWidth: '70%',
                            wordWrap: 'break-word'
                        }}
                    >{data.map.diffname}</Typography>
                    <Typography
                        variant='h6'
                        sx={{
                            color: (isExpanded && !isNonMobileScreen) ? '#555555' : '#aaaaaa',
                            transition: '0.3s',
                            fontWeight: '400',
                            paddingLeft: '0.7rem',
                            paddingTop: '0.1rem'
                        }}
                    >by {data.map.creator}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: '1rem',

                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Typography sx={dataDescriptionStyle}>★</Typography>
                        <Typography sx={dataValueStyle}>{data.map.starrating}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Typography sx={dataDescriptionStyle}>BPM</Typography>
                        <Typography sx={dataValueStyle}>{data.map.bpm}</Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingBottom: '0.6rem',
                        opacity: isNonMobileScreen ? 1 : 0,
                        height: isNonMobileScreen ? '2rem' : 0,
                        width: isNonMobileScreen ? 'auto' : 0,
                        transition: 'height 0.3s, opacity 0.3s'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',

                        }}
                    >
                        <Typography sx={dataDescriptionStyle}>AR</Typography>
                        <Typography sx={dataValueStyle}>{data.map.ar}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Typography sx={dataDescriptionStyle}>CS</Typography>
                        <Typography sx={dataValueStyle}>{data.map.cs}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Typography sx={dataDescriptionStyle}>OD</Typography>
                        <Typography sx={dataValueStyle}>{data.map.od}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Typography sx={dataDescriptionStyle}>Length</Typography>
                        <Typography sx={dataValueStyle}>{data.map.draintime}</Typography>
                    </Box>
                </Box>

            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flex: '1'
                }}
            >
                <Box
                    display="inline-block"
                    position="relative"
                    cursor="pointer"
                    onClick={handleCopyMap}
                    sx={{
                        paddingTop: '6px',
                        paddingRight: '6px'
                    }}
                >
                    <img
                        src={DuplicateIcon}
                        alt="Duplicate"
                        style={{
                            width: '32px',
                            height: '32px',
                            userSelect: 'none',
                            opacity: 1,
                            transform: isCopied ? 'translateY(20px)' : 'translateY(0)',
                            position: 'relative',
                            opacity: isCopied ? '0' : '1',
                            transition: '0.3s',
                            
                        }}
                    />
                    <img
                        src={SuccessCheckmark}
                        alt="Checkmark"
                        style={{
                            width: '20px',
                            height: '20px',
                            userSelect: 'none',
                            
                            opacity: isCopied ? '1' : '0',
                            transform: isCopied ? 'translateY(0px)' : 'translateY(-20px)',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            transition: '0.3s',
                            marginTop: '7px',
                            marginLeft: '7px'
                        }}
                    />
                </Box>

                <img
                    onClick={(event) => {
                        event.stopPropagation();
                        window.location.href = 'https://osu.ppy.sh/beatmaps/' + data.map.beatmapid;
                    }}
                    src={ArrowDownload}
                    style={{
                        height: '16px',
                        width: '16px',
                        marginRight: '16px',
                        marginBottom: '10px',
                        userSelect: 'none'
                    }}
                />
            </Box>
        </Box>

        <Box
            sx={{
                height: (isExpanded && !isNonMobileScreen) ? (isVerySmallScreen ? '3.5rem' : '2rem') : 0,
                paddingTop: (isExpanded && !isNonMobileScreen) ? '0.2rem' : 0,
                transition: '0.3s',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: isVerySmallScreen ? 'space-between' : 'space-evenly',
                paddingX: isVerySmallScreen ? '1.3rem' : '1rem',
                backgroundColor: 'rgba(255,255,255, 0.5)'
            }}
        >
            <Box
                sx={{
                    flexDirection: isVerySmallScreen ? 'column' : 'row',
                    display: 'flex',

                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',

                    }}
                >
                    <Typography sx={dataDescriptionStyle}>AR</Typography>
                    <Typography sx={dataValueStyle}>{data.map.ar}</Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <Typography sx={dataDescriptionStyle}>CS</Typography>
                    <Typography sx={dataValueStyle}>{data.map.cs}</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    flexDirection: isVerySmallScreen ? 'column' : 'row',
                    display: 'flex'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <Typography sx={dataDescriptionStyle}>OD</Typography>
                    <Typography sx={dataValueStyle}>{data.map.od}</Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <Typography sx={dataDescriptionStyle}>Length</Typography>
                    <Typography sx={dataValueStyle}>{data.map.draintime}</Typography>
                </Box>
            </Box>
        </Box>

    </Box>;
}


const MappoolPage = () => {
    const overrideFontSize = useMediaQuery("(min-width:800px)") ? 60 : 50;
    const isVerySmallScreen = useMediaQuery("(max-width:400px)");
    const [mappoolNames, setMappoolNames] = useState({
        names: [],
        isFetchAttemptComplete: false,
        isFetchAttemptSuccessful: false
    });
    const [popupContent, setPopupContent] = useState({
        isShown: false,
        text: '',
        color: '#000000'
    })
    const [activeMappool, setActiveMappool] = useState({
        mappoolId: -1,
        mappool: []
    });
    const handleCopyNotification = (potentialError) => {
        if (potentialError === null) {
            setPopupContent({
                isShown: true,
                text: 'Successfully copied the beatmap link to the clipboard!',
                color: '#50B550'
            })
        }
        else {
            setPopupContent({
                isShown: true,
                text: 'Couldn\'t copy the beatmap link to the clipboard.',
                color: '#B55050'
            })
        }
    }
    useEffect(() => {
        console.log('activeMappool: ', activeMappool)
    })
    useEffect(() => {
        axios.get('/api/mappool/')
            .then((res) => {
                console.log(res)
                setMappoolNames({
                    names: res.data,
                    isFetchAttemptComplete: true,
                    isFetchAttemptSuccessful: true
                });
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setMappoolNames({ ...mappoolNames, isFetchAttemptComplete: true })
                if (error.response) {
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
            })
    }, [])

    const handleClosePopup = () => {
        setPopupContent({
            ...popupContent,
            isShown: false
        })
    }

    const handleChangeMappool = (id) => {
        setActiveMappool({
            mappoolId: -1,
            mappool: []
        })
        axios.get('/api/mappool/stages/' + id)
            .then((res) => {
                setActiveMappool({
                    mappoolId: id,
                    mappool: res.data
                })
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setActiveMappool({
                    mappoolId: -1,
                    mappool: null
                })
                if (error.response) {
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
                        {isVerySmallScreen ? "Map pools" : 'Mappools'}
                    </Typography>
                    {mappoolNames.isFetchAttemptSuccessful &&
                        <Box

                        >
                            <Box
                                sx={{
                                    height: '2rem'
                                }}
                            />
                            <OrderedDropdownSelector
                                data={mappoolNames.names}
                                handleChangeSelection={handleChangeMappool}
                                overrideSelect={mappoolNames.names.length - 1}
                            />
                        </Box>
                    }
                    {(activeMappool.mappoolId !== -1) &&
                        activeMappool.mappool.entries.map((item) => {
                            return (
                                <MappoolEntry
                                    key={item._id}
                                    data={item}
                                    onCopying={handleCopyNotification}
                                />)
                        })
                    }
                </Box>
                <Box sx={{ height: '6vh' }} />
            </Box>
            <Footer />
        </PageWrapBox>)


}

export default MappoolPage