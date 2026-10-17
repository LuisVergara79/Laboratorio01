import React, { useState, useEffect } from 'react';

const BURGERS_DATA = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especialidades',
    price: 14.99,
    badge: 'Legendaria ★★★★★',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: 'Triple medallón Angus flameado a la brasa, cheddar madurado 18m, panceta al bourbon y salsa Royal.',
    prepTime: '15 min',
    calories: '920 kcal'
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Clásicas',
    price: 9.99,
    badge: 'Clásica ★★★★☆',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    description: 'Carne seleccionada, queso americano fundente, pepinillos dulces encurtidos y aderezo especial de la casa.',
    prepTime: '10 min',
    calories: '680 kcal'
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Dobles',
    price: 12.50,
    badge: 'Alta Selección ★★★★★',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    description: 'Doble smash caramelizado, doble queso cheddar derretido, bacon ahumado crujiente y mostaza dulce.',
    prepTime: '12 min',
    calories: '860 kcal'
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Especialidades',
    price: 13.75,
    badge: 'Edición Especial ★★★★★',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80',
    description: 'Doble carne rellena con corazón de queso gouda fundido, aros de cebolla tempura y salsa barbacoa.',
    prepTime: '14 min',
    calories: '890 kcal'
  },
  {
    id: 5,
    name: 'Royal Crispy Chicken',
    category: 'Gourmet',
    price: 11.90,
    badge: 'Crujiente ★★★★☆',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80',
    description: 'Pechuga marinada 24h en buttermilk, rebozado ultra crocante, ensalada coleslaw y honey mustard.',
    prepTime: '12 min',
    calories: '720 kcal'
  },
  {
    id: 6,
    name: 'Truffle & Mushroom Master',
    category: 'Gourmet',
    price: 15.50,
    badge: 'Gourmet Deluxe ★★★★★',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=600&auto=format&fit=crop&q=80',
    description: 'Novillo madurado 30 días, duxelle de setas silvestres, trufa negra fresca y provolone ahumado.',
    prepTime: '15 min',
    calories: '810 kcal'
  },
  {
    id: 7,
    name: 'Smoky Bacon BBQ Burger',
    category: 'Clásicas',
    price: 12.99,
    badge: 'Ahumada ★★★★☆',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80',
    description: 'Carne a la brasa con humo de manzano, triple bacon crocante, queso monterey jack y BBQ al café.',
    prepTime: '12 min',
    calories: '840 kcal'
  },
  {
    id: 8,
    name: 'Spicy Habanero Smash',
    category: 'Especialidades',
    price: 11.50,
    badge: 'Fuego ★★★★☆',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop&q=80',
    description: 'Doble smash picante, pepper jack fundido, jalapeños encurtidos y confitura de habanero rojo.',
    prepTime: '10 min',
    calories: '760 kcal'
  },
  {
    id: 9,
    name: 'Avocado Fresh Blend',
    category: 'Gourmet',
    price: 12.25,
    badge: 'Fresh ★★★★☆',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80',
    description: 'Carne tierna, abanico de aguacate hass, rúcula silvestre, queso de cabra y reducción balsámica.',
    prepTime: '11 min',
    calories: '690 kcal'
  },
  {
    id: 10,
    name: 'Quadruple Monster Rapid',
    category: 'Dobles',
    price: 18.50,
    badge: 'XXL Extrema ★★★★★',
    image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?w=600&auto=format&fit=crop&q=80',
    description: '500g de carne en 4 medallones a la leña, cuádruple cheddar, torre de tocino y salsa Monster.',
    prepTime: '18 min',
    calories: '1280 kcal'
  }
];

