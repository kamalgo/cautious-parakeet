const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST, // Use your AWS Redis endpoint
        port: process.env.REDIS_PORT || 6379,
        tls: {}  // Required for secure connection to ElastiCache Serverless
    },
    username: process.env.REDIS_USERNAME || "default",
    password: process.env.REDIS_PASSWORD || null
});

redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

redisClient.connect();

module.exports = redisClient;
