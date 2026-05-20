import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

export default function Login() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      const redirect = router.query.redirect || "/checkout";
      router.push(redirect);
    }
  }, [loading, isAuthenticated, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const redirect = router.query.redirect || "/checkout";
      router.push(redirect);
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
        <title>Login - Remen Coffee</title>
        <meta name="description" content="Masuk ke akun Remen Coffee Anda untuk melanjutkan pemesanan" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Login - Remen Coffee" />
        <meta property="og:description" content="Masuk ke akun Anda" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Password Anda"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-logo-color hover:bg-logo-color/90 text-white font-bold py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Belum punya akun?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-logo-color hover:text-logo-color/80 font-semibold"
            >
              Daftar di sini
            </button>
          </p>
        </div>
      </div>
      </div>
    </>
  );
}