const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST, // AWS Redis endpoint
        port: process.env.REDIS_PORT || 6379,
        tls: { 
            rejectUnauthorized: false // Required for AWS ElastiCache
        }
    }
});

redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error("❌ Redis Connection Failed:", err);
    }
})();

module.exports = redisClient;
