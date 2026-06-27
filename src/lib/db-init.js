const { initDatabase } = require('../database');

let initialized = false;

export async function ensureDbInit() {
  if (!initialized) {
    await initDatabase();
    initialized = true;
  }
}
