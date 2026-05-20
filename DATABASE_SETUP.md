# Database Setup Guide

## Supabase Tables

### 1. Orders Table
```sql
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  notes TEXT,
  items JSONB NOT NULL,
  total_price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, confirmed, shipped, delivered, cancelled
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(id)
);

-- Index untuk performa query
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

### 2. Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users dapat hanya melihat order mereka sendiri
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Users dapat membuat order
CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admin/staff dapat update order (optional)
CREATE POLICY "Users can update their own orders"
  ON orders FOR UPDATE
  USING (auth.uid() = user_id);
```

## Environment Variables
Pastikan `.env.local` memiliki:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Fitur
- ✅ Checkout dengan autentikasi
- ✅ Form pengiriman detail
- ✅ Order history di database
- ✅ Cart persistent (localStorage)
- ✅ WhatsApp alternative

## Items Structure dalam JSONB
```json
[
  {
    "id": "product_id",
    "title": "Product Name",
    "quantity": 2,
    "price": 50000
  }
]
```
