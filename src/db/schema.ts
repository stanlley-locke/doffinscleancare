import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const services = sqliteTable('services', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(), // e.g., 'carpet_cleaning'
  displayName: text('display_name').notNull(), // e.g., 'Carpet Cleaning'
  description: text('description').notNull(), // Detailed description
  features: text('features').notNull(), // Stored as JSON string Array: ["feature 1", "feature 2"]
  startingPrice: real('starting_price').notNull(), // e.g., 2500
  unit: text('unit').notNull(), // e.g., 'sqf' or 'set'
  category: text('category').notNull(), // e.g., 'Cleaning'
  imageUrl: text('image_url'), // Link to service image
  displayOrder: integer('display_order').default(0), // To control sort order
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const leads = sqliteTable('leads', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type', { enum: ['inquiry', 'booking'] }).notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  service: text('service').notNull(),
  location: text('location').notNull(),
  message: text('message'),
  status: text('status', { enum: ['new', 'contacted', 'completed', 'canceled'] }).default('new'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const admins = sqliteTable('admins', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  lastLogin: integer('last_login', { mode: 'timestamp' }),
});
