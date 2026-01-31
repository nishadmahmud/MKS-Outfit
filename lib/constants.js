// Shared constants and utilities that can be used in both client and server components
export const userId = 230;

export const fetcher = (url) => fetch(url).then(res => res.json());
