// filepath: /c:/Users/nurfa/OneDrive/Documents/A_CODING/nextjs/tefa-mp/src/pages/index.js
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import Footer from '../components/Footer';
import Contact from '../components/contact';
import Product from '@/components/product';
import Cart from '@/components/cart';
import { About, ChatWidget, Kerjasama, TopButton } from '@/components';
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';
import IklanBaner from '../components/BannerSlider'


const aboutVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const kerjasamaVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const productVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [aboutRef, aboutControls] = useScrollAnimation(aboutVariants);
  const [kerjasamaRef, kerjasamaControls] = useScrollAnimation(kerjasamaVariants);
  const [productRef, productControls] = useScrollAnimation(productVariants);

  return (
    <div>
      <Head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* SEO Meta Tags */}
        <title>Remen Coffee - Premium Coffee & Quality Kopi Indonesia</title>
        <meta name="description" content="Remen Coffee menyediakan kopi premium berkualitas tinggi dengan harga terjangkau. Pesan online atau kunjungi toko kami untuk kopi terbaik, espresso, dan specialty coffee." />
        <meta name="keywords" content="kopi premium, coffee shop, kopi Indonesia, specialty coffee, remen coffee" />
        <meta name="author" content="Remen Coffee" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://remen-coffee.com/" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Remen Coffee - Premium Coffee & Quality Kopi Indonesia" />
        <meta property="og:description" content="Remen Coffee - Kopi premium berkualitas tinggi dengan harga terjangkau. Pesan online sekarang!" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://remen-coffee.com/" />
        <meta property="og:site_name" content="Remen Coffee" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Remen Coffee - Premium Coffee & Quality Kopi Indonesia" />
        <meta name="twitter:description" content="Remen Coffee - Kopi premium berkualitas tinggi dengan harga terjangkau" />
        <meta name="twitter:image" content="/og-image.png" />
        
        {/* Favicon & Theme */}
        <link rel="icon" href="/logo_remen.svg" type="image/svg+xml"/>
        <link rel="apple-touch-icon" href="/logo_remen.svg" />
        <meta name="theme-color" content="#8B4513" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CoffeeShop',
              name: 'Remen Coffee',
              url: 'https://remen-coffee.com',
              logo: 'https://remen-coffee.com/logo_remen.svg',
              image: '/og-image.png',
              description: 'Premium coffee shop dengan kopi berkualitas tinggi dan harga terjangkau',
              sameAs: [
                'https://www.instagram.com/remencoffee',
                'https://www.facebook.com/remencoffee',
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ID',
                addressLocality: 'Indonesia',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: ['id', 'en'],
              },
              priceRange: 'Rp 15,000 - Rp 75,000',
            }),
          }}
        />
      </Head>
      <main>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <ChatWidget isCartOpen={isCartOpen} />
        <Hero /> 
        <br /> <br /> <br />
        <div className="relative z-40 h-[20px]">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 translate-y-[-90%]  px-6 py-41 rounded-xl  max-w-xl w-full text-center transform transition-all ">
        <IklanBaner />
    
  </div>
</div>

        <motion.div
          id="about"
          ref={aboutRef}
          initial="hidden"
          animate={aboutControls}
          variants={aboutVariants}
        >
          <About />
        </motion.div>
        <br /> <br /> <br />
        <motion.div
          id="kerjasama"
          ref={kerjasamaRef}
          initial="hidden"
          animate={kerjasamaControls}
          variants={kerjasamaVariants}
        >
          <Kerjasama />
        </motion.div>
        <br /> <div id='layanan' /><br /> <br /><br /> <br /> <br />
        <motion.div
          ref={productRef}
          initial="hidden"
          animate={productControls}
          variants={productVariants}
        >
          <Product />
        </motion.div>
        <br /> <div id='contact' /> <br /> <br /> <br /> <br /> <br />
        <Contact />
        <TopButton isCartOpen={isCartOpen} />
        <Footer />
      </main>
    </div>
  );
}