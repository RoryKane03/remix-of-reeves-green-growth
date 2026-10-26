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
  '/privacy-policy',
  '/404'
]

// Swap the default tags between <!--seo-start--> and <!--seo-end--> in index.html
// for the page's own <SEO>/<Helmet> tags, so Google reads the right title,
// description and canonical without running JavaScript.
function injectHead(template, head, route) {
  const start = template.indexOf('<!--seo-start-->')
  const end = template.indexOf('<!--seo-end-->')
  if (start === -1 || end === -1) {
    throw new Error('index.html is missing the <!--seo-start--> / <!--seo-end--> markers')
  }
  if (!/<title[\s>]/.test(head) || !/rel="canonical"/.test(head)) {
    throw new Error(`${route} has no <title> or canonical in its <SEO>/<Helmet> tags`)
  }
  return template.slice(0, start) + head + template.slice(end + '<!--seo-end-->'.length)
}

async function prerender() {
  try {
    const buildTimestamp = new Date().toISOString();
    console.log(`🕷️  Starting SSR prerendering at ${buildTimestamp}...`)
    
    // Use the production server build (dist/server, from `vite build --ssr`) so image
    // imports resolve to the real hashed /assets/... files instead of /src/... dev paths.
    let vite = null
    let render
    const serverEntry = toAbsolute('dist/server/entry-server.js')
    if (fs.existsSync(serverEntry)) {
      ;({ render } = await import(serverEntry))
    } else {
      console.warn('⚠️  dist/server/entry-server.js not found - falling back to Vite dev SSR (image paths will be wrong)')
      vite = await createServer({
        mode: 'production',
        server: { middlewareMode: true },
        appType: 'custom',
        ssr: { noExternal: ['react-helmet-async'] }
      })
      ;({ render } = await vite.ssrLoadModule('/src/entry-server.tsx'))
    }

    // Read the base HTML template
    const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')

    const failures = []
    for (const route of routesToPrerender) {
      try {
        console.log(`\n🔄 Rendering: ${route}`)
        
        // Render the route to HTML
        const { html: appHtml, head } = render(route)
        
        // Validate rendered content
        if (!appHtml || appHtml.length < 100) {
          console.warn(`⚠️  Warning: ${route} rendered suspiciously short HTML`)
        }
        
        // Replace placeholder with rendered content and add build timestamp
        const html = injectHead(template, head, route)
          .replace('<!--app-html-->', appHtml)
          .replace('</head>', `<meta name="build-time" content="${buildTimestamp}" /></head>`)
        
        // Determine output path - use flat HTML files to avoid trailing slash redirects
        // The home page keeps a pristine copy as the app shell for non-prerendered
        // routes (/auth, /admin, /thank-you), so they don't inherit the home page's tags.
        if (route === '/') {
          fs.writeFileSync(toAbsolute('dist/app-shell.html'), template)
        }
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
        failures.push(route)
      }
    }

    if (vite) await vite.close()
    // The server bundle is only needed at build time - don't publish it
    fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true })
    if (failures.length) {
      console.error(`\n❌ Prerendering failed for: ${failures.join(', ')}`)
      process.exit(1)
    }
    console.log('\n🎉 Prerendering complete!')
    console.log('📄 All pages now have static HTML with full content for SEO')
    process.exit(0)
    
  } catch (error) {
    console.warn('⚠️ Prerendering skipped (non-fatal):', error.message)
    // Don't fail the build - prerendering is optional enhancement
    process.exit(0)
  }
}

prerender()
