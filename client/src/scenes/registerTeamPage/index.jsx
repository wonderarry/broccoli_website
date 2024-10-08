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

    const overrideFontSize = useMediaQuery("(min-width:750px)") ? 80 : 28;
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
                <Navbar />
                <Box
                    alignItems='center'
                    display='flex'
                    flexDirection='column'
                    paddingTop='10%'
                    paddingLeft='10%'
                    paddingRight='10%'
                >
                    <Typography
                    variant='h1'
                    color='black'
                    fontWeight='500'
                    textAlign='center'
                    sx={{
                        fontSize: [overrideFontSize, "!important"]
                    }}
                >
                    The registrations are closed.
                </Typography>
                </Box>
            </Box>
            <Footer />
        </PageWrapBox>
    )
}

export default RegisterTeamPage