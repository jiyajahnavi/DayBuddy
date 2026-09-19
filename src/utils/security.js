/**
 * Input sanitization helper for preventing XSS and injection attacks.
 */
export const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validates text payload length to prevent buffer bloat.
 */
export const validateTextLength = (str, maxLength = 2000) => {
  if (!str) return '';
  return str.trim().slice(0, maxLength);
};
