const mysql = require('mysql2/promise');

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especialidades Parrilla',
    price: 14.99,
    stock: 45,
    specialty_badge: 'Legendaria ★★★★★',
    specialty_level: 5,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    description: 'Triple medallón de carne Angus 100% certificada sellada a la brasa de roble, queso cheddar inglés madurado, doble panceta ahumada al maple, cebolla caramelizada al bourbon y salsa secreta Royal Rapid en pan brioche artesanal dorado con mantequilla clarificada.',
    rating: 4.9,
    reviews_count: 328,
    calories: 920,
    prep_time: '12-15 min',
    is_featured: true,
    ingredients: ['Carne Angus 100% (360g)', 'Cheddar Inglés 18 Meses', 'Panceta Glaseada Maple', 'Cebolla Caramelizada Bourbon', 'Pan Brioche Dorado', 'Salsa Royal Rapid']
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Clásicas Premium',
    price: 9.99,
    stock: 70,
    specialty_badge: 'Clásica de la Casa ★★★★☆',
    specialty_level: 4,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80',
    description: 'La hamburguesa icónica que conquistó a todos. Medallón jugoso de novillo seleccionado, queso americano fundente, pepinillos crujientes encurtidos en receta propia, cebolla morada fresca, lechuga romana crujiente y aderezo especial de la casa.',
    rating: 4.8,
    reviews_count: 512,
    calories: 680,
    prep_time: '8-10 min',
    is_featured: true,
    ingredients: ['Medallón Novillo (180g)', 'Queso Americano Fundido', 'Pepinillos Artesanales', 'Tomate Madurado en Rama', 'Lechuga Romana', 'Aderezo Imperial Rapid']
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Doble Placer',
    price: 12.50,
    stock: 55,
    specialty_badge: 'Alta Selección ★★★★★',
    specialty_level: 5,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    description: 'Doble medallón smash con costra caramelizada perfecta, doble queso cheddar fundido entre capas, bacon extra crujiente, cebolla frita crocante y emulsión de mostaza dijon dulce en pan de papa suave y esponjoso.',
    rating: 4.9,
    reviews_count: 410,
    calories: 860,
    prep_time: '10-12 min',
    is_featured: true,
    ingredients: ['Doble Medallón Smash (2x130g)', 'Doble Cheddar Añejo', 'Bacon Crujiente', 'Cebolla Crispy', 'Mostaza Dijon & Miel', 'Pan de Papa']
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Edición Limitada',
    price: 13.75,
    stock: 40,
    specialty_badge: 'Edición Especial ★★★★★',
    specialty_level: 5,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop&q=80',
    description: 'Nuestra creación estrella para verdaderos conocedores. Doble carne premium rellena de queso gouda fundido, aros de cebolla tempura al panko, champiñones salteados a la mantequilla de finas hierbas y salsa BBQ mezquite artesanal.',
    rating: 4.9,
    reviews_count: 275,
    calories: 890,
    prep_time: '12-14 min',
    is_featured: true,
    ingredients: ['Doble Carne Rellena Gouda (300g)', 'Aros de Cebolla Panko', 'Champiñones Salteados Tomillo', 'Salsa BBQ Mezquite', 'Pan Rústico Brioche']
  },
  {
    id: 5,
    name: 'Royal Crispy Chicken',
    category: 'Pollo & Crispy',
    price: 11.90,
    stock: 48,
    specialty_badge: 'Crujiente Gourmet ★★★★☆',
    specialty_level: 4,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&auto=format&fit=crop&q=80',
    description: 'Pechuga entera marinada 24 horas en suero de leche y 11 especias secretas, con un empanizado dorado extra crujiente, ensalada coleslaw fresca con manzana verde y emulsión honey mustard suave.',
    rating: 4.7,
    reviews_count: 340,
    calories: 720,
    prep_time: '10-12 min',
    is_featured: true,
    ingredients: ['Pechuga Buttermilk Crujiente', 'Coleslaw de Manzana', 'Queso Suizo', 'Pepinillos Dulces', 'Emulsión Honey Mustard', 'Pan Brioche con Sésamo']
  },
  {
    id: 6,
    name: 'Truffle & Mushroom Master',
    category: 'Gourmet Signature',
    price: 15.50,
    stock: 30,
    specialty_badge: 'Gourmet Deluxe ★★★★★',
    specialty_level: 5,
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=800&auto=format&fit=crop&q=80',
    description: 'Alta gastronomía en formato hamburguesa. Medallón grueso de novillo madurado 30 días, duxelle de setas silvestres y portobello, virutas de trufa negra fresca, provolone ahumado fundido y mayonesa trufada.',
    rating: 5.0,
    reviews_count: 198,
    calories: 810,
    prep_time: '14-16 min',
    is_featured: true,
    ingredients: ['Carne Madurada 30 días (220g)', 'Setas Portobello al Jerez', 'Aceite de Trufa Negra', 'Queso Provolone Ahumado', 'Rúcula Selvática', 'Pan Brioche Negro']
  },
  {
    id: 7,
    name: 'Smoky Bacon BBQ Burger',
    category: 'Smoked BBQ',
    price: 12.99,
    stock: 62,
    specialty_badge: 'Artesanal Ahumada ★★★★☆',
    specialty_level: 4,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&auto=format&fit=crop&q=80',
    description: 'Sabor rústico inigualable. Carne a la brasa ahumada con leña de manzano, triple ración de tocino curado crocante, queso monterey jack fundido y abundante salsa barbacoa artesanal con toque de espresso.',
    rating: 4.8,
    reviews_count: 388,
    calories: 840,
    prep_time: '10-12 min',
    is_featured: true,
    ingredients: ['Carne Ahumada a la Leña (200g)', 'Triple Tira Tocino Crocante', 'Monterey Jack Fundido', 'Salsa BBQ al Espresso', 'Cebolla Morada Grillada']
  },
  {
    id: 8,
    name: 'Spicy Habanero Smash',
    category: 'Picante Intenso',
    price: 11.50,
    stock: 35,
    specialty_badge: 'Fuego & Crunch ★★★★☆',
    specialty_level: 4,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&auto=format&fit=crop&q=80',
    description: 'Para los amantes de la emoción picante. Doble medallón smash con costra picante, queso pepper jack fundido, jalapeños encurtidos al vinagre de manzana, mermelada artesanal de habanero rojo y mayonesa chipotle ahumada.',
    rating: 4.7,
    reviews_count: 220,
    calories: 760,
    prep_time: '9-11 min',
    is_featured: true,
    ingredients: ['Doble Medallón Smash Picante', 'Queso Pepper Jack', 'Jalapeños Encurtidos', 'Confitura Habanero Rojo', 'Alioli de Chipotle']
  },
  {
    id: 9,
    name: 'Avocado Fresh Blend',
    category: 'Fresh Balance',
    price: 12.25,
    stock: 42,
    specialty_badge: 'Fresh & Green ★★★★☆',
    specialty_level: 4,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80',
    description: 'Frescura y jugosidad en cada bocado. Carne tierna de pastoreo, abanico generoso de aguacate hass fresco, rúcula silvestre aliñada con aceite de oliva virgen extra, queso de cabra suave y reducción de aceto balsámico.',
    rating: 4.8,
    reviews_count: 260,
    calories: 690,
    prep_time: '10-12 min',
    is_featured: true,
    ingredients: ['Carne de Pastoreo (180g)', 'Aguacate Hass en Láminas', 'Queso de Cabra Cremoso', 'Rúcula Silvestre', 'Reducción Balsámica de Módena']
  },
  {
    id: 10,
    name: 'Quadruple Monster Rapid',
    category: 'Gigantes XXL',
    price: 18.50,
    stock: 25,
    specialty_badge: 'Desafío Extremo ★★★★★',
    specialty_level: 5,
    image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?w=800&auto=format&fit=crop&q=80',
    description: 'El titán de la casa para los más osados. Cuatro jugosos medallones a la parrilla (500g de carne total), cuádruple capa de queso cheddar fundido, torre de panceta crocante, aros de cebolla y doble porción de salsa Monster Rapid.',
    rating: 4.9,
    reviews_count: 310,
    calories: 1280,
    prep_time: '15-18 min',
    is_featured: true,
    ingredients: ['4 Medallones Parrilla (500g)', 'Cuádruple Cheddar Fundido', 'Torre de Panceta Ahumada', 'Aros de Cebolla', 'Salsa Monster Rapid XXL']
  }
];

