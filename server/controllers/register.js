import { google, sheets_v4 } from "googleapis";
import { AgentSubmission, TeamSubmission } from "../models/PlayerSubmission.js";
import { createSheetsInstance } from "../utility/createSheetsInstance.js";

const submitAgent = async (agent) => {
    const [ auth, sheets ] = await createSheetsInstance();
    const appendRequest = await sheets.spreadsheets.values.append({
        auth: auth,
        spreadsheetId: process.env.SPREADSHEET_AGENT_SUBMISSIONS_ID,
        range: process.env.SPREADSHEET_AGENT_SUBMISSIONS_RANGE,
        valueInputOption: "RAW",
        resource: {
            values: [
                [agent.osuId,agent.discordId],
            ]
        }
    });
    //todo: error catching (assuming there are actual errors reported)
    let errorCode = 0;
    return errorCode;
}

const submitTeam = async (team) => {
    const [ auth, sheets ] = await createSheetsInstance();
    const appendRequest = await sheets.spreadsheets.values.append({
        auth: auth,
        spreadsheetId: process.env.SPREADSHEET_TEAM_SUBMISSIONS_ID,
        range: process.env.SPREADSHEET_TEAM_SUBMISSIONS_RANGE,
        valueInputOption: "RAW",
        resource: {
            values:[
                team.members.reduce((acc, cur) => {
                    return acc.concat([ cur.osuId, cur.discordId ]); 
                }, [team.captainIndex])
            ]
        }
    });
}


export const registerAgent = async (req, res) => {
    try {
        const { osuId, discordId } = req.body;
        const newAgent = new AgentSubmission ({
            osuId: osuId,
            discordId: discordId,
        })

        //check if this osu id is already present
        const potentialEntry = await AgentSubmission.findOne({ osuId: osuId });
        if (potentialEntry != null){
            //means there actually is such a user already
            res.status(409).json({ error: "Another submission with this osu! ID already exists."});
            return;
        }
        const mongoPromise = newAgent.save();
        const sheetsPromise = submitAgent(newAgent);

        await Promise.all([mongoPromise, sheetsPromise]);
        res.status(201).send(newAgent);
    }
    catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

export const registerTeam = async(req, res) => {
    try{
        const { members, captainIndex } = req.body;

        if (!Array.isArray(members) || members.length < 3 || members.length > 6){
            return res.status(400).json({ error: "Invalid team composition. A team must have 3 to 6 members."});
        }

        const newTeam = new TeamSubmission ({
            members: members,
            captainIndex: captainIndex,
        })
        //sadly i can't come up with a decent way of detecting duplicates here
        const mongoPromise = newTeam.save();
        const sheetsPromise = submitTeam(newTeam);

        await Promise.all([mongoPromise, sheetsPromise]);
        res.status(201).json(newTeam);
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
}
