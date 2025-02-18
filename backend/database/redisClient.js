const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Create Redis Client
const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    password: process.env.REDIS_PASSWORD || null
});

// Handle Redis Connection Events
redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

// Connect Redis
redisClient.connect();

module.exports = redisClient;
