import React, { useState, useEffect } from 'react';

const FALLBACK_BURGERS = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especialidades Parrilla',
    price: 14.99,
    stock: 45,
    specialty_badge: 'Legendaria ★★★★★',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
    description: 'Triple medallón Angus certificado a la leña, cheddar madurado 18 meses, panceta al bourbon y salsa Royal.'
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Clásicas Premium',
    price: 9.99,
    stock: 70,
    specialty_badge: 'Clásica de la Casa ★★★★☆',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop&q=80',
    description: 'Medallón 100% novillo seleccionado, queso americano fundente, pepinillos agridulces y salsa tártara artesanal.'
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Doble Placer',
    price: 12.50,
    stock: 55,
    specialty_badge: 'Alta Selección ★★★★★',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80',
    description: 'Doble medallón smash caramelizado, doble queso cheddar fundido, bacon extra crujiente y mostaza dijon dulce.'
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Edición Limitada',
    price: 13.75,
    stock: 40,
    specialty_badge: 'Edición Especial ★★★★★',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&auto=format&fit=crop&q=80',
    description: 'Doble carne rellena con queso gouda fundido, aros de cebolla tempura al panko y salsa BBQ ahumada.'
  },
  {
    id: 5,
    name: 'Royal Crispy Chicken',
    category: 'Pollo & Crispy',
    price: 11.90,
    stock: 48,
    specialty_badge: 'Crujiente Gourmet ★★★★☆',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&auto=format&fit=crop&q=80',
    description: 'Pechuga marinada 24h en buttermilk, empanizado dorado extra crocante, ensalada coleslaw de manzana verde.'
  },
  {
    id: 6,
    name: 'Truffle & Mushroom Master',
    category: 'Gourmet Signature',
    price: 15.50,
    stock: 30,
    specialty_badge: 'Gourmet Deluxe ★★★★★',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=400&auto=format&fit=crop&q=80',
    description: 'Medallón grueso de carne madurada 30 días, duxelle de setas silvestres, trufa negra y provolone ahumado.'
  },
  {
    id: 7,
    name: 'Smoky Bacon BBQ Burger',
    category: 'Smoked BBQ',
    price: 12.99,
    stock: 62,
    specialty_badge: 'Artesanal Ahumada ★★★★☆',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&auto=format&fit=crop&q=80',
    description: 'Carne a la brasa ahumada con leña de manzano, triple bacon curado crocante y salsa BBQ al café espresso.'
  },
  {
    id: 8,
    name: 'Spicy Habanero Smash',
    category: 'Picante Intenso',
    price: 11.50,
    stock: 35,
    specialty_badge: 'Fuego & Crunch ★★★★☆',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&auto=format&fit=crop&q=80',
    description: 'Doble smash crujiente, queso pepper jack fundido, jalapeños encurtidos y confitura de habanero rojo.'
  },
  {
    id: 9,
    name: 'Avocado Fresh Blend',
    category: 'Fresh Balance',
    price: 12.25,
    stock: 42,
    specialty_badge: 'Fresh & Green ★★★★☆',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=80',
    description: 'Carne tierna de novillo con aguacate hass en láminas, rúcula silvestre, queso de cabra y reducción balsámica.'
  },
  {
    id: 10,
    name: 'Quadruple Monster Rapid',
    category: 'Gigantes XXL',
    price: 18.50,
    stock: 25,
    specialty_badge: 'Desafío Extremo ★★★★★',
    image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?w=400&auto=format&fit=crop&q=80',
    description: 'Cuatro medallones a la parrilla (500g totales), cuádruple queso cheddar fundido, torre de panceta y salsa Monster.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('burgers'); // 'burgers' | 'metrics' | 'database'
  const [burgers, setBurgers] = useState(FALLBACK_BURGERS);
  const [customerMetrics, setCustomerMetrics] = useState(null);
  const [serverHealth, setServerHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pingLatency, setPingLatency] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters for burgers
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');

  // Modal to add new burger
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBurger, setNewBurger] = useState({
    name: '',
    category: 'Especialidades Parrilla',
    price: '',
    stock: 30,
    specialty_badge: 'Especial de la Casa ★★★★☆',
    description: '',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80'
  });

  // Fetch initial data
  const fetchData = async () => {
    setIsRefreshing(true);
    const startPing = performance.now();

    try {
      const [resHealth, resProducts, resMetrics] = await Promise.allSettled([
        fetch('/api/health').then(r => r.json()),
        fetch('/api/products').then(r => r.json()),
        fetch('/api/customers/metrics').then(r => r.json())
      ]);

      const endPing = performance.now();
      setPingLatency(Math.round(endPing - startPing));

      if (resHealth.status === 'fulfilled') {
        setServerHealth(resHealth.value);
      }
      if (resProducts.status === 'fulfilled' && resProducts.value.data) {
        setBurgers(resProducts.value.data);
      }
      if (resMetrics.status === 'fulfilled' && resMetrics.value.data) {
        setCustomerMetrics(resMetrics.value.data);
      }
    } catch (err) {
      console.warn('Usando datos de respaldo locales para la demo:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update Stock
  const handleStockChange = async (id, delta) => {
    const target = burgers.find(b => b.id === id);
    if (!target) return;
    const newStock = Math.max(0, target.stock + delta);

    // Optimistic UI update
    setBurgers(prev => prev.map(b => b.id === id ? { ...b, stock: newStock } : b));

    try {
      await fetch(`/api/products/${id}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      });
    } catch (e) {
      console.log('Stock actualizado localmente en memoria');
    }
  };

  // Add new burger
  const handleCreateBurger = async (e) => {
    e.preventDefault();
    if (!newBurger.name || !newBurger.price) return;

    const payload = {
      ...newBurger,
      price: parseFloat(newBurger.price),
      stock: parseInt(newBurger.stock, 10)
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.data) {
        setBurgers(prev => [data.data, ...prev]);
      } else {
        setBurgers(prev => [{ ...payload, id: Date.now() }, ...prev]);
      }
    } catch (err) {
      setBurgers(prev => [{ ...payload, id: Date.now() }, ...prev]);
    }

    setShowAddModal(false);
    setNewBurger({
      name: '',
      category: 'Especialidades Parrilla',
      price: '',
      stock: 30,
      specialty_badge: 'Especial de la Casa ★★★★☆',
      description: '',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80'
    });
  };

  const filteredBurgers = burgers.filter(b => {
    const matchesCat = categoryFilter === 'Todas' || b.category === categoryFilter;
    const matchesSearch = b.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          b.category.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = ['Todas', ...new Set(burgers.map(b => b.category))];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f6f0' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{
        width: '260px',
        background: '#ffffff',
        borderRight: '1px solid #ede8df',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        position: 'sticky',
        top: 0,
        height: '100vh'
      }}>
        <div>
          {/* Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px 24px', borderBottom: '1px solid #ede8df' }}>
            <div style={{
              width: '42px',
              height: '42px',
              background: 'linear-gradient(135deg, #f59e0b, #c2410c)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: '0 4px 12px rgba(194,65,12,0.2)'
            }}>
              🍔
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1c1917', lineHeight: '1.1' }}>
                HAMBURGER <span style={{ color: '#c2410c' }}>RAPID</span>
              </div>
              <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#b45309', background: '#fef3c7', padding: '1px 6px', borderRadius: '4px' }}>
                Admin Portal v1.0
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '20px' }}>
            <button
              onClick={() => setActiveTab('burgers')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'burgers' ? '#fff7ed' : 'transparent',
                color: activeTab === 'burgers' ? '#c2410c' : '#57534e',
                fontWeight: activeTab === 'burgers' ? '800' : '600',
                fontSize: '0.88rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s'
              }}
            >
              <span>🍔</span>
              <span>Hamburguesas ({burgers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'metrics' ? '#fff7ed' : 'transparent',
                color: activeTab === 'metrics' ? '#c2410c' : '#57534e',
                fontWeight: activeTab === 'metrics' ? '800' : '600',
                fontSize: '0.88rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s'
              }}
            >
              <span>👥</span>
              <span>Métricas de Clientes</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'database' ? '#fff7ed' : 'transparent',
                color: activeTab === 'database' ? '#c2410c' : '#57534e',
                fontWeight: activeTab === 'database' ? '800' : '600',
                fontSize: '0.88rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s'
              }}
            >
              <span>🗄️</span>
              <span>Estado de Base de Datos</span>
            </button>
          </nav>
        </div>

        {/* External Quick Links to Apps */}
        <div style={{ borderTop: '1px solid #ede8df', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#a8a29e', textTransform: 'uppercase', paddingLeft: '4px' }}>
            Vistas del Negocio
          </div>
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: '10px',
              background: '#fbf9f5',
              border: '1px solid #ede8df',
              color: '#1c1917',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: '700'
            }}
          >
            <span>🌐 Ver E-Commerce</span>
            <span style={{ color: '#a8a29e' }}>↗</span>
          </a>
          <a
            href="/app"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: '10px',
              background: '#fbf9f5',
              border: '1px solid #ede8df',
              color: '#1c1917',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: '700'
            }}
          >
            <span>📱 Abrir PWA Móvil</span>
            <span style={{ color: '#a8a29e' }}>↗</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Header Bar */}
        <header style={{
          background: '#ffffff',
          borderBottom: '1px solid #ede8df',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1c1917', lineHeight: '1.2' }}>
              {activeTab === 'burgers' && 'Catálogo de Hamburguesas Disponibles'}
              {activeTab === 'metrics' && 'Inteligencia de Clientes & Consumo'}
              {activeTab === 'database' && 'Diagnóstico del Motor de Base de Datos'}
            </h1>
            <p style={{ fontSize: '0.82rem', color: '#78716c' }}>
              Hamburger Rapid &bull; Panel de Control Ejecutivo
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Status indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: serverHealth?.database?.connected ? '#dcfce7' : '#fef3c7',
              border: '1px solid',
              borderColor: serverHealth?.database?.connected ? '#bbf7d0' : '#fde68a',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: serverHealth?.database?.connected ? '#166534' : '#92400e'
            }}>
              <span>{serverHealth?.database?.connected ? '🐬' : '⚡'}</span>
              <span>{serverHealth?.database?.mode === 'mysql' ? 'MySQL Activo' : 'Modo In-Memory'}</span>
            </div>

            <button
              onClick={fetchData}
              disabled={isRefreshing}
              style={{
                background: '#ffffff',
                border: '1px solid #ede8df',
                color: '#1c1917',
                padding: '7px 14px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}
            >
              <span>{isRefreshing ? '🔄' : '⚡'}</span>
              <span>{isRefreshing ? 'Actualizando...' : 'Refrescar'}</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          
          {/* TAB 1: HAMBURGUESAS DISPONIBLES */}
          {activeTab === 'burgers' && (
            <div>
              {/* Top Controls: Search, Category, Add Burger */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #ede8df',
                borderRadius: '16px',
                padding: '16px 20px',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                boxShadow: '0 2px 8px rgba(28,25,23,0.03)'
              }}>
                <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '300px' }}>
                  <input
                    type="text"
                    placeholder="Filtrar por nombre o ingrediente..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '9px 14px',
                      borderRadius: '10px',
                      border: '1px solid #ede8df',
                      fontSize: '0.85rem',
                      outline: 'none',
                      background: '#fbf9f5'
                    }}
                  />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{
                      padding: '9px 14px',
                      borderRadius: '10px',
                      border: '1px solid #ede8df',
                      fontSize: '0.85rem',
                      background: '#ffffff',
                      color: '#1c1917',
                      fontWeight: '600'
                    }}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  style={{
                    background: '#c2410c',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(194,65,12,0.25)'
                  }}
                >
                  <span>+</span>
                  <span>Añadir Hamburguesa</span>
                </button>
              </div>

              {/* Table of Hamburgers */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #ede8df',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(28,25,23,0.04)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#fcfbf9', borderBottom: '1px solid #ede8df', color: '#78716c', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '14px 20px' }}>Hamburguesa</th>
                      <th style={{ padding: '14px 16px' }}>Categoría</th>
                      <th style={{ padding: '14px 16px' }}>Especialidad</th>
                      <th style={{ padding: '14px 16px' }}>Precio</th>
                      <th style={{ padding: '14px 16px' }}>Stock Actual</th>
                      <th style={{ padding: '14px 16px' }}>Estado</th>
                      <th style={{ padding: '14px 20px', textAlign: 'right' }}>Ajustar Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBurgers.map((burger, idx) => {
                      const isOutOfStock = burger.stock === 0;
                      return (
                        <tr
                          key={burger.id}
                          style={{
                            borderBottom: idx === filteredBurgers.length - 1 ? 'none' : '1px solid #f5f1eb',
                            transition: 'background 0.15s'
                          }}
                        >
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img
                                src={burger.image}
                                alt={burger.name}
                                style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                              />
                              <div>
                                <div style={{ fontWeight: '800', color: '#1c1917' }}>{burger.name}</div>
                                <div style={{ fontSize: '0.75rem', color: '#78716c', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {burger.description}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '14px 16px', color: '#57534e', fontWeight: '600' }}>
                            {burger.category}
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <span style={{
                              background: '#fef3c7',
                              color: '#92400e',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '700'
                            }}>
                              {burger.specialty_badge || 'Especial ★★★★☆'}
                            </span>
                          </td>

                          <td style={{ padding: '14px 16px', fontWeight: '800', color: '#1c1917' }}>
                            ${burger.price.toFixed(2)}
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <strong style={{ fontSize: '0.95rem', color: isOutOfStock ? '#991b1b' : '#1c1917' }}>
                              {burger.stock} unidades
                            </strong>
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: isOutOfStock ? '#fee2e2' : '#dcfce7',
                              color: isOutOfStock ? '#991b1b' : '#166534',
                              padding: '3px 9px',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: '700'
                            }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isOutOfStock ? '#ef4444' : '#10b981' }} />
                              {isOutOfStock ? 'Agotado' : 'Disponible'}
                            </span>
                          </td>

                          <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <button
                                onClick={() => handleStockChange(burger.id, -5)}
                                title="Reducir 5 unidades"
                                style={{
                                  background: '#f5f1eb',
                                  border: '1px solid #ede8df',
                                  borderRadius: '6px',
                                  width: '28px',
                                  height: '28px',
                                  cursor: 'pointer',
                                  fontWeight: '800',
                                  fontSize: '0.85rem'
                                }}
                              >
                                -5
                              </button>
                              <button
                                onClick={() => handleStockChange(burger.id, -1)}
                                title="Reducir 1 unidad"
                                style={{
                                  background: '#f5f1eb',
                                  border: '1px solid #ede8df',
                                  borderRadius: '6px',
                                  width: '28px',
                                  height: '28px',
                                  cursor: 'pointer',
                                  fontWeight: '800',
                                  fontSize: '0.85rem'
                                }}
                              >
                                -
                              </button>
                              <button
                                onClick={() => handleStockChange(burger.id, 1)}
                                title="Añadir 1 unidad"
                                style={{
                                  background: '#f5f1eb',
                                  border: '1px solid #ede8df',
                                  borderRadius: '6px',
                                  width: '28px',
                                  height: '28px',
                                  cursor: 'pointer',
                                  fontWeight: '800',
                                  fontSize: '0.85rem'
                                }}
                              >
                                +
                              </button>
                              <button
                                onClick={() => handleStockChange(burger.id, 10)}
                                title="Añadir 10 unidades"
                                style={{
                                  background: '#fff7ed',
                                  border: '1px solid #fed7aa',
                                  color: '#c2410c',
                                  borderRadius: '6px',
                                  padding: '0 6px',
                                  height: '28px',
                                  cursor: 'pointer',
                                  fontWeight: '800',
                                  fontSize: '0.75rem'
                                }}
                              >
                                +10
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: MÉTRICAS DE CONSUMIDORES/CLIENTES */}
          {activeTab === 'metrics' && (
            <div>
              {/* KPI Cards Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginBottom: '28px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(28,25,23,0.03)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Total Clientes Activos
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1c1917' }}>
                    1,420
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '700', marginTop: '4px' }}>
                    ↑ +12.4% este mes
                  </div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(28,25,23,0.03)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Facturación Acumulada
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#c2410c' }}>
                    $48,250.70
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '700', marginTop: '4px' }}>
                    ↑ Meta superada en 108%
                  </div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(28,25,23,0.03)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Ticket Promedio
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1c1917' }}>
                    $28.40
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: '600', marginTop: '4px' }}>
                    ~2.1 hamburguesas / orden
                  </div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(28,25,23,0.03)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Satisfacción & Repetición
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#b45309' }}>
                    98.4%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '700', marginTop: '4px' }}>
                    ★ 4.9 promedio en reseñas
                  </div>
                </div>
              </div>

              {/* Segmentación según Consumo */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #ede8df',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '28px',
                boxShadow: '0 2px 10px rgba(28,25,23,0.04)'
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1c1917' }}>
                    Segmentación de Clientes según Frecuencia y Volumen de Consumo
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#78716c' }}>
                    Clasificación automática de la base de datos de consumidores para programas de fidelidad y promociones PWA.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {[
                    { tier: 'VIP Oro (> 10 compras)', count: 312, percent: 22, avgSpend: '$148.50', fav: 'Rey de las Burgers', color: '#b45309', badge: '👑 22% del total' },
                    { tier: 'VIP Plata (5 - 9 compras)', count: 480, percent: 34, avgSpend: '$82.30', fav: 'Burger Real Doble', color: '#c2410c', badge: '🥈 34% del total' },
                    { tier: 'Regulares (2 - 4 compras)', count: 438, percent: 31, avgSpend: '$42.10', fav: 'Burger Real Clásica', color: '#d97706', badge: '🍔 31% del total' },
                    { tier: 'Nuevos (1 compra)', count: 190, percent: 13, avgSpend: '$21.50', fav: 'Burger Doble Especial', color: '#f59e0b', badge: '🌱 13% del total' }
                  ].map(seg => (
                    <div
                      key={seg.tier}
                      style={{
                        background: '#fbf9f5',
                        border: '1px solid #ede8df',
                        borderRadius: '14px',
                        padding: '16px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: '800', color: seg.color }}>{seg.badge}</span>
                      </div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1c1917', marginBottom: '4px' }}>
                        {seg.tier}
                      </h4>
                      <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1c1917', margin: '6px 0' }}>
                        {seg.count} <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#78716c' }}>clientes</span>
                      </div>
                      
                      {/* Bar indicator */}
                      <div style={{ width: '100%', height: '6px', background: '#e7e2d9', borderRadius: '3px', margin: '8px 0', overflow: 'hidden' }}>
                        <div style={{ width: `${seg.percent}%`, height: '100%', background: seg.color }} />
                      </div>

                      <div style={{ fontSize: '0.75rem', color: '#57534e', marginTop: '6px' }}>
                        Gasto prom: <strong style={{ color: '#1c1917' }}>{seg.avgSpend}</strong>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#78716c', marginTop: '2px' }}>
                        Favorita: <em>{seg.fav}</em>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two columns: Ranking de Consumidores & Top Hamburguesas */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '24px' }}>
                
                {/* Ranking de Mejores Consumidores */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #ede8df',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(28,25,23,0.03)'
                }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1c1917', marginBottom: '14px' }}>
                    Top Clientes con Mayor Consumo Acumulado
                  </h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #ede8df', color: '#78716c', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '8px 6px' }}>Cliente</th>
                        <th style={{ padding: '8px 6px' }}>Nivel</th>
                        <th style={{ padding: '8px 6px' }}>Órdenes</th>
                        <th style={{ padding: '8px 6px' }}>Total Gastado</th>
                        <th style={{ padding: '8px 6px' }}>Favorita</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(customerMetrics?.topCustomers || [
                        { name: 'Carlos Mendoza', tier: 'VIP Oro', ordersCount: 24, totalSpent: 342.50, favoriteBurger: 'Rey de las Burgers' },
                        { name: 'Valentina Rojas', tier: 'VIP Oro', ordersCount: 19, totalSpent: 289.00, favoriteBurger: 'Burger Real Doble' },
                        { name: 'Mateo Fernández', tier: 'VIP Plata', ordersCount: 18, totalSpent: 254.20, favoriteBurger: 'Burger Doble Especial' },
                        { name: 'Sofía Alarcón', tier: 'VIP Plata', ordersCount: 15, totalSpent: 215.80, favoriteBurger: 'Burger Real Clásica' },
                        { name: 'Diego Morales', tier: 'Regular', ordersCount: 14, totalSpent: 198.00, favoriteBurger: 'Truffle & Mushroom Master' }
                      ]).map((c, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f5f1eb' }}>
                          <td style={{ padding: '10px 6px', fontWeight: '700', color: '#1c1917' }}>
                            {c.name}
                          </td>
                          <td style={{ padding: '10px 6px' }}>
                            <span style={{
                              background: c.tier.includes('Oro') ? '#fef3c7' : '#fff7ed',
                              color: c.tier.includes('Oro') ? '#92400e' : '#c2410c',
                              fontSize: '0.7rem',
                              fontWeight: '700',
                              padding: '2px 6px',
                              borderRadius: '4px'
                            }}>
                              {c.tier}
                            </span>
                          </td>
                          <td style={{ padding: '10px 6px', fontWeight: '700' }}>
                            {c.ordersCount} pedidos
                          </td>
                          <td style={{ padding: '10px 6px', fontWeight: '800', color: '#166534' }}>
                            ${c.totalSpent.toFixed(2)}
                          </td>
                          <td style={{ padding: '10px 6px', color: '#57534e' }}>
                            {c.favoriteBurger}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Top Hamburguesas Consumidas */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #ede8df',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(28,25,23,0.03)'
                }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1c1917', marginBottom: '14px' }}>
                    Variantes Más Consumidas
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { name: 'Rey de las Burgers', sales: 684, revenue: '$10,253.16', percent: 94 },
                      { name: 'Burger Real Clásica', sales: 592, revenue: '$5,914.08', percent: 82 },
                      { name: 'Burger Real Doble', sales: 480, revenue: '$6,000.00', percent: 68 },
                      { name: 'Burger Doble Especial', sales: 412, revenue: '$5,665.00', percent: 59 },
                      { name: 'Royal Crispy Chicken', sales: 345, revenue: '$4,105.50', percent: 48 }
                    ].map(b => (
                      <div key={b.name} style={{ background: '#fbf9f5', padding: '10px 12px', borderRadius: '10px', border: '1px solid #ede8df' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '800', color: '#1c1917', marginBottom: '4px' }}>
                          <span>{b.name}</span>
                          <span style={{ color: '#c2410c' }}>{b.sales} uds</span>
                        </div>
                        <div style={{ width: '100%', height: '5px', background: '#e7e2d9', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${b.percent}%`, height: '100%', background: '#c2410c' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#78716c', marginTop: '4px' }}>
                          <span>Facturado: {b.revenue}</span>
                          <span>Volumen Alto</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: ESTADO DE LA BASE DE DATOS */}
          {activeTab === 'database' && (
            <div>
              {/* Status Header Box */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #ede8df',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                boxShadow: '0 2px 10px rgba(28,25,23,0.03)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: serverHealth?.database?.connected ? '#dcfce7' : '#fef3c7',
                      color: serverHealth?.database?.connected ? '#166534' : '#92400e',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      marginBottom: '8px'
                    }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: serverHealth?.database?.connected ? '#16a34a' : '#d97706' }} />
                      {serverHealth?.database?.connected ? 'BASE DE DATOS CONECTADA Y OPERATIVA' : 'OPERANDO EN MODO IN-MEMORY CON PERSISTENCIA TEMPORAL'}
                    </span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1c1917' }}>
                      {serverHealth?.database?.mode === 'mysql' ? 'MySQL 8.0 Engine' : 'Motor SQLite/In-Memory Transaccional'}
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
                      Plataforma comercial preparada para Dokploy CI/CD y despliegue multi-contenedor.
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: '700', textTransform: 'uppercase' }}>
                      Latencia de Respuesta API
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#166534' }}>
                      {pingLatency !== null ? `${pingLatency} ms` : '12 ms'}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#a8a29e' }}>Ping interno Node.js</span>
                  </div>
                </div>
              </div>

              {/* Grid with Detailed Status Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginBottom: '24px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#78716c', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>
                    Servidor / Host
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1c1917' }}>
                    {serverHealth?.database?.host || 'localhost'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#78716c', marginTop: '4px' }}>
                    Puerto: 3306 &bull; Driver: mysql2/promise
                  </div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#78716c', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>
                    Base de Datos Activa
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#c2410c' }}>
                    {serverHealth?.database?.database || 'hamburger_rapid_db'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#78716c', marginTop: '4px' }}>
                    Esquema UTF8MB4 &bull; Transacciones ACID
                  </div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#78716c', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>
                    Tiempo de Actividad (Uptime)
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#166534' }}>
                    {serverHealth?.uptime ? `${Math.floor(serverHealth.uptime / 60)} min ${Math.floor(serverHealth.uptime % 60)}s` : 'Activo'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#78716c', marginTop: '4px' }}>
                    Salud de la API: 100% OK
                  </div>
                </div>
              </div>

              {/* Table Records Status */}
              <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1c1917', marginBottom: '14px' }}>
                  Recuento de Registros por Tabla
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                  <div style={{ background: '#fbf9f5', border: '1px solid #ede8df', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: '700' }}>TABLA: products</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1c1917', margin: '4px 0' }}>
                      {burgers.length} filas
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#166534' }}>10 variantes de hamburguesas cargadas</div>
                  </div>

                  <div style={{ background: '#fbf9f5', border: '1px solid #ede8df', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: '700' }}>TABLA: orders</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1c1917', margin: '4px 0' }}>
                      {serverHealth?.database?.tableStats?.orders || 3} órdenes
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#166534' }}>Simulaciones de compra registradas</div>
                  </div>

                  <div style={{ background: '#fbf9f5', border: '1px solid #ede8df', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: '700' }}>TABLA: customers</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1c1917', margin: '4px 0' }}>
                      1,420 perfiles
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#166534' }}>Segmentados por consumo y gasto</div>
                  </div>
                </div>
              </div>

              {/* Dokploy / CI/CD Configuration Box */}
              <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '16px', padding: '20px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1c1917', marginBottom: '8px' }}>
                  Configuración para Despliegue en Dokploy
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#57534e', marginBottom: '14px' }}>
                  Para conectar una instancia de MySQL en producción con Dokploy, suministra las siguientes variables de entorno en el panel de Dokploy:
                </p>
                <pre style={{
                  background: '#fbf9f5',
                  border: '1px solid #ede8df',
                  borderRadius: '10px',
                  padding: '14px',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  color: '#1c1917',
                  overflowX: 'auto'
                }}>
DB_HOST=mysql-service.dokploy
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password_seguro
DB_NAME=hamburger_rapid_db
                </pre>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: AÑADIR HAMBURGUESA */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(28,25,23,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 100
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '500px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1c1917' }}>
                Nueva Variante de Hamburguesa
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#78716c' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateBurger} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase' }}>
                  Nombre de la Hamburguesa
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Burger Suprema al Carbón"
                  value={newBurger.name}
                  onChange={(e) => setNewBurger({ ...newBurger, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.85rem', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase' }}>
                    Categoría
                  </label>
                  <select
                    value={newBurger.category}
                    onChange={(e) => setNewBurger({ ...newBurger, category: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.85rem', marginTop: '4px', background: 'white' }}
                  >
                    <option value="Especialidades Parrilla">Especialidades Parrilla</option>
                    <option value="Clásicas Premium">Clásicas Premium</option>
                    <option value="Doble Placer">Doble Placer</option>
                    <option value="Edición Limitada">Edición Limitada</option>
                    <option value="Gourmet Signature">Gourmet Signature</option>
                    <option value="Pollo & Crispy">Pollo & Crispy</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase' }}>
                    Nivel de Especialidad
                  </label>
                  <input
                    type="text"
                    value={newBurger.specialty_badge}
                    onChange={(e) => setNewBurger({ ...newBurger, specialty_badge: e.target.value })}
                    placeholder="Ej. Exclusiva ★★★★★"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.85rem', marginTop: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase' }}>
                    Precio ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="13.50"
                    value={newBurger.price}
                    onChange={(e) => setNewBurger({ ...newBurger, price: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.85rem', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase' }}>
                    Stock Inicial
                  </label>
                  <input
                    type="number"
                    required
                    value={newBurger.stock}
                    onChange={(e) => setNewBurger({ ...newBurger, stock: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.85rem', marginTop: '4px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase' }}>
                  Descripción & Ingredientes
                </label>
                <textarea
                  rows={2}
                  placeholder="Detalla los cortes de carne, maduración del queso y pan artesanal..."
                  value={newBurger.description}
                  onChange={(e) => setNewBurger({ ...newBurger, description: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.85rem', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ede8df', background: '#f5f1eb', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#c2410c', color: 'white', fontWeight: '800', cursor: 'pointer' }}
                >
                  Guardar Hamburguesa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
