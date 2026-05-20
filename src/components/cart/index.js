import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { WHATSAPP_NUMBER } from "../../config/whatsapp";
import { getCategoryList } from "../../data/menu";

const Cart = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { cartItems, addToCart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    setMounted(true);
    const cats = getCategoryList();
    setCategories(cats);
    if (cats.length > 0) {
      setSelectedCategoryId(cats[0].id);
    }
  }, []);

  const handleAddProduct = (product, quantity = 1) => {
    addToCart({
      ...product,
      harga_akhir: product.harga,
      quantity,
    });
    
    setSelectedQuantities((prev) => ({
      ...prev,
      [product.id]: 0,
    }));
  };

  const handleSendToWhatsApp = () => {
    if (cartItems.length === 0) {
      alert("Keranjang kosong!");
      return;
    }

    let message = "Halo, saya ingin memesan:\n\n";
    cartItems.forEach((item) => {
      const price = item.harga_akhir || item.harga;
      message += `${item.title}\n`;
      if (item.description) message += `Deskripsi: ${item.description}\n`;
      message += `Harga: Rp ${price.toLocaleString()}\n`;
      message += `Jumlah: ${item.quantity}\n`;
      message += `Subtotal: Rp ${(price * item.quantity).toLocaleString()}\n\n`;
    });

    const total = getTotalPrice();
    message += `—————————————————\n`;
    message += `TOTAL: Rp ${total.toLocaleString()}\n`;
    message += `—————————————————`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    clearCart();
    onClose();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Keranjang kosong!");
      return;
    }

    router.push("/checkout");
    onClose();
  };

  if (!isOpen) return null;
  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-end lg:items-center justify-end lg:justify-center transition-opacity duration-300 ${isOpen ? 'bg-black bg-opacity-50' : 'pointer-events-none'}`}>
      <div className="bg-white w-full lg:w-[1100px] h-screen lg:h-auto max-h-screen lg:max-h-[92vh] rounded-t-lg lg:rounded-lg shadow-2xl flex flex-col overflow-hidden\">
        {/* Header */}
        <div className="bg-logo-color text-white p-3 sm:p-4 lg:p-5 flex items-center justify-between rounded-t-lg lg:rounded-t-none shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Pilih Menu</h2>
            <p className="text-xs sm:text-sm text-white/70">Pesanan: {cartItems.length}</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl hover:text-gray-200 transition"
          >
            ×
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* Left: Category Buttons */}
          <div className="hidden lg:flex lg:flex-col lg:w-32 bg-gray-100 border-r border-gray-300 overflow-y-auto p-2">
            <div className="p-3 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`w-full text-left px-2 py-2 rounded text-sm font-medium transition ${
                    selectedCategoryId === cat.id
                      ? "bg-logo-color text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Top: Category Dropdown (Mobile) */}
          <div className="lg:hidden bg-white border-b border-gray-300 p-2.5 sm:p-3 lg:p-4">
            <select
              value={selectedCategoryId || ""}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-logo-color focus:border-logo-color"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Center: Menu Items */}
          <div className="flex-1 overflow-y-auto bg-white p-2 sm:p-3 lg:p-4 border-r border-gray-200">
            {selectedCategoryId && categories.find(c => c.id === selectedCategoryId) && (
              <div className="space-y-2 lg:space-y-3">
                {categories
                  .find(c => c.id === selectedCategoryId)
                  ?.items.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200 hover:border-logo-color hover:shadow-md transition flex gap-2 sm:gap-3"
                    >
                      {/* Product Image */}
                      <div className="shrink-0 w-16 sm:w-20 h-16 sm:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={product.image || "/default-product.png"}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info and Actions */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base truncate">
                            {product.title}
                          </h4>
                          <p className="text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1 line-clamp-1">
                            {product.description}
                          </p>
                          <p className="text-logo-color font-bold text-xs sm:text-sm lg:text-base mt-1 sm:mt-2">
                            Rp {product.harga.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={selectedQuantities[product.id] || 1}
                            onChange={(e) =>
                              setSelectedQuantities((prev) => ({
                                ...prev,
                                [product.id]: parseInt(e.target.value) || 1,
                              }))
                            }
                            className="w-10 sm:w-12 px-1.5 sm:px-2 py-0.5 sm:py-1 border border-gray-300 rounded text-xs text-center"
                          />
                          <button
                            onClick={() =>
                              handleAddProduct(
                                product,
                                selectedQuantities[product.id] || 1
                              )
                            }
                            className="flex-1 bg-logo-color hover:bg-logo-color/90 text-white font-bold px-2 sm:px-3 py-1 sm:py-2 rounded text-xs lg:text-sm transition"
                          >
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Cart Summary Sidebar */}
          <div className="lg:w-80 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 lg:p-4 space-y-2 sm:space-y-3">
              <h3 className="font-bold text-gray-800 text-base sm:text-lg sticky top-0 bg-white py-2 sm:py-3 border-b-2 border-logo-color px-0.5">
                Pesanan Saya ({cartItems.length})
              </h3>

              {cartItems.length === 0 ? (
                <div className="text-center py-6 sm:py-8 lg:py-12">
                  <p className="text-gray-500 text-xs sm:text-sm">Keranjang kosong</p>
                  <p className="text-gray-400 text-xs mt-1 sm:mt-2">Pilih menu untuk memulai</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200 hover:border-logo-color hover:shadow-sm transition"
                    >
                      <div className="flex justify-between items-start mb-1.5 sm:mb-2">
                        <h4 className="font-semibold text-gray-800 text-xs sm:text-sm flex-1 line-clamp-2">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-base sm:text-lg font-bold ml-1 hover:bg-red-50 rounded w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center transition shrink-0"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <p className="text-logo-color font-bold text-xs sm:text-sm">
                          Rp {(item.harga_akhir || item.harga).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center justify-between bg-gray-50 rounded p-1.5 sm:p-2 border border-gray-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="bg-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-gray-400 transition font-bold text-xs sm:text-sm"
                        >
                          −
                        </button>
                        <span className="font-semibold text-xs w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="bg-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-gray-400 transition font-bold text-xs sm:text-sm"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-right text-xs text-logo-color font-bold mt-1.5 sm:mt-2">
                        Rp {((item.harga_akhir || item.harga) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Total and Actions */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-3 sm:p-4 lg:p-5 space-y-2.5 sm:space-y-3 lg:space-y-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="flex justify-between items-center font-bold text-sm sm:text-lg bg-white p-2.5 sm:p-3 lg:p-4 rounded-lg border-2 border-logo-color">
                  <span className="text-gray-800 text-sm sm:text-base">Total:</span>
                  <span className="text-logo-color text-base sm:text-xl">
                    Rp {getTotalPrice().toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={authLoading}
                  className="w-full bg-logo-color hover:bg-logo-color/90 text-white font-bold py-2 sm:py-2.5 lg:py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm lg:text-base shadow-md"
                >
                  {authLoading ? "Loading..." : "Checkout"}
                </button>

                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-2.5 lg:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition duration-200 text-xs sm:text-sm lg:text-base shadow-md"
                >
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.364-3.905 6.75-1.896 10.217 1.331 2.264 3.897 3.764 6.662 3.764h.006c1.211 0 2.372-.244 3.477-.677l.129-.061 3.282.860-.877-3.21.06-.124a9.864 9.864 0 001.623-5.894c-.001-5.45-4.436-9.884-9.888-9.884" />
                  </svg>
                  Pesan via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
