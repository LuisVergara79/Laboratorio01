# 🍔 Hamburger Rapid — Plataforma Comercial Full-Stack

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Astro](https://img.shields.io/badge/Astro-4.x-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Multi--Stage-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Dokploy](https://img.shields.io/badge/Dokploy-CI%2FCD%20Ready-0ea5e9?style=for-the-badge)](https://dokploy.com/)

**Hamburger Rapid** es la primera versión comercial de una solución integral de comida rápida y hamburguesería artesanal de autor. Diseñada bajo una arquitectura monorepo unificada, combina una experiencia de usuario orientada al consumidor final con herramientas analíticas para la gestión del negocio, todo bajo una **paleta clara premium** (*marfil cálido, blanco puro, bordes sutiles y acentos terracota/ámbar dorado*).

---

## 🏛️ Arquitectura del Sistema

La solución articula **tres aplicaciones frontend independientes** integradas y servidas por un único **servidor backend Node.js/Express**, con soporte híbrido para **MySQL 8.0** y modo de respaldo transaccional en memoria (**In-Memory**):

```mermaid
flowchart TD
    subgraph ClientLayer ["Capas de Cliente (Frontends)"]
        ECOMMERCE["🌐 apps/ecommerce<br/>Landing Page de Autor<br/>(Astro 4.x - Ruta /)"]
        PWA["📱 apps/pwa<br/>Web App Móvil Progresiva<br/>(React 18 + Vite - Ruta /app)"]
        ADMIN["⚙️ apps/admin<br/>Dashboard de Control<br/>(React 18 + Vite - Ruta /admin)"]
    end

    subgraph ServerLayer ["Servidor Unificado (Backend Runtime)"]
        SERVER["🚀 server/src/app.js<br/>Express HTTP Server :3000"]
        API["📡 server/src/routes/api.js<br/>REST API Endpoints"]
        DB_LAYER["🗄️ server/src/db.js<br/>Capa de Abstracción de Datos"]
    end

    subgraph DataStorage ["Persistencia"]
        MYSQL[("🐬 MySQL 8.0 Database<br/>(Contenedor o Cloud)")]
        INMEM[("⚡ In-Memory Engine<br/>(Fallback con datos semilla)")]
    end

    ECOMMERCE -->|Consume catálogo y assets| SERVER
    PWA -->|Órdenes / Catálogo| API
    ADMIN -->|Stock / Métricas / Health| API

    SERVER --> API
    API --> DB_LAYER
    DB_LAYER -->|DB_HOST configurado| MYSQL
    DB_LAYER -->|Sin conexión DB| INMEM
```

---

## 🚀 Módulos del Proyecto

### 1. Landing Page E-Commerce (`apps/ecommerce`)
* **Tecnología**: Astro 4.x (Generación Estática de alto rendimiento).
* **Ruta de Acceso**: `/`
* **Referencia de Diseño Visual**: Basada en la maqueta de alta conversión ubicada en `assets-references\imagenes\imagen001.jpg`.
* **Características Principales**:
  * **Estilo Visual & Paleta Dark & Gold**: Diseño premium en fondo oscuro (`#070708`) con acentos en amarillo cheddar y oro cálido (`#ffb703`), botones píldora (*pill buttons*) y tipografías *Montserrat*, *Plus Jakarta Sans* y script *Caveat*.
  * **Hero Section Comercial ("Good Food Fast & Fresh")**: Propuesta de valor de alto impacto con script decorativo (*"Cravings, Satisfied"*), insignia circular flotante (*"100% Fresh Ingredients"*), botón de acción rápida `ORDER NOW →`, enlace para ver video y cintillo de beneficios (*Fast Delivery, Best Quality, Great Offers*).
  * **Barra Flotante de Categorías**: Card flotante en blanco puro con elevación tridimensional que destaca accesos rápidos a *Burgers, Fries, Pizza, Drinks, Chicken y Desserts*.
  * **Bestsellers ("Our Bestsellers")**: Catálogo de creaciones con tarjetas oscuras, fotografía gastronómica, insignias de especialidad, precios destacados en amarillo y botones circulares de adición rápida `+`.
  * **Banner Promocional Integrado**: Card dorado con reloj animado (*"Hungry? We Deliver Fast!"*), descuento del 20% en primera compra con cupón `WELCOME20` y arte de repartidor en scooter.
  * **Filtrado Dinámico**: Categorización instantánea sin recarga de página (*All Items, Burgers & Fries, Pizzas & Specials, Chicken & Gourmet*).
  * **Modal Interactivo de Ficha Técnica**: Despliega ingredientes de autor en etiquetas (*chips*), tiempos estimados de preparación, conteo calórico y botón para transferir el pedido a la PWA.
  * **Sección de Calidad y Confianza**: Bloques explicativos sobre certificación Angus, fermentación de masa brioche y salsas de receta secreta.
  * **Footer de 5 Columnas de Alto Impacto**: Enlaces rápidos, atención al cliente, datos de contacto, redes sociales y badges para tiendas de aplicaciones móvil.

---

### 2. Aplicación Web Progresiva Móvil — PWA (`apps/pwa`)
* **Tecnología**: React 18, Vite 5, PWA Service Worker (`sw.js`) y `manifest.json`.
* **Ruta de Acceso**: `/app/`
* **Estructura de Navegación (Bottom Tabs)**:
  * 🍔 **Menú**:
    * Buscador en tiempo real por nombre o ingrediente.
    * Chips deslizables de categoría (*Todos, Especiales, Clásicas, Dobles, Gourmet*).
    * Selector interactivo de variantes y botón modal para personalizar ingredientes (*Extra Cheddar inglés, Doble Bacon al maple, Salsa Royal secreta, Papas rústicas doradas*).
  * 🏷️ **Ofertas**:
    * Cupones y combos con descuentos activos (*Combo Pareja Real, Dúo Rey de las Burgers, Cupón Delivery Gratis*).
    * Incorporación de combos al carrito de compras en un solo toque.
  * 🛵 **Ordenes**:
    * Registro de compras simuladas del usuario.
    * **Tracker Visual en Tiempo Real**: Barra de avance con 4 estados consecutivos (*1. Recibido ➔ 2. En Parrilla a la Brasa ➔ 3. En Camino con Motorizado ➔ 4. Entregado*).
  * 👤 **Perfil**:
    * Ficha de consumidor VIP (*Carlos Mendoza — Cliente VIP Oro*).
    * Programa de lealtad **Rapid Rewards** con saldo de puntos (1,450 pts) y métricas personales de consumo.
    * Direcciones guardadas y métodos de pago habituales.
    * Botón de instalación nativa de la PWA (`beforeinstallprompt`).
* **Simulación de Compra (Checkout Drawer)**:
  * Carrito lateral deslizable con ajuste de cantidades.
  * Cálculo dinámico de subtotal, costo de envío ($2.50 o **GRATIS** en pedidos mayores a $30.00).
  * Selección de método de pago (*Tarjeta de Crédito/Débito, Yape/Plin, Efectivo*).
  * Despacho asíncrono hacia `POST /api/orders` y apertura automática del módulo de seguimiento.

---

### 3. Dashboard Administrativo (`apps/admin`)
* **Tecnología**: React 18, Vite 5.
* **Ruta de Acceso**: `/admin/`
* **Módulos Ejecutivos**:
  * 🍔 **Hamburguesas Disponibles**:
    * Tabla con imágenes miniatura, categorías, badges de especialidad y precios comerciales.
    * **Ajuste de Stock en Vivo**: Controles directos (`-5`, `-`, `+`, `+10`) con actualización inmediata en el backend vía `PATCH /api/products/:id/stock`.
    * Semáforo de estado de inventario (*Disponible* en verde vs *Agotado* en rojo).
    * Modal para dar de alta nuevas variantes (*nombre, categoría, precio, stock, descripción e insignia*).
  * 👥 **Inteligencia de Clientes & Consumo**:
    * **KPIs Clave**: Clientes activos (1,420), facturación acumulada ($48,250.70), ticket promedio ($28.40) y tasa de retención (98.4%).
    * **Segmentación según Consumo**:
      * *VIP Oro* (> 10 compras / mes): 22% del total, gasto prom. $148.50.
      * *VIP Plata* (5 - 9 compras / mes): 34% del total, gasto prom. $82.30.
      * *Regulares* (2 - 4 compras / mes): 31% del total, gasto prom. $42.10.
      * *Nuevos / Ocasionales* (1 compra): 13% del total, gasto prom. $21.50.
    * **Ranking de Mejores Clientes**: Tabla detallada con nombre, nivel, cantidad de pedidos, gasto total y hamburguesa predilecta.
    * **Variantes Más Consumidas**: Gráfica proporcional de unidades vendidas e ingresos generados.
  * 🗄️ **Estado de la Base de Datos**:
    * Monitoreo de salud en vivo vía `GET /api/health`.
    * Identificación de motor activo (*MySQL 8.0* vs *In-Memory Mode*).
    * Medidor de latencia de red y ping en milisegundos.
    * Conteo de registros en tablas (`products`, `orders`, `customers`).
    * Guía de parámetros de conexión para despliegues con Dokploy.

---

### 4. Servidor y API Backend (`server`)
* **Tecnología**: Node.js, Express, `mysql2/promise`, CORS.
* **Funciones**:
  * Servicio unificado de API RESTful.
  * Distribución de los 3 artefactos estáticos compilados en `server/public`:
    * `server/public/ecommerce` ➔ `/`
    * `server/public/pwa` ➔ `/app/`
    * `server/public/admin` ➔ `/admin/`
  * Inicialización y migración automática de tablas en MySQL si la base de datos está vacía.
  * Fallback automático a memoria si no se provee host de base de datos, garantizando disponibilidad inmediata para demostraciones o tests.

---

## 🍔 Catálogo de las 10 Variantes Insignia

| # | Hamburguesa | Categoría | Especialidad | Precio | Calorías |
|---|---|---|---|---|---|
| **01** | **Rey de las Burgers** | Especialidades Parrilla | *Legendaria ★★★★★* | **$14.99** | 920 kcal |
| **02** | **Burger Real Clásica** | Clásicas Premium | *Clásica de la Casa ★★★★☆* | **$9.99** | 680 kcal |
| **03** | **Burger Real Doble** | Doble Placer | *Alta Selección ★★★★★* | **$12.50** | 860 kcal |
| **04** | **Burger Doble Especial** | Edición Limitada | *Edición Especial ★★★★★* | **$13.75** | 890 kcal |
| **05** | **Royal Crispy Chicken** | Pollo & Crispy | *Crujiente Gourmet ★★★★☆* | **$11.90** | 720 kcal |
| **06** | **Truffle & Mushroom Master** | Gourmet Signature | *Gourmet Deluxe ★★★★★* | **$15.50** | 810 kcal |
| **07** | **Smoky Bacon BBQ Burger** | Smoked BBQ | *Artesanal Ahumada ★★★★☆* | **$12.99** | 840 kcal |
| **08** | **Spicy Habanero Smash** | Picante Intenso | *Fuego & Crunch ★★★★☆* | **$11.50** | 760 kcal |
| **09** | **Avocado Fresh Blend** | Fresh Balance | *Fresh & Green ★★★★☆* | **$12.25** | 690 kcal |
| **10** | **Quadruple Monster Rapid** | Gigantes XXL | *Desafío Extremo ★★★★★* | **$18.50** | 1280 kcal |

---

## 📂 Estructura del Monorepo

```text
Laboratorio01/
├── apps/
│   ├── admin/                    # Dashboard administrativo (React 18 + Vite)
│   │   ├── src/
│   │   │   ├── App.jsx           # Tablas, métricas de consumo y monitoreo DB
│   │   │   ├── index.css         # Paleta clara, tarjetas y micro-interacciones
│   │   │   └── main.jsx          # Entrypoint de React
│   │   ├── index.html            # Plantilla HTML con metadata comercial
│   │   ├── package.json          # Dependencias y scripts de admin
│   │   └── vite.config.js        # Configurado con base: '/admin/'
│   │
│   ├── ecommerce/                # Landing e-commerce de autor (Astro 4.x)
│   │   ├── src/
│   │   │   └── pages/
│   │   │       └── index.astro   # Catálogo de 10 variantes, modal y filtros
│   │   ├── astro.config.mjs      # Configurado con output: 'static'
│   │   └── package.json          # Dependencias de Astro
│   │
│   └── pwa/                      # Aplicación móvil progresiva (React 18 + Vite)
│       ├── public/
│       │   ├── manifest.json     # Metadatos PWA (nombre, iconos, colores)
│       │   ├── sw.js             # Service Worker para funcionamiento offline
│       │   ├── icon-192.svg      # Icono táctil móvil (192px)
│       │   └── icon-512.svg      # Icono splash de inicio (512px)
│       ├── src/
│       │   ├── App.jsx           # 4 Tabs (Menú, Ofertas, Ordenes, Perfil) y Checkout
│       │   ├── index.css         # Shell móvil, contenedor responsivo y tema claro
│       │   └── main.jsx          # Entrypoint de React
│       ├── index.html            # Metatags PWA y registro del Service Worker
│       ├── package.json          # Dependencias de PWA
│       └── vite.config.js        # Configurado con base: '/app/'
│
├── server/                       # Backend unificado (Node.js + Express)
│   ├── src/
│   │   ├── routes/
│   │   │   └── api.js            # Controladores REST (/products, /orders, /metrics, /health)
│   │   ├── app.js                # Servidor HTTP Express y distribución estática
│   │   └── db.js                 # Abstracción MySQL / In-Memory y datos semilla
│   └── package.json              # Dependencias del servidor (express, mysql2, cors)
│
├── .gitignore                    # Reglas de exclusión para Git
├── Dockerfile                    # Multi-stage Dockerfile para producción / Dokploy
├── package.json                  # Scripts globales de orquestación del monorepo
└── README.md                     # Documentación técnica integral
```

---

## 🛠️ Endpoints de la API REST

Todos los endpoints se encuentran prefijados bajo la ruta `/api`:

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/health` | Estado del servidor, tiempo de actividad, latencia y modo de conexión DB. |
| `GET` | `/api/products` | Lista las 10 hamburguesas disponibles con insignias y precios. |
| `GET` | `/api/products/:id` | Obtiene el detalle técnico y nutricional de una hamburguesa. |
| `POST` | `/api/products` | Registra una nueva hamburguesa en el inventario. |
| `PATCH` | `/api/products/:id/stock` | Modifica las existencias (`stock`) de una variante. |
| `DELETE` | `/api/products/:id` | Elimina un producto del catálogo. |
| `GET` | `/api/customers/metrics` | Retorna KPIs, segmentación de consumidores y ranking de consumo. |
| `GET` | `/api/orders` | Lista las órdenes de compra simuladas en el sistema. |
| `POST` | `/api/orders` | Crea una nueva orden, descuenta stock e inicia el tracking. |
| `POST` | `/api/reset` | Restablece los datos demo iniciales de Hamburger Rapid. |

#### Ejemplo: Crear Pedido (`POST /api/orders`)
```json
{
  "customerName": "Carlos Mendoza",
  "customerPhone": "+51 987 654 321",
  "items": [
    { "id": 1, "name": "Rey de las Burgers", "quantity": 2, "price": 14.99 },
    { "id": 3, "name": "Burger Real Doble", "quantity": 1, "price": 12.50 }
  ],
  "total": 42.48,
  "paymentMethod": "Tarjeta de Crédito / Débito",
  "deliveryAddress": "Av. Javier Prado Este 2450, Dpto 802, Lima"
}
```

---

## 💻 Guía de Instalación y Ejecución Local

### Prerrequisitos
* **Node.js**: Versión 18.x o 20.x LTS recomendada.
* **npm**: Versión 9.x o superior.
* *(Opcional)* Instancia local de **MySQL 8.0** (si no se dispone de una, la aplicación utilizará automáticamente el modo *In-Memory*).

### 1. Clonar el Repositorio
```bash
git clone https://github.com/LuisVergara79/Laboratorio01.git
cd Laboratorio01
```

### 2. Instalar Dependencias de Todas las Capas
El script raíz orquesta la instalación en los 4 proyectos (`apps/ecommerce`, `apps/pwa`, `apps/admin`, `server`):
```bash
npm run install:all
```

### 3. Compilar los Artefactos Frontend
Genera las versiones de producción de Astro y Vite, sincronizándolas automáticamente dentro del directorio `server/public`:
```bash
npm run build:all
```

### 4. Iniciar el Servidor Unificado
```bash
npm start
```

### 5. URLs de Acceso Local
Una vez iniciado el servidor en el puerto `3000`:
* 🌐 **Landing E-Commerce**: [http://localhost:3000/](http://localhost:3000/)
* 📱 **PWA Móvil**: [http://localhost:3000/app/](http://localhost:3000/app/)
* ⚙️ **Panel Administrativo**: [http://localhost:3000/admin/](http://localhost:3000/admin/)
* 🩺 **Diagnóstico de Salud (Health)**: [http://localhost:3000/api/health](http://localhost:3000/api/health)
* 🍔 **Catálogo JSON**: [http://localhost:3000/api/products](http://localhost:3000/api/products)

---

## 📜 Scripts Disponibles en `package.json`

| Comando | Acción Realizada |
|---|---|
| `npm run install:all` | Instala dependencias en `apps/ecommerce`, `apps/pwa`, `apps/admin` y `server`. |
| `npm run build:ecommerce` | Compila la landing estática con Astro (`apps/ecommerce/dist`). |
| `npm run build:pwa` | Compila la aplicación PWA con Vite (`apps/pwa/dist`). |
| `npm run build:admin` | Compila el dashboard administrativo con Vite (`apps/admin/dist`). |
| `npm run build:all` | Ejecuta las 3 compilaciones y copia los artefactos en `server/public/`. |
| `npm run server` | Inicia el backend Node.js en modo de ejecución directa. |
| `npm start` | Alias estándar para arrancar la plataforma en producción. |

---

## ⚙️ Variables de Entorno

Si deseas conectar el backend a una base de datos MySQL en desarrollo o producción, crea un archivo `.env` en la raíz o en la carpeta `server/`:

```env
# Puerto del servidor web
PORT=3000

# Entorno de ejecución
NODE_ENV=production

# Parámetros de conexión a MySQL
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password_seguro
DB_NAME=hamburger_rapid_db

# Alternativa mediante URL de conexión (Cloud / Dokploy)
# DATABASE_URL=mysql://root:password@mysql-host:3306/hamburger_rapid_db
```

> **Nota de Resiliencia**: Si ninguna de las variables de base de datos está configurada, el sistema entra en **modo In-Memory** automáticamente, permitiendo demostraciones comerciales sin caídas de servicio.

---

## 🐳 Despliegue con Docker y Dokploy

El proyecto incluye un `Dockerfile` optimizado en **4 etapas de compilación multi-stage** (*Multi-Stage Build*):
1. **Etapa 1**: Construye los estáticos de Astro (`apps/ecommerce`).
2. **Etapa 2**: Construye los estáticos de la PWA (`apps/pwa`).
3. **Etapa 3**: Construye el Dashboard (`apps/admin`).
4. **Etapa 4**: Imagen ligera basada en `node:20-alpine` que instala sólo las dependencias de producción del servidor backend y sirve las 3 aplicaciones.

### Construir y Ejecutar el Contenedor Localmente
```bash
# Construir la imagen Docker
docker build -t hamburger-rapid:1.0 .

# Ejecutar el contenedor exponiendo el puerto 3000
docker run -d -p 3000:3000 --name hamburger-rapid-app hamburger-rapid:1.0
```

### Despliegue en Dokploy CI/CD
1. Conecta este repositorio en tu panel de **Dokploy**.
2. Selecciona **Docker** como método de construcción.
3. Asigna las variables de entorno de tu base de datos (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
4. Configura el puerto de escucha en `3000` y habilita el Health Check apuntando a `/api/health`.

---

## 🎨 Sistema de Diseño y Referencia Visual

### Estilo Visual del Landing E-Commerce (`apps/ecommerce`)
La capa pública de aterrizaje comercial adopta fielmente la composición visual, paleta de colores y componentes interactivos referenciados en **`assets-references\imagenes\imagen001.jpg`**:

* **Fondo Base (Dark Theme)**: `#070708` / `#000000` con resplandor radial cálido (`rgba(255, 183, 3, 0.15)`).
* **Superficies y Tarjetas de Producto**: `#141417` con bordes sutiles `#242429` y sombras profundas.
* **Acento Principal (Cheddar Gold)**: `#ffb703` / `#f59e0b` (utilizado en el titular `"FAST & FRESH"`, precios, insignias, botones píldora `ORDER NOW` y botones de adición circular `+`).
* **Barra Flotante de Categorías**: Card flotante en blanco `#ffffff` con elevación y micro-interacciones al pasar el cursor.
* **Banner de Promoción**: Card de impacto en `#ffb703` con reloj analógico, código de cupón `WELCOME20` y repartidor en scooter.
* **Tipografías**:
  * *Montserrat* (ExtraBold / Black) para titulares comerciales de alto impacto.
  * *Plus Jakarta Sans* para legibilidad óptima en descripciones y metadata.
  * *Caveat* (Script) para frases insignia de autor (*"Cravings, Satisfied"* y *"Popular Picks"*).

### Estilo de las Capas Internas (PWA Móvil & Dashboard Admin)
Las capas operativas (`apps/pwa` y `apps/admin`) mantienen su paleta funcional clara y artesanal:
* **Lienzo**: `#fbf9f5` / `#ffffff` con sombras tenues.
* **Acentos**: Terracota `#c2410c` y ámbar curado `#b45309`.
* **Tipografía**: `#1c1917` (espresso) y `#57534e` (cálido neutro).

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT** — Libre para propósitos académicos, demostrativos y comerciales.
