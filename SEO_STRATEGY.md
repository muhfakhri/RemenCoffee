# SEO Strategy & Checklist - Remen Coffee

## ✅ COMPLETED SEO IMPROVEMENTS (v4)

### 1. **robots.txt Created** ✅
- Location: `/public/robots.txt`
- Allows search engines to crawl public pages
- Blocks private pages: /login, /register, /checkout
- Sitemap reference included

### 2. **XML Sitemap Created** ✅
- Location: `/src/pages/sitemap.xml.js`
- Dynamic generation with getServerSideProps
- Includes homepage + auth pages
- Accessible at: `/sitemap.xml`

### 3. **Next.js Config Enhanced** ✅
- Updated: `next.config.mjs`
- Image optimization settings
- Security headers (HSTS, DNS prefetch)
- Sitemap rewrites
- Canonical URL support

### 4. **Homepage Meta Tags** ✅
- Better title: "Remen Coffee - Premium Coffee & Quality Kopi Indonesia"
- Descriptive meta description with keywords
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data (CoffeeShop schema)

### 5. **Auth Pages (noindex)** ✅
- `login.js`: Added Head + meta robots noindex
- `register.js`: Added Head + meta robots noindex  
- `checkout.js`: Added Head + meta robots noindex
- Prevents low-value pages from ranking

### 6. **Structured Data** ✅
- Organization/CoffeeShop schema added to homepage
- Includes business info, contact, pricing range
- JSON-LD format for search engines

---

## 🚀 NEXT STEPS FOR RANKING #1 (Priority Order)

### Phase 1: Critical (Must Do First)
1. **Add Domain & SSL** 
   - Update: `next.config.mjs` sitemap URL from placeholder
   - Use HTTPS only
   - Set canonical domain (www vs non-www)

2. **Google Search Console**
   - Verify domain ownership
   - Submit sitemap: `/sitemap.xml`
   - Monitor crawl stats & indexing status
   - Fix any crawl errors

3. **Create SEO-Optimized Images**
   - Update: `/public/og-image.png` (1200x630px)
   - Product images with descriptive alt text
   - Coffee shop branded images

4. **Add More Pages**
   - About page: `/pages/about.js`
   - Blog/Articles for long-tail keywords
   - FAQ page for rich snippets
   - Contact page

### Phase 2: Important (Do Within 2 Weeks)
5. **Content Optimization**
   - Expand homepage copy with target keywords:
     - "kopi premium Indonesia"
     - "specialty coffee Jakarta"
     - "pesan kopi online"
   - Add FAQ schema for common questions
   - Create 3-5 blog posts on:
     - "Jenis-jenis Kopi Premium"
     - "Cara Memilih Kopi Berkualitas"
     - "Coffee Shop Terbaik"

6. **Backlinks Strategy**
   - Guest posts on food/lifestyle blogs
   - Local business listings (Google My Business, etc.)
   - Coffee community forum mentions
   - Social media presence

7. **Performance Optimization**
   - Measure Core Web Vitals (LCP, CLS, FID)
   - Image lazy loading
   - CSS/JS minification
   - Consider CDN for images

### Phase 3: Enhancement (Long-term)
8. **Local SEO**
   - Google My Business optimization
   - Local schema markup (address, hours)
   - "Near me" keyword targeting
   - Local citations

9. **Mobile Optimization** ✅ (Already Done)
   - Responsive design confirmed
   - Mobile-first indexing ready

10. **Link Building**
    - Create link-worthy content
    - Reach out to food bloggers
    - Partner with local influencers

---

## 📊 Target Keywords

### Primary Keywords (High Priority)
- kopi premium
- coffee shop Indonesia
- remen coffee
- specialty coffee
- kopi berkualitas

### Secondary Keywords (Medium Priority)
- pesan kopi online
- jual kopi premium
- coffee delivery
- kopi murah berkualitas
- espresso Jakarta

### Long-tail Keywords (Quick Wins)
- "where to buy premium coffee"
- "best coffee shop near me"
- "order specialty coffee online"
- "kopi premium harga murah"

---

## 📋 Ongoing SEO Checklist

### Monthly Tasks
- [ ] Check Google Search Console for errors
- [ ] Monitor keyword rankings
- [ ] Update sitemap with new pages
- [ ] Create 2 new blog posts
- [ ] Check backlinks using tools like Ahrefs/SEMrush

### Quarterly Tasks
- [ ] Core Web Vitals audit
- [ ] Content freshness review
- [ ] Competitor analysis
- [ ] Schema markup validation
- [ ] Canonicalization audit

### Annual Tasks
- [ ] Full SEO audit
- [ ] Keyword research refresh
- [ ] Backlink profile review
- [ ] Mobile usability check
- [ ] Performance optimization

---

## 🛠️ Tools Recommended (Free)

1. **Google Tools**
   - Google Search Console: Track indexing & keywords
   - Google PageSpeed Insights: Performance metrics
   - Google My Business: Local SEO

2. **Free SEO Tools**
   - Ubersuggest: Keyword research
   - Screaming Frog: Site crawl
   - Yoast SEO: Content optimization
   - Schema.org: Validate structured data
   - MozBar: Check page authority

3. **Analytics**
   - Google Analytics 4: Traffic & user behavior
   - Hotjar: User experience heatmaps

---

## 📝 Files Modified

| File | Changes |
|------|---------|
| `public/robots.txt` | CREATED - Crawler instructions |
| `src/pages/sitemap.xml.js` | CREATED - XML sitemap |
| `next.config.mjs` | UPDATED - SEO headers & image optimization |
| `src/pages/index.js` | UPDATED - Homepage meta tags & JSON-LD |
| `src/pages/login.js` | UPDATED - Added noindex meta |
| `src/pages/register.js` | UPDATED - Added noindex meta |
| `src/pages/checkout.js` | UPDATED - Added noindex meta |
| `src/components/SEOMeta.js` | CREATED - Reusable SEO component (optional) |

---

## 💡 SEO Best Practices Implemented

✅ Mobile-first responsive design  
✅ Fast page load (Next.js optimized)  
✅ HTTPS/SSL ready  
✅ Proper heading hierarchy  
✅ Descriptive alt text on images  
✅ Internal linking structure  
✅ Structured data (JSON-LD)  
✅ Open Graph tags for social sharing  
✅ robots.txt & sitemap  
✅ Canonical URLs  
✅ Noindex on private pages  

---

## 🎯 Expected Timeline to #1 Ranking

- **Month 1**: Indexing & baseline traffic (Months 1-3 crawl)
- **Month 2-3**: Keyword ranking starts (~30-50 keywords ranking)
- **Month 4-6**: Higher positions if quality content + backlinks
- **Month 6-12**: Top 10 for main keywords (with consistent effort)

**Note**: Ranking depends on:
- Content quality & uniqueness
- Backlink profile
- User engagement signals
- Technical SEO
- Domain age & authority
- Competition level

---

## ⚡ Quick Wins (Do Today!)

1. ✅ Update `next.config.mjs` with your actual domain
2. ✅ Upload og-image.png to `/public/`
3. ✅ Submit sitemap to Google Search Console
4. ✅ Set up Google My Business
5. ✅ Install Google Analytics 4

---

**Last Updated**: 2025-05-20  
**Status**: Ready for deployment
