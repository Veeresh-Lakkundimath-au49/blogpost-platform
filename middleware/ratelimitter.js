const rateLimit = require("express-rate-limit");

module.exports.RateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  keyGenerator: (req, res) => {
    return req.user?.uid || req.body.email || req.ip;
  },
  handler: (req, res, next) => {
    return res.status(429).json({
      message: "Limit exceeded.",
    });
  },
});
