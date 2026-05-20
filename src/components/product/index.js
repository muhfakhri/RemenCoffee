import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../supabaseClient";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Product = () => {
  const router = useRouter();
  const [bestSeller, setBestSeller] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [modalHarga, setModalHarga] = useState(null);
  const [modalHargaAkhir, setModalHargaAkhir] = useState(null);
  const [modalDiskon, setModalDiskon] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const [addedNotification, setAddedNotification] = useState(null);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    addToCart(product);
    setAddedNotification(product.title);
    setTimeout(() => setAddedNotification(null), 2000);
  };

  const openModal = (product) => {
    setModalContent(product.description);
    setModalTitle(product.title);
    setModalHarga(product.harga);
    setModalHargaAkhir(product.harga_akhir);
    setModalDiskon(!!product.id_diskon);
    setModalImage(product.image);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const closeAuthModal = () => setShowAuthModal(false);

  const scrollToMenuUnggulan = () => {
    const element = document.getElementById("menu-unggulan");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const updateItemsPerSlide = () => {
    const width = window.innerWidth;
    if (width >= 1024) setItemsPerSlide(3);
    else if (width >= 640) setItemsPerSlide(2);
    else setItemsPerSlide(1);
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % bestSeller.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + bestSeller.length) % bestSeller.length);



  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("produk").select("*").eq("status", "aktif");
      if (error) console.error("Supabase fetch error:", error);
      else {
        const formatted = data.map((p) => ({
          id: p.id,
          title: p.nama_produk,
          description: p.deskripsi,
          image: p.gambar,
          harga: p.harga,
          harga_akhir: p.harga_akhir,
          is_best_seller: p.is_best_seller,
          id_diskon: p.id_diskon,
        }));
        setBestSeller(formatted.filter((p) => p.is_best_seller));
        setOtherProducts(formatted.filter((p) => !p.is_best_seller));
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (bestSeller.length > 0) nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [bestSeller]);

  const visibleProducts = [];
  for (let i = 0; i < itemsPerSlide; i++) {
    const index = (currentIndex + i) % bestSeller.length;
    if (bestSeller[index]) visibleProducts.push(bestSeller[index]);
  }

  return (
    <div className="w-full px-4 text-center" id="menu-unggulan">
      {/* Notification Toast */}
      {addedNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          {addedNotification} ditambahkan ke keranjang
        </div>
      )}
      
      <div className="text-center mb-6 lg:mb-10">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-800 cursor-pointer hover:text-logo-color transition-colors" onClick={scrollToMenuUnggulan}>Menu Unggulan</h2>
      </div>

      {/* SLIDER */}
      <div className="relative flex items-center justify-center max-w-6xl mx-auto overflow-hidden">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 bg-logo-color text-white rounded-full shadow-md p-2 hover:bg-coklat-muda transition duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center justify-center gap-3 lg:gap-8 transition-all duration-500 select-none">
          {visibleProducts.map((product, index) => {
            const centerIndex = Math.floor(itemsPerSlide / 2);
            const isCenter = index === centerIndex;

            return (
              <div
                key={index}
                className={`
                  flex flex-col w-56 sm:w-64 lg:w-72 text-left px-2 sm:px-0
                  ${isCenter ? "opacity-100 scale-100" : "opacity-70 scale-95"}
                  transition-all duration-500 ease-in-out
                `}
              >
                <div className="overflow-hidden rounded-lg lg:rounded-xl bg-gray-50 flex justify-center items-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-32 sm:h-36 lg:h-44 object-contain"
                  />
                </div>
                <div className="mt-2 lg:mt-3">
                  <h5 className="text-base sm:text-lg lg:text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{product.title}</h5>
                  <div className="mb-2">
                    {product.id_diskon ? (
                      <>
                        <span className="text-gray-400 text-xs sm:text-sm line-through mr-2">
                          Rp {product.harga.toLocaleString()}
                        </span>
                        <span className="text-logo-color font-bold text-base sm:text-lg lg:text-lg">
                          Rp {product.harga_akhir.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="text-logo-color font-semibold text-base sm:text-lg lg:text-lg">
                        Rp {product.harga.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-1 lg:line-clamp-2">{product.description}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 lg:mt-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm transition text-white bg-logo-color hover:bg-coklat-muda"
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 bg-logo-color text-white rounded-full shadow-md p-2 hover:bg-coklat-muda transition duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {showAll && (
        <div className="max-w-6xl mx-auto mt-8 lg:mt-10 px-2 sm:px-4">
          <h3 className="font-semibold text-lg sm:text-xl text-gray-800 mb-4 lg:mb-6">Produk Lainnya</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-5">
            {otherProducts.map((product, index) => (
              <div key={index} className="flex flex-col text-left">
                <div className="overflow-hidden rounded-lg lg:rounded-xl bg-gray-50 flex justify-center items-center">
                  <img
                    className="w-full h-24 sm:h-28 lg:h-32 object-contain"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <div className="mt-1 lg:mt-2">
                  <h5 className="text-xs sm:text-sm font-bold mb-1 text-gray-800 truncate">{product.title}</h5>
                  <div className="mb-1 lg:mb-2">
                    {product.id_diskon ? (
                      <>
                        <span className="text-gray-400 text-xs line-through mr-1">
                          Rp {product.harga.toLocaleString()}
                        </span>
                        <span className="text-logo-color font-bold text-xs sm:text-sm lg:text-lg">
                          Rp {product.harga_akhir.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="text-logo-color font-semibold text-xs sm:text-sm lg:text-lg">
                        Rp {product.harga.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="text-xs sm:text-sm transition px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-white bg-logo-color hover:bg-coklat-muda"
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 lg:mt-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-logo-color text-white rounded-lg shadow hover:bg-coklat-muda transition"
        >
          {showAll ? "Less Product" : "More Product"}
        </button>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-3 sm:px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm p-4 sm:p-6 relative animate-fadeIn">
            <button
              onClick={closeAuthModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-logo-color transition"
            >
              ✕
            </button>

            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Silakan Login Terlebih Dahulu</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Anda harus login atau mendaftar untuk melanjutkan</p>
            </div>

            <div className="space-y-2 sm:space-y-3 flex flex-col">
              <button
                onClick={() => {
                  closeAuthModal();
                  router.push("/login");
                }}
                className="w-full bg-logo-color text-white py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-coklat-muda transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1" />
                </svg>
                Login
              </button>
              <button
                onClick={() => {
                  closeAuthModal();
                  router.push("/register");
                }}
                className="w-full border-2 border-logo-color text-logo-color py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-logo-color hover:text-white transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-3 sm:px-4 py-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md p-4 sm:p-5 relative animate-fadeIn my-4">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-logo-color transition"
            >
              ✕
            </button>

            <div className="flex justify-center items-center rounded-lg sm:rounded-xl mb-3 sm:mb-4">
              <img
                src={modalImage || "/default-image.jpg"}
                alt={modalTitle}
                className="max-h-40 sm:max-h-60 w-auto object-contain"
              />
            </div>

            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1">{modalTitle}</h3>
            <div className="mb-2">
              {modalDiskon ? (
                <>
                  <span className="text-gray-400 text-xs sm:text-sm line-through mr-2">
                    Rp {modalHarga.toLocaleString()}
                  </span>
                  <span className="text-logo-color font-extrabold text-base sm:text-xl">
                    Rp {modalHargaAkhir.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-logo-color font-semibold text-base sm:text-xl">
                  Rp {modalHarga?.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{modalContent}</p>

            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-5">
              <div className="flex flex-col text-left">
                <label className="text-xs sm:text-sm text-gray-700 mb-1 font-medium">Nama Anda</label>
                <input
                  type="text"
                  id="buyerName"
                  placeholder="Masukkan nama Anda"
                  className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:ring-2 focus:ring-logo-color outline-none"
                />
              </div>

              <div className="flex flex-col text-left">
                <label className="text-xs sm:text-sm text-gray-700 mb-1 font-medium">Jumlah Pesanan</label>
                <input
                  type="number"
                  id="orderQty"
                  placeholder="Masukkan jumlah"
                  min="1"
                  defaultValue="1"
                  onInput={(e) => {
                    const qty = parseInt(e.target.value || "1");
                    const basePrice = modalDiskon ? modalHargaAkhir : modalHarga;
                    const total = basePrice * qty;
                    document.getElementById("totalHarga").textContent =
                      "Rp " + total.toLocaleString();
                  }}
                  className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:ring-2 focus:ring-logo-color outline-none"
                />
              </div>

              <div className="flex flex-col text-left">
                <label className="text-xs sm:text-sm text-gray-700 mb-1 font-medium">Noted</label>
                <input
                  type="text"
                  id="note"
                  placeholder="Noted"
                  className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:ring-2 focus:ring-logo-color outline-none"
                />
              </div>
              

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3 text-center">
                <span className="text-gray-700 text-xs sm:text-sm">Total yang harus dibayar:</span>
                <p id="totalHarga" className="text-logo-color font-bold text-sm sm:text-lg mt-1">
                  Rp {((modalDiskon ? modalHargaAkhir : modalHarga) * 1).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={closeModal}
                className="w-1/2 border border-gray-300 rounded-lg py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 transition"
              >
                Batal
              </button>

              <button
                onClick={async () => {
                  if (!isAuthenticated) {
                    setShowAuthModal(true);
                    return;
                  }

                  const name = document.getElementById("buyerName").value.trim();
                  const note = document.getElementById("note").value.trim();
                  const qty = parseInt(document.getElementById("orderQty").value || "1");

                  if (!name || qty <= 0) {
                    alert("Harap isi nama dan jumlah pesanan!");
                    return;
                  }

                  const basePrice = modalDiskon ? modalHargaAkhir : modalHarga;
                  const total = basePrice * qty;

                  try {
                    const { data, error } = await supabase
                      .from("tentang_kami")
                      .select("whatsapp")
                      .limit(1)
                      .single();

                    if (error) {
                      console.error("❌ Gagal ambil nomor WhatsApp:", error.message);
                      alert("Tidak dapat mengambil nomor WhatsApp dari database.");
                      return;
                    }

                    const whatsapp = data?.whatsapp?.replace(/[^0-9]/g, "");
                    if (!whatsapp) {
                      alert("Nomor WhatsApp belum tersedia di database.");
                      return;
                    }

                    const pesan = `Halo, saya *${name}* ingin memesan *${modalTitle}* sebanyak *${qty}* pcs.%0A%0ATotal yang harus dibayar: *Rp ${total.toLocaleString()}*  noted *${note}*`;
                    const waUrl = `https://wa.me/${whatsapp}?text=${pesan}`;

                    window.open(waUrl, "_blank");

                  } catch (err) {
                    console.error("⚠️ Terjadi kesalahan:", err);
                    alert("Terjadi kesalahan saat mengirim pesan.");
                  }
                }}
                className="w-1/2 rounded-lg py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition bg-logo-color text-white hover:bg-coklat-muda"
              >
                Kirim ke WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
