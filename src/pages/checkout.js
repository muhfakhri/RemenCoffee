import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

export default function Checkout() {
  const router = useRouter();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.user_metadata.full_name,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (cartItems.length === 0 && !loading) {
      router.push("/");
    }
  }, [cartItems, loading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logo-color mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (cartItems.length === 0) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      alert("Semua field harus diisi!");
      return;
    }

    setLoading(true);

    try {
      // Save order to database
      const orderItems = cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.harga_akhir || item.harga,
      }));

      const { error } = await supabase.from("orders").insert([
        {
          user_id: user.id,
          customer_name: formData.fullName,
          customer_phone: formData.phone,
          customer_address: formData.address,
          customer_city: formData.city,
          notes: formData.notes,
          items: orderItems,
          total_price: getTotalPrice(),
          status: "pending",
        },
      ]);

      if (error) throw error;

      clearCart();
      alert("Pesanan berhasil dibuat!");
      router.push("/");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Gagal membuat pesanan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="mb-6 text-logo-color hover:text-logo-color/80 font-semibold flex items-center gap-2"
        >
          ← Kembali
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cartItems.map((item) => {
                const price = item.harga_akhir || item.harga;
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-start border-b pb-4"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {item.quantity}x Rp {price.toLocaleString()}
                      </p>
                    </div>
                    <p className="font-semibold text-logo-color">
                      Rp {(price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800 font-semibold">
                  Rp {getTotalPrice().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-logo-color">
                <span>Total:</span>
                <span>Rp {getTotalPrice().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-logo-color focus:border-transparent"
                  placeholder="Nama lengkap Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-logo-color focus:border-transparent"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Alamat
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-logo-color focus:border-transparent"
                  placeholder="Jalan, nomor rumah, RT/RW"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kota
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-logo-color focus:border-transparent"
                  placeholder="Nama kota"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catatan Pesanan (Opsional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-logo-color focus:border-transparent"
                  placeholder="Tambahkan catatan untuk pesanan Anda"
                  rows={2}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-logo-color hover:bg-logo-color/90 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Memproses..." : "Selesaikan Pesanan"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
