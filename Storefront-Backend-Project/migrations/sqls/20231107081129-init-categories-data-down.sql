UPDATE products SET category_id=NULL;
DELETE FROM categories 
WHERE name IN('Beverage', 'Food', 'Electronic', 'Books');