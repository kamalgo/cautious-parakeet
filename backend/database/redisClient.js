const redis = require("redis");

const redisClient = redis.createClient({
    socket: {
        host: "127.0.0.1",  // Connect via stunnel
        port: 6380          // Use stunnel's forwarded port
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