let inMemoryProducts = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
let pool = null;
let isConnectedToMySQL = false;
let lastDbError = null;

// Simulated Orders and Customer Metrics
const INITIAL_CUSTOMERS = [
  { id: 'CUST-001', name: 'Carlos Mendoza', email: 'carlos.m@rapidburger.pe', tier: 'VIP Oro', ordersCount: 24, totalSpent: 342.50, favoriteBurger: 'Rey de las Burgers', lastOrderDate: '2026-10-16' },
  { id: 'CUST-002', name: 'Valentina Rojas', email: 'val.rojas@gmail.com', tier: 'VIP Oro', ordersCount: 19, totalSpent: 289.00, favoriteBurger: 'Burger Real Doble', lastOrderDate: '2026-10-15' },
  { id: 'CUST-003', name: 'Mateo Fernández', email: 'mateo.f@outlook.com', tier: 'VIP Plata', ordersCount: 18, totalSpent: 254.20, favoriteBurger: 'Burger Doble Especial', lastOrderDate: '2026-10-14' },
  { id: 'CUST-004', name: 'Sofía Alarcón', email: 'sofia.a@yahoo.com', tier: 'VIP Plata', ordersCount: 15, totalSpent: 215.80, favoriteBurger: 'Burger Real Clásica', lastOrderDate: '2026-10-16' },
  { id: 'CUST-005', name: 'Diego Morales', email: 'dmorales@techperu.io', tier: 'Regular', ordersCount: 14, totalSpent: 198.00, favoriteBurger: 'Truffle & Mushroom Master', lastOrderDate: '2026-10-13' },
  { id: 'CUST-006', name: 'Camila Torres', email: 'camila.t@hotmail.com', tier: 'Regular', ordersCount: 9, totalSpent: 118.50, favoriteBurger: 'Royal Crispy Chicken', lastOrderDate: '2026-10-12' },
  { id: 'CUST-007', name: 'Luciana Paredes', email: 'lparedes@empresa.com', tier: 'Regular', ordersCount: 7, totalSpent: 89.20, favoriteBurger: 'Avocado Fresh Blend', lastOrderDate: '2026-10-11' },
  { id: 'CUST-008', name: 'Joaquín Silva', email: 'jsilva@gmail.com', tier: 'Nuevo', ordersCount: 2, totalSpent: 27.50, favoriteBurger: 'Rey de las Burgers', lastOrderDate: '2026-10-16' },
  { id: 'CUST-009', name: 'Mariana Vega', email: 'mvega@gmail.com', tier: 'Nuevo', ordersCount: 1, totalSpent: 14.99, favoriteBurger: 'Rey de las Burgers', lastOrderDate: '2026-10-16' }
];

