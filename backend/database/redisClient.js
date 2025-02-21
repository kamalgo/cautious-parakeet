const redis = require("redis");

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        tls: {}  // Enable TLS
    }
});

redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

(async () => {
    try {
        await redisClient.connect();
        console.log("🚀 Redis connection established!");
    } catch (err) {
        console.error("❌ Redis Connection Failed:", err);
    }
})();

module.exports = redisClient;





// require("dotenv").config();  // Load environment variables from .env
// const redis = require("redis");

// const redisClient = redis.createClient({
//     socket: {
//         host: process.env.REDIS_HOST,  // AWS Redis Host from .env
//         port: process.env.REDIS_PORT   // AWS Redis Port from .env
//     }
// });

// redisClient.on("connect", () => console.log("✅ Redis Connected to:", process.env.REDIS_HOST));
// redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

// (async () => {
//     try {
//         await redisClient.connect();
//         console.log("🚀 Redis connection established!");
        
//         // Test storing and retrieving a value
//         await redisClient.set("testKey", "AWS Redis is working!");
//         const value = await redisClient.get("testKey");
//         console.log("✅ Stored Value in Redis:", value);
        
//     } catch (err) {
//         console.error("❌ Redis Connection Failed:", err);
//     }
// })();

// module.exports = redisClient;


