# 📸 Screenshots Guide - Remen Coffee

Ikuti panduan ini untuk menambahkan screenshots ke README.md

## Folder Structure

Semua screenshots harus disimpan di:
```
/public/screenshots/
```

## Screenshots yang Diperlukan

### 1. Homepage (`homepage.png`)
**Ukuran**: 1280x720 (16:9) atau lebih besar

**Cara ambil:**
- Buka aplikasi di `http://localhost:3000`
- Screenshot area hero section + menu unggulan
- Jangan include navbar sepenuhnya, fokus ke content

**Content yang harus ada:**
- Hero section
- Menu Unggulan slider
- 2-3 featured products

---

### 2. Menu & Cart (`menu-cart.png`)
**Ukuran**: 1280x720

**Cara ambil:**
- Klik tombol Cart di navbar
- Screenshot modal cart dengan:
  - Category dropdown/tabs
  - Product list dengan images
  - Cart sidebar

**Content yang harus ada:**
- Product cards dengan images
- Quantity controls
- Cart items list
- Checkout button

---

### 3. Login Form (`login-modal.png`)
**Ukuran**: 800x600

**Cara ambil:**
- Klik "Menu" dropdown di navbar
- Klik "Login"
- Screenshot modal login

**Content yang harus ada:**
- Email input
- Password input
- Login button
- Link ke register

---

### 4. Register Form (`register-modal.png`)
**Ukuran**: 800x600

**Cara ambil:**
- Klik "Menu" dropdown
- Klik "Register"
- Screenshot modal register

**Content yang harus ada:**
- Nama Lengkap input
- Email input
- Password input
- Register button
- Link ke login

---

### 5. Checkout Page (`checkout.png`)
**Ukuran**: 1280x800

**Cara ambil:**
- Login terlebih dahulu
- Tambah produk ke cart
- Klik "Checkout"
- Screenshot form checkout

**Content yang harus ada:**
- Order summary
- Delivery form (nama, phone, address, city, notes)
- Total harga
- Submit button

---

### 6. Mobile Homepage (`mobile-homepage.png`)
**Ukuran**: 375x812 (iPhone SE resolution)

**Cara ambil:**
- Buka DevTools (F12)
- Set to iPhone SE
- Screenshot full homepage
- Termasuk navbar, hero, products

---

### 7. Mobile Menu (`mobile-menu.png`)
**Ukuran**: 375x812

**Cara ambil:**
- Mobile view
- Klik cart button
- Screenshot modal
- Termasuk dropdown, products, cart

---

### 8. Mobile Checkout (`mobile-checkout.png`)
**Ukuran**: 375x812

**Cara ambil:**
- Mobile view
- Login → tambah product → checkout
- Screenshot form

---

## Cara Mengambil Screenshots

### Menggunakan Chrome DevTools:
1. Buka aplikasi di Chrome
2. Press `F12` untuk buka DevTools
3. Untuk desktop: Press `Ctrl+Shift+P` (Cmd+Shift+P di Mac)
4. Ketik `Screenshot` dan pilih:
   - "Capture area" - untuk area tertentu
   - "Capture full page" - untuk seluruh page
5. Simpan ke `/public/screenshots/`

### Menggunakan Mac:
- Press `Cmd+Shift+4` untuk screenshot area
- Simpan ke `/public/screenshots/`

### Menggunakan Windows:
- Press `PrintScreen` atau `Shift+PrintScreen`
- Paste ke Paint/Snipping Tool
- Simpan ke `/public/screenshots/`

---

## Update README.md

Setelah simpan screenshots, update README.md dengan paths:

```markdown
### 🏠 Homepage
![Homepage](./public/screenshots/homepage.png)

### 🛒 Menu & Shopping Cart
![Menu & Cart](./public/screenshots/menu-cart.png)

### 🔐 Authentication
![Login](./public/screenshots/login-modal.png)
![Register](./public/screenshots/register-modal.png)

### 💳 Checkout
![Checkout](./public/screenshots/checkout.png)

### 📱 Mobile View
![Mobile Homepage](./public/screenshots/mobile-homepage.png)
![Mobile Menu](./public/screenshots/mobile-menu.png)
![Mobile Checkout](./public/screenshots/mobile-checkout.png)
```

---

## File Naming Convention

- Use kebab-case (lowercase, hyphen untuk spaces)
- Jangan gunakan spaces atau special characters
- Contoh yang benar:
  - ✅ `homepage.png`
  - ✅ `menu-cart-desktop.png`
  - ✅ `mobile-checkout.png`
  - ❌ `Home Page.png`
  - ❌ `Menu&Cart.png`

---

## Tips untuk Screenshot yang Bagus

1. **Lighting**: Gunakan theme default (light mode)
2. **Cleanliness**: Jangan ada error atau console warnings
3. **Full Content**: Pastikan semua content terlihat
4. **No Watermarks**: Jangan ada watermark atau system bars
5. **Consistent Size**: Desktop screenshots 1280px wide, mobile 375px wide

---

## Checklist

- [ ] Homepage screenshot (`homepage.png`)
- [ ] Menu & Cart screenshot (`menu-cart.png`)
- [ ] Login modal screenshot (`login-modal.png`)
- [ ] Register modal screenshot (`register-modal.png`)
- [ ] Checkout page screenshot (`checkout.png`)
- [ ] Mobile homepage screenshot (`mobile-homepage.png`)
- [ ] Mobile menu screenshot (`mobile-menu.png`)
- [ ] Mobile checkout screenshot (`mobile-checkout.png`)
- [ ] Update README.md dengan image paths
- [ ] Verify all paths bekerja

---

**Keterangan:**
Setelah semua screenshots sudah di-upload dan README.md sudah diupdate, dokumentasi akan menjadi lebih visual dan user-friendly!

Happy screenshotting! 📸
