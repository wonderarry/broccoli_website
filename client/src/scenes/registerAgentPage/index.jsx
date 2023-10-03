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






const RegisterAgentPage = () => {

    const [enabledCount, setEnabledCount] = useState(0);
    const theme = useTheme();
    const darkFont = theme.palette.neutral.dark;
    const altFont = theme.palette.neutral.light;

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
        console.log(newText)
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
        console.log(isToggled)
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

        console.log(sentData)
        setIsSubmitAvailable(false);
        axios.post('http://server:3001/register/agent', sentData)
            .then(() => {
                //successfully done
                setIsSubmitAvailable(true);
            })
            .catch((error) => {
                //something went wrong
                setIsSubmitAvailable(true);
                console.error('Error: ', error);
            })

    }

    return (
        <PageWrapBox>
            <Box>
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
                            paddingBottom: '3rem'
                        }}
                    >
                        Register as a free agent
                    </Typography>
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
                        placeholder="@user"
                        validationType="discordId"
                        initialValue=""
                        overrideWidth={!isNonMobileScreens ? '88vw' : null}
                        onChangeAction={handleFormChange('discordId')}
                    />
                    <Box
                        sx={{
                            paddingBottom: '1rem'
                        }}
                    >
                        <Typography
                            variant='h2'
                            sx={{
                                display: 'inline',
                                paddingRight: '1rem',
                                color: darkFont,
                            }}
                        >
                            Your main strengths
                        </Typography>
                        <Typography
                            variant='h5'
                            sx={{
                                display: isNonMobileScreens ? 'inline' : 'block',
                                opacity: (enabledCount >= 3) ? 1 : 0.6,
                                textDecoration: 'underline',
                                color: darkFont,
                                textDecorationColor: (enabledCount >= 3) ? darkFont : altFont,
                                transition: 'text-decoration-color 0.5s ease, opacity 0.3s ease'
                            }}
                        >
                            Up to 3
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: isNonMobileScreens ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
                            marginLeft: '-0.5rem',
                            paddingBottom: '2rem',
                            width: "100%"
                        }}
                    >
                        <TickboxOption
                            onClickAction={handleSkillsChange('streams')}
                            disabled={enabledCount >= 3 && !skillsData['streams']}
                        >
                            Streams
                        </TickboxOption>
                        <TickboxOption
                            onClickAction={handleSkillsChange('stamina')}
                            disabled={enabledCount >= 3 && !skillsData['stamina']}
                        >
                            Stamina
                        </TickboxOption>
                        <TickboxOption
                            onClickAction={handleSkillsChange('aim')}
                            disabled={enabledCount >= 3 && !skillsData['aim']}
                        >
                            Aim
                        </TickboxOption>
                        <TickboxOption
                            onClickAction={handleSkillsChange('tech')}
                            disabled={enabledCount >= 3 && !skillsData['tech']}
                        >
                            Tech
                        </TickboxOption>
                        <TickboxOption
                            onClickAction={handleSkillsChange('speed')}
                            disabled={enabledCount >= 3 && !skillsData['speed']}
                        >
                            Speed
                        </TickboxOption>
                        <TickboxOption
                            onClickAction={handleSkillsChange('control')}
                            disabled={enabledCount >= 3 && !skillsData['control']}
                        >
                            Control
                        </TickboxOption>
                        <TickboxOption
                            onClickAction={handleSkillsChange('reading')}
                            disabled={enabledCount >= 3 && !skillsData['reading']}
                        >
                            Reading
                        </TickboxOption>
                    </Box>
                    <MainButton
                        onClickAction={handleSubmitForm}
                        overrideWidth={!isNonMobileScreens ? '88vw' : null}
                        overridePalette={{
                            bgColor: isSubmitAvailable ? "#32fa32" : '#d4d4d4',
                            bgColorAlt: isSubmitAvailable ? "#00bd00" : '#d4d4d4',
                            textColor: isSubmitAvailable ? "#000000" : '#5c5c5c',
                            activeColor: isSubmitAvailable ? "#009900" : '#d4d4d4',
                        }}
                        sx={{
                        }}
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

export default RegisterAgentPage;