let inMemoryOrders = [
  {
    id: 'ORD-9821',
    customerName: 'Carlos Mendoza',
    customerPhone: '+51 987 654 321',
    items: [
      { id: 1, name: 'Rey de las Burgers', quantity: 2, price: 14.99 },
      { id: 3, name: 'Burger Real Doble', quantity: 1, price: 12.50 }
    ],
    total: 42.48,
    status: 'En Parrilla',
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    paymentMethod: 'Tarjeta de Crédito / Débito',
    deliveryAddress: 'Av. Javier Prado Este 2450, Dpto 802, Lima'
  },
  {
    id: 'ORD-9820',
    customerName: 'Valentina Rojas',
    customerPhone: '+51 976 543 210',
    items: [
      { id: 4, name: 'Burger Doble Especial', quantity: 1, price: 13.75 },
      { id: 5, name: 'Royal Crispy Chicken', quantity: 1, price: 11.90 }
    ],
    total: 25.65,
    status: 'En Camino',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    paymentMethod: 'Yape / Plin',
    deliveryAddress: 'Calle Las Begonias 441, San Isidro, Lima'
  },
  {
    id: 'ORD-9819',
    customerName: 'Sofía Alarcón',
    customerPhone: '+51 954 321 098',
    items: [
      { id: 2, name: 'Burger Real Clásica', quantity: 2, price: 9.99 }
    ],
    total: 19.98,
    status: 'Entregado',
    createdAt: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
    paymentMethod: 'Efectivo',
    deliveryAddress: 'Av. El Sol 112, Miraflores, Lima'
  }
];

