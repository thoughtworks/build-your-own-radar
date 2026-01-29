/**
 * Normalize text by removing diacritical marks for accent-insensitive search
 * This allows searching for "Autorizacao" to match "Autorização" (Portuguese)
 * or "Experiencia" to match "Experiência"
 *
 * @param {string} text - The text to normalize
 * @returns {string} - Lowercase text with diacritical marks removed
 */
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

module.exports = { normalizeText }
