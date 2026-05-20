function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://remen-coffee.com/</loc>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
     </url>
     <url>
       <loc>https://remen-coffee.com/login</loc>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
     <url>
       <loc>https://remen-coffee.com/register</loc>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}

export default function Sitemap() {}
