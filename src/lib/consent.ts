// Cookie consent utility functions

export const CONSENT_KEY = 'budquest-cookie-consent';

export const getConsent = (): 'accepted' | 'declined' | null => {
  return localStorage.getItem(CONSENT_KEY) as 'accepted' | 'declined' | null;
};

export const setConsent = (value: 'accepted' | 'declined') => {
  localStorage.setItem(CONSENT_KEY, value);
};

export const hasConsent = (): boolean => {
  return getConsent() === 'accepted';
};

export const canSetCookies = (): boolean => {
  const consent = getConsent();
  // Allow cookies if user explicitly accepted, or if they haven't decided yet
  // This is for essential cookies only - analytics should only run if accepted
  return consent === 'accepted' || consent === null;
};

// Load Google Analytics only after consent
export const loadGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;

  const GA_ID = 'G-J411R99479';

  // Check if already loaded
  if (window.gtag) {
    console.log('Google Analytics already loaded');
    return;
  }

  // Create script element
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);

  console.log('Google Analytics loaded after consent');
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
