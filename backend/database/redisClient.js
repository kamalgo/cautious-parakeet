    const redis = require("redis");

    // Create Redis client for local EC2 instance
    const redisClient = redis.createClient({
        socket: {
            host: process.env.REDIS_HOST || "127.0.0.1", // Default to local Redis
            port: process.env.REDIS_PORT || 6379
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