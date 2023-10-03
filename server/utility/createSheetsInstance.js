import { google } from "googleapis";

export async function createSheetsInstance(){
    const privatekey = Buffer.from(process.env.SERVICE_ACCOUNT_PRIVATE_KEY, 'base64').toString('ascii');
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
            private_key: privatekey,
        },
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    // const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: auth });
    
    return [ auth, sheets ];
}