const OFFERS = [
  {
    id: 'OFFER-1',
    title: 'Combo Pareja Real',
    subtitle: '2x Burger Real Clásica + Papas Familiares + 2 Bebidas',
    price: 24.99,
    originalPrice: 32.50,
    discount: '25% OFF',
    code: 'PAREJA25',
    color: '#c2410c',
    items: [
      { name: 'Burger Real Clásica', quantity: 2, price: 9.99 },
      { name: 'Papas Rústicas Grandes', quantity: 1, price: 5.00 }
    ]
  },
  {
    id: 'OFFER-2',
    title: 'Dúo Rey de las Burgers',
    subtitle: 'Rey de las Burgers + Aros Crujientes + Milkshake Dulce de Leche',
    price: 19.90,
    originalPrice: 26.00,
    discount: '23% OFF',
    code: 'REYKNG',
    color: '#b45309',
    items: [
      { name: 'Rey de las Burgers', quantity: 1, price: 14.99 },
      { name: 'Aros de Cebolla Panko', quantity: 1, price: 4.91 }
    ]
  },
  {
    id: 'OFFER-3',
    title: 'Rapid Free Delivery',
    subtitle: 'Envío 100% Gratis en compras mayores a $20 con entrega exprés',
    price: 0,
    originalPrice: 2.50,
    discount: 'DELIVERY $0',
    code: 'ENVIORAPID',
    color: '#166534',
    isCoupon: true
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'ofertas' | 'ordenes' | 'perfil'
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Customization Modal State
  const [selectedBurger, setSelectedBurger] = useState(null);
  const [burgerQty, setBurgerQty] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState({
    extraCheese: false,
    extraBacon: false,
    secretSauce: false,
    rusticFries: false
  });

  // Filter & Search
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Orders State (Simulated)
  const [orders, setOrders] = useState([
    {
      id: 'ORD-7492',
      customerName: 'Carlos Mendoza',
      items: [
        { name: 'Rey de las Burgers', quantity: 1, price: 14.99 },
        { name: 'Papas Rústicas', quantity: 1, price: 3.50 }
      ],
      total: 18.49,
      status: 'En Parrilla', // 'Recibido' | 'En Parrilla' | 'En Camino' | 'Entregado'
      step: 2,
      createdAt: 'Hace 10 min',
      address: 'Av. Javier Prado Este 2450, Dpto 802',
      paymentMethod: 'Tarjeta Visa •••• 4892'
    }
  ]);

  // Checkout modal state
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('Av. Javier Prado Este 2450, Lima');
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta de Crédito / Débito');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handlePrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handlePrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handlePrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('Para instalar Hamburger Rapid: pulsa en el menú de tu navegador y elige "Agregar a pantalla principal".');
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  // Open customization modal
  const openCustomizeModal = (burger) => {
    setSelectedBurger(burger);
    setBurgerQty(1);
    setSelectedExtras({
      extraCheese: false,
      extraBacon: false,
      secretSauce: false,
      rusticFries: false
    });
  };

  const getExtraPrice = () => {
    let extra = 0;
    if (selectedExtras.extraCheese) extra += 1.50;
    if (selectedExtras.extraBacon) extra += 2.00;
    if (selectedExtras.secretSauce) extra += 0.80;
    if (selectedExtras.rusticFries) extra += 3.50;
    return extra;
  };

  const addCustomizedToCart = () => {
    if (!selectedBurger) return;
    const unitPrice = selectedBurger.price + getExtraPrice();
    const itemExtras = [];
    if (selectedExtras.extraCheese) itemExtras.push('Extra Cheddar');
    if (selectedExtras.extraBacon) itemExtras.push('Doble Bacon');
    if (selectedExtras.secretSauce) itemExtras.push('Salsa Royal');
    if (selectedExtras.rusticFries) itemExtras.push('Papas Rústicas');

    const cartItem = {
      cartItemId: Date.now() + Math.random(),
      id: selectedBurger.id,
      name: selectedBurger.name,
      image: selectedBurger.image,
      unitPrice,
      quantity: burgerQty,
      extras: itemExtras,
      total: unitPrice * burgerQty
    };

    setCart(prev => [...prev, cartItem]);
    setSelectedBurger(null);
  };

  // Add Combo from Offers directly
  const addOfferToCart = (offer) => {
    const cartItem = {
      cartItemId: Date.now() + Math.random(),
      id: offer.id,
      name: offer.title,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
      unitPrice: offer.price,
      quantity: 1,
      extras: [offer.discount, offer.subtitle],
      total: offer.price
    };
    setCart(prev => [...prev, cartItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateCartItemQty = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty, total: item.unitPrice * newQty };
      }
      return item;
    }));
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.total, 0);
  const deliveryFee = cartSubtotal > 30 || cartSubtotal === 0 ? 0 : 2.50;
  const cartTotal = cartSubtotal + deliveryFee;

  // Handle Checkout Simulation
  const handleSimulatePurchase = async () => {
    if (cart.length === 0) return;

    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      customerName: 'Carlos Mendoza (Demo)',
      items: cart.map(c => ({ name: c.name, quantity: c.quantity, price: c.unitPrice })),
      total: cartTotal,
      status: 'Recibido',
      step: 1,
      createdAt: 'Recién creado',
      address: deliveryAddress,
      paymentMethod
    };

    // Try posting to API if online
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Carlos Mendoza',
          customerPhone: '+51 987 654 321',
          items: newOrder.items,
          total: cartTotal,
          paymentMethod,
          deliveryAddress
        })
      });
    } catch (e) {
      console.log('Operando pedido en modo offline/in-memory local');
    }

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setCart([]);
    setIsCartOpen(false);
    setIsCheckoutSuccess(true);
  };

  // Filtered Burgers
  const filteredBurgers = BURGERS_DATA.filter(b => {
    const matchesCat = selectedCategory === 'Todos' || b.category === selectedCategory;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fdfcf9' }}>
      
      {/* Top Header */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #ede8df',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            background: 'linear-gradient(135deg, #f59e0b, #c2410c)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            boxShadow: '0 2px 8px rgba(194,65,12,0.2)'
          }}>
            🍔
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: '800', color: '#1c1917', lineHeight: '1.1' }}>
              HAMBURGER <span style={{ color: '#c2410c' }}>RAPID</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#78716c', fontWeight: '600' }}>
              📍 Miraflores, Lima &bull; 20 min
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.7rem',
            padding: '3px 8px',
            borderRadius: '12px',
            fontWeight: '700',
            background: isOnline ? '#dcfce7' : '#fee2e2',
            color: isOnline ? '#166534' : '#991b1b'
          }}>
            {isOnline ? '🟢 Conectado' : '🔴 Sin Red'}
          </span>

          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: '#fff7ed',
              border: '1px solid #fed7aa',
              color: '#c2410c',
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            🛒
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#c2410c',
                color: 'white',
                fontSize: '0.68rem',
                fontWeight: '800',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area (Scrollable) */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 85px' }} className="fade-in">
        
        {/* TAB 1: MENÚ */}
        {activeTab === 'menu' && (
          <div>
            {/* Promo Banner Card */}
            <div style={{
              background: 'linear-gradient(135deg, #fffbeb, #fed7aa)',
              border: '1px solid #fde68a',
              borderRadius: '18px',
              padding: '16px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(180, 83, 9, 0.08)'
            }}>
              <div>
                <span style={{ background: '#b45309', color: 'white', padding: '2px 8px', borderRadius: '8px', fontSize: '0.68rem', fontWeight: '800' }}>
                  RECOMENDACIÓN DEL CHEF
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#78350f', marginTop: '4px', marginBottom: '2px' }}>
                  Rey de las Burgers
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#92400e', maxWidth: '200px' }}>
                  Triple carne Angus flameada a la leña con salsa Royal secreta.
                </p>
              </div>
              <button
                onClick={() => openCustomizeModal(BURGERS_DATA[0])}
                style={{
                  background: '#c2410c',
                  color: 'white',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(194,65,12,0.3)'
                }}
              >
                Pedir $14.99
              </button>
            </div>

            {/* Search Input */}
            <div style={{ marginBottom: '14px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Buscar hamburguesa o ingrediente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 36px',
                  borderRadius: '14px',
                  border: '1px solid #e7e2d9',
                  background: '#ffffff',
                  fontSize: '0.88rem',
                  color: '#1c1917',
                  outline: 'none',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
                }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '11px', color: '#a8a29e', fontSize: '0.9rem' }}>🔍</span>
            </div>

            {/* Category Chips */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
              {['Todos', 'Especiales', 'Clásicas', 'Dobles', 'Gourmet'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? '#c2410c' : '#ede8df',
                    background: selectedCategory === cat ? '#c2410c' : '#ffffff',
                    color: selectedCategory === cat ? '#ffffff' : '#57534e',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Burgers List (10 Variants) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredBurgers.map(burger => (
                <div
                  key={burger.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #ede8df',
                    borderRadius: '16px',
                    padding: '12px',
                    display: 'flex',
                    gap: '12px',
                    boxShadow: '0 2px 8px rgba(28,25,23,0.04)',
                    transition: 'transform 0.15s'
                  }}
                >
                  <div style={{ position: 'relative', width: '95px', height: '95px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden' }}>
                    <img
                      src={burger.image}
                      alt={burger.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '4px',
                      background: 'rgba(28,25,23,0.85)',
                      color: '#fef3c7',
                      fontSize: '0.62rem',
                      fontWeight: '800',
                      padding: '1px 5px',
                      borderRadius: '4px'
                    }}>
                      {burger.prepTime}
                    </span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{
                          fontSize: '0.68rem',
                          fontWeight: '800',
                          color: '#b45309',
                          background: '#fef3c7',
                          padding: '2px 6px',
                          borderRadius: '6px'
                        }}>
                          {burger.badge}
                        </span>
                        <span style={{ fontSize: '1rem', fontWeight: '800', color: '#1c1917' }}>
                          ${burger.price.toFixed(2)}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#1c1917', marginTop: '3px', marginBottom: '2px' }}>
                        {burger.name}
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: '#78716c', lineHeight: '1.35', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {burger.description}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#a8a29e', fontWeight: '600' }}>
                        {burger.calories}
                      </span>
                      <button
                        onClick={() => openCustomizeModal(burger)}
                        style={{
                          background: '#c2410c',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '10px',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>+ Agregar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: OFERTAS */}
        {activeTab === 'ofertas' && (
          <div className="fade-in">
            <div style={{ marginBottom: '16px' }}>
              <span style={{ color: '#c2410c', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                🔥 Combos & Beneficios Móviles
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1c1917' }}>
                Ofertas Exclusivas PWA
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#78716c' }}>
                Aprovecha descuentos y paquetes diseñados para deleitarte al mejor precio.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {OFFERS.map(offer => (
                <div
                  key={offer.id}
                  style={{
                    background: '#ffffff',
                    border: '1.5px dashed #fde68a',
                    borderRadius: '18px',
                    padding: '16px',
                    boxShadow: '0 4px 14px rgba(28,25,23,0.04)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      background: '#fee2e2',
                      color: '#991b1b',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '8px'
                    }}>
                      {offer.discount}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#78716c' }}>
                      Cupón: <strong style={{ color: '#1c1917' }}>{offer.code}</strong>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1c1917', marginBottom: '4px' }}>
                    {offer.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#57534e', marginBottom: '12px' }}>
                    {offer.subtitle}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3ede4', paddingTop: '10px' }}>
                    <div>
                      <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#c2410c' }}>
                        ${offer.price.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '0.82rem', textDecoration: 'line-through', color: '#a8a29e', marginLeft: '6px' }}>
                        ${offer.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => addOfferToCart(offer)}
                      style={{
                        background: '#c2410c',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Añadir Combo 🛒
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ORDENES */}
        {activeTab === 'ordenes' && (
          <div className="fade-in">
            <div style={{ marginBottom: '16px' }}>
              <span style={{ color: '#166534', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                🛵 Seguimiento en Tiempo Real
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1c1917' }}>
                Tus Pedidos Simulados
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#78716c' }}>
                Monitorea el estado desde la parrilla hasta tu mesa.
              </p>
            </div>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: '#ffffff', borderRadius: '16px', border: '1px solid #ede8df' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🍽️</div>
                <h4 style={{ color: '#1c1917', marginBottom: '4px' }}>No tienes órdenes activas</h4>
                <p style={{ fontSize: '0.82rem', color: '#78716c', marginBottom: '16px' }}>
                  Selecciona alguna de nuestras 10 variantes y simula tu primera compra.
                </p>
                <button
                  onClick={() => setActiveTab('menu')}
                  style={{
                    background: '#c2410c',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Ir al Menú
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {orders.map((ord, idx) => (
                  <div
                    key={ord.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #ede8df',
                      borderRadius: '18px',
                      padding: '16px',
                      boxShadow: '0 4px 14px rgba(28,25,23,0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#c2410c' }}>{ord.id}</span>
                        <div style={{ fontSize: '0.72rem', color: '#a8a29e' }}>{ord.createdAt}</div>
                      </div>
                      <span style={{
                        background: ord.status === 'Entregado' ? '#dcfce7' : '#fef3c7',
                        color: ord.status === 'Entregado' ? '#166534' : '#92400e',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '800'
                      }}>
                        {ord.status === 'Recibido' && '📝 Pedido Recibido'}
                        {ord.status === 'En Parrilla' && '🔥 En Parrilla a la Brasa'}
                        {ord.status === 'En Camino' && '🛵 En Camino'}
                        {ord.status === 'Entregado' && '✅ Entregado'}
                      </span>
                    </div>

                    {/* Step Progress Tracker */}
                    <div style={{ margin: '14px 0 16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '6px' }}>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '10%',
                          right: '10%',
                          height: '3px',
                          background: '#e7e2d9',
                          transform: 'translateY(-50%)',
                          zIndex: 1
                        }}>
                          <div style={{
                            height: '100%',
                            background: '#c2410c',
                            width: ord.status === 'Recibido' ? '25%' : ord.status === 'En Parrilla' ? '50%' : ord.status === 'En Camino' ? '75%' : '100%',
                            transition: 'width 0.3s'
                          }} />
                        </div>

                        {['Recibido', 'Parrilla', 'Camino', 'Listo'].map((step, sIdx) => {
                          const isDone = (sIdx === 0 && ord.status) ||
                                         (sIdx === 1 && (ord.status === 'En Parrilla' || ord.status === 'En Camino' || ord.status === 'Entregado')) ||
                                         (sIdx === 2 && (ord.status === 'En Camino' || ord.status === 'Entregado')) ||
                                         (sIdx === 3 && ord.status === 'Entregado');
                          return (
                            <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: isDone ? '#c2410c' : '#ffffff',
                                border: '2px solid',
                                borderColor: isDone ? '#c2410c' : '#d6d0c4',
                                color: isDone ? 'white' : '#78716c',
                                fontSize: '0.65rem',
                                fontWeight: '800',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                {isDone ? '✓' : sIdx + 1}
                              </div>
                              <span style={{ fontSize: '0.62rem', color: isDone ? '#1c1917' : '#a8a29e', fontWeight: '700', marginTop: '4px' }}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Items List */}
                    <div style={{ background: '#fbf9f5', borderRadius: '12px', padding: '10px 12px', marginBottom: '12px' }}>
                      {ord.items.map((item, iIdx) => (
                        <div key={iIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#57534e', marginBottom: '3px' }}>
                          <span>{item.quantity}x {item.name}</span>
                          <span style={{ fontWeight: '700', color: '#1c1917' }}>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div style={{ borderTop: '1px solid #ede8df', marginTop: '6px', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: '800', color: '#1c1917', fontSize: '0.85rem' }}>
                        <span>Total Pagado</span>
                        <span style={{ color: '#c2410c' }}>${ord.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#78716c' }}>
                      📍 <strong>Destino:</strong> {ord.address}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PERFIL */}
        {activeTab === 'perfil' && (
          <div className="fade-in">
            {/* User Badge Card */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #ede8df',
              borderRadius: '20px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 14px rgba(28,25,23,0.04)',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fef3c7, #fed7aa)',
                border: '2px solid #f59e0b',
                margin: '0 auto 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                👨‍💼
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1c1917', marginBottom: '2px' }}>
                Carlos Mendoza
              </h3>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#fef3c7', color: '#92400e', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800', marginBottom: '14px' }}>
                👑 Cliente VIP Oro &bull; Rapid Rewards
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', borderTop: '1px solid #ede8df', paddingTop: '14px' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#c2410c' }}>1,450</div>
                  <div style={{ fontSize: '0.68rem', color: '#78716c' }}>Puntos Rapid</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1c1917' }}>24</div>
                  <div style={{ fontSize: '0.68rem', color: '#78716c' }}>Pedidos Hechos</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#166534' }}>$342.50</div>
                  <div style={{ fontSize: '0.68rem', color: '#78716c' }}>Consumo Total</div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Preferences */}
            <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '16px', padding: '14px', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1c1917', marginBottom: '10px' }}>
                Tus Preferencias
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f1eb' }}>
                  <span style={{ color: '#57534e' }}>Hamburguesa Favorita</span>
                  <strong style={{ color: '#c2410c' }}>Rey de las Burgers</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f1eb' }}>
                  <span style={{ color: '#57534e' }}>Dirección Frecuente</span>
                  <span style={{ color: '#1c1917' }}>Av. Javier Prado 2450</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ color: '#57534e' }}>Método Predeterminado</span>
                  <span style={{ color: '#1c1917' }}>Visa •••• 4892</span>
                </div>
              </div>
            </div>

            {/* Navigation links across apps */}
            <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '16px', padding: '14px', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1c1917', marginBottom: '10px' }}>
                Navegación del Ecosistema
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                  href="/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: '#fbf9f5',
                    textDecoration: 'none',
                    color: '#1c1917',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  <span>🌐 Volver al E-commerce Landing</span>
                  <span>↗</span>
                </a>
                <a
                  href="/admin"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: '#fbf9f5',
                    textDecoration: 'none',
                    color: '#1c1917',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  <span>⚙️ Ir al Panel Admin (Métricas & DB)</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Install PWA Button */}
            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #c2410c, #9a3412)',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '14px',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 6px 16px rgba(194,65,12,0.3)'
                }}
              >
                📲 Instalar App en Pantalla de Inicio
              </button>
            )}
          </div>
        )}
      </main>

      {/* CUSTOMIZE BURGER MODAL */}
      {selectedBurger && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(28,25,23,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 100
        }}>
          <div style={{
            background: '#ffffff',
            width: '100%',
            maxWidth: '440px',
            margin: '0 auto',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '20px',
            maxHeight: '85vh',
            overflowY: 'auto'
          }} className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#b45309', background: '#fef3c7', padding: '3px 8px', borderRadius: '6px' }}>
                {selectedBurger.badge}
              </span>
              <button
                onClick={() => setSelectedBurger(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#78716c' }}
              >
                &times;
              </button>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1c1917', marginBottom: '4px' }}>
              {selectedBurger.name}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#57534e', marginBottom: '16px' }}>
              {selectedBurger.description}
            </p>

            {/* Extras Selector */}
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1c1917', marginBottom: '10px' }}>
              Personaliza tu Creación:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              {[
                { key: 'extraCheese', label: 'Extra Queso Cheddar Madurado', price: 1.50 },
                { key: 'extraBacon', label: 'Doble Bacon Ahumado Maple', price: 2.00 },
                { key: 'secretSauce', label: 'Salsa Secreta Royal Extra', price: 0.80 },
                { key: 'rusticFries', label: 'Añadir Papas Rústicas Doradas', price: 3.50 }
              ].map(extra => (
                <label
                  key={extra.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    background: selectedExtras[extra.key] ? '#fff7ed' : '#fbf9f5',
                    border: '1px solid',
                    borderColor: selectedExtras[extra.key] ? '#fed7aa' : '#ede8df',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    color: '#1c1917'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={selectedExtras[extra.key]}
                      onChange={(e) => setSelectedExtras(prev => ({ ...prev, [extra.key]: e.target.checked }))}
                    />
                    {extra.label}
                  </span>
                  <strong style={{ color: '#c2410c' }}>+${extra.price.toFixed(2)}</strong>
                </label>
              ))}
            </div>

            {/* Quantity Selector & Add Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', borderTop: '1px solid #ede8df', paddingTop: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f5f1eb', padding: '6px 12px', borderRadius: '12px' }}>
                <button
                  onClick={() => setBurgerQty(q => Math.max(1, q - 1))}
                  style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer', color: '#1c1917' }}
                >
                  -
                </button>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1c1917' }}>{burgerQty}</span>
                <button
                  onClick={() => setBurgerQty(q => q + 1)}
                  style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer', color: '#1c1917' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={addCustomizedToCart}
                style={{
                  flex: 1,
                  background: '#c2410c',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '14px',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(194,65,12,0.3)'
                }}
              >
                Agregar al Carrito &bull; ${((selectedBurger.price + getExtraPrice()) * burgerQty).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(28,25,23,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 110
        }}>
          <div style={{
            background: '#ffffff',
            width: '100%',
            maxWidth: '440px',
            margin: '0 auto',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '20px',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column'
          }} className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>🛒</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1c1917' }}>Tu Carrito</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#78716c' }}
              >
                &times;
              </button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <p style={{ color: '#78716c', fontSize: '0.9rem' }}>El carrito está vacío actualmente.</p>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {cart.map(item => (
                    <div
                      key={item.cartItemId}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#fbf9f5',
                        border: '1px solid #ede8df',
                        padding: '10px 12px',
                        borderRadius: '12px'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1c1917' }}>{item.name}</div>
                        {item.extras && item.extras.length > 0 && (
                          <div style={{ fontSize: '0.7rem', color: '#78716c' }}>
                            {item.extras.join(', ')}
                          </div>
                        )}
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#c2410c', marginTop: '2px' }}>
                          ${item.total.toFixed(2)}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => updateCartItemQty(item.cartItemId, -1)}
                          style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid #d6d0c4', background: 'white', cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateCartItemQty(item.cartItemId, 1)}
                          style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid #d6d0c4', background: 'white', cursor: 'pointer' }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          style={{ marginLeft: '4px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem' }}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Summary Form */}
                <div style={{ borderTop: '1px solid #ede8df', paddingTop: '12px', marginBottom: '14px' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase' }}>
                      Dirección de Entrega
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.8rem', marginTop: '3px' }}
                    />
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase' }}>
                      Método de Pago
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.8rem', marginTop: '3px', background: 'white' }}
                    >
                      <option value="Tarjeta de Crédito / Débito">💳 Tarjeta de Crédito / Débito (Visa/Mastercard)</option>
                      <option value="Yape / Plin">📱 Yape / Plin (Pago Rápido Móvil)</option>
                      <option value="Efectivo Contra Entrega">💵 Efectivo al Recibir</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#57534e', marginBottom: '4px' }}>
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#57534e', marginBottom: '6px' }}>
                    <span>Costo de Envío</span>
                    <span>{deliveryFee === 0 ? <strong style={{ color: '#166534' }}>GRATIS</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800', color: '#1c1917', borderTop: '1px solid #ede8df', paddingTop: '6px' }}>
                    <span>Total a Pagar</span>
                    <span style={{ color: '#c2410c' }}>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleSimulatePurchase}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                    color: 'white',
                    border: 'none',
                    padding: '13px',
                    borderRadius: '14px',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(194,65,12,0.35)'
                  }}
                >
                  🚀 Simular Compra Ahora (${cartTotal.toFixed(2)})
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT SUCCESS MODAL */}
      {isCheckoutSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(28,25,23,0.65)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 120
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px 24px',
            maxWidth: '360px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }} className="fade-in">
            <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>🎉</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1c1917', marginBottom: '6px' }}>
              ¡Compra Simulada con Éxito!
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#57534e', marginBottom: '14px' }}>
              Tu pedido <strong>{lastPlacedOrder?.id}</strong> ha entrado a cocina y está siendo preparado a la brasa.
            </p>

            <div style={{ background: '#fbf9f5', border: '1px solid #ede8df', borderRadius: '14px', padding: '12px', textAlign: 'left', fontSize: '0.8rem', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#78716c' }}>Total Pagado:</span>
                <strong style={{ color: '#c2410c' }}>${lastPlacedOrder?.total.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#78716c' }}>Método:</span>
                <span>{lastPlacedOrder?.paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#78716c' }}>Tiempo Estimado:</span>
                <strong style={{ color: '#166534' }}>18-22 min</strong>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCheckoutSuccess(false);
                setActiveTab('ordenes');
              }}
              style={{
                width: '100%',
                background: '#c2410c',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Ver Seguimiento en Vivo 🛵
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM TAB NAVIGATION (Menú, Ofertas, Ordenes, Perfil) */}
      <nav style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#ffffff',
        borderTop: '1px solid #ede8df',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 6px 14px',
        zIndex: 50,
        boxShadow: '0 -4px 16px rgba(28,25,23,0.04)'
      }}>
        {[
          { key: 'menu', label: 'Menú', icon: '🍔' },
          { key: 'ofertas', label: 'Ofertas', icon: '🏷️' },
          { key: 'ordenes', label: 'Ordenes', icon: '🛵', badge: orders.length },
          { key: 'perfil', label: 'Perfil', icon: '👤' }
        ].map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                cursor: 'pointer',
                position: 'relative',
                flex: 1,
                padding: '4px 0'
              }}
            >
              <div style={{
                position: 'relative',
                fontSize: '1.25rem',
                transform: isActive ? 'scale(1.15)' : 'scale(1)',
                transition: 'transform 0.15s ease'
              }}>
                {tab.icon}
                {tab.badge > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-8px',
                    background: '#c2410c',
                    color: 'white',
                    fontSize: '0.6rem',
                    fontWeight: '800',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: isActive ? '800' : '600',
                color: isActive ? '#c2410c' : '#78716c'
              }}>
                {tab.label}
              </span>
              {isActive && (
                <div style={{
                  width: '16px',
                  height: '3px',
                  borderRadius: '2px',
                  background: '#c2410c',
                  marginTop: '1px'
                }} />
              )}
            </button>
          );
        })}
      </nav>

    </div>
  );
}
