import { google, sheets_v4 } from "googleapis";
import { Player } from "../models/Player.js";
import { Agent, Team } from "../models/PlayerDisplay.js";
import { createSheetsInstance } from "../utility/createSheetsInstance.js";

export const fetchCurrentPlayers = async () => {
    //we might need to implement some circumvention of the harsh rate limit later on
    const [auth, sheets] = await createSheetsInstance();
    //here we presume that players in the _api worksheet are only getting added
    const skipCount = await Player.count();
    const rowsRequest = await sheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: process.env.SPREADSHEET_ALL_USERS_ID,
        range: process.env.SPREADSHEET_ALL_USERS_RANGE
    })

    const requestData = rowsRequest.data.values;
    // console.log('players: ', requestData);
    for (let i = skipCount; i < requestData.length; i += 1) {
        const currentRow = requestData[i];
        const newPlayer = new Player({
            osuId: currentRow[0],
            osuName: currentRow[18],
            rankNoBWS: currentRow[3],
            badgeCount: currentRow[15],
            pp: currentRow[5],
            rankWithBWS: currentRow[21]
        })
        await newPlayer.save();
    }
}

export const fetchCurrentAgents = async () => {
    const [auth, sheets] = await createSheetsInstance();
    const rowsRequest = await sheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: process.env.SPREADSHEET_AGENTS_ID,
        range: process.env.SPREADSHEET_AGENTS_RANGE,
    });

    const requestData = rowsRequest.data.values;
    // console.log('agents: ', requestData);
    //here we're hopping over odd rows due to the expected formatting of the sheet
    for (let i = 0; i < requestData.length; i += 2) {
        const currentName = requestData[i][0];
        const potentialMatch = await Agent.findOne({ osuName: currentName });
        if (potentialMatch === null) {
            const existingRecord = await Player.findOne({ osuName: currentName });
            const newAgent = new Agent({
                osuId: existingRecord.osuId,
                osuName: existingRecord.osuName,
                rankNoBWS: existingRecord.rankNoBWS,
                badgeCount: existingRecord.badgeCount,
                pp: existingRecord.pp,
                rankWithBWS: existingRecord.rankWithBWS
            });
            await newAgent.save()
        }
    }

}

export const fetchCurrentTeams = async () => {
    const [auth, sheets] = await createSheetsInstance();
    //i can't come up with a clever way to update teams so 
    //we're just going to wipe the collection and start over
    const rowsRequest = await sheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: process.env.SPREADSHEET_TEAMS_ID,
        range: process.env.SPREADSHEET_TEAMS_RANGE,
    });

    const requestData = rowsRequest.data.values;
    // console.log('teams: ', requestData);
    const latestEntry = await Team.findOne().sort({ createdAt: -1 });
    //here we're hopping over odd rows due to the expected formatting of the sheet
    for (let i = 0; i < requestData.length; i += 2) {
        const currentRow = requestData[i];
        //same thing - only even rows contain names (supposedly)
        const filteredRow = currentRow.filter((element, index, array) => {
            return i % 2 == 0;
        })

        const captainName = filteredRow[0];
        const memberNames = filteredRow.slice(2, filteredRow.length).filter((v, i) => {
            return i % 2 == 0;
        })
        // console.log(memberNames);
        const captainIndex = memberNames.findIndex((item) => {
            return item == captainName;
        })
        const newTeam = new Team({
            members: await Promise.all(memberNames.map(async (username) => {
                const matchingPlayer = await Player.findOne({ osuName: username });
                if (matchingPlayer === null) {
                    return null;
                }
                return {
                    osuId: matchingPlayer.osuId,
                    osuName: matchingPlayer.osuName,
                    rankNoBWS: matchingPlayer.rankNoBWS,
                    badgeCount: matchingPlayer.badgeCount,
                    pp: matchingPlayer.pp,
                    rankWithBWS: matchingPlayer.rankWithBWS
                }
            })),
            captainIndex: captainIndex
        })
        const requiredPadding = 6 - newTeam.members.length;
        for (let i = 0; i < requiredPadding; i += 1){
            newTeam.members.push(null);
        }
        await newTeam.save();
    }

    if (latestEntry !== null) {
        const latestDate = latestEntry.createdAt;
        await Team.deleteMany({ createdAt: { $lt: latestDate } });
        await Team.deleteMany({ createdAt: latestDate });
    }

}

