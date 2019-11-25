DROP DATABASE IF EXISTS bamazonDB;

CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(100,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog food", "dog items", 54.95, 200), ("rope toy", "dog items", 15.99, 50), ("cat food", "cat items", 34.99, 150),
("jingly balls", "cat items", 5.25, 300), ("litter", "cat items", 15.25, 80), ("litterbox", "cat items", 7.99, 150),
("water bowl", "animal items", 5.00, 95), ("food bowl", "animal items", 5.00, 100)