const AUTH_SESSION_STORAGE_KEY = 'imlooking.auth.session'

// TODO: (Security) Currently storing tokens in localStorage/sessionStorage.
// For utmost security against XSS (Cross-Site Scripting) and token theft, 
// the backend should be updated to issue HttpOnly, Secure, SameSite=Strict cookies 
// for the accessToken and refreshToken. Once the backend supports HttpOnly cookies,
// the frontend should remove token storage logic here and rely entirely on browser cookies.

function readStorageValue(storage) {
  try {
    return storage?.getItem(AUTH_SESSION_STORAGE_KEY) ?? null
  } catch {
    return null
  }
}

function writeStorageValue(storage, value) {
  try {
    storage?.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

function removeStorageValue(storage) {
  try {
    storage?.removeItem(AUTH_SESSION_STORAGE_KEY)
  } catch {
    // Ignore storage cleanup failures
  }
}

export function getAuthSession() {
  const rawValue =
    readStorageValue(window.localStorage) ??
    readStorageValue(window.sessionStorage)

  if (!rawValue) {
    return { isAuthenticated: false, accessToken: null, refreshToken: null }
  }

  try {
    const parsedValue = JSON.parse(rawValue)

    return {
      isAuthenticated: parsedValue?.isAuthenticated === true,
      accessToken: parsedValue?.accessToken || null,
      refreshToken: parsedValue?.refreshToken || null,
    }
  } catch {
    return { isAuthenticated: false, accessToken: null, refreshToken: null }
  }
}

export function isAuthenticated() {
  return getAuthSession().isAuthenticated
}

export function getAccessToken() {
  return getAuthSession().accessToken
}

export function setAuthSession(session, persist = true) {
  const nextSession = {
    isAuthenticated: session?.isAuthenticated === true,
    accessToken: session?.accessToken || null,
    refreshToken: session?.refreshToken || null,
  }

  // Clear old storage first to avoid conflicts
  removeStorageValue(window.localStorage)
  removeStorageValue(window.sessionStorage)

  if (persist) {
    writeStorageValue(window.localStorage, nextSession)
  } else {
    writeStorageValue(window.sessionStorage, nextSession)
  }

  return nextSession
}

export function clearAuthSession() {
  removeStorageValue(window.localStorage)
  removeStorageValue(window.sessionStorage)
}

export { AUTH_SESSION_STORAGE_KEY }
