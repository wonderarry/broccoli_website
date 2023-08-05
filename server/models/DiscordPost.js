import mongoose from "mongoose";


const DiscordPostSchema = new mongoose.Schema({
    discordId: {
        type: Number,
        require: true,
        unique: false
    },
    discordUsername: {
        type: String,
        require: true,
        unique: false
    },
    messageContent: {
        type: Text,
        require: true,
        unique: false
    }
})