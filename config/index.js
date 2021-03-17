const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_TTL: process.env.JWT_TTL || '7d',
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/test',
};

module.exports = config;
