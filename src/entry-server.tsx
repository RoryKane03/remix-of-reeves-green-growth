import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppSSR from './App.ssr';

export function render(url: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
      },
    },
  });
  
  const html = ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <StaticRouter location={url}>
          <AppSSR />
        </StaticRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
  
  return html;
}