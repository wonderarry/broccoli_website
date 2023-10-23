import mongoose from "mongoose";

const OsuMapSchema = new mongoose.Schema({
    beatmapid: {
        type: Number,
        required: true,
    },
    artist: {
        type: String
    },
    creator: {
        type: String
    },
    title: {
        type: String
    },
    diffname: {
        type: String
    },
    modflag: {
        type: Number
    },
    starrating: {
        type: Number
    },
    bpm: {
        type: Number
    },
    cs: {
        type: Number
    },
    ar: {
        type: Number
    },
    od: {
        type: Number
    },
    hp: {
        type: Number
    },
    draintime: {
        type: String
    },
    maxcombo: {
        type: Number
    }
})

const MappoolEntrySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    enum: {
        type: Number, 
        required: true
    },
    map: OsuMapSchema
})

const MappoolSchema = new mongoose.Schema({
    stage: {
        type: String,
        required: true,
        unique: true
    },
    order: {
        type: Number, 
        required: true,
    },
    entries: [MappoolEntrySchema]
})

export const OsuMap = mongoose.model("OsuMap", OsuMapSchema)

export const Mappool = mongoose.model("Mappool", MappoolSchema)