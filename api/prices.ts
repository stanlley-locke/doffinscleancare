import { db } from '../src/db/index';
import { services } from '../src/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const allServices = await db.select().from(services);
      return res.status(200).json(allServices);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, startingPrice } = req.body;
    try {
      await db.update(services)
        .set({ startingPrice, updatedAt: new Date() })
        .where(eq(services.id, id));
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update price' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
