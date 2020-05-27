let currentToken = '';

export const setToken = (token: string) => {
  currentToken = token;
};

export const getToken = () => (currentToken.length === 0 ? null : currentToken);
