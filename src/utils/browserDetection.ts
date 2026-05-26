// Detect if running in an in-app browser (TikTok, Instagram, Facebook, etc.)
export const isInAppBrowser = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  
  const userAgent = navigator.userAgent || navigator.vendor || '';
  
  // Common in-app browser identifiers
  const inAppPatterns = [
    'FBAN',           // Facebook App
    'FBAV',           // Facebook App Version
    'Instagram',      // Instagram
    'Twitter',        // Twitter/X
    'TikTok',         // TikTok
    'BytedanceWebview', // TikTok's WebView
    'ByteLocale',     // TikTok locale
    'musical_ly',     // TikTok (old name)
    'LinkedIn',       // LinkedIn
    'Pinterest',      // Pinterest
    'Snapchat',       // Snapchat
    'Line/',          // Line app
    'KAKAOTALK',      // KakaoTalk
    'WeChat',         // WeChat
    'MicroMessenger', // WeChat internal name
  ];
  
  // Check if any pattern matches
  return inAppPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
};
