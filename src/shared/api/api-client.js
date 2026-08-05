import { buildApiUrl } from '../config/api.js'
import { getAccessToken, clearAuthSession } from '../../features/auth/model/auth-session.js'

export async function fetchApi(endpoint, options = {}) {
  const url = buildApiUrl(endpoint)
  const token = getAccessToken()
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (response.status === 401) {
      // TODO: (Security/UX) Implement token refresh logic here using the refreshToken.
      // For now, we clear session and force re-login on 401.
      if (!endpoint.includes('/login') && !endpoint.includes('/refresh')) {
         clearAuthSession()
         window.location.href = '/login'
      }
    }

    const isJson = response.headers.get('content-type')?.includes('application/json')
    let data = null
    
    if (isJson) {
      try {
        data = await response.json()
      } catch (e) {
        // Handle empty JSON bodies
      }
    }

    if (!response.ok) {
      const apiError = data?.error
      const errorMsg =
        apiError?.message || `API Error: ${response.status} ${response.statusText}`
      return {
        data: null,
        error: errorMsg,
        errorAction: apiError?.action || '',
        errorCode: apiError?.code || '',
        status: response.status,
      }
    }

    return {
      data,
      error: null,
      errorAction: '',
      errorCode: '',
      status: response.status,
    }
  } catch (err) {
    return {
      data: null,
      error: 'Network error or server is down.',
      errorAction: 'Please check your connection and try again.',
      errorCode: 'NETWORK_ERROR',
      status: 0,
    }
  }
}
