export const fixUrl = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('localhost') || url.startsWith('127.0.0.1')) {
    return url;
  }
  return `https://${url}`;
};
