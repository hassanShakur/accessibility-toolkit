export const fixUrl = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('www.')) {
    return url;
  }
  return `https://${url}`;
};
