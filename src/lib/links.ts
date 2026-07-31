/**
 * Wandelt Hrefs im alten statischen Stil ("./book", "index.html#services",
 * "book.html") in extensionslose Next-Routen um. Anker, externe URLs sowie
 * mailto:/tel: bleiben unveraendert.
 */
export function routeHref(href: string): string {
  if (/^(#|https?:|mailto:|tel:|\/)/.test(href)) return href;
  const cleaned = href.replace(/^\.\//, '');
  const [path = '', hash] = cleaned.split('#');
  const base = path.replace(/\.html$/, '');
  const route = base === '' || base === 'index' ? '/' : `/${base}`;
  return hash ? `${route === '/' ? '/' : route}#${hash}` : route;
}
