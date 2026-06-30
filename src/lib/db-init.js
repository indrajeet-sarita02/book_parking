import sequelize from '../config/database';

let initialized = false;

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

export async function ensureDbInit() {
  if (!initialized) {
    await initDatabase();
    initialized = true;
  }
}
