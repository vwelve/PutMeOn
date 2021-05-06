import * as dotenv from 'dotenv';
dotenv.config({});

let config = {
    PROD: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        callback_url: process.env.CALLBACK_URL,
        mongodb_cluster: process.env.CLUSTER,
        scopes: "playlist-read-private playlist-modify-public playlist-modify-private",
        redis_host: process.env.REDIS_HOST,
        redis_port: process.env.REDIS_PORT
    },
    DEV: {
        client_id: process.env.DEV_CLIENT_ID,
        client_secret: process.env.DEV_CLIENT_SECRET,
        callback_url: process.env.DEV_CALLBACK_URL,
        mongodb_cluster: process.env.DEV_CLUSTER,
        scopes: "playlist-read-private playlist-modify-public playlist-modify-private",
        redis_host: process.env.DEV_REDIS_HOST || "localhost",
        redis_port: process.env.DEV_REDIS_PORT || 6379
    }
}


export default ( process.env.PROD == "true" ? config.PROD : config.DEV )