import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component ensures users start at the top of every page
 * when navigating between routes - no smooth animation, instant scroll
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll to top on route change - no smooth behavior
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
