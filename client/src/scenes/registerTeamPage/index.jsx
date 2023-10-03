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
import {v4} from 'uuid';


const RegisterTeamPage = () => {

    const theme = useTheme();
    

    const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);
    const [teamName, setTeamName] = useState('');


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
        console.log(newText)
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
        console.log('id to be used here: ', userId)
        setRenderedList([
            ...renderedList,
            {
                id: userId,
                discordId: '',
                osuId: '',
                enumval: oldLength + 1
            }
        ])
    }

    const handleRemoveMember = (targetIndex) => {
        console.log(targetIndex)
        const listWithExcludedMember = renderedList.filter((item) => {
            return targetIndex != item.id;
        })
        const listWithReorderedEnumeration = listWithExcludedMember.map((item, index) => {
            return { ...item, enumval: index + 1 };
        })
        console.log(listWithReorderedEnumeration)
        setRenderedList(listWithReorderedEnumeration)
    }

    const handleSubmitForm = () => {
        if (!isSubmitAvailable) {
            return;
        }

        const serializedData = renderedList.map((item) => {
            return {osuId: item.osuId, discordId: item.discordId}
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
        console.log(sentData)


        setIsSubmitAvailable(false);
        axios.post('api/register/team', sentData)
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
                        Register as a team captain
                    </Typography>
                    <TextInput 
                        title="Team name"
                        placeholder="Example name"
                        validationType="discordId"
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
                        placeholder="@user"
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
                            bgColor: isSubmitAvailable ? "#32fa32" : '#d4d4d4',
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

export default RegisterTeamPage