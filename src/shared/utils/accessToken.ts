export const getStoredAccessToken = () => localStorage.getItem('accessToken');

export const storeAccessToken = (token: string) =>
  localStorage.setItem('accessToken', token);
