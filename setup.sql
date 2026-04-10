-- ============================================
-- Supply Chain Optimization Database Setup
-- Run this in MySQL before starting the server
-- ============================================

CREATE DATABASE IF NOT EXISTS supply_chain_db;
USE supply_chain_db;

-- Suppliers Table
CREATE TABLE IF NOT EXISTS suppliers (
  supplier_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  contact VARCHAR(15),
  city VARCHAR(50)
);

-- Manufacturers Table
CREATE TABLE IF NOT EXISTS manufacturers (
  manufacturer_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(50)
);

-- Distributors Table
CREATE TABLE IF NOT EXISTS distributors (
  distributor_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  region VARCHAR(50)
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  manufacturer_id INT,
  FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(manufacturer_id)
);

-- Inventory Table
CREATE TABLE IF NOT EXISTS inventory (
  inventory_id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,
  quantity INT CHECK (quantity >= 0),
  location VARCHAR(50),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,
  distributor_id INT,
  quantity INT,
  order_date DATE,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (distributor_id) REFERENCES distributors(distributor_id)
);

-- Logistics Table
CREATE TABLE IF NOT EXISTS logistics (
  logistics_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  transport_mode VARCHAR(50),
  cost DECIMAL(10,2),
  delivery_status VARCHAR(50),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- =====================
-- Sample Data
-- =====================
INSERT IGNORE INTO suppliers (name, contact, city) VALUES
  ('ABC Supplies', '9876543210', 'Delhi'),
  ('Sunrise Materials', '9123456780', 'Mumbai'),
  ('Green Goods Co.', '9988776655', 'Pune');

INSERT IGNORE INTO manufacturers (name, location) VALUES
  ('XYZ Manufacturing', 'Gurgaon'),
  ('Bharat Electronics', 'Bangalore'),
  ('IndoTech Corp', 'Chennai');

INSERT IGNORE INTO distributors (name, region) VALUES
  ('Fast Distributors', 'North India'),
  ('South Logistics', 'South India'),
  ('East Connect', 'East India');

INSERT IGNORE INTO products (name, manufacturer_id) VALUES
  ('Product A', 1),
  ('Product B', 2),
  ('Product C', 3),
  ('Product D', 1);

INSERT IGNORE INTO inventory (product_id, quantity, location) VALUES
  (1, 100, 'Warehouse 1'),
  (2, 30,  'Warehouse 2'),
  (3, 5,   'Warehouse 1'),
  (4, 200, 'Warehouse 3');

INSERT IGNORE INTO orders (product_id, distributor_id, quantity, order_date) VALUES
  (1, 1, 20, '2026-04-01'),
  (2, 2, 15, '2026-04-02'),
  (3, 3, 8,  '2026-04-03'),
  (4, 1, 50, '2026-04-04');

INSERT IGNORE INTO logistics (order_id, transport_mode, cost, delivery_status) VALUES
  (1, 'Truck',  5000.00, 'In Transit'),
  (2, 'Rail',   3200.00, 'Delivered'),
  (3, 'Air',    9500.00, 'Pending'),
  (4, 'Truck',  4800.00, 'In Transit');