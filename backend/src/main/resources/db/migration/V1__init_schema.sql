CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(75) NOT NULL,
    username VARCHAR(25) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);