async function initDB() {
  const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const user = process.env.DB_USER || process.env.MYSQL_USER || 'root';
  const password = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';
  const database = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'demo';
  const port = parseInt(process.env.DB_PORT || '3306', 10);

  if (!databaseUrl && !host) {
    lastDbError = 'Variables DB_HOST ni DATABASE_URL configuradas en el entorno.';
    console.log(`ℹ️ [DB] ${lastDbError} Operando en modo In-Memory para Hamburger Rapid.`);
    return;
  }

  try {
    if (databaseUrl) {
      console.log(`🔄 [DB] Conectando a MySQL vía DATABASE_URL...`);
      pool = mysql.createPool(databaseUrl);
    } else {
      console.log(`🔄 [DB] Conectando a MySQL en ${host}:${port}...`);
      pool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 8000
      });
    }

    const connection = await pool.getConnection();
    console.log(`✅ [DB] Conectado exitosamente a MySQL (${host || 'URL'} - BD: ${database})`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        specialty_badge VARCHAR(100),
        image VARCHAR(500),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      console.log('🌱 [DB] Inicializando 10 hamburguesas insignia de Hamburger Rapid en MySQL...');
      for (const p of INITIAL_PRODUCTS) {
        await connection.query(
          'INSERT INTO products (name, category, price, stock, specialty_badge, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [p.name, p.category, p.price, p.stock, p.specialty_badge, p.image, p.description]
        );
      }
    }

    connection.release();
    isConnectedToMySQL = true;
    lastDbError = null;
  } catch (error) {
    lastDbError = error.message;
    console.warn(`⚠️ [DB] No se pudo conectar a MySQL: ${error.message}. Operando en modo In-Memory.`);
    isConnectedToMySQL = false;
  }
}

async function getProducts() {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  if (isConnectedToMySQL && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM products ORDER BY id ASC');
      return rows;
    } catch (err) {
      console.error('Error consultando MySQL, utilizando in-memory:', err.message);
      lastDbError = err.message;
    }
  }
  return inMemoryProducts;
}

async function addProduct({ name, category, price, stock, specialty_badge, image, description }) {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  if (isConnectedToMySQL && pool) {
    const [result] = await pool.query(
      'INSERT INTO products (name, category, price, stock, specialty_badge, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, category, parseFloat(price) || 0, parseInt(stock, 10) || 0, specialty_badge || 'Especial ★★★★☆', image || '', description || '']
    );
    return {
      id: result.insertId,
      name,
      category,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0,
      specialty_badge: specialty_badge || 'Especial ★★★★☆',
      image,
      description
    };
  }

  const newProduct = {
    id: Date.now(),
    name,
    category: category || 'Especialidades',
    price: parseFloat(price) || 0,
    stock: parseInt(stock, 10) || 0,
    specialty_badge: specialty_badge || 'Especial ★★★★☆',
    specialty_level: 4,
    rating: 4.8,
    reviews_count: 1,
    image: image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    description: description || 'Deliciosa hamburguesa artesanal recién preparada.'
  };
  inMemoryProducts.unshift(newProduct);
  return newProduct;
}

async function updateProductStock(id, newStock) {
  const numId = parseInt(id, 10);
  const stockVal = Math.max(0, parseInt(newStock, 10) || 0);

  if (isConnectedToMySQL && pool) {
    try {
      await pool.query('UPDATE products SET stock = ? WHERE id = ?', [stockVal, numId]);
      return true;
    } catch (err) {
      console.error('Error actualizando stock en MySQL:', err.message);
    }
  }

  const p = inMemoryProducts.find(item => item.id === numId);
  if (p) {
    p.stock = stockVal;
    return true;
  }
  return false;
}

async function deleteProduct(id) {
  const numId = parseInt(id, 10);
  if (isConnectedToMySQL && pool) {
    await pool.query('DELETE FROM products WHERE id = ?', [numId]);
    return true;
  }
  inMemoryProducts = inMemoryProducts.filter(p => p.id !== numId);
  return true;
}

async function resetProducts() {
  if (isConnectedToMySQL && pool) {
    await pool.query('TRUNCATE TABLE products');
    for (const p of INITIAL_PRODUCTS) {
      await pool.query(
        'INSERT INTO products (name, category, price, stock, specialty_badge, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [p.name, p.category, p.price, p.stock, p.specialty_badge, p.image, p.description]
      );
    }
    return;
  }
  inMemoryProducts = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
}

