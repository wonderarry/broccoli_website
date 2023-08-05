import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
    osuId: {
        type: Number,
        required: true,
        index: {
            unique: true,
            partialFilterExpression: { osuId: { $type: 'string' } }
        }   
    },
    discordId: {
        type: Number,
        required: false, 
        unique: false,
    },
    osuName: {
        type: String,
        required: true,
        unique: false,
    },
    rankNoBWS: {
        type: Number,
        required: true,
        unique: false,
    },
    badgeCount: {
        type: Number,
        required: true,
        unique: false,
    },
    pp: {
        type: Number,
        required: true,
        unique: false,
    },
    rankWithBWS: {
        type: Number,
        required: true,
        unique: false,
    }
}, {timestamps: true});

export const Player = mongoose.model('Player', PlayerSchema);