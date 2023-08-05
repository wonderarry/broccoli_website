import { Team } from '../models/PlayerDisplay.js';

export const getTeamsList = async (req, res) => {
    try{
         //we want to display all the data present in the collection
        const allTeams = await Team.find();
        res.status(201).json(allTeams);
    }
    catch (err){
        res.status(500).json( {'error': err.message});
    }
};
