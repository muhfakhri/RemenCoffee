
import "@/styles/globals.css";
import NextNProgress from 'nextjs-progressbar';
import MaintenancePage from '../components/MaintenancePage';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    return <MaintenancePage />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height="3"
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}