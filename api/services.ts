import { db } from '../src/db/index.js';
import { services } from '../src/db/schema.js';
import { eq, asc } from 'drizzle-orm';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const allServices = await db.select().from(services).orderBy(asc(services.displayOrder));
      return res.status(200).json(allServices);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
  }

  if (req.method === 'POST') {
    const { name, displayName, description, features, startingPrice, unit, category, imageUrl, displayOrder } = req.body;
    try {
      await db.insert(services).values({
        name,
        displayName,
        description,
        features: JSON.stringify(features),
        startingPrice: parseFloat(startingPrice),
        unit,
        category,
        imageUrl,
        displayOrder: parseInt(displayOrder) || 0,
        updatedAt: new Date(),
      });
      return res.status(201).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create service' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, ...updates } = req.body;
    if (updates.features) updates.features = JSON.stringify(updates.features);
    if (updates.startingPrice) updates.startingPrice = parseFloat(updates.startingPrice);
    
    try {
      await db.update(services)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(services.id, id));
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update service' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await db.delete(services).where(eq(services.id, parseInt(id)));
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete service' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
