ALTER TABLE products
  ADD COLUMN category_id INTEGER REFERENCES categories(id);