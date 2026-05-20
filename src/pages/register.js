import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

export default function Register() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      alert("Daftar berhasil! Silakan login dengan akun Anda.");
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logo-color"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Daftar - Remen Coffee</title>
        <meta name="description" content="Daftar akun baru di Remen Coffee untuk mulai berbelanja kopi premium" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Daftar - Remen Coffee" />
        <meta property="og:description" content="Daftar akun baru" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Floating Logo Background */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-15 pointer-events-none"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 0),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 0),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 0),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 0),
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: 120 + i * 50,
              height: 120 + i * 50,
            }}
          >
            <img
              src="/logo_remen.png"
              alt="Remen Coffee Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
        
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition duration-200 flex items-center gap-1 text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Daftar</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-logo-color focus:border-transparent"
              placeholder="Nama lengkap Anda"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-logo-color focus:border-transparent"
              placeholder="Email Anda"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-logo-color focus:border-transparent"
              placeholder="Password Anda (min 6 karakter)"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-logo-color hover:bg-logo-color/90 text-white font-bold py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Daftar"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Sudah punya akun?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-logo-color hover:text-logo-color/80 font-semibold transition duration-200"
            >
              Login di sini
            </button>
          </p>
        </div>
      </div>
      </div>
    </>
  );
}
