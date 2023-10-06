import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box, ListItem, Typography, List } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';
import { useState } from 'react';
import { styled } from "@mui/system";


const RuleButton = ({ children, title }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayedSymbol = isExpanded ? '-' : '+'
    return (
        <Box
            paddingLeft='7vw'
            paddingRight='7vw'
            paddingBottom='2vh'
        >
            <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                borderBottom='1px solid grey'
                paddingBottom='0.6rem'
                marginBottom='0.5rem'
                alignItems='center'
                onClick={
                    () => {
                        setIsExpanded(!isExpanded);
                    }
                }
            >
                <Typography
                    variant='h2'
                    fontWeight='500'
                    marginBottom='-0.5rem'
                    sx={{
                        userSelect: 'none'
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant='h2'
                    fontWeight='200'
                    sx={{
                        userSelect: 'none'
                    }}
                >
                    {displayedSymbol}
                </Typography>

            </Box>
            <Box
                overflow='hidden'

                sx={{
                    height: isExpanded ? 'auto' : '0px',
                    transition: 'all 0.4s ease',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

const CustomListItem = ({ children, sub = false }) => {
    const bulletpoint = sub === false ? "\u2022 " : "\u25e6 ";
    // const bulletpoint = "\u2022 ";
    return (
        <ListItem>
            <Typography
                variant='h3'
                sx={{
                    flexWrap: 'wrap'
                }}
            >
                {bulletpoint} {children}
            </Typography>
        </ListItem>
    )
}



const StyledList = styled(List)({
    display: 'flex',
    gap: '0.6rem',
    flexDirection: 'column',
    paddingBottom: '0rem'
})


const RulesPage = () => {


    return (
        <PageWrapBox>
            <Box>
                <Navbar />
                <Typography
                    variant='h1'
                    fontWeight='500'
                    sx={{
                        paddingTop: '5%',
                        paddingBottom: '3rem',
                        paddingLeft: '6%'
                    }}
                >
                    Rules
                </Typography>
                <RuleButton title="General Information">
                    <StyledList>
                        <CustomListItem>
                            Broccoli Cup 3 is an <span style={{ color: "#33cc33" }}>international, 3v3, team size 3 to 6 tournament consisting of 3 different tiers.</span>
                        </CustomListItem>
                        <CustomListItem>
                            These 3 different tiers have separate rank ranges. 
                            <span style={{ color: "#33cc33" }}>A team must consist of at least 1 player from each tier.</span>
                            <StyledList>
                                <CustomListItem sub={true}>Tier 1: 750-2999 BWS</CustomListItem>
                                <CustomListItem sub={true}>Tier 2: 3000-7999 BWS</CustomListItem>
                                <CustomListItem sub={true}>Tier 3: 8000-50000 BWS</CustomListItem>
                                <CustomListItem sub={true}>BWS Formula: rank^(0.9937^(badges^2))</CustomListItem>
                                <CustomListItem sub={true}>
                                    <span style={{ color: "#33cc33" }}>
                                        No tier should have more than 2 players who meet its rank requirements. This means you can have exactly
                                        1-2 players of each tier, with a total team size of 3-6, whilst having one player in each tier.
                                    </span>
                                </CustomListItem>
                            </StyledList>
                        </CustomListItem>
                        <CustomListItem>
                            Anyone that meets the above requirements may register before <span style={{ color: "#33cc33" }}>Oct 20, 12 UTC</span>.
                            To sign up, the player should:
                            <StyledList>
                                <CustomListItem sub={true}>Fill out the registration form on the website (you are here!).</CustomListItem>
                                <CustomListItem sub={true}>Join our <a href="https://discord.gg/gqYdbYBRBN">Discord</a>.</CustomListItem>
                            </StyledList>
                        </CustomListItem>
                        <CustomListItem>GFX Artists, Streamers, and Commentators are allowed to participate in the tournament.</CustomListItem>
                    </StyledList>
                </RuleButton>
                <RuleButton title="Scheduling">
                    <StyledList>
                        <StyledList>
                            <CustomListItem>All times will be in <span style={{ color: "#33cc33" }}>UTC 24-hour format.</span></CustomListItem>
                            <CustomListItem>Qualifier lobbies will be provided during qualifier week.</CustomListItem>
                            <CustomListItem>Custom lobbies may also be requested.</CustomListItem>
                            <CustomListItem>
                                Default schedules for bracket matches may be provided depending on the team's submitted availability and/or timezone.
                            </CustomListItem>
                            <CustomListItem>
                                In the case where there are no common availabilities, the default time will always be <span style={{ color: "#33cc33" }}>15:00 UTC</span>.
                            </CustomListItem>
                            <CustomListItem>
                                If your opponent is suspected of trying to force a win by default by denying or ignoring a reasonable scheduling request, you should contact a host or admin.
                            </CustomListItem>
                            <CustomListItem>
                                You will have to have attempted to make contact via both Discord and Forum PM.
                                <span style={{ color: "#33cc33" }}>
                                    <strong> Async matches will not be allowed.</strong>
                                </span>
                            </CustomListItem>
                        </StyledList>
                    </StyledList>
                </RuleButton>
                <RuleButton title="Prizes">
                    <StyledList>

                        <StyledList>
                            <CustomListItem>
                                <span style={{ color: "#e9cd16" }}>1st place:</span> Badge (pending) + Animated Banner
                            </CustomListItem>
                            <CustomListItem>
                                <span style={{ color: "#6e8a91" }}>2nd place:</span> Animated Banner
                            </CustomListItem>
                            <CustomListItem>
                                <span style={{ color: "#b5834a" }}>3rd place:</span> Animated Banner
                            </CustomListItem>
                        </StyledList>
                    </StyledList>
                </RuleButton>
                <RuleButton title="Qualifiers">
                    <StyledList>
                        <CustomListItem>One player from each of the three tiers must be present for each map.</CustomListItem>
                        <CustomListItem>
                            Teams will have a <span style={{ color: "#33cc33" }}>5 minute grace period</span> to join the lobby before the referee will do a <span style={{ color: "#33cc33" }}>!mp start 10</span>.
                        </CustomListItem>
                        <CustomListItem>
                            Teams will be given <span style={{ color: "#33cc33" }}>2 minutes</span> to switch players and get ready between maps before a <span style={{ color: "#33cc33" }}>!mp start 10</span> will be forced.
                        </CustomListItem>
                        <CustomListItem>
                            Players will play maps in the order they are displayed on the main sheet: <br />
                            <span style={{ color: "#33cc33" }}> NM1 &gt; NM2 &gt; … &gt; DT3</span>
                        </CustomListItem>
                        <CustomListItem>
                            Players will be given 1 chance to replay maps at the end of a lobby if they:
                            <StyledList>
                                <CustomListItem sub={true}>Joined the lobby late (max: 15 minutes).</CustomListItem>
                                <CustomListItem sub={true}>Disconnected within 30 seconds of a map.</CustomListItem>
                            </StyledList>
                        </CustomListItem>
                        <CustomListItem>
                            Qualifier rankings are determined with <span style={{ color: "#33cc33" }}>Z-Sum</span>.
                        </CustomListItem>
                        <CustomListItem>
                            Only the <span style={{ color: "#33cc33" }}>top 32 ranked teams</span> will proceed to bracket stage.
                        </CustomListItem>
                    </StyledList>
                </RuleButton>
                <RuleButton title="Bracket Stage">
                    <StyledList>
                        <StyledList>
                            <CustomListItem>
                                One player from each of the three tiers must be present for each map.
                            </CustomListItem>
                            <CustomListItem>
                                Teams have <span style={{ color: "#33cc33" }}>5 minutes</span> after the scheduled match start time before bans are forfeited, and <span style={{ color: "#33cc33" }}>10 minutes</span> before the match is forfeited.
                            </CustomListItem>
                            <CustomListItem>
                                If the referee were to be late to make the lobby, the late rules will apply <span style={{ color: "#33cc33" }}>5 minutes</span> and <span style={{ color: "#33cc33" }}>10 minutes</span> respectively after the lobby was made.
                            </CustomListItem>
                            <CustomListItem>
                                There will be <span style={{ color: "#33cc33" }}>no warmups.</span>
                            </CustomListItem>
                            <CustomListItem>
                                Captains will be asked to roll for their team; the team with the <span style={{ color: "#33cc33" }}>higher roll will choose the pick order</span> while the team with the <span style={{ color: "#33cc33" }}>lower roll will choose the ban order</span>.
                            </CustomListItem>
                            <CustomListItem>
                                <span style={{ color: "#33cc33" }}>Double banning and double picking are both not allowed.</span>
                            </CustomListItem>
                            <CustomListItem>
                                <span style={{ color: "#33cc33" }}>90 seconds will be given to pick/ban maps.</span>
                            </CustomListItem>
                            <CustomListItem>
                                If the team doesn’t pick/ban a map before the timer runs out, they will forfeit the pick/ban to the opponent team. However, the pick/ban order will not change, meaning the opponent team would pick/ban <span style={{ color: "#33cc33" }}>3 maps in a row.</span>
                            </CustomListItem>
                            <CustomListItem>
                                <span style={{ color: "#33cc33" }}>More time may be given under referee discretion.</span>
                            </CustomListItem>
                            <CustomListItem>
                                Ban order is <span style={{ color: "#33cc33" }}>ABAB.</span>
                            </CustomListItem>
                            <CustomListItem>Mod rules:
                                <StyledList>
                                    <CustomListItem sub={true}>
                                        <span style={{ color: "#33cc33" }}>On Freemod maps</span>, each team must use <span style={{ color: "#33cc33" }}>1 HR and 1 HD on separate players.</span> The third player does not have to play with an extra mod (HDHR counts as HR).</CustomListItem>

                                    <CustomListItem sub={true}>Allowed mods are <span style={{ color: "#33cc33" }}>HD, HR, and EZ.</span>
                                    </CustomListItem>
                                    <CustomListItem sub={true}><span style={{ color: "#33cc33" }}>NF is still enforced.</span></CustomListItem>
                                    <CustomListItem sub={true}>EZ multiplier is <span style={{ color: "#33cc33" }}>2x.</span></CustomListItem>
                                </StyledList>
                            </CustomListItem>


                            <CustomListItem>
                                There will only be <span style={{ color: "#33cc33" }}>one !mp abort allowed for each team per match.</span> A map may be aborted under the following conditions:
                                <StyledList>
                                    <CustomListItem sub={true}>A player disconnection happens <span style={{ color: "#33cc33" }}>within the first 30 seconds.</span></CustomListItem>
                                    <CustomListItem sub={true}>A player notifies the referee to abort <span style={{ color: "#33cc33" }}>within the first 30 seconds,</span> no matter the reason.</CustomListItem>
                                </StyledList>

                            </CustomListItem>
                            <CustomListItem>
                                Teams may call for a <span style={{ color: "#33cc33" }}>60 seconds technical timeout once per match.</span>
                            </CustomListItem>
                            <CustomListItem>
                                In the case of tiebreaker, a <span style={{ color: "#33cc33" }}>2-minute preparation timer</span> will be given.
                            </CustomListItem>
                            <CustomListItem>
                                If a situation arises that rules do not cover, common sense will be applied. The host has the final say on all tournament matters, but referees are instructed to enforce these rules as they see fit during the course of a match.
                            </CustomListItem>
                        </StyledList>
                    </StyledList>
                </RuleButton>
                <RuleButton title="Schedule">
                    <StyledList>
                        <CustomListItem>
                            <span style={{ color: "#dc5656" }}>
                                <b>Registrations:</b>
                            </span>{" "}
                            Oct 6 - Sep Oct 20, 12 UTC
                        </CustomListItem>
                        <CustomListItem>
                            <span style={{ color: "#d04a2f" }}>
                                <b>Screening:</b>
                            </span>{" "}
                            Oct 20 - Nov 3
                        </CustomListItem>
                        <CustomListItem>
                            <span style={{ color: "#ffbf00" }}>
                                <b>Qualifiers:</b>
                            </span>{" "}
                            Nov 10 - Nov 13, 18 UTC
                        </CustomListItem>
                        <CustomListItem>
                            <span style={{ color: "#6daf50" }}>
                                <b>Round of 32:</b>
                            </span>{" "}
                            Nov 17 - Nov 19
                        </CustomListItem>
                        <CustomListItem>
                            <span style={{ color: "#6daf50" }}>
                                <b>Round of 16:</b>
                            </span>{" "}
                            Nov 24 - Nov 26
                        </CustomListItem>
                        <CustomListItem>
                            <span style={{ color: "#5d99a2" }}>
                                <b>Quarterfinals:</b>
                            </span>{" "}
                            Dec 1 - Dec 3
                        </CustomListItem>
                        <CustomListItem>
                            <span style={{ color: "#3282cd" }}>
                                <b>Semifinals:</b>
                            </span>{" "}
                            Dec 8 - Dec 10
                        </CustomListItem>
                        <CustomListItem>
                            <span style={{ color: "#6c52ad" }}>
                                <b>Finals:</b>
                            </span>{" "}
                            Dec 15 - Dec 17
                        </CustomListItem>
                        <CustomListItem>
                            <span style={{ color: "#3282cd" }}>
                                <b>Holiday & New Year’s Break:</b>
                            </span>{" "}
                            2 Weeks
                        </CustomListItem>
                        <CustomListItem>
                            <span style={{ color: "#dc143c" }}>
                                <b>Grand Finals:</b>
                            </span>{" "}
                            Jan 5 - Jan 7
                        </CustomListItem>
                    </StyledList>
                </RuleButton>
                <Box
                    height="5vh"
                    width="100%"
                >
                </Box>
            </Box>

            <Footer />
        </PageWrapBox>

    )
}

export default RulesPage