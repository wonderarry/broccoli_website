import {
    Box,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowDown from 'assets/arrowdown.svg';


const OrderedDropdownSelector = ({ data, overrideSelect = 0, handleChangeSelection }) => {

    const [selectedOption, setSelectedOption] = useState(data.filter((item) => item.order === overrideSelect)[0]['_id']);
    const handleSelection = (id) => {
        setSelectedOption(id);
        handleChangeSelection(id);
    }

    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        handleSelection(selectedOption);
    }, [])

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingBottom: '1.5rem'
                }}
                onClick={() => {setIsOpened(!isOpened)}}
            >
                <Typography
                    variant='h2'
                    sx={{
                        paddingRight: '1rem',
                        userSelect: 'none'
                    }}
                >{data.find((item) => item._id === selectedOption)['stage']}</Typography>
                <img src={ArrowDown} style={{
                    transform: !isOpened ? 'rotate(0)' : 'rotate(-180deg)',
                    transition: '0.4s'
                }}/>
            </Box>

            <Box
                sx={{
                    transform: isOpened ? 'scaleY(1)' : 'scaleY(0)',
                    opacity: isOpened ? 1 : 0,
                    transformOrigin: 'top',
                    transition: 'transform 0.3s, opacity 0.4s, boxShadow 0.4s',
                    position: 'absolute',
                    borderRadius: '10px',
                    boxShadow: isOpened ? '0px 5px 10px rgba(0, 0, 0, 0.2)' : 0,
                    backgroundColor: '#ffffff'
                }}
            >
                {data.sort((a, b) => {
                    return a.order - b.order;
                }).map((item) => {
                    return (
                        <Typography
                            key={item._id}
                            variant='h3'
                            onClick={() => handleSelection(item._id)}
                            sx={{
                                color: (selectedOption === item._id) ? '#17cc66' : '#000000',
                                textDecoration: (selectedOption === item._id) ? 'underline' : null,
                                transition: '0.5s',
                                paddingLeft: '1rem',
                                paddingRight: '2rem',
                                paddingY: '0.7rem',
                                userSelect: 'none'
                            }}
                        >
                            {item.stage}
                        </Typography>
                    )
                })}
            </Box>
        </Box>
    )
}

export default OrderedDropdownSelector;