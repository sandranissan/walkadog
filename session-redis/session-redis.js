// const redis = require('redis')
// const connectRedis = require('connect-redis')
// const RedisStore = connectRedis(session)
// const session = require('express-session')
// const { resolve } = require('path/posix')
// const { rejects } = require('assert')
// const redisClient = redis.createClient()

// var redisStore = new RedisStore({
//     host: 'session-redis',
//     port: 6379,
//     client: redisClient,
//     ttl: 60*60*10
// })

// function getAllSessions() {
//     return new Promise((resolve, reject)=>{
//         redisStore.all(function(error, sessions){
//             if(error) reject(error);
//             else resolve(sessions);
//         })
//     })
// }

// module.exports = {redisStore, getAllSessions};