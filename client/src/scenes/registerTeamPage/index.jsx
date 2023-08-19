import React, { useState } from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box, Typography, useTheme } from '@mui/material';
import TextInput from 'components/TextInput';
import { useMediaQuery } from '@mui/material';
import TickboxOption from 'components/TickboxOption';
import MainButton from 'components/MainButton';
import RegisteringTeamMember from 'components/RegisteringTeamMember';

const RegisterTeamPage = () => {

    const theme = useTheme();
    const darkFont = theme.palette.neutral.dark;
    const altFont = theme.palette.neutral.light;

    const [incrementId, setIncrementId] = useState(0);

    const [formData, setFormData] = useState({
        captain: {
            discordId: '',
            osuId: ''
        },
        members: {0: {
            discordId: '',
            osuId: ''
        }} //top to bottom representation of user input on members
    })


    const handleFormChange = (targetName) => (newText) => {
        setFormData({
            ...formData,
            [targetName]: newText
        })
        console.log(newText)
    }

    const handleMemberOsuIdChange = (targetIndex, newText) => {
        setFormData({
            ...formData,
            members: {
                ...formData['members'],
                [targetIndex]: { 
                    osuId: newText,
                    discordId: formData['members'][targetIndex]['discordId']
                }
            }
        })
        
    }

    const handleMemberDiscordIdChange = (targetIndex, newText) => {
        setFormData({
            ...formData,
            members: {
                ...formData['members'],
                [targetIndex]: {
                    osuId: formData['members'][targetIndex]['osuId'],
                    discordId: newText
                }
            }
        })
        
    }

    const handleAddMember = () => {
        const userId = incrementId;
        setIncrementId(incrementId + 1);

        setFormData({
            ...formData,
            members: {
                ...formData.members,
                [userId]: {
                    discordId: '',
                    osuId: ''
                }
            }
        })
        //need to actually create a new element - maybe it's tbd through map function in jsx
    }

    const handleRemoveMember = (targetIndex) => {
        if (true){
            return
        }
        const updatedMembers = {...formData.members};
        delete updatedMembers[targetIndex];
        setFormData({
            ...formData,
            members: updatedMembers
        })
    }

    const handleSubmitForm = () => {

    }
    //yet to implement - menu for adding players and specific textinput for this interface
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <Navbar />
            <div>registerTeam</div>

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
                    Register as a team captain
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

                <MainButton
                    onClickAction={handleSubmitForm}
                    sx={{
                    }}
                >
                    Register
                </MainButton>
                <RegisteringTeamMember
                    playerIndex={0}
                    onChangeOsuId={handleMemberOsuIdChange}
                    onChangeDiscordId={handleMemberDiscordIdChange}
                    onDeletePlayer={handleRemoveMember}
                />
            </Box>
        </Box>
    )
}

export default RegisterTeamPage