import React from 'react'
import Navbar from 'scenes/widgets/navbar';
import { Box, ListItem, Typography, List } from '@mui/material';
import PageWrapBox from 'components/PageWrapBox';
import Footer from 'scenes/widgets/footer';
import { AddSharp } from "@mui/icons-material";
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

const CustomListItem = ({ children }) => {
    const shownText = " \u2022 " + children;
    return (
        <ListItem>
            <Typography
                variant='h3'
                sx={{
                    flexWrap: 'wrap'
                }}
            >
                {shownText}
            </Typography>
        </ListItem>
    )
}



const StyledList = styled(List)({
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    paddingBottom: '1rem'
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
                <RuleButton title="Information">
                    <StyledList>
                        <CustomListItem>
                            This is the first item This is the first item This is the first item This is the first item This is the first item This is the first item
                        </CustomListItem>
                        <CustomListItem>
                            This is the second item This is the first item This is the first item This is the first item This is the first item This is the first item
                        </CustomListItem>
                    </StyledList>
                </RuleButton>
                <RuleButton title="Rules">1231312</RuleButton>
                <RuleButton title="Pool Format">asdada</RuleButton>

            </Box>
            <Footer />
        </PageWrapBox>

    )
}

export default RulesPage