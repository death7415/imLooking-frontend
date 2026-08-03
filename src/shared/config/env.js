function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, '')
}

const fallbackApiBaseUrl = 'https://imlooking.onrender.com'

export const API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL || fallbackApiBaseUrl,
)
