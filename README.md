# 📦 Supply Chain Optimization (DBMS Project)

## 📌 Overview
This project focuses on designing and implementing a relational database system for **Supply Chain Optimization** using **MySQL**. It models key components such as suppliers, manufacturers, distributors, inventory, orders, and logistics to manage and analyze the flow of goods efficiently.

---

## 🚀 Features
- 📊 Structured database design with multiple related tables  
- 🔗 Use of **Primary Keys** and **Foreign Keys** for relationships  
- 📦 Inventory tracking and stock management  
- 📉 Low stock detection for replenishment  
- 🚚 Transportation cost analysis  
- 📬 Order tracking and fulfillment status  

---

## 🛠️ Tech Stack
- **Database:** MySQL  
- **Tool:** MySQL Workbench  
- **Language:** SQL  

---

## 🗂️ Database Schema
The project includes the following tables:

- Suppliers  
- Manufacturers  
- Distributors  
- Products  
- Inventory  
- Orders  
- Logistics  

---

## ⚙️ Setup Instructions
1. Open MySQL Workbench  
2. Create database:
   ```sql
   CREATE DATABASE supply_chain_db;
   USE supply_chain_db;

## 👨‍💻 Author

**Deepak**  
B.Tech CSE Student | DBMS Project
=======
# Supply Chain Optimization — Full Stack Web App
## MySQL + Node.js + Express + Vanilla JS

---

## 📁 Project Structure

```
supply-chain/
├── server.js          ← Node.js backend (Express + MySQL)
├── setup.sql          ← Run this in MySQL first
├── package.json
└── public/
    └── index.html     ← Frontend (single-page app)
```

---

## 🚀 Setup Instructions (Step by Step)

### Step 1 — Install Node.js
Download from https://nodejs.org (LTS version)

### Step 2 — Install MySQL
Download from https://dev.mysql.com/downloads/mysql/
Make sure MySQL service is running.

### Step 3 — Set up the Database
Open MySQL Workbench (or command line) and run:
```
source path/to/supply-chain/setup.sql
```
Or copy-paste the contents of `setup.sql` and execute it.

### Step 4 — Configure Your DB Password
Open `server.js` and edit lines ~18-19:
```js
user:     'root',   // ← your MySQL username
password: '',       // ← your MySQL password
```

### Step 5 — Install Dependencies
Open a terminal inside the `supply-chain/` folder:
```bash
npm install
```

### Step 6 — Start the Server
```bash
node server.js
```

### Step 7 — Open in Browser
Go to: **http://localhost:3000**

---

## 🗄️ Database Tables

| Table         | Description                      |
|---------------|----------------------------------|
| suppliers     | Raw material suppliers           |
| manufacturers | Product manufacturers            |
| distributors  | Regional distributors            |
| products      | Product catalogue                |
| inventory     | Stock levels by warehouse        |
| orders        | Customer/distributor orders      |
| logistics     | Shipment tracking & cost         |

---

## 🔍 Analytics Queries (from the project PDF)

1. **Check Low Stock** — Products with quantity < 50
2. **Total Orders by Distributor** — SUM of quantities grouped by distributor
3. **Transportation Cost Analysis** — SUM of logistics costs by mode
4. **Order Fulfillment Status** — Join of orders + logistics status

---

## 🌐 API Endpoints

| Method | Endpoint                            | Description                   |
|--------|-------------------------------------|-------------------------------|
| GET    | /api/suppliers                      | List all suppliers            |
| POST   | /api/suppliers                      | Add a supplier                |
| DELETE | /api/suppliers/:id                  | Delete a supplier             |
| GET    | /api/manufacturers                  | List all manufacturers        |
| POST   | /api/manufacturers                  | Add a manufacturer            |
| GET    | /api/distributors                   | List all distributors         |
| POST   | /api/distributors                   | Add a distributor             |
| GET    | /api/products                       | List all products             |
| POST   | /api/products                       | Add a product                 |
| GET    | /api/inventory                      | List inventory                |
| POST   | /api/inventory                      | Add inventory record          |
| GET    | /api/orders                         | List all orders               |
| POST   | /api/orders                         | Place an order                |
| GET    | /api/logistics                      | List logistics                |
| POST   | /api/logistics                      | Add logistics entry           |
| GET    | /api/analytics/low-stock            | Products with stock < 50      |
| GET    | /api/analytics/orders-by-distributor| Orders grouped by distributor |
| GET    | /api/analytics/transport-cost       | Transport costs by mode       |
| GET    | /api/analytics/fulfillment          | Full order fulfillment view   |
>>>>>>> 589b815 (Supplier Chain Optimization Web App)
