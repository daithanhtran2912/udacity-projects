# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Database schema
![DB Schema](store_front_db_schema.png)

### Table "public.users"
|  Column   |       Type        | Collation | Nullable |              Default              |
|:----------|:-----------------:|----------:|---------:|-----------------------------------|
| id        | integer           |           | not null | nextval('users_id_seq'::regclass) |
| firstname | character varying |           |          |                                   |
| lastname  | character varying |           |          |                                   |
| username  | character varying |           | not null |                                   |
| password  | character varying |           | not null |                                   |
- Indexes:
    * "users_pkey" PRIMARY KEY, btree (id)
    * "users_username_key" UNIQUE CONSTRAINT, btree (username)
- Referenced by:
    * TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

### Table "public.products"
|   Column    |       Type        | Collation | Nullable |               Default                |
|:------------|:------------------|:----------|:---------|:-------------------------------------|
| id          | integer           |           | not null | nextval('products_id_seq'::regclass) |
| name        | character varying |           | not null |                                      |
| price       | numeric           |           | not null |                                      |
| category_id | integer           |           |          |                                      |
- Indexes:
    * "products_pkey" PRIMARY KEY, btree (id)
- Foreign-key constraints:
    * "products_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id)
- Referenced by:
    * TABLE "products_orders" CONSTRAINT "products_orders_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

### Table "public.orders"
| Column  |  Type   | Collation | Nullable |              Default               |
|:--------|:--------|:----------|:---------|:-----------------------------------|
| id      | integer |           | not null | nextval('orders_id_seq'::regclass) |
| user_id | integer |           |          |                                    |
| status  | boolean |           |          | false                              |
- Indexes:
    * "orders_pkey" PRIMARY KEY, btree (id)
- Foreign-key constraints:
    * "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
- Referenced by:
    * TABLE "products_orders" CONSTRAINT "products_orders_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

### Table "public.categories"
| Column |       Type        | Collation | Nullable |                Default                  |
|:-------|:------------------|:----------|:---------|:----------------------------------------|
| id     | integer           |           | not null | nextval('categories_id_seq'::regclass)  |
| name   | character varying |           | not null |                                         |
- Indexes:
    * "categories_pkey" PRIMARY KEY, btree (id)
- Referenced by:
    * TABLE "products" CONSTRAINT "products_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id)

### Table "public.products_orders"
|   Column   |  Type   | Collation | Nullable |                   Default                     |
|:-----------|:--------|:----------|:---------|:----------------------------------------------|
| id         | integer |           | not null | nextval('products_orders_id_seq'::regclass)   |
| product_id | integer |           |          |                                               |
| order_id   | integer |           |          |                                               |
| quantity   | integer |           |          |                                               |
- Indexes:
    * "products_orders_pkey" PRIMARY KEY, btree (id)
- Foreign-key constraints:
    * "products_orders_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    * "products_orders_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

## API Endpoints
## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

### 1. Users
```
- Index [token required]
- Show [token required]
- Create N[token required]
```
* #### Create new user
```
POST /users
```
| Body          | Type     |Required                                  | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `firstname`   | `string` |<p align="center">:white_check_mark:</p>  | First Name of the user |
| `lastname`    | `string` |<p align="center">:white_check_mark:</p>  | Last Name of the user  |
| `username`    | `string` |<p align="center">:white_check_mark:</p>  | Username               |
| `password`    | `string` |<p align="center">:white_check_mark:</p>  | Password               |

* #### Index all users
```
GET /users
```

* #### Show user
```
GET /users/:id
```
| Parameter     | Type     |Required                                  | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `id`          | `number` |<p align="center">:white_check_mark:</p>  | user id                |

### 2. Products
```
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)
```
* #### Create new product
```
POST /products
```
| Body          | Type     |Required                                  | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `name`        | `string` |<p align="center">:white_check_mark:</p>  | name of the product    |
| `price`       | `string` |<p align="center">:white_check_mark:</p>  | price of the product   |
| `category_id` | `number` |                                          | product's category     |

* #### Index all products
```
GET /products
```

* #### Show product
```
GET /products/:id
```
| Parameter     | Type     |Required                                  | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `id`          | `number` |<p align="center">:white_check_mark:</p>  | product id             |

* #### Find products by category
```
GET /products/categories/:id
```
| Parameter     | Type     |Required                                  | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `id`          | `number` |<p align="center">:white_check_mark:</p>  | category id            |

* #### Get top 5 most popular products
```
GET /most-popular
```

### 3. Orders
```
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
```
* #### Create new order
```
POST /orders
```
| Body          | Type     |Required                                  | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `user_id`     | `number` |<p align="center">:white_check_mark:</p>  | user id                |
| `status`      | `string` |                                          | order status           |

* #### Index all orders
```
GET /orders
```

* #### Show order details
```
GET /orders/:id
```
| Parameter     | Type     |Required                                  | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `id`          | `number` |<p align="center">:white_check_mark:</p>  | order id               |

* #### Show orders by user
```
GET /orders/users/:id
```
| Parameter     | Type     |Required                                  | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `id`          | `number` |<p align="center">:white_check_mark:</p>  | user id                |

* #### Show completed orders by user
```
GET /orders/users/:id/completed
```
| Parameter     | Type     |Required                                  | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `id`          | `number` |<p align="center">:white_check_mark:</p>  | user id                |

* #### Add new product to order
```
POST /orders/:id/products
```
| Parameter     | Type     | Required                                 | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `id`          | `number` |<p align="center">:white_check_mark:</p>  | order id               |

| Body          | Type     |Required                                  | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `product_id`  | `number` | <p align="center">:white_check_mark:</p> | product id             |
| `quantity`    | `number` | <p align="center">:white_check_mark:</p> | quantity               |

* #### Update product quantity of order
```
PUT /orders/:id/products/:product_id
```
| Parameter     | Type     | Required                                 | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `id`          | `number` |<p align="center">:white_check_mark:</p>  | order id               |
| `product_id`  | `number` |<p align="center">:white_check_mark:</p>  | product id             |

| Body          | Type     |Required                                  | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `quantity`    | `number` | <p align="center">:white_check_mark:</p> | quantity               |

* #### Remove product from order
```
DELETE /orders/:id/products/:product_id
```
| Parameter     | Type     | Required                                 | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `id`          | `number` |<p align="center">:white_check_mark:</p>  | order id               |
| `product_id`  | `number` |<p align="center">:white_check_mark:</p>  | product id             |

* #### Remove order
```
DELETE /orders/:id
```
| Parameter     | Type     | Required                                 | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `id`          | `number` |<p align="center">:white_check_mark:</p>  | order id               |

* #### Complete order
```
PUT /orders/:id
```
| Parameter     | Type     | Required                                 | Description            |
|:--------------|:---------|:-----------------------------------------|:-----------------------|
| `id`          | `number` |<p align="center">:white_check_mark:</p>  | order id               |
