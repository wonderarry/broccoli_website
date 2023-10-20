import React, { useEffect, useState } from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box, Typography, useTheme } from '@mui/material';
import TextInput from 'components/TextInput';
import { useMediaQuery } from '@mui/material';
import TickboxOption from 'components/TickboxOption';
import MainButton from 'components/MainButton';
import Footer from 'scenes/widgets/footer';
import PageWrapBox from 'components/PageWrapBox';
import axios from 'axios';
import submitValidator from 'ulility/submitValidator';
import RegisterNotification from 'components/RegisterNotification';





const RegisterAgentPage = () => {

    const overrideFontSize = useMediaQuery("(min-width:750px)") ? 80 : 28;

    const [enabledCount, setEnabledCount] = useState(0);
    const theme = useTheme();
    const darkFont = theme.palette.neutral.dark;
    const altFont = theme.palette.neutral.light;
    const [popupContent, setPopupContent] = useState({
        isShown: false,
        text: '',
        color: '#000000'
    })

    const [formData, setFormData] = useState({
        discordId: '',
        osuId: ''
    })

    const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);


    const skillBitPositions = {
        streams: 0, // 2^0
        stamina: 1, // 2^1
        aim: 2,     // 2^2
        tech: 3,    // 2^3
        speed: 4,   // 2^4
        control: 5, // 2^5
        reading: 6, // 2^6
    };


    const [skillsData, setSkillsData] = useState({
        streams: false,
        stamina: false,
        aim: false,
        tech: false,
        speed: false,
        control: false,
        reading: false
    })

    const isNonMobileScreens = useMediaQuery("(min-width: 750px)");

    const handleFormChange = (targetName) => (newText) => {
        setFormData({
            ...formData,
            [targetName]: newText
        })
        //console.log(newText)
    }

    const handleSkillsChange = (targetName) => (isToggled) => {
        const countBeforeChanged = Object.values(skillsData).filter(Boolean).length;
        const newModifier = isToggled ? 1 : -1;
        setSkillsData({
            ...skillsData,
            [targetName]: isToggled
        })

        setEnabledCount(countBeforeChanged + newModifier);
        //console.log(skillsData)
        //console.log(isToggled)
    }

    useEffect(() => {
        let validFlag = true;
        validFlag = validFlag && (formData.osuId != '') && (formData.discordId != '');
        setIsSubmitAvailable(validFlag);
    }, [formData]);

    const handleSubmitForm = () => {
        if (!isSubmitAvailable) {
            return;
        }
        let bitmask = 0;

        for (const skill in skillsData) {
            if (skillsData.hasOwnProperty(skill) && skillsData[skill]) {
                // If the skill is true, set the corresponding bit in the bitmask
                bitmask |= 1 << skillBitPositions[skill];
            }
        }

        const sentData = {
            osuId: formData['osuId'],
            discordId: formData['discordId'],
            strengthsMask: bitmask
        }


        //console.log(sentData)
        setIsSubmitAvailable(false);
        setPopupContent({
            ...popupContent,
            isShown: false
        })
        axios.post('/api/register/agent', sentData, {
            validateStatus: submitValidator
        })
            .then((response) => {
                setIsSubmitAvailable(true);
                if (response.status === 201) { // Successfully added an agent
                    setPopupContent({
                        isShown: true,
                        text: 'Successfully registered as an agent! Check in a few hours if you have appeared on the agents list - if not, contact staff.',
                        color: '#50B550'
                    })
                }
                else if (response.status === 409) { // Duplicate agent
                    setPopupContent({
                        isShown: true,
                        text: 'This osu! id is already registered! If you think this is an error, contact staff team.',
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

export default RegisterAgentPage;