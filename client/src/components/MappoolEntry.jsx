import {
    Box,
    Typography,
    useTheme,
    Paper,
    IconButton
} from "@mui/material";
import { FileDownloadSharp } from "@mui/icons-material";

const MappoolEntry = ({ mapper, songName, songAuthor, mapType, mapsetId, mapId }) => {
    const onClickUrl = `https://osu.ppy.sh/beatmapsets/${mapsetId}#osu/${mapId}`
    const imageUrl = `https://assets.ppy.sh/beatmaps/${mapsetId}/covers/cover.jpg`;
    const mapperMention = `by ${mapper}`;
    const songMention = `${songAuthor} - ${songName}`;
    const theme = useTheme();

    const mapperTypographyStyle = {
        color: "#A3A3A3",
        fontWeight: '500'
    }

    const songTypographyStyle = {
        color: "#F0F0F0",
        fontWeight: '500'
    }

    const mapTypeTypographyStyle = {
        color: "#F0F0F0",
        fontWeight: '600'
    }
    /* 
            onClick={() => window.location.href = onClickUrl}
            sx={{
                width: '20%',
                height: '10%'
            }}
            variant="rounded"*/
    return (
        <Paper
            elevation={3}
            sx={{
                width: 'max(340px, min(70%, 700px))',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                paddingTop: '2rem',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                paddingBottom: '1rem',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                borderRadius: '10px'
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderRadius: '5px',
                    padding: '0.3rem 0.6rem'
                }}

            >
                <Typography
                    sx={mapperTypographyStyle}
                    variant="h5"
                >
                    {mapperMention}
                </Typography>
                <Typography
                    sx={songTypographyStyle}
                    variant="h3"
                >
                    {songMention}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    gap: '1rem',
                    alignItems: 'flex-end'
                }}
            >
                <Box
                    onClick={() => window.location.href = onClickUrl}
                    sx={{
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        borderRadius: '5px',
                        alignItems: 'center',
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        paddingY: '0.5rem',
                        paddingRight: '0.05rem',
                        '&:hover': {
                            cursor: 'pointer'
                        }
                    }}>
                    <FileDownloadSharp fontSize="large" />
                </Box>
                <Box
                    sx={{
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '5px'
                    }}
                >
                    <Typography
                        sx={mapTypeTypographyStyle}
                        variant="h4"

                    >
                        {mapType}
                    </Typography>
                </Box>
            </Box>

        </Paper>
    )
}

export default MappoolEntry;