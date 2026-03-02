const rateLimit = require('express-rate-limit');

const createLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 25, // limit each IP to 25 requests per windowMs
  message: 'Too many create requests from this IP, please try again after a minute',
  standardHeaders: true,
  legacyHeaders: false,
});

const updateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 25, // limit each IP to 25 requests per windowMs
  message: 'Too many update requests from this IP, please try again after a minute',
  standardHeaders: true,
  legacyHeaders: false,
});

const getLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 1 minute
  max: 2500, // limit each IP to 250 requests per windowMs
  message: 'Too many get requests from this IP, please try again after a minute',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  createLimiter,
  updateLimiter,
  getLimiter,
};
