import React, { useEffect, useLayoutEffect, useState } from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box, Typography, useTheme } from '@mui/material';
import TextInput from 'components/TextInput';
import { useMediaQuery } from '@mui/material';
import TickboxOption from 'components/TickboxOption';
import MainButton from 'components/MainButton';
import RegisteringTeamMember from 'components/RegisteringTeamMember';
import { AddBoxOutlined } from '@mui/icons-material';
import { render } from '@testing-library/react';
import Footer from 'scenes/widgets/footer';
import PageWrapBox from 'components/PageWrapBox';
import axios from 'axios';
import { v4 } from 'uuid';
import submitValidator from 'ulility/submitValidator';
import RegisterNotification from 'components/RegisterNotification';


const RegisterTeamPage = () => {

    const theme = useTheme();

    const overrideFontSize = useMediaQuery("(min-width:750px)") ? 80 : 50;
    const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [popupContent, setPopupContent] = useState({
        isShown: false,
        text: '',
        color: '#000000'
    })

    const handleTeamNameChange = (newText) => {
        setTeamName(newText);
    }

    const [isPresetMembersAdded, setIsPresetMembersAdded] = useState(false);

    const [formData, setFormData] = useState({
        discordId: '',
        osuId: ''
    })

    const [renderedList, setRenderedList] = useState([])

    const handleFormChange = (targetName) => (newText) => {
        setFormData({
            ...formData,
            [targetName]: newText
        })
        //console.log(newText)
    }

    const handleMemberOsuIdChange = (targetIndex, newText) => {
        setRenderedList(
            renderedList.map((item) => {
                if (item.id != targetIndex) {
                    return item;
                }
                return { ...item, osuId: newText };
            })
        )
    }



    const handleMemberDiscordIdChange = (targetIndex, newText) => {
        setRenderedList(
            renderedList.map((item) => {
                if (item.id != targetIndex) {
                    return item;
                }
                return { ...item, discordId: newText };
            })
        )
    }

    const handleAddMember = () => {
        const userId = v4();
        const oldLength = renderedList.length;
        if (oldLength >= 5) {
            return;
        }
        //console.log('id to be used here: ', userId)
        setRenderedList([
            ...renderedList,
            {
                id: userId,
                discordId: '',
                osuId: '',
                enumval: oldLength + 2
            }
        ])
    }

    const handleRemoveMember = (targetIndex) => {
        //console.log(targetIndex)
        const listWithExcludedMember = renderedList.filter((item) => {
            return targetIndex != item.id;
        })
        const listWithReorderedEnumeration = listWithExcludedMember.map((item, index) => {
            return { ...item, enumval: index + 2 };
        })
        //console.log(listWithReorderedEnumeration)
        setRenderedList(listWithReorderedEnumeration)
    }

    const handleSubmitForm = () => {
        if (!isSubmitAvailable) {
            return;
        }

        const serializedData = renderedList.map((item) => {
            return { osuId: item.osuId, discordId: item.discordId }
        })

        let sentData = {
            members: [
                {
                    osuId: formData['osuId'],
                    discordId: formData['discordId']
                },
                ...serializedData
            ],
            captainIndex: 0,
            teamName: teamName
        }
        //console.log(sentData)

        
        setIsSubmitAvailable(false);
        setPopupContent({
            ...popupContent,
            isShown: false
        })
        axios.post('/api/register/team', sentData, {
            validateStatus: submitValidator
        })
            .then((response) => {
                setIsSubmitAvailable(true);
                if (response.status === 201) { // Successfully added an agent
                    setPopupContent({
                        isShown: true,
                        text: 'Successfully registered as a team! Check in a few hours if you have appeared on the teams list - if not, contact staff.',
                        color: '#50B550'
                    })
                }
                else if (response.status === 409) { // Duplicate agent
                    setPopupContent({
                        isShown: true,
                        text: 'Duplicate team already registered! If you think this is an error, contact staff team.',
                        color: '#B55050'
                    })
                }
            })
            .catch((error) => {
                //something went wrong
                setIsSubmitAvailable(true);
                if (error.response) { // Received some other response
                    setPopupContent({
                        isShown: true,
                        text: 'Error. Received response code: ' + String(error.response.status),
                        color: '#000000'
                    })
                }
                else if (error.request) { // Network error
                    setPopupContent({
                        isShown: true,
                        text: 'Network error, failed to receive response.',
                        color: '#000000'
                    })
                }
                else { // Code execution error
                    setPopupContent({
                        isShown: true,
                        text: 'Unhandled code error.',
                        color: '#000000'
                    })
                }
            })
    }
    //yet to implement - menu for adding players and specific textinput for this interface
    const isNonMobileScreens = useMediaQuery("(min-width: 750px)");

    useLayoutEffect(() => {
        if (!isPresetMembersAdded) {
            if (renderedList.length < 2) {
                handleAddMember();
            }
            else {
                setIsPresetMembersAdded(true);
            }
        }
    }, [renderedList]);


    useEffect(() => {
        if (isPresetMembersAdded) {

            let validFlag = true;
            if (renderedList.length <= 1) {
                validFlag = false;
            }
            /* formData - check if all fields are not empty */
            validFlag = validFlag && (formData.discordId != '') && (formData.osuId != '');
            /* renderedList - check if all fields are not empty */
            for (let i = 0; i < renderedList.length; i += 1) {
                validFlag = validFlag && (renderedList[i].discordId) && (renderedList[i].osuId);
            }
            setIsSubmitAvailable(validFlag);
        }
    }, [formData, renderedList])

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
                    marginLeft='6%'
                    display='flex'
                    flexDirection="column"
                    width={isNonMobileScreens ? "660px" : '88vw'}
                    alignItems="flex-start"
                >
                    <Typography
                        variant='h1'
                        fontWeight='500'
                        sx={{
                            paddingTop: '8%',
                            paddingBottom: '3rem',
                           
                            fontSize: [overrideFontSize, "!important"]
                            
                        }}
                    >
                        Register as a team captain
                    </Typography>
                    <TextInput
                        title="Team name"
                        placeholder="Example name"
                        validationType="any"
                        initialValue=""
                        overrideWidth={!isNonMobileScreens ? '88vw' : null}
                        onChangeAction={handleTeamNameChange}
                    />

                    <TextInput
                        title="Your osu! ID"
                        placeholder="12345678"
                        validationType="osuId"
                        initialValue=""
                        overrideWidth={!isNonMobileScreens ? '88vw' : null}
                        onChangeAction={handleFormChange('osuId')}
                    />
                    <TextInput
                        title="Your Discord"
                        placeholder="Discord Tag"
                        validationType="discordId"
                        initialValue=""
                        overrideWidth={!isNonMobileScreens ? '88vw' : null}
                        onChangeAction={handleFormChange('discordId')}
                    />
                    {renderedList.map((item) => {
                        return (
                            <Box
                                display='flex'
                                flexDirection='row'
                                key={item.id}
                                sx={{

                                    alignItems: 'center',
                                }}
                            >

                                <RegisteringTeamMember
                                    playerIndex={item.id}
                                    onChangeOsuId={handleMemberOsuIdChange}
                                    onChangeDiscordId={handleMemberDiscordIdChange}
                                    onDeletePlayer={handleRemoveMember}
                                    enumval={item.enumval}
                                />
                            </Box>)
                    }
                    )}

                    <Box
                        display='flex'
                        flexDirection='row'
                        onClick={handleAddMember}
                        sx={{
                            padding: '0.7rem 1.2rem',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            transform: (renderedList.length < 5) ? 'scaleY(1)' : 'scaleY(0)',
                            opacity: (renderedList.length < 5) ? 1 : 0,
                            width: isNonMobileScreens ? 'auto' : '88vw',
                            justifyContent: 'center',
                            border: '1px solid',
                            borderColor: theme.palette.neutral.medium,
                            transition: 'border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease, opacity 0.6s ease-out',
                            alignItems: 'center',
                            marginBottom: '1.5rem',
                            userSelect: 'none',
                            '&:hover': {
                                backgroundColor: theme.palette.neutral.veryLight,
                                borderColor: theme.palette.neutral.darkMain,
                            },
                            '&:active': {
                                backgroundColor: theme.palette.neutral.medium
                            }
                        }}
                    >
                        <AddBoxOutlined fontSize="medium" sx={{ color: 'black' }} />
                        <Typography
                            variant="h5"
                            sx={{
                                paddingLeft: "0.5rem",
                                paddingRight: '0.15rem',
                                fontWeight: '600'
                            }}
                        >Add player</Typography>
                    </Box>
                    <MainButton
                        onClickAction={handleSubmitForm}
                        overrideWidth={!isNonMobileScreens ? '88vw' : null}
                        overridePalette={{
                            bgColor: isSubmitAvailable ? "#00ff80" : '#d4d4d4',
                            bgColorAlt: isSubmitAvailable ? "#00bd00" : '#d4d4d4',
                            textColor: isSubmitAvailable ? "#000000" : '#5c5c5c',
                            activeColor: isSubmitAvailable ? "#009900" : '#d4d4d4',
                        }}
                        isClickable={isSubmitAvailable}
                    >
                        Register
                    </MainButton>
                    <Box
                        height="20vh"
                        width="100%"
                    >
                    </Box>
                </Box>
            </Box>
            <Footer />
        </PageWrapBox>
    )
}

export default RegisterTeamPage;