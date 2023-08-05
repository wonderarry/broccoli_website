import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
    osuId: {
        type: Number,
        required: true,
        index: {
            unique: true,
            partialFilterExpression: { osuId: { $type: 'string' } }
        }
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
});

// const TeamMemberSchema = new mongoose.Schema({
//     player: AgentSchema,
//     isCaptain: {
//         type: Boolean,
//         required: true,
//         default: false
//     },
// })

const TeamSchema = new mongoose.Schema ({
    members: {
        type: [AgentSchema],
        default: [null, null, null, null, null, null]
    },
    captainIndex: {
        type: Number,
        required: true,
        unique: false
    }
}, {timestamps: true});

export const Agent = mongoose.model("Agent", AgentSchema);
export const Team = mongoose.model("Team", TeamSchema);