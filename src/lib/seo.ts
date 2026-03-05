interface SEOProps {
  title: string;
  description?: string;
  canonicalPath: string;
  ogImage?: string;
  ogType?: string;
}

export function updateSEO({ title, description, canonicalPath, ogImage, ogType }: SEOProps) {
  const BASE_URL = 'https://evebleu.vip';
  const fullTitle = `${title} | EVE BLUE`;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  document.title = fullTitle;

  const setMeta = (attr: string, key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  if (description) {
    setMeta('name', 'description', description);
  }

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  setMeta('property', 'og:title', fullTitle);
  setMeta('property', 'og:url', canonicalUrl);
  if (description) setMeta('property', 'og:description', description);
  if (ogImage) setMeta('property', 'og:image', ogImage);
  setMeta('property', 'og:type', ogType || 'website');

  setMeta('name', 'twitter:title', fullTitle);
  if (description) setMeta('name', 'twitter:description', description);
  if (ogImage) setMeta('name', 'twitter:image', ogImage);
}

export function resetSEO() {
  document.title = 'EVE BLUE \u2014 Concierge. It. Done.';

  const setMeta = (attr: string, key: string, content: string) => {
    const el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
    if (el) el.setAttribute('content', content);
  };

  setMeta('name', 'description', 'EVE BLUE is your private luxury concierge \u2014 elevating your Dubai experience with premium services, yacht charters, fine dining, and exclusive adventures.');
  setMeta('property', 'og:title', 'EVE BLUE \u2014 Concierge. It. Done.');
  setMeta('property', 'og:description', 'EVE BLUE \u2014 your private luxury concierge elevating your Dubai experience.');
  setMeta('property', 'og:type', 'website');

  const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (canonical) canonical.remove();
}
