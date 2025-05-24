import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CREDENTIALS_PATH = process.env.GOOGLE_CREDENTIALS_PATH;
const GOOGLE_SHEET_RANGE = process.env.GOOGLE_SHEET_RANGE;

export async function fetchLocalizations() {

    if (!SHEET_ID || !CREDENTIALS_PATH) {
        console.error('GOOGLE_SHEET_ID and GOOGLE_CREDENTIALS_PATH must be defined in .env');
        process.exit(1);
    }

    if (!GOOGLE_SHEET_RANGE) {
        console.warn('⚠️ GOOGLE_SHEET_RANGE is not defined in .env. Using default range: Sheet1!A1:Z1000');
    }

    const KEY_FILE_PATH = path.isAbsolute(CREDENTIALS_PATH)
        ? CREDENTIALS_PATH
        : path.resolve(process.cwd(), CREDENTIALS_PATH);

    if (!KEY_FILE_PATH || !fs.existsSync(KEY_FILE_PATH)) {
        console.error(`❌ Credentials file not found at: ${KEY_FILE_PATH}`);
        process.exit(1);
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE_PATH,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: GOOGLE_SHEET_RANGE || 'Sheet1!A1:Z1000',
    });

    const rows = res.data.values;

    if (!rows || rows.length < 2) {
        console.error('No valid data found in the sheet.');
        return;
    }

    const headers = rows[0].slice(1);
    const result: Record<string, Record<string, string>> = {};

    headers.forEach((lang) => {
        result[lang] = {};
    });

    for (let r = 2; r < rows.length; r++) {
        const row = rows[r];
        const key = row[0];
        if (!key) continue;

        for (let c = 1; c < headers.length + 1; c++) {
            const lang = headers[c - 1];
            const value = row[c] || '';
            result[lang][key] = value;
        }
    }

    const outputPath = path.resolve(process.cwd(), 'localize/translations.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

    console.log('⚡️ Localize has been updated.');
}
