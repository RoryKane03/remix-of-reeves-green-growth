# Welcome to your Lovable project

This is a Lovable project - an AI-powered app development platform. Learn more at [Lovable.dev](https://lovable.dev).

## Project info

**URL**: https://lovable.dev/projects/01aacf69-4d80-4ba7-8d52-edb4923ed6b6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/01aacf69-4d80-4ba7-8d52-edb4923ed6b6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## SEO & Google Indexing Setup ✅

This project is fully optimized for Google indexing with:
- ✅ Prerendering for all pages (static HTML)
- ✅ Automatic sitemap.xml generation
- ✅ Complete meta tags & Open Graph
- ✅ JSON-LD structured data
- ✅ robots.txt configuration
- ✅ SEO validation tools

### SEO Scripts

```bash
# Build with prerendering (for deployment)
./scripts/build-with-prerender.sh

# Update sitemap after adding pages
npx ts-node scripts/update-sitemap.ts

# Validate SEO compliance
npx ts-node scripts/seo-validator.ts

# Generate structured data templates
npx ts-node scripts/seo-templates.ts homepage
```

## 📋 New Page SEO Checklist

**IMPORTANT**: When adding new pages, follow these steps to maintain SEO:

### 1. Add Route & Component
- Create the page component with proper SEO structure
- Add route to `src/App.tsx`

### 2. Add SEO Component 
```tsx
import SEO from '@/components/SEO';

function NewPage() {
  return (
    <>
      <SEO 
        title="Your Page Title"
        description="Your meta description (120-160 chars)"
        url="/new-page"
        structuredData={getServiceData('Service Name', 'Description')}
        breadcrumbs={[
          {label: 'Home', href: '/'},
          {label: 'New Page', href: '/new-page', current: true}
        ]}
      />
      {/* Your page content */}
    </>
  );
}
```

### 3. Update Sitemap
```bash
# Method 1: Auto-update
npx ts-node scripts/update-sitemap.ts --scan

# Method 2: Manual - Add route to scripts/update-sitemap.ts routes array
```

### 4. Add Internal Links
- Link to new page from navigation/footer
- Add breadcrumb navigation
- Ensure proper link hierarchy

### 5. Validate Before Deploy
```bash
# Run SEO validation
npm run build
npx ts-node scripts/seo-validator.ts
```

### ⚠️ SEO Validation Checklist
- [ ] Title tag (30-60 characters)
- [ ] Meta description (120-160 characters) 
- [ ] Single H1 tag with target keyword
- [ ] Canonical URL set correctly
- [ ] Open Graph tags (title, description, image)
- [ ] JSON-LD structured data
- [ ] Alt text on all images
- [ ] Internal linking from other pages
- [ ] Added to sitemap.xml
- [ ] Breadcrumb navigation

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/01aacf69-4d80-4ba7-8d52-edb4923ed6b6) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
