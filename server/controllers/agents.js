import { Agent } from '../models/PlayerDisplay.js';

export const getAgentsList = async (req, res) => {
    try{
         //we want to display all the data present in the collection
        const allAgents = await Agent.find();
        res.status(201).json(allAgents);
    }
    catch (err){
        res.status(500).json( {'error': err.message});
    }
};



