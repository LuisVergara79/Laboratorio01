const express = require('express');
const router = express.Router();
const db = require('../db');

// Health Check Endpoint (For Dokploy Health Checks & Admin DB Status)
router.get('/health', (req, res) => {
  const dbStatus = db.getDbStatus();
  res.json({
    status: 'healthy',
    brand: 'Hamburger Rapid',
    version: '1.0.0-commercial',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    platform: 'Dokploy CI/CD Live Commercial',
    database: dbStatus
  });
});

// List all burgers
router.get('/products', async (req, res) => {
  try {
    const products = await db.getProducts();
    res.json({
      success: true,
      brand: 'Hamburger Rapid',
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single burger detail
router.get('/products/:id', async (req, res) => {
  try {
    const products = await db.getProducts();
    const product = products.find(p => p.id === parseInt(req.params.id, 10));
    if (!product) {
      return res.status(404).json({ success: false, error: 'Hamburguesa no encontrada' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new burger
router.post('/products', async (req, res) => {
  try {
    const { name, category, price, stock, specialty_badge, image, description } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ success: false, error: 'Nombre y precio son requeridos.' });
    }
    const product = await db.addProduct({ name, category, price, stock, specialty_badge, image, description });
    res.status(201).json({ success: true, message: 'Hamburguesa agregada exitosamente', data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update burger stock
router.patch('/products/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const ok = await db.updateProductStock(id, stock);
    if (!ok) {
      return res.status(404).json({ success: false, error: 'Hamburguesa no encontrada' });
    }
    res.json({ success: true, message: `Stock de hamburguesa ${id} actualizado a ${stock}.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete burger
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteProduct(id);
    res.json({ success: true, message: `Hamburguesa ${id} eliminada.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Customer Metrics according to consumption (For Admin Dashboard)
router.get('/customers/metrics', (req, res) => {
  try {
    const metrics = db.getCustomerMetrics();
    res.json({ success: true, data: metrics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Orders List & Purchase Simulation
router.get('/orders', (req, res) => {
  try {
    const orders = db.getOrders();
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/orders', (req, res) => {
  try {
    const { customerName, customerPhone, items, total, paymentMethod, deliveryAddress } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ success: false, error: 'El pedido debe contener al menos una hamburguesa' });
    }
    const order = db.createOrder({ customerName, customerPhone, items, total, paymentMethod, deliveryAddress });
    res.status(201).json({
      success: true,
      message: '¡Orden de Hamburger Rapid creada exitosamente!',
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset initial burgers
router.post('/reset', async (req, res) => {
  try {
    await db.resetProducts();
    res.json({ success: true, message: 'Menú comercial de Hamburger Rapid restablecido.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
