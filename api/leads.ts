import { db } from '../src/db/index';
import { leads } from '../src/db/schema';
import { desc } from 'drizzle-orm';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
      return res.status(200).json(allLeads);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch leads' });
    }
  }

  if (req.method === 'POST') {
    const { type, name, email, phone, service, location, message } = req.body;
    try {
      await db.insert(leads).values({
        type,
        name,
        email,
        phone,
        service,
        location,
        message,
        createdAt: new Date(),
      });
      return res.status(201).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to log lead' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
