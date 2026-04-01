CREATE DATABASE supply_chain_db;
USE supply_chain_db;

CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(15),
    city VARCHAR(50)
);

CREATE TABLE manufacturers (
    manufacturer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(50)
);

CREATE TABLE distributors (
    distributor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    region VARCHAR(50)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    manufacturer_id INT,
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(manufacturer_id)
);

CREATE TABLE inventory (
    inventory_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    quantity INT CHECK (quantity >= 0),
    location VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    distributor_id INT,
    quantity INT,
    order_date DATE,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (distributor_id) REFERENCES distributors(distributor_id)
);

CREATE TABLE logistics (
    logistics_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    transport_mode VARCHAR(50),
    cost DECIMAL(10,2),
    delivery_status VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

INSERT INTO suppliers (name, contact, city)
VALUES ('ABC Supplies', '9876543210', 'Delhi');
INSERT INTO manufacturers (name, location)
VALUES ('XYZ Manufacturing', 'Gurgaon');
INSERT INTO distributors (name, region)
VALUES ('Fast Distributors', 'North India');
INSERT INTO products (name, manufacturer_id)
VALUES ('Product A', 1);
INSERT INTO inventory (product_id, quantity, location)
VALUES (1, 100, 'Warehouse 1');
INSERT INTO orders (product_id, distributor_id, quantity, order_date)
VALUES (1, 1, 20, '2026-04-01');
INSERT INTO logistics (order_id, transport_mode, cost, delivery_status)
VALUES (1, 'Truck', 5000, 'In Transit');

SELECT p.name, i.quantity
FROM inventory i
JOIN products p ON i.product_id = p.product_id
WHERE i.quantity < 150;

SELECT d.name, SUM(o.quantity) AS total_orders
FROM orders o
JOIN distributors d ON o.distributor_id = d.distributor_id
GROUP BY d.name;

SELECT transport_mode, SUM(cost) AS total_cost
FROM logistics
GROUP BY transport_mode;

SELECT o.order_id, p.name, l.delivery_status
FROM orders o
JOIN products p ON o.product_id = p.product_id
JOIN logistics l ON o.order_id = l.order_id;