function getOrders() {
  return inMemoryOrders;
}

function createOrder({ customerName, customerPhone, items, total, paymentMethod, deliveryAddress }) {
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: customerName || 'Cliente Rapid',
    customerPhone: customerPhone || '+51 900 000 000',
    items: items || [],
    total: parseFloat(total) || 0,
    status: 'Recibido',
    createdAt: new Date().toISOString(),
    paymentMethod: paymentMethod || 'Tarjeta Online',
    deliveryAddress: deliveryAddress || 'Av. Principal 123, Lima'
  };

  inMemoryOrders.unshift(newOrder);

  // Decrement stock for ordered items
  for (const item of newOrder.items) {
    const prod = inMemoryProducts.find(p => p.id === item.id || p.name === item.name);
    if (prod && prod.stock > 0) {
      prod.stock = Math.max(0, prod.stock - (item.quantity || 1));
    }
  }

  return newOrder;
}

function getCustomerMetrics() {
  const totalCustomers = 1420;
  const vipGold = 312;
  const vipSilver = 480;
  const regular = 438;
  const newCustomers = 190;

  const totalRevenue = inMemoryOrders.reduce((acc, o) => acc + o.total, 48250.70);
  const averageTicket = 28.40;
  const monthlyOrders = 1698;

  const consumptionSegments = [
    { segment: 'VIP Oro (> 10 compras)', count: vipGold, percentage: 22, avgSpend: '$148.50', color: '#b45309' },
    { segment: 'VIP Plata (5 - 9 compras)', count: vipSilver, percentage: 34, avgSpend: '$82.30', color: '#d97706' },
    { segment: 'Regulares (2 - 4 compras)', count: regular, percentage: 31, avgSpend: '$42.10', color: '#f59e0b' },
    { segment: 'Nuevos / Ocasionales (1 compra)', count: newCustomers, percentage: 13, avgSpend: '$21.50', color: '#fcd34d' }
  ];

  const topBurgersConsumed = [
    { name: 'Rey de las Burgers', sales: 684, revenue: 10253.16, badge: 'Legendaria ★★★★★' },
    { name: 'Burger Real Clásica', sales: 592, revenue: 5914.08, badge: 'Clásica ★★★★☆' },
    { name: 'Burger Real Doble', sales: 480, revenue: 6000.00, badge: 'Alta Selección ★★★★★' },
    { name: 'Burger Doble Especial', sales: 412, revenue: 5665.00, badge: 'Edición Especial ★★★★★' },
    { name: 'Royal Crispy Chicken', sales: 345, revenue: 4105.50, badge: 'Crujiente ★★★★☆' },
    { name: 'Truffle & Mushroom Master', sales: 290, revenue: 4495.00, badge: 'Gourmet Deluxe ★★★★★' }
  ];

  return {
    overview: {
      totalCustomers,
      totalRevenue,
      averageTicket,
      monthlyOrders,
      satisfactionRate: '98.4%',
      deliveryAvgTime: '22 min'
    },
    segments: consumptionSegments,
    topCustomers: INITIAL_CUSTOMERS,
    topBurgers: topBurgersConsumed
  };
}

function getDbStatus() {
  return {
    brand: 'Hamburger Rapid Commercial v1.0',
    mode: isConnectedToMySQL ? 'mysql' : 'in-memory',
    connected: isConnectedToMySQL,
    host: process.env.DB_HOST || (process.env.DATABASE_URL ? 'via-database-url' : 'localhost (in-memory fallback)'),
    database: process.env.DB_NAME || 'hamburger_rapid_db',
    user: process.env.DB_USER || 'rapid_admin',
    tableStats: {
      products: inMemoryProducts.length,
      orders: inMemoryOrders.length,
      customers: INITIAL_CUSTOMERS.length
    },
    uptimeFormatted: `${Math.floor(process.uptime() / 60)}m ${Math.floor(process.uptime() % 60)}s`,
    error: lastDbError
  };
}

module.exports = {
  INITIAL_PRODUCTS,
  initDB,
  getProducts,
  addProduct,
  updateProductStock,
  deleteProduct,
  resetProducts,
  getOrders,
  createOrder,
  getCustomerMetrics,
  getDbStatus
};
