import { google } from "googleapis";

export async function createSheetsInstance(){
    console.log('before change: ', process.env.SERVICE_ACCOUNT_PRIVATE_KEY)
    console.log('after change: ', process.env.SERVICE_ACCOUNT_PRIVATE_KEY.split(String.raw`\n`).join('\n'))
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
            private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
        },
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    // const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: auth });
    
    return [ auth, sheets ];
}
