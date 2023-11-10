# Storefront Backend Project

## Getting Started

This repo is a basic **Node** and **Express** app to create API endpoints for a Storefront. 

To get started,
clone this repo and run `npm install` in your terminal at the project root.

## Technologies

- `Postgres` for the database.
- `Node/Express` for the application logic.
- `dotenv` from **npm** for managing environment variables.
- `db-migrate` from **npm** for migrations.
- `jsonwebtoken` from **npm** for working with JWTs.
- `jasmine` from **npm** for testing.

## Steps to run in local machine

### 0. Setup Environment file

There should be a `.env` file in the root directory (The file have been pushed on purpose). Create one if it
doesn't exist.

The file should include the following information (you can use the default values that have already been
filled in):

```
ENV=dev

POSTGRES_HOST=your_ip
POSTGRES_PORT=5432
POSTGRES_USER=your_database_user
POSTGRES_PASSWORD=your_database_password
POSTGRES_DB=your_database_name
POSTGRES_DB_TEST=your_test_database_name

TOKEN_SECRET=your_token_secret
PEPPER=your_pepper
SALT_ROUND=10
```

### 1. Setup Postgres Database

<details>
**_Option 1: Download PostgreSQL from the website:_**
Download PostgreSQL from the official website by following the instructions provided [**here**](https://www.postgresql.org/download/).
```
# Once you have set up the database, connect to the default Postgres database with root user (the default database port is 5432):

1. Open command prompt and run:
> psql -U postgres;

2. Create a dev database:
> CREATE DATABASE store_front_db;

3. Create a test database:
> CREATE DATABASE store_front_db_test;

4. Create an user:
> CREATE USER full_stack_user WITH PASSWORD 'password123';

5. Connect to the dev database and grant all privileges: 
> \c store_front_db;
> GRANT ALL PRIVILEGES ON DATABASE store_front_db TO full_stack_user;

6. Connect to the test database and grant all privileges: 
> \c store_front_db_test;
> GRANT ALL PRIVILEGES ON DATABASE store_front_db_test TO full_stack_user;
```
</details>

**_Option 2: Use Docker and docker-compose.yml:_**
Use Docker to run the database in a container. To do this, navigate to the project root folder and run `docker-compose up -d` using the `docker-compose.yml` file.
```
# If you use Docker to set up the database, Docker will create dev database and user for you:

1. Open command prompt and run:
> docker container ls
> docker exec -it <your-postgres-container-id> bash

2. Connect to Postgres database: (the default database port is 5432)
> psql "postgresql://full_stack_user:password123@localhost/store_front_db";

3. Create a test database:
> CREATE DATABASE store_front_db_test;

4. Connect to the dev database and grant all privileges:
> \c store_front_db; 
> GRANT ALL PRIVILEGES ON DATABASE store_front_db TO full_stack_user;

5. Connect to the test database and grant all privileges:
> \c store_front_db_test;
> GRANT ALL PRIVILEGES ON DATABASE store_front_db_test TO full_stack_user;
```
### 2.  DB Creation and Migrations
Now that you have been setup the databases, it is time to perform the migrations:
```
# Open command promt and navigate to the project root, run:
> db-migrate up
```
> <sub> _To verify if the tables have already been created, connect to the Postgres database using **Postbird** or **psql** as your choice._</sub>

### 3. Linting the code
To lint code, open command promt and navigate to the project root, run:
```
> npm run lint
```

### 4. Running test
To run tests, open command promt and navigate to the project root, run:
```
> npm run test
```

### 5. Start The Project
To start the project, open command promt and navigate to the project root, run:
```
> npm run build
# then
> npm run start
```

## Steps to run in local machine
