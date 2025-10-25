CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(500),
    color VARCHAR(10),
    user_id BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE paymentpartner(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(100),
    email VARCHAR(250),
    telNr VARCHAR(20),
    user_id BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    category_id BIGINT,
    amount DECIMAL(10,2) NOT NULL,
    date TIMESTAMP,
    transactionMedium VARCHAR(100),
    paymentpartner_id BIGINT,
    importance VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT fk_paymentpartner_id FOREIGN KEY (paymentpartner_id) REFERENCES paymentpartner(id)
);
