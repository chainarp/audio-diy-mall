#!/bin/bash
# Revised Shell script for creating the Audio DIY Mall project structure (v3)
# Based on Role-based Naming Conventions - With comment spacing fixed.

echo "🚀 Starting to build the project structure..."

# 1. App Directory (Routing based on Roles)
echo "Creating /app directory with role-based route groups..."
mkdir -p app/'(public)'/products/'[id]'
mkdir -p app/'(public)'/stores/'[slug]'
mkdir -p app/'(vendor)'/dashboard
mkdir -p app/'(vendor)'/products/new
mkdir -p app/'(vendor)'/settings
mkdir -p app/'(admin)'/dashboard
mkdir -p app/'(admin)'/stores
mkdir -p app/'(admin)'/users
mkdir -p app/'(account)'/orders
mkdir -p app/'(account)'/profile
mkdir -p app/api/products
mkdir -p app/api/stores
mkdir -p app/api/auth

# 2. Components Directory (UI)
echo "Creating /components directory with feature-based subfolders..."
mkdir -p components/ui
mkdir -p components/layout
mkdir -p components/features/product 
mkdir -p components/features/store  
mkdir -p components/features/vendor 
mkdir -p components/features/admin  
mkdir -p components/features/account # <-- Fixed the spacing here

# 3. Lib Directory (Shared Logic)
echo "Creating /lib directory..."
mkdir -p lib/api
mkdir -p lib/hooks
mkdir -p lib/utils
mkdir -p lib/validators

# 4. Public Directory (Static Assets)
echo "Creating /public directory..."
mkdir -p public/images
mkdir -p public/logos

# 5. Create placeholder files
echo "Creating placeholder files..."
touch app/layout.jsx
touch app/globals.css
touch app/'(public)'/not-found.jsx
touch app/'(public)'/page.jsx
touch app/'(public)'/products/'[id]'/page.jsx
touch app/'(public)'/stores/'[slug]'/page.jsx
touch app/'(vendor)'/dashboard/page.jsx
touch app/'(vendor)'/products/page.jsx
touch app/'(vendor)'/products/new/page.jsx
touch app/'(vendor)'/settings/page.jsx
touch app/'(admin)'/dashboard/page.jsx
touch app/api/products/route.js
touch app/api/stores/route.js
touch components/ui/Button.jsx
touch components/ui/Card.jsx
touch components/ui/Input.jsx
touch components/layout/Navbar.jsx
touch components/layout/Footer.jsx
touch components/features/product/ProductCard.jsx
touch components/features/product/ProductList.jsx
touch components/features/vendor/VendorProductTable.jsx
touch components/features/vendor/ProductForm.jsx
touch components/features/admin/AdminStoreTable.jsx
touch lib/types.ts
touch .env.local
touch .gitignore
touch README.md
touch jsconfig.json
touch tailwind.config.js
touch postcss.config.js
touch package.json

echo "✅ Done! Project structure created successfully."
echo "Apologies for the previous error. This version is correct. ✨"