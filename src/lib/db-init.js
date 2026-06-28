import sequelize from '../config/database';

let initialized = false;

async function initDatabase() {
  try {
    await sequelize.authenticate();
    if (!process.env.VERCEL || process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    }
  } catch (err) {
    console.error('Database sync failed:', err);
  }
}

export async function ensureDbInit() {
  if (!initialized) {
    await initDatabase();
    initialized = true;
  }
}
