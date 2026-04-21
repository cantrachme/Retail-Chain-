# ⚡ RetailChain — Enterprise Retail & Supply Chain Management System

![Python](https://img.shields.io/badge/Python-3.13-blue?style=for-the-badge&logo=python)
![Django](https://img.shields.io/badge/Django-6.0-darkgreen?style=for-the-badge&logo=django)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-336791?style=for-the-badge&logo=postgresql)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-red?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38BDF8?style=for-the-badge&logo=tailwindcss)

---

## 📌 Overview

**RetailChain** is a full-stack, production-grade Retail and Supply Chain Management System engineered to streamline the end-to-end operations of modern retail enterprises. Built on a robust **Django REST Framework** backend powered by **SQLAlchemy** as the ORM layer and a dynamic **React + Vite** frontend styled with **Tailwind CSS**, RetailChain delivers a seamless, high-performance interface for managing products, inventory, suppliers, orders, and deliveries — all from a single unified platform.

This system is architected with scalability, modularity, and maintainability at its core, making it an ideal foundation for businesses seeking operational transparency and supply chain efficiency.

---

## 🚀 Key Features

- 📊 **Real-Time Dashboard** — Instant visibility into all operational metrics including product counts, active orders, warehouse stock levels, and delivery statuses.
- 📦 **Product & Category Management** — Full lifecycle management of products with categorization, SKU tracking, pricing, and descriptions.
- 🏭 **Supplier Management** — Centralized registry of suppliers with contact information, enabling streamlined vendor communication.
- 🏬 **Inventory & Warehouse Control** — Multi-warehouse stock management with real-time quantity tracking and low-stock visual indicators.
- 🛒 **Order Processing** — End-to-end order creation and management with support for multi-item orders, status tracking, and user association.
- 🚚 **Delivery Tracking** — Comprehensive delivery lifecycle management with status updates, supplier linkage, and estimated delivery scheduling.
- 🌐 **RESTful API Architecture** — Clean, well-structured API endpoints built with Django REST Framework, ready for third-party integrations.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, React Router DOM |
| **Styling** | Tailwind CSS 4 |
| **Backend** | Django 6, Django REST Framework |
| **ORM** | SQLAlchemy 2.0 |
| **Database** | PostgreSQL 18 |
| **Language** | Python 3.13, JavaScript (ES2024) |
| **Package Manager** | pip, npm |

---

## 📁 Project Structure

```
RetailChain/
│
├── core/                        # Django project configuration
│   ├── settings.py              # Global settings & database config
│   ├── urls.py                  # Root URL routing
│   ├── database.py              # SQLAlchemy engine & session setup
│   ├── wsgi.py
│   └── asgi.py
│
├── users/                       # User management module
│   ├── models.py                # SQLAlchemy User model
│   ├── views.py                 # API views
│   ├── serializers.py           # DRF serializers
│   └── urls.py                  # Module URL routing
│
├── products/                    # Product & category module
├── suppliers/                   # Supplier management module
├── inventory/                   # Warehouse & stock module
├── orders/                      # Order & order items module
├── deliveries/                  # Delivery tracking module
│
├── frontend/                    # React + Vite frontend application
│   ├── src/
│   │   ├── components/
│   │   │   └── Sidebar.jsx      # Navigation sidebar
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── Suppliers.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── Deliveries.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
│
├── manage.py
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

Ensure the following are installed on your system:

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/cantrachme/Retail-Chain-.git
cd Retail-Chain-
```

### 2. Create & Activate Virtual Environment

```bash
# Windows
python -m venv env
.\env\Scripts\Activate.ps1

# macOS / Linux
python -m venv env
source env/bin/activate
```

### 3. Install Python Dependencies

```bash
pip install django sqlalchemy psycopg2-binary djangorestframework django-cors-headers
```

### 4. Configure PostgreSQL Database

Create a PostgreSQL database:

```sql
CREATE DATABASE ps_one_db;
```

Update `core/settings.py` with your credentials:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'ps_one_db',
        'USER': 'your_postgres_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

DATABASE_URL = "postgresql+psycopg2://your_postgres_user:your_password@localhost:5432/ps_one_db"
```

### 5. Initialize the Database Tables

```bash
python manage.py shell
```

```python
from core.database import Base, engine
from users.models import User
from products.models import Category, Product
from suppliers.models import Supplier
from inventory.models import Warehouse, Stock
from orders.models import Order, OrderItem
from deliveries.models import Delivery

Base.metadata.create_all(bind=engine)
print("✅ All tables created successfully!")
exit()
```

### 6. Apply Django Migrations

```bash
python manage.py migrate
```

### 7. Run the Django Backend

```bash
python manage.py runserver
```

Backend will be live at: `http://127.0.0.1:8000`

---

### 8. Install Frontend Dependencies & Run React

```bash
cd frontend
npm install
npm run dev
```

Frontend will be live at: `http://localhost:5173`

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET, POST | `/api/users/` | List & create users |
| POST | `/api/users/create/` | Create a new user |
| GET, POST | `/api/categories/` | List & create categories |
| GET, POST | `/api/products/` | List & create products |
| GET, POST | `/api/suppliers/` | List & create suppliers |
| GET, POST | `/api/warehouses/` | List & create warehouses |
| GET, POST | `/api/stock/` | List & manage stock |
| GET, POST | `/api/orders/` | List & create orders |
| GET, POST | `/api/order-items/` | List & create order items |
| GET, POST | `/api/deliveries/` | List & track deliveries |

---

## 📸 Application Modules

| Module | Description |
|--------|-------------|
| **Dashboard** | Aggregated overview of all system entities in real time |
| **Products** | SKU-based product registry with category association and pricing |
| **Categories** | Hierarchical product classification system |
| **Suppliers** | Vendor directory with contact and location details |
| **Inventory** | Multi-warehouse stock control with visual quantity indicators |
| **Orders** | Customer order management with itemized breakdowns and status tracking |
| **Deliveries** | End-to-end shipment tracking with supplier linkage and ETA management |

---

## 🔮 Roadmap

- [ ] JWT-based Authentication & Authorization
- [ ] Role-based Access Control (Admin, Manager, Staff)
- [ ] Password hashing with bcrypt
- [ ] Edit & Delete operations across all modules
- [ ] Analytics dashboard with Chart.js visualizations
- [ ] Environment variable management with `.env`
- [ ] Production deployment on Railway / Render
- [ ] API documentation with Swagger / ReDoc

---

> ⚠️ **Note:** This project is currently under active development. Features and configurations are subject to change as the system evolves toward production readiness.
