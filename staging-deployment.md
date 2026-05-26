# Staging Deployment Guide

## Phase 1: Deploy Staging with Safe Indexing

### Prerequisites
- [x] SEO component updated with staging detection
- [x] robots-staging.txt created
- [ ] Staging subdomain DNS configured
- [ ] SSL certificate for staging domain

### 1. Set Up Staging Environment

#### A. DNS Configuration
```dns
# Add these DNS records for your staging subdomain:
staging.reevestreeservices.co.uk  CNAME  your-hosting-provider.com
```

#### B. Environment Variables
```bash
# Set these in your staging environment:
NODE_ENV=staging
VITE_STAGING_MODE=true
```

#### C. Build Configuration
```bash
# Build for staging
npm run build

# Copy staging robots.txt
cp public/robots-staging.txt dist/robots.txt
```

### 2. Deployment Checklist

#### Pre-Deployment
- [ ] Verify staging domain points to correct server
- [ ] SSL certificate installed and working
- [ ] Environment variables configured
- [ ] robots-staging.txt copied to public root as robots.txt

#### Post-Deployment Verification
- [ ] Site loads at staging.reevestreeservices.co.uk
- [ ] Check meta robots tags show "noindex, nofollow, noarchive"
- [ ] Verify /robots.txt shows "Disallow: /"
- [ ] All pages render without JavaScript errors
- [ ] All routes work correctly

### 3. Search Console Setup

#### A. Add Staging Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://staging.reevestreeservices.co.uk`
3. Verify ownership (HTML file method recommended)

#### B. Submit Test URLs
```bash
# Test these key pages in GSC URL Inspection:
https://staging.reevestreeservices.co.uk/
https://staging.reevestreeservices.co.uk/our-work
https://staging.reevestreeservices.co.uk/commercial-services
https://staging.reevestreeservices.co.uk/domestic-services
```

### 4. Safety Verification

Run these checks to ensure staging won't be indexed:

```bash
# Check robots.txt
curl https://staging.reevestreeservices.co.uk/robots.txt

# Check meta robots on homepage
curl -s https://staging.reevestreeservices.co.uk/ | grep -i "robots"

# Check specific pages
curl -s https://staging.reevestreeservices.co.uk/our-work | grep -i "robots"
```

### Expected Results
```
✅ robots.txt shows "Disallow: /"
✅ All pages have <meta name="robots" content="noindex, nofollow, noarchive">
✅ No indexing errors in Search Console
✅ Site functions identically to production
```

---

## Next Steps
Once staging is deployed and verified safe:
1. Run SEO Test Suite (Phase 2)
2. Google Search Console URL inspection tests
3. Structured data validation
4. Performance analysis