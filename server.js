const express = require('express');
const mysql2  = require('mysql2');
const cors    = require('cors');
const bp      = require('body-parser');
const path    = require('path');

const app = express();
app.use(cors());
app.use(bp.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql2.createConnection({
  host:     'localhost',
  user:     'root',
  password: 'dee@pak.com',
  database: 'supply_chain_db'
});

db.connect(err => {
  if (err) {
    console.error('❌  MySQL connection failed:', err.message);
    console.error('   Make sure MySQL is running and you ran setup.sql first.');
  } else {
    console.log('✅  Connected to MySQL — supply_chain_db');
  }
});

const query = (sql, params = []) =>
  new Promise((res, rej) =>
    db.query(sql, params, (err, rows) => err ? rej(err) : res(rows))
  );

app.get('/api/health', async (req, res) => {
  try {
    await query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

app.get('/api/suppliers', async (req, res) => {
  try { res.json(await query('SELECT * FROM suppliers')); }
  catch(e){ res.status(500).json({ error: e.message }); }
});

app.post('/api/suppliers', async (req, res) => {
  const { name, contact, city } = req.body;
  try {
    const r = await query('INSERT INTO suppliers (name,contact,city) VALUES (?,?,?)', [name,contact,city]);
    res.json({ supplier_id: r.insertId, name, contact, city });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.delete('/api/suppliers/:id', async (req, res) => {
  try {
    await query('DELETE FROM suppliers WHERE supplier_id=?', [req.params.id]);
    res.json({ success: true });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.get('/api/manufacturers', async (req, res) => {
  try { res.json(await query('SELECT * FROM manufacturers')); }
  catch(e){ res.status(500).json({ error: e.message }); }
});

app.post('/api/manufacturers', async (req, res) => {
  const { name, location } = req.body;
  try {
    const r = await query('INSERT INTO manufacturers (name,location) VALUES (?,?)', [name,location]);
    res.json({ manufacturer_id: r.insertId, name, location });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.delete('/api/manufacturers/:id', async (req, res) => {
  try {
    await query('DELETE FROM manufacturers WHERE manufacturer_id=?', [req.params.id]);
    res.json({ success: true });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.get('/api/distributors', async (req, res) => {
  try { res.json(await query('SELECT * FROM distributors')); }
  catch(e){ res.status(500).json({ error: e.message }); }
});

app.post('/api/distributors', async (req, res) => {
  const { name, region } = req.body;
  try {
    const r = await query('INSERT INTO distributors (name,region) VALUES (?,?)', [name,region]);
    res.json({ distributor_id: r.insertId, name, region });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.delete('/api/distributors/:id', async (req, res) => {
  try {
    await query('DELETE FROM distributors WHERE distributor_id=?', [req.params.id]);
    res.json({ success: true });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.get('/api/products', async (req, res) => {
  try {
    res.json(await query(
      'SELECT p.*, m.name AS manufacturer_name FROM products p LEFT JOIN manufacturers m ON p.manufacturer_id=m.manufacturer_id'
    ));
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.post('/api/products', async (req, res) => {
  const { name, manufacturer_id } = req.body;
  try {
    const r = await query('INSERT INTO products (name,manufacturer_id) VALUES (?,?)', [name,manufacturer_id]);
    res.json({ product_id: r.insertId, name, manufacturer_id });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await query('DELETE FROM products WHERE product_id=?', [req.params.id]);
    res.json({ success: true });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.get('/api/inventory', async (req, res) => {
  try {
    res.json(await query(
      'SELECT i.*, p.name AS product_name FROM inventory i JOIN products p ON i.product_id=p.product_id'
    ));
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.post('/api/inventory', async (req, res) => {
  const { product_id, quantity, location } = req.body;
  try {
    const r = await query('INSERT INTO inventory (product_id,quantity,location) VALUES (?,?,?)', [product_id,quantity,location]);
    res.json({ inventory_id: r.insertId, product_id, quantity, location });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.delete('/api/inventory/:id', async (req, res) => {
  try {
    await query('DELETE FROM inventory WHERE inventory_id=?', [req.params.id]);
    res.json({ success: true });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.get('/api/orders', async (req, res) => {
  try {
    res.json(await query(
      `SELECT o.*, p.name AS product_name, d.name AS distributor_name
       FROM orders o
       JOIN products p ON o.product_id=p.product_id
       JOIN distributors d ON o.distributor_id=d.distributor_id`
    ));
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.post('/api/orders', async (req, res) => {
  const { product_id, distributor_id, quantity, order_date } = req.body;
  try {
    const r = await query(
      'INSERT INTO orders (product_id,distributor_id,quantity,order_date) VALUES (?,?,?,?)',
      [product_id, distributor_id, quantity, order_date]
    );
    res.json({ order_id: r.insertId, product_id, distributor_id, quantity, order_date });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await query('DELETE FROM orders WHERE order_id=?', [req.params.id]);
    res.json({ success: true });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.get('/api/logistics', async (req, res) => {
  try {
    res.json(await query(
      `SELECT l.*, o.order_date, p.name AS product_name
       FROM logistics l
       JOIN orders o ON l.order_id=o.order_id
       JOIN products p ON o.product_id=p.product_id`
    ));
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.post('/api/logistics', async (req, res) => {
  const { order_id, transport_mode, cost, delivery_status } = req.body;
  try {
    const r = await query(
      'INSERT INTO logistics (order_id,transport_mode,cost,delivery_status) VALUES (?,?,?,?)',
      [order_id, transport_mode, cost, delivery_status]
    );
    res.json({ logistics_id: r.insertId, order_id, transport_mode, cost, delivery_status });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.delete('/api/logistics/:id', async (req, res) => {
  try {
    await query('DELETE FROM logistics WHERE logistics_id=?', [req.params.id]);
    res.json({ success: true });
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.get('/api/analytics/low-stock', async (req, res) => {
  try {
    res.json(await query(
      `SELECT p.name AS product_name, i.quantity, i.location
       FROM inventory i
       JOIN products p ON i.product_id = p.product_id
       WHERE i.quantity < 50
       ORDER BY i.quantity ASC`
    ));
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.get('/api/analytics/orders-by-distributor', async (req, res) => {
  try {
    res.json(await query(
      `SELECT d.name AS distributor_name, SUM(o.quantity) AS total_orders
       FROM orders o
       JOIN distributors d ON o.distributor_id = d.distributor_id
       GROUP BY d.name
       ORDER BY total_orders DESC`
    ));
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.get('/api/analytics/transport-cost', async (req, res) => {
  try {
    res.json(await query(
      `SELECT transport_mode, SUM(cost) AS total_cost, COUNT(*) AS shipments
       FROM logistics
       GROUP BY transport_mode
       ORDER BY total_cost DESC`
    ));
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.get('/api/analytics/fulfillment', async (req, res) => {
  try {
    res.json(await query(
      `SELECT o.order_id, p.name AS product_name, d.name AS distributor_name,
              o.quantity, o.order_date, l.transport_mode, l.cost, l.delivery_status
       FROM orders o
       JOIN products p ON o.product_id = p.product_id
       JOIN distributors d ON o.distributor_id = d.distributor_id
       LEFT JOIN logistics l ON o.order_id = l.order_id
       ORDER BY o.order_date DESC`
    ));
  } catch(e){ res.status(500).json({ error: e.message }); }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀  Supply Chain App running at http://localhost:${PORT}`);
  console.log(`   Open this URL in your browser.\n`);
});
