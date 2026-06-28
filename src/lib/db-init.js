import { initDatabase } from '../database';

let initialized = false;

export async function ensureDbInit() {
  if (!initialized) {
    try {
      await initDatabase();
    } catch (err) {
      console.error('Database init failed:', err);
    }
    initialized = true;
  }
}
