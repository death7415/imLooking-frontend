const AUTH_SESSION_STORAGE_KEY = 'imlooking.auth.session'

function readStorageValue(storage) {
  try {
    return storage?.getItem(AUTH_SESSION_STORAGE_KEY) ?? null
  } catch {
    return null
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

export { AUTH_SESSION_STORAGE_KEY }
