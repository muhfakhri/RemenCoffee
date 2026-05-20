import Head from 'next/head';

export default function SEOMeta({
  title = 'Remen Coffee - Premium Coffee Shop',
  description = 'Discover premium coffee at Remen Coffee. Fresh beans, quality products, fast delivery. Order online or visit our coffee shop today.',
  image = '/og-image.png',
  url = 'https://remen-coffee.com',
  type = 'website',
  noindex = false,
}) {
  const fullUrl = url.startsWith('http') ? url : `https://remen-coffee.com${url}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Robots Meta */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Remen Coffee" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#8B4513" />
      <link rel="icon" href="/logo_remen.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/logo_remen.svg" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CoffeeShop',
            name: 'Remen Coffee',
            url: 'https://remen-coffee.com',
            logo: 'https://remen-coffee.com/logo_remen.svg',
            description:
              'Premium coffee shop with fresh beans and quality products',
            sameAs: [
              'https://www.instagram.com/remencoffee',
              'https://www.facebook.com/remencoffee',
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Remen Coffee Store',
              addressLocality: 'Indonesia',
              addressCountry: 'ID',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+62-xxx-xxx-xxx',
              contactType: 'Customer Service',
            },
          }),
        }}
      />
    </Head>
  );
}
