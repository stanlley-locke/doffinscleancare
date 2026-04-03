import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

// Use a relative path to the dev.db file from the current directory
// In Vercel, this will need careful handling if it's not persistent
const dbPath = path.resolve(process.cwd(), './dev.db');
const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, { schema });
