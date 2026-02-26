export type ExternalLinkTarget = '_blank' | '_self';

export function openExternalUrl(url: string, target: ExternalLinkTarget = '_blank') {
  const openedWindow = window.open(
    url,
    target,
    target === '_blank' ? 'noopener,noreferrer' : undefined,
  );

  if (!openedWindow) {
    try {
      if (target === '_blank' && window.top) {
        window.top.location.href = url;
        return;
      }

      window.location.href = url;
    } catch {
      window.location.href = url;
    }
  }
}
