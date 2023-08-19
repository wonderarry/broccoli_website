import React, { useState } from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box, Typography, useTheme } from '@mui/material';
import TextInput from 'components/TextInput';
import { useMediaQuery } from '@mui/material';
import TickboxOption from 'components/TickboxOption';
import MainButton from 'components/MainButton';


const RegisterAgentPage = () => {

    const [enabledCount, setEnabledCount] = useState(0);
    const theme = useTheme();
    const darkFont = theme.palette.neutral.dark;
    const altFont = theme.palette.neutral.light;

    const [formData, setFormData] = useState({
        discordId: '',
        osuId: ''
    })

    const [skillsData, setSkillsData] = useState({
        streams: false,
        stamina: false,
        aim: false,
        tech: false,
        speed: false,
        control: false,
        reading: false
    })

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

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

    const handleSubmitForm = () => {

    }

    return (
        <Box>
            <Navbar />
            <div>registerAgent</div>
            <Box
                marginLeft='6%'
                display='flex'
                flexDirection="column"
                width="min(90%, 600px)"
                alignItems="flex-start"
            >
                <Typography
                    variant='h1'
                    sx={{
                        paddingTop: '10%',
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
                    onChangeAction={handleFormChange('osuId')}
                />
                <TextInput
                    title="Your Discord"
                    placeholder="@user"
                    validationType="discordId"
                    initialValue=""
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
                        display: 'inline',
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
                    sx={{
                    }}
                >
                    Register
                </MainButton>
            </Box>
        </Box>
    )
}

export default RegisterAgentPage;