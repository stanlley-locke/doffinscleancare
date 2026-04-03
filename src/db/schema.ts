import { pgTable, text, integer, doublePrecision, timestamp, pgEnum, serial } from 'drizzle-orm/pg-core';

export const serviceTypeEnum = pgEnum('service_type', ['Cleaning', 'Pest Control', 'Other']);
export const leadTypeEnum = pgEnum('lead_type', ['inquiry', 'booking']);
export const leadStatusEnum = pgEnum('lead_status', ['new', 'contacted', 'completed', 'canceled']);

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // e.g., 'carpet_cleaning'
  displayName: text('display_name').notNull(), // e.g., 'Carpet Cleaning'
  description: text('description').notNull(), // Detailed description
  features: text('features').notNull(), // Stored as JSON string Array
  startingPrice: doublePrecision('starting_price').notNull(), // e.g., 2500
  unit: text('unit').notNull(), // e.g., 'sqf' or 'set'
  category: text('category').notNull(), // e.g., 'Cleaning'
  imageUrl: text('image_url'), // Link to service image
  displayOrder: integer('display_order').default(0), // To control sort order
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(), // 'inquiry' or 'booking'
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  service: text('service').notNull(),
  location: text('location').notNull(),
  message: text('message'),
  status: text('status').default('new'), // 'new', 'contacted', etc.
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  lastLogin: timestamp('last_login'),
});
