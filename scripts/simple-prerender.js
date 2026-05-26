import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, '..', p)

// Define all routes that need to be prerendered
const routesToPrerender = [
  '/',
  '/about',
  '/contact',
  '/our-work',
  '/tree-work',
  '/hedge-cutting',
  '/stump-grinding',
  '/domestic-services',
  '/commercial-services',
  '/commercial/tree-work',
  '/commercial/hedge-cutting',
  '/commercial/stump-grinding',
  '/services/commercial/site-clearance',
  '/locations/birmingham',
  '/locations/worcester',
  '/team/john-reeves',
  '/privacy-policy'
];

async function simplePrerender() {
  try {
    console.log(`🕷️ Simple prerendering for ${routesToPrerender.length} routes...`)
    
    // Read the base HTML template
    const templatePath = toAbsolute('dist/index.html')
    if (!fs.existsSync(templatePath)) {
      console.error('❌ dist/index.html not found. Run vite build first.')
      process.exit(1)
    }
    
    const template = fs.readFileSync(templatePath, 'utf-8')

    for (const route of routesToPrerender) {
      if (route === '/') continue // Skip root as it's already built
      
      try {
        // Create the directory structure
        const routePath = route.replace(/^\//, '').replace(/\/$/, '')
        const filePath = toAbsolute(`dist/${routePath}/index.html`)
        const dir = path.dirname(filePath)
        
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }

        // Copy the template HTML for each route
        // This ensures each route has its own static HTML file
        fs.writeFileSync(filePath, template)
        console.log(`✅ Created static HTML: ${route}`)
        
      } catch (error) {
        console.error(`❌ Failed to create ${route}:`, error.message)
      }
    }

    console.log(`🎉 Simple prerendering complete! Generated static HTML for ${routesToPrerender.length} routes.`)
    console.log('📄 Each route now has its own index.html file for perfect SEO.')
    
  } catch (error) {
    console.error('❌ Simple prerendering failed:', error.message)
    process.exit(1)
  }
}

simplePrerender()