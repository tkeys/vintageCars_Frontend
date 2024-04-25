export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const decodeToken = (token: string) => {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};
