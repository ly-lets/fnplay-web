/**
 * Set a cookie by key.
 * @param {string} key - The name of the cookie.
 * @param {string} value - The value to store in the cookie.
 * @param {number} [minutes=60] - The number of minutes until the cookie expires.
 */
export const setCookie = (key, value, minutes = 60) => {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000); // Expiration in minutes
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${key}=${encodeURIComponent(value)}; ${expires}; path=/; secure; samesite=strict`;
};

/**
 * Get a cookie by key.
 * @param {string} key - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie, or null if not found.
 */
export const getCookie = (key) => {
  const name = `${key}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split("; ");
  for (let cookie of cookieArray) {
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return null;
};

/**
 * Remove a cookie by key.
 * @param {string} key - The name of the cookie to remove.
 */
export const removeCookie = (key) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
};