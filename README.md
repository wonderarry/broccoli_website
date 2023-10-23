# Broccoli Cup 3 Tournament Website

## About Broccoli Cup 3

Broccoli Cup 3 is a tiered osu! tournament with high expected skill ceiling for the maps featured in the later rounds. 

## Features

- **Solo and Team Registration**: Join the excitement by registering as a solo player or forming a team with your friends. Compete in various gaming categories for a chance to win amazing prizes.
- **Tournament Bracket**: Stay up-to-date with the tournament progress through our dynamic bracket system. Follow your favorite teams and players as they advance to the championship rounds.
- **Free Agents and Teams**: Explore a list of free agents and teams participating in the tournament. Connect with potential teammates or opponents and forge new alliances.
- **Comprehensive Dashboard**: Access a user-friendly dashboard to manage your registration, view schedules, track scores, and receive important updates.
- **Interactive User Interface**: Navigate through our modern and intuitive interface designed to enhance your overall tournament experience.

## Technologies Used

Broccoli Cup 3 is crafted from scratch using the latest technologies:

- **Express.js and Node.js**: Powering the back-end infrastructure, ensuring seamless performance and real-time updates.
- **React.js**: Creating an engaging front-end user interface that is both visually appealing and highly functional.
- **MongoDB**: Storing player profiles, tournament data, and match results securely and efficiently.


<small>If you find the description hilarious, that's because it's AI generated - though the project indeed runs on MERN stack.</small>

## What do you need if you want to get it running ASAP
- MongoDB Atlas account (free plan will more than suffice)
- Google Cloud Console service account with access to Google Drive API and Google Sheets API, and you will need to grab the credentials from the config
- A server with static IP and open ports 80 and 443 (you will have to do some reverse proxying if you have a running nginx instance on the host machine already)
- Ability to add the Google service account to editors of all the sheets that are going to be involved (do it via the email that each service account has)
- At least some understanding of how the data will be formatted in those sheets (so which data belongs to which row, because the website will be writing and reading data from those sheets)



## Docker Instruction
- **Running with concurrently (for local testing)**: **docker-compose -f docker-compose-dev-concurrently.yml up --build**
- **Running with nginx (for http deployment on real machine)**: **docker-compose -f docker-compose-dev-concurrently.yml up --build**
Before using the prod compose, you would first want to get the certificates from certbot and allow for automatic renewal. To do that, you need to do the following:
1. Run the nginx dev compose
2. Open sh in the client container
3. Run certbot there
4. Copy the /etc/letsencrypt folder after following through with all its instructions to ./client/letsencrypt destination
After that you can run **docker-compose -f docker-compose-prod.yml up --build** and on each start of the container it will check if certificates need to be renewed - in which case it is done automatically. 
All of this pretty difficult process could potentially be done in a much simpler way where you just get the certificates and use the resulting config, but I'm not sure you can do autorenewal in dockerized environments with such ease this way.


## Guide on how to set up your own .env file (should be in the ./server/ dir)
You will need to fill in the following env variables in it:
- **MONGO_URL** is the url through which you are connecting to the db
- **SERVER_PORT** is the server port. I am not using the standard **PORT** name because if the client sees this env variable (which it will in case of the containerized version), both the server and the client will attempt to run on the same port.
- **JWT_SECRET** is not required but was left with assumption that later on there will be need for authentication|authorization. 

- **SPREADSHEET_ALL_USERS_ID** is the id of the spreadsheet that hosts the _api worksheet
- **SPREADSHEET_ALL_USERS_RANGE** is the range where we expect all the _api data to be in. **Please be aware that you will more than likely have to perform some tweaking in the ./server/controllers/fetch.js to actually fetch the correct data (so you will have to specify the correct rows where data is).**

Same goes for the following:
- **SPREADSHEET_AGENTS_ID**
- **SPREADSHEET_AGENTS_RANGE**

- **SPREADSHEET_TEAMS_ID**
- **SPREADSHEET_TEAMS_RANGE**

- **SPREADSHEET_AGENT_SUBMISSIONS_ID**
- **SPREADSHEET_AGENT_SUBMISSIONS_RANGE**

- **SPREADSHEET_TEAM_SUBMISSIONS_ID**
- **SPREADSHEET_TEAM_SUBMISSIONS_RANGE**

You will need a service account in order to actually run this system in sync with the spreadsheet. You have to specify the following related env variables:
- **SERVICE_ACCOUNT_CLIENT_EMAIL** is the email that could be found in the credentials file as well as on the Google Cloud Console.
- **SERVICE_ACCOUNT_PRIVATE_KEY** - look for it in the credentials file, it's the big string that begins with **-----BEGIN PRIVATE KEY----**