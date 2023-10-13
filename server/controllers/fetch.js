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
    // console.log("Approximation of request return size: ", JSON.stringify(rowsRequest).length);

    const requestData = rowsRequest.data.values;
    // console.log('players: ', requestData);
    for (let i = skipCount; i < requestData.length; i += 1) {
        const currentRow = requestData[i];
        const badges = currentRow[15];
        const bwsRank = currentRow[3] ** (0.9937 ** (badges ** 2));
        try {
            const newPlayer = new Player({
                osuId: currentRow[0],
                osuName: currentRow[1],
                rankNoBWS: currentRow[3],
                badgeCount: badges,
                pp: currentRow[5],
                rankWithBWS: bwsRank,
            })
            await newPlayer.save();
        }
        catch (e) {
            console.log("Player with data: ", currentRow, " couldn't be submitted. Error: ", e)
        }
        // console.log('index: ', i)
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
    //here we're NOT hopping over odd rows due to the expected formatting of the sheet
    try {
        for (let i = 0; i < requestData.length; i += 1) {
            try {
                const currentRow = requestData[i];
                console.log('i: ', i, ', currentRow: ', currentRow);
                const currentName = currentRow[0];
                const currentDiscord = currentRow[7];
                const strengthsFlag = currentRow[10];

                const potentialMatch = await Agent.findOne({ osuName: currentName });
                if (potentialMatch === null) {
                    const existingRecord = await Player.findOne({ osuName: currentName });
                    const newAgent = new Agent({
                        osuId: existingRecord.osuId,
                        osuName: existingRecord.osuName,
                        rankNoBWS: existingRecord.rankNoBWS,
                        badgeCount: existingRecord.badgeCount,
                        pp: existingRecord.pp,
                        rankWithBWS: existingRecord.rankWithBWS,
                        strengthsFlag: strengthsFlag,
                        discordId: currentDiscord
                    });
                    await newAgent.save()
                }
            }
            catch (e) {
                console.log("Fetching free agent ", requestData[i], " failed. Error: ", e)
            }
        }
    }
    catch (e) {
        console.log("Fetching free agents - loop failed. Error: ", e);
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
    console.log(rowsRequest.data)
    const requestData = rowsRequest.data.values;
    // console.log('teams: ', requestData);
    const latestEntry = await Team.findOne().sort({ createdAt: -1 });

    //here we're NOT hopping over odd rows due to the actual formatting of the sheet
    try {
        for (let i = 0; i < requestData.length; i += 1) {
            const currentRow = requestData[i];
            try {
                const teamName = currentRow[0];
                const leaderDiscord = currentRow.slice(55, 61)[0]; //BE to BJ, starting the count from B = 0
                //we are assuming captainIndex to be 0 here, otherwise would be [captainIndex]
                
                const memberNames = currentRow.slice(4, 10);
                console.log('memberNames: ', memberNames)

                const teamMembers = await Promise.all(memberNames.map(async (playerId) => {
                    const matchingPlayer = await Player.findOne({ osuId: playerId });
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
                }));
                console.log('teamMembers: ', teamMembers);
                const newTeam = new Team({
                    members: teamMembers,
                    captainIndex: 0,
                    teamName: teamName,
                    leaderDiscord: leaderDiscord
                })
                const requiredPadding = 6 - newTeam.members.length;
                for (let i = 0; i < requiredPadding; i += 1) {
                    newTeam.members.push(null);
                }
                await newTeam.save();
            }
            catch (e) {
                console.log("Fetching team ", currentRow, " failed. Error: ", e)
            }
        }


    }
    catch (e) {
        console.log("Fetching teams - loop failed. Error: ", e);
    }
    if (latestEntry !== null) {
        const latestDate = latestEntry.createdAt;
        await Team.deleteMany({ createdAt: { $lt: latestDate } });
        await Team.deleteMany({ createdAt: latestDate });
    }

}

