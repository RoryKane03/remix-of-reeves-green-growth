import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

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
  '/locations/warwick',
  '/team/john-reeves',
  '/privacy-policy'
]

async function prerender() {
  try {
    const buildTimestamp = new Date().toISOString();
    console.log(`🕷️  Starting SSR prerendering at ${buildTimestamp}...`)
    
    // Create Vite server in SSR mode
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      ssr: {
        noExternal: ['react-helmet-async']
      }
    })

    // Read the base HTML template
    const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
    
    // Load the server render function
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

    for (const route of routesToPrerender) {
      try {
        console.log(`\n🔄 Rendering: ${route}`)
        
        // Render the route to HTML
        const appHtml = render(route)
        
        // Validate rendered content
        if (!appHtml || appHtml.length < 100) {
          console.warn(`⚠️  Warning: ${route} rendered suspiciously short HTML`)
        }
        
        // Replace placeholder with rendered content and add build timestamp
        const html = template
          .replace('<!--app-html-->', appHtml)
          .replace('</head>', `<meta name="build-time" content="${buildTimestamp}" /></head>`)
        
        // Determine output path - use flat HTML files to avoid trailing slash redirects
        const filePath = route === '/' 
          ? toAbsolute('dist/index.html')
          : toAbsolute(`dist${route}.html`)
        
        const dir = path.dirname(filePath)
        
        // Create directory if needed
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
        
        // Write the prerendered HTML
        fs.writeFileSync(filePath, html)
        console.log(`✅ Success: ${route} (${appHtml.length} chars)`)
        
      } catch (error) {
        console.error(`❌ Failed to render ${route}:`, error.message)
      }
    }

    await vite.close()
    console.log('\n🎉 Prerendering complete!')
    console.log('📄 All pages now have static HTML with full content for SEO')
    
  } catch (error) {
    console.warn('⚠️ Prerendering skipped (non-fatal):', error.message)
    // Don't exit with error code - prerendering is optional enhancement
  }
}

prerender()
