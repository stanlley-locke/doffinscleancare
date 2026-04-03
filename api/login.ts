// Vercel Serverless Function: api/login.ts
import { db } from '../src/db/index.js';
import { admins } from '../src/db/schema.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;

  // Ideally, this would be an environment variable
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'doffinscare2026';

  if (password === ADMIN_PASSWORD) {
    // In a real app, we would return a JWT or set a secure cookie
    return res.status(200).json({ success: true, token: 'session_active_doffins' });
  } else {
    return res.status(401).json({ success: false, error: 'Invalid master password. Access denied.' });
  }
}
