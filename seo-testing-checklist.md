# SEO Testing Checklist

## Phase 2: Focused SEO Test Suite

### A. Google Rendering & Crawl Test

#### 1. Search Console URL Inspection
Test each key page using GSC URL Inspection tool:

**Homepage (`/`)**
- [ ] URL inspection shows "URL is not on Google" (expected for staging)
- [ ] Page can be indexed: YES
- [ ] User-declared canonical: `https://staging.reevestreeservices.co.uk/`
- [ ] Google-selected canonical: matches user-declared
- [ ] Crawl timestamp: within last 24 hours
- [ ] Page loading issues: NONE

**Gallery Page (`/our-work`)**  
- [ ] URL inspection successful
- [ ] All images load in rendered HTML
- [ ] Image gallery functionality works
- [ ] Lazy loading images detected
- [ ] No JavaScript errors in coverage

**Service Pages** (Test 2-3 key ones)
- [ ] `/commercial-services` - renders completely
- [ ] `/domestic-services` - all collapsible sections work
- [ ] Dynamic content loads properly
- [ ] Structured data appears in rendered HTML

#### 2. Screenshot Comparison
Use GSC screenshot feature:
- [ ] Homepage renders identically to live browser
- [ ] Navigation menu appears correctly
- [ ] Hero section background images load
- [ ] Contact forms are visible
- [ ] Footer content appears completely

#### 3. HTML Analysis
Review "View Crawled Page" HTML source:
- [ ] Complete HTML structure present
- [ ] All meta tags included in `<head>`
- [ ] Structured data JSON-LD blocks present
- [ ] No missing critical content
- [ ] Internal links are crawlable

---

### B. Structured Data Validation

#### 1. Schema.org Testing
Use [Rich Results Test](https://search.google.com/test/rich-results):

**Homepage**
- [ ] LocalBusiness schema detected
- [ ] Valid business hours
- [ ] Correct address/phone
- [ ] Service area defined
- [ ] No schema errors

**Service Pages**
- [ ] Service schema present
- [ ] Provider information correct
- [ ] Service type properly categorized
- [ ] No validation errors

#### 2. JSON-LD Validation
Manually check each structured data block:
- [ ] Valid JSON syntax
- [ ] Required properties present
- [ ] URLs resolve correctly
- [ ] Images accessible
- [ ] Contact info matches business details

---

### C. Performance & Core Web Vitals

#### 1. PageSpeed Insights
Test mobile and desktop for key pages:

**Homepage**
- [ ] Mobile Performance Score: >90
- [ ] Desktop Performance Score: >95
- [ ] LCP (Largest Contentful Paint): <2.5s
- [ ] FID (First Input Delay): <100ms
- [ ] CLS (Cumulative Layout Shift): <0.1

**Gallery Page**
- [ ] Image optimization working
- [ ] Lazy loading implemented
- [ ] Acceptable performance scores
- [ ] No layout shift from images

#### 2. GTmetrix Analysis
- [ ] Fully Loaded Time: <3s
- [ ] Total Page Size: <2MB
- [ ] HTTP/2 enabled
- [ ] Images optimized
- [ ] CSS/JS minified

---

### D. Mobile & Accessibility

#### 1. Mobile-Friendly Test
- [ ] Page is mobile-friendly (Google test)
- [ ] Touch elements properly sized
- [ ] Text readable without zooming
- [ ] No horizontal scrolling
- [ ] Viewport meta tag present

#### 2. Basic Accessibility
- [ ] Color contrast meets WCAG standards
- [ ] Images have alt attributes
- [ ] Headings in logical order (H1→H2→H3)
- [ ] Focus indicators visible
- [ ] Keyboard navigation works

---

## Success Criteria

### ✅ PASS - Ready for Production
- All GSC URL inspections successful
- No rendering differences vs. browser
- Structured data validates without errors
- Performance scores meet targets
- Mobile-friendly test passes
- No critical accessibility issues

### ⚠️ CONDITIONAL PASS - Consider Prerendering
- Minor rendering delays (>2s for complete render)
- Some dynamic content not in initial HTML
- Performance slightly below targets
- Complex JavaScript interactions

### ❌ FAIL - Requires Prerendering
- Critical content missing from rendered HTML
- JavaScript errors prevent proper rendering
- Structured data not appearing in crawled version
- Significant performance issues
- Mobile rendering problems

---

## Phase 3: Decision Matrix

| Issue | Severity | Solution |
|-------|----------|----------|
| Missing critical content in HTML | HIGH | Prerendering required |
| Slow initial render (>3s) | MEDIUM | Consider prerendering |
| Complex interactions not crawled | LOW | Monitor, may not need fix |
| Performance score 80-90 | MEDIUM | Optimize, then reassess |
| Minor structured data warnings | LOW | Fix in current setup |

**Decision Point:** If more than 2 HIGH or 4+ MEDIUM issues → Implement prerendering