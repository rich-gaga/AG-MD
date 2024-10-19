const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkQzdFhRaW9JTDQ5d05aVHp2SmdZZzJ3RUF5d3YwYkZ6WlYzdExxYnZHbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM0dMbDdyR0I2UFlwK0VXN1A0Z0wzM0dYZHlZUVFaZ2NVMVdPdU9Kaitsdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2TS9DYis4bXFOTEZMbU5GTExVY25GRjVzSW9Pa2U5TGluS3dEaTllaEVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqcWhyNmFMUmU3SW0yMU5CUC9vdnRsbFlDSytobWhlRUtKR0lrWjd5UlNNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9NenpDT3NEUjVOOE1OQW9ya1o4NkRmWXZmUDJ0UXc5bGM4MUpTaUlGV2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxwUzRqRU4zUDk3VnE3Q0xaazZJck9pR1I3Sm5YQkdxMzhFME9QSGRVa2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0t1aWk4UytrR1BjVG1KRXhWdW1hb3Boa21TUkVickdnQ3RrVTVUT3luZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0h4NldyUGJPRWhiZElzSTlpcFQ3T3Z3b0M2cVJqc0Q0SUh1bjhJNkpXUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBaRk42aklITFA4ODl1blhvYkxFTWhzREpGcFZPQmdGSENNemZIaG9QR29qVVNGTlpIMlplRDJqNzNNYysreTZ2RjRUL0VxblRWNVdQWnVDZGU3dUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAxLCJhZHZTZWNyZXRLZXkiOiJ6ZnIwQ3F3QVNldlFaQWowWnZ1cHRYY1ZOL3YwZVl0NmdMNmNsNWF0K0FzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyMzgzNTcxMDA4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkVDRjRBMURFOUY2ODE5MEY5RUI3REU2MkE4NTQwRDRGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjgyOTA2Mzd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIyMzgzNTcxMDA4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjVCQTlEREY2N0NEOUEzMTM1QTc3N0Q1NEFFMzRBNUQyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjgyOTA2Mzd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkIzSTlmZ2FNUzgyRnZLRGJ5T2I4QWciLCJwaG9uZUlkIjoiMmExMjk3MGYtMjEyMC00N2VkLWE1MzQtMzViYjg5OTY0YmJjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtlSG80NHB1dm1zSmZWZDBIdUgzOFIzNm9nbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtVElpNnNsazNwUUFrV3Z3U2xnT0RQcWpZNDA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRktNOUVWMUYiLCJsYXN0UHJvcEhhc2giOiIyWk42aXYiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlBZz09In0sIm1lIjp7ImlkIjoiMjIzODM1NzEwMDg6MTRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2VvvCdlop58J2WifCdlpTwnZaaIPCdlb7wnZaZ8J2WhvCdlpfwnZaQIiwibGlkIjoiMTA2MDk0MzMyNDk3OTY0OjE0QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTTNleThVQkVNUytqcmdHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVEpUTjVtWFJSeFBDa01YaGlaODVGS0xpTm5WbzhXZWtJUlMzZDFsZDhsMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiM2IxV1dNVEJHZ01nK2FhemlIT0lnQTF6WnlFNE1CYW1KcDQ0V2hUMDB3OXltWERJTUlPcjEra2RQVlhDeWJ1VnA3MU1NcG1KalZlTjRldWozVEdsQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IjNFZ09kZjlZY2tQVC95VGRZcFRISlh6ZUFiekNDbTBJbGZ6ODA4eDdTYnFPaHcwNS9XcXMyZ3U1ZktScEZZdUxITkQ3ZVFWNlptSEVWZi9pcENKY0JRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjIzODM1NzEwMDg6MTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVXlVemVabDBVY1R3cERGNFltZk9SU2k0aloxYVBGbnBDRVV0M2RaWGZKZCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyODI5MDYzMiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOQkkifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE, *
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER, 83571008             
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
