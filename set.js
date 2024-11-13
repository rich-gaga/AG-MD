const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ1BwanVEQW02WHV4Wk5EanJjMEtsUldKaHVIdUxjbXdIU04zTVRadXhIUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFpqaFRzVmtObGwwc09SeitmYVlpQjYyUlovS29xQjJEYVhab2s1bVdrUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjRDNBMjFlUWdzTXVDRktkdFVpc1l2UjZkb0VXUXVLcm1LSHc2cjRTS2xrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRRUNlbm01dG8zajlWVEpCN3hpS0pEV2tGVWNTRFJuUi9LVlgveExPRFJZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFLbVFLSThqdDlsSW92NmFuU1RkTDAvbGZPTnlYay9tbUhxdjAxRUs1VUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhLY2VHNks3eHVBZTIvNVhDZDFJbUhRUVVIZHY5RmZkb1JlcThOVjY1RXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU1OSnNBeGRkamlUNUJ5b3owUHNOZ2NTeVdadENmU00wVTVmSW80c2RFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0J4M3F4S3pCd3I2T3A3SGZwZldjWEFMYno5bnA4LzVseFA5ZlJZNEpSVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhDdTltZ0xrMjBaOWtZTjJWRFNaQnVBa2l5TzBMcjRGZzBlM01tRzg2Kzh1bS83WFpqVlpYZEF6K3JkZUtTOFRoSklpVzE0dGlCc3RBM2dpMWxzT0NnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM0LCJhZHZTZWNyZXRLZXkiOiJuL2M0cVpDUU50K0pGWDJRZHFHWjMydnlQVzE1Zys1WmlhMlZyeHo0dFpBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzE0NDM4MDkxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJEMTRDQTgzQjE5MTA0NzdCN0Q5NzYwRkEyNUM3RUYzQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMxNDk5MDAxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMxNDQzODA5MTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzVGMEMyNDg1QzgyQUEwOUJEQTdGOUVFMDBEQTM1MTUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMTQ5OTAwM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoib28xZ0RGOU9UcmVHWG5zd19rMWh0dyIsInBob25lSWQiOiJkMWI2NjFmYy02YTJjLTRjZmMtOWU0MS01NDY2NmMyZmZjZTIiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2VGcFdDeXlWYmdWWVFIYk85L2dDR1QwRXowPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBHbTltZTNpZmNnVUFoaWErMkpLZGFrdmdwcz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiI5VDlGODNSQSIsImxhc3RQcm9wSGFzaCI6IjI4WlJsYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUFnPT0ifSwibWUiOnsiaWQiOiI5MjMxNDQzODA5MTQ6NzRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Vt/CdlpTwnZab8J2WiiDwnZaE8J2WlPCdlpog8J2VtfCdlobwnZaT8J2WlPCfmJgiLCJsaWQiOiIyMDEwNDc5ODk1NTUyNzc6NzRAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMTDI2OHNCRVBLbjBya0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJtREY5OXpNbE5nTk9QOWNYaUIzbUxUOXZlUFo0Y1BzNkM3SzhmKzN5bm44PSIsImFjY291bnRTaWduYXR1cmUiOiJBaGlzZ1lEdzlaWG1ac2t1b2FDYmNmRGdKKzFTVFUvYzVCc1hsTUJzNElpOEl1OW8yeEFjRStUS3cvbCttOFRsdTd1cU9pYWRGczhiQ1FMVHQvYWJDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMjZ3MnllRFZkZ1hRamlERDVCQ0VZV1BHdE5QWkpkSVNzNmI1YlFiNmljZTI5cWFEMUMyMDdwN2lvNEVPenBHYmhFU05hS0hmTDc5dXNJOVRTeks0Q3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMxNDQzODA5MTQ6NzRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmd4ZmZjekpUWURUai9YRjRnZDVpMC9iM2oyZUhEN09ndXl2SC90OHA1LyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMTQ5ODk5NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPRTIifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
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
