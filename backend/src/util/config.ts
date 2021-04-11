import * as dotenv from 'dotenv';
dotenv.config({});

let config = {
    PROD: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        callback_url: process.env.CALLBACK_URL,
        scopes: "playlist-read-private playlist-modify-public playlist-modify-private"
    },
    DEV: {
        client_id: process.env.DEV_CLIENT_ID,
        client_secret: process.env.DEV_CLIENT_SECRET,
        callback_url: process.env.DEV_CALLBACK_URL,
        scopes: "playlist-read-private playlist-modify-public playlist-modify-private"
    }
}


export default ( process.env.PROD == "true" ? config.PROD : config.DEV )