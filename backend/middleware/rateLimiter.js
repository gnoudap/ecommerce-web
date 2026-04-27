import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redis from '../config/redis.js';

// General API rate limiter
export const apiLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Auth specific rate limiter
export const authLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
    }),
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // limit each IP to 20 login/register requests per windowMs
    message: 'Too many auth attempts from this IP, please try again after an hour',
    standardHeaders: true,
    legacyHeaders: false,
});
