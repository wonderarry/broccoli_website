import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
//import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
/* MIDDLEWARE CONFIG */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* SETUP FOR FILE STORAGE */

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'public/assets');
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({ storage });


//setup for mongoose
const PORT = process.env.SERVER_PORT || 3001; // 3001 is the backup port in case the .env value is not specified
await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
}).catch((e) => {
    console.log(`An error occured during connection to the database: ${e}`);
})


/* CRON FETCH */
//important todo: when data is being updated, notify the frontend that data is currently updated
import { fetchCurrentPlayers, fetchCurrentAgents, fetchCurrentTeams } from "./controllers/fetch.js";
import cron from "node-cron";

const fetchTask = cron.schedule('0 */4 * * *', async () => {
    try{
        console.log("Fetching fresh data from Google Sheets...");
        app.locals.isUpdating = true;
        await fetchCurrentPlayers();
        console.log('Successfully fetched current players')
        await fetchCurrentAgents();
        console.log('Successfully fetched current agents')
        await fetchCurrentTeams();
        console.log('Successfully fetched current teams')
        app.locals.isUpdating = false;
        console.log("Fetch complete!")
    }
    catch (err){
        console.log("Encountered error during fetching: ", err);
        app.locals.isUpdating = false;
    }
}, { runOnInit: true });

fetchTask.start();

/* ROUTES WITH UPLOADS */ 

//app.post("/auth/register", upload.single("picture"), register); //upload is the middleware function, could be omitted

/* ROUTERS SECTION */
import registerRoutes from "./routes/register.js";
import agentsRoutes from "./routes/agents.js";
import teamsRoutes from "./routes/teams.js";

app.use("/register", registerRoutes);
app.use("/agents", agentsRoutes);
app.use("/teams", teamsRoutes);



