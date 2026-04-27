import redis from '../config/redis.js';

export const cacheProducts = async (req, res, next) => {
    try {
        const key = `products:${req.originalUrl}`;
        const cachedData = await redis.get(key);

        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }

        // Override res.json to cache the response
        const originalJson = res.json;
        res.json = function (data) {
            redis.setex(key, 3600, JSON.stringify(data)); // Cache for 1 hour
            originalJson.call(this, data);
        };

        next();
    } catch (error) {
        console.error('Redis cache error:', error);
        next();
    }
};

export const clearProductCache = async (req, res, next) => {
    try {
        // Clear all keys matching products:*
        const keys = await redis.keys('products:*');
        if (keys.length > 0) {
            await redis.del(keys);
        }
        next();
    } catch (error) {
        console.error('Redis clear cache error:', error);
        next();
    }
};
