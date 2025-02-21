require("dotenv").config();
const redis = require("redis");

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        keepAlive: 10000  // Keep the connection alive for 10s
    },
    retry_strategy: (options) => {
        console.log("🔄 Reconnecting to Redis...");
        return Math.min(options.attempt * 100, 3000); // Retry delay
    }
});

redisClient.on("connect", () => console.log("✅ Redis Connected to:", process.env.REDIS_HOST));
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


