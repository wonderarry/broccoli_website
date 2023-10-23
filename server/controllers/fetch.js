import { google, sheets_v4 } from "googleapis";
import { Player } from "../models/Player.js";
import { Agent, Team } from "../models/PlayerDisplay.js";
import { createSheetsInstance } from "../utility/createSheetsInstance.js";
import { OsuMap, Mappool } from "../models/Mappool.js";

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
                // console.log('i: ', i, ', currentRow: ', currentRow);
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
    // console.log(rowsRequest.data)
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
                // console.log('memberNames: ', memberNames)

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
                // console.log('teamMembers: ', teamMembers);
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


export const fetchCurrentMaps = async () => {
    const [auth, sheets] = await createSheetsInstance();
    const rowsRequest = await sheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: process.env.SPREADSHEET_MAPS_ID,
        range: process.env.SPREADSHEET_MAPS_RANGE,
    });
    const requestData = rowsRequest.data.values;
    try {
        for (let i = 0; i < requestData.length; i += 1) {
            const currentRow = requestData[i];
            try {
                const [beatmapid, modflag] = currentRow[0].split('|');
                const artist = currentRow[7];
                const creator = currentRow[9];
                const title = currentRow[22];
                const diffname = currentRow[24];
                const starrating = currentRow[11];
                const bpm = currentRow[8];
                const cs = currentRow[14]
                const ar = currentRow[15];
                const od = currentRow[16];
                const hp = currentRow[17];
                const draintime = currentRow[18];
                const maxcombo = currentRow[31];

                const filter = { beatmapid: beatmapid }; // Unique key for the query
                const update = {
                    $set: {
                        artist: artist,
                        title: title,
                        diffname: diffname,
                        starrating: starrating,
                        bpm: bpm,
                        cs: cs,
                        ar: ar,
                        od: od,
                        hp: hp,
                        draintime: draintime,
                        maxcombo: maxcombo,
                        modflag: modflag,
                        creator: creator
                    }
                };
                await OsuMap.findOneAndUpdate(filter, update, { new: true, upsert: true });

            }
            catch (e) {
                console.log("An error occured on the row ", i, " of fetched data for maps. Error: ", e);
            }
        }
    }
    catch (e) {
        console.log("An error occured with the whole fetch loop for maps. Error: ", e)
    }
}

export const fetchCurrentMappools = async () => {
    const [auth, sheets] = await createSheetsInstance();

    const getMainRange = (worksheetName) => {
        return worksheetName + '!' +  process.env.SPREADSHEET_MAPPOOLS_RANGE;
    }
    const getExtraRange = (worksheetName) => {
        return worksheetName + '!' + process.env.SPREADSHEET_MAPPOOL_EXTRAS_RANGE;
    }

    const worksheetsList = process.env.SPREADSHEET_MAPPOOLS_WORKSHEETS.replace(/"/g, '').split(', ');

    try {
        let i = 0;
        for (const worksheet of worksheetsList) {
            
            const mainRequest = await sheets.spreadsheets.values.get({
                auth: auth,
                spreadsheetId: process.env.SPREADSHEET_MAPPOOLS_ID,
                range: getMainRange(worksheet)
            })
            const extraRequest = await sheets.spreadsheets.values.get({
                auth: auth,
                spreadsheetId: process.env.SPREADSHEET_MAPPOOLS_ID,
                range: getExtraRange(worksheet)
            })
            const mappoolName = extraRequest.data.values[0][0]; // this one includes the display name for the mappool
            const mainData = mainRequest.data.values; // this holds the ids for the map and where they belong (nm3 for example)
            console.log(mainData)
            try {
                // we look if the same stage name is present - if yes, then we update it. if not, we create the entry
                const filter = { stage: mappoolName }
                
                let entryArray = [];
                for (const row of mainData){
                    const mapId = row[3];
                    const modType = row[1];
                    const modEnum = row[2];
                    entryArray.push({
                        category: modType,
                        enum: modEnum,
                        map: await OsuMap.findOne({ beatmapid: mapId })
                    })
                }
                const update = {
                    $set: {
                        order: i,
                        entries: entryArray
                    }
                }
                await Mappool.findOneAndUpdate(filter, update, { new: true, upsert: true });
                i += 1;
            }
            catch (e) {
                console.log("An error occured while processing a mappool. Error: ", e);
            }
        }
    }
    catch (e) {
        console.log("Error occured with the main loop of mappools fetch. Error: ", e)
    }
}