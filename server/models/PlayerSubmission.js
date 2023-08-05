import mongoose from "mongoose";

const AgentSubmissionSchema = new mongoose.Schema({
    osuId: {
        type: Number,
        required: true,
        index: {
            unique: true,
            partialFilterExpression: { osuId: { $type: 'string' } }
        }
    },
    discordId: {
        type: String, 
        required: true,
        unique: false
    }
}, {timestamps: true})

const TeamSubmissionSchema = new mongoose.Schema({
    members: [AgentSubmissionSchema],
    captainIndex: {
        type: Number,
        required: true,
        unique: false,
    },
    teamName:{
        type: String,
        required: true
    }
}, {timestamps: true})

export const AgentSubmission = mongoose.model("AgentSubmission", AgentSubmissionSchema)
export const TeamSubmission = mongoose.model("TeamSubmission", TeamSubmissionSchema)
