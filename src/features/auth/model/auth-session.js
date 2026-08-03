const AUTH_SESSION_STORAGE_KEY = 'imlooking.auth.session'

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
    // Ignore storage cleanup failures in the frontend placeholder flow.
  }
}

export function getAuthSession() {
  const rawValue =
    readStorageValue(window.localStorage) ??
    readStorageValue(window.sessionStorage)

  if (!rawValue) {
    return { isAuthenticated: false }
  }

  try {
    const parsedValue = JSON.parse(rawValue)

    return {
      isAuthenticated: parsedValue?.isAuthenticated === true,
    }
  } catch {
    return { isAuthenticated: false }
  }
}

export function isAuthenticated() {
  return getAuthSession().isAuthenticated
}

export function setAuthSession(session) {
  const nextSession = {
    isAuthenticated: session?.isAuthenticated === true,
  }

  if (!writeStorageValue(window.localStorage, nextSession)) {
    writeStorageValue(window.sessionStorage, nextSession)
  }

  return nextSession
}

export function clearAuthSession() {
  removeStorageValue(window.localStorage)
  removeStorageValue(window.sessionStorage)
}

export { AUTH_SESSION_STORAGE_KEY }
