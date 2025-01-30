import { pgTable, serial, text, integer, varchar } from 'drizzle-orm/pg-core'

//schema for categories
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  imageUrl: text('image_url').notNull()
})

// schema for products
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  initialStock: integer('initial_stock').notNull(),
  availableStock: integer('available_stock').notNull(),
  categoryId: integer("category_id").references(() => categories.id, { 
    onDelete: "cascade" 
  }),
})
