const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS055RjFlVnlSSXltU1ZOdE94dnpTYmlKbmF6Z2RQZ1ltQ05IazRXQ2lFND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU2Rjc3FqakpuYlBQTUdjdFh1RGxXOThwNnNKK1BtdldrdmZIZjRBRlRSND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRSUJKeExFY3EvR0RPcjNNeFEvaGxMbGgyS3NBRERHazJkYktXV2tsWTFvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvY0p4RHdLVjNRQ3BhcFBvc1o2R29lVjgwQ3JCZkh4OW5RMEtqUFhEVWg0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtBNnlLSU5sbUs1K1lSemE0NTJ0Mi9udHd3SzRXemJGRGFZbGsyWXVIa1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlF0TVVLNTRDaTNVS29kOEc0bnVzZEFGT0crNjc4VG1NRmlJMXhhVkx3bEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUlBbExpOFFxWkY5dDZJazNEMm50U0tXWTl0OUFpOUhMRldjTkpxdW4zVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaElxQjJCbW1iMTZGeThnNUZUdG1hT2lZWi9uQVR6cjVnQzNvWVp2ekN6MD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVEMDFFTzlXTXBzcmh6by90MkpmanZvRmJTSWFGcis0QzFBazVmeVArcFg5VnRlaWp3WjdRMkpIams3dFU2a0Q4MFIvUFMybkZjSmo4aUowN1pwTER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTUsImFkdlNlY3JldEtleSI6ImdzdHhBT2N6T1VDS09mQlF0UElmeGlWK0tuemNTYUs3Zk5zMHNUK2F1Rjg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjIzODM1NzEwMDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODM0QzhBMDdCQjZDNjM3NjNCRkQ1Q0U0NTkzQ0MxMzUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyODI0NTA2NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjIzODM1NzEwMDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjhGOTU1N0UzQUZCQkZCQjk4NUJCODVCODY2MDI1MEUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyODI0NTA2NX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiYjluLVFkd0hULW11RzNyNGNzQXdudyIsInBob25lSWQiOiIyYzNhZjZkNS1lMTZlLTRhYzMtOWFhNi04ZGE5ZGI5OGQyNTkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejR6M1RrdXBXOW1ZTm9OWlFQdEtpa1VqN0lVPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1SVmpwcTVtczAwNGc3YmVNczY0N2tpeU5XST0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJNNVJYQ1FaNCIsImxhc3RQcm9wSGFzaCI6IjJaTjZpdiIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUFnPT0ifSwibWUiOnsiaWQiOiIyMjM4MzU3MTAwODoxMUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZW+8J2WinnwnZaJ8J2WlPCdlpog8J2VvvCdlpnwnZaG8J2Wl/CdlpAiLCJsaWQiOiIxMDYwOTQzMzI0OTc5NjQ6MTFAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNM2V5OFVCRUwvYWk3Z0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJUSlRONW1YUlJ4UENrTVhoaVo4NUZLTGlOblZvOFdla0lSUzNkMWxkOGwwPSIsImFjY291bnRTaWduYXR1cmUiOiJLSjU2djVSY1ZBcVpwOHhBbGdXQ3FTekpkeEEwME0xV0xIcnB5UkRoakVqUkp5azlzNlczby9wVk9yT0lnclNZWFVxZ0ZOWUJmMlpTVFYrNGJTSVZBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoibnFveCtXbEI5TDJIUXlQUXFCcTdXL0J4K2F1MDAxUGdWTHlMcjAxc2hJQVhWY0JzcmFwVGFES1d6REkrb1owVTgrV1JOdkJUR0NBT3FwcU1kUytEQ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjM4MzU3MTAwODoxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVeVV6ZVpsMFVjVHdwREY0WW1mT1JTaTRqWjFhUEZucENFVXQzZFpYZkpkIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4MjQ1MDU5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5CRyJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE, $
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,  83571008            
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,'non'
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
