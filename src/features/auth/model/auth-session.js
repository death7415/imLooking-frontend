import { ROUTE_PATHS } from '../../../app/router/route-paths.js'

const AUTH_SESSION_STORAGE_KEY = 'imlooking.auth.session'
const DEFAULT_AUTH_SESSION = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  email: null,
  emailVerified: false,
  phoneVerified: false,
  profileCompleted: false,
}

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
    return { ...DEFAULT_AUTH_SESSION }
  }

  try {
    const parsedValue = JSON.parse(rawValue)

    return {
      isAuthenticated: parsedValue?.isAuthenticated === true,
      accessToken: parsedValue?.accessToken || null,
      refreshToken: parsedValue?.refreshToken || null,
      email: parsedValue?.email || null,
      emailVerified: parsedValue?.emailVerified === true,
      phoneVerified: parsedValue?.phoneVerified === true,
      profileCompleted: parsedValue?.profileCompleted === true,
    }
  } catch {
    return { ...DEFAULT_AUTH_SESSION }
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
    email: session?.email || null,
    emailVerified: session?.emailVerified === true,
    phoneVerified: session?.phoneVerified === true,
    profileCompleted: session?.profileCompleted === true,
  }

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

export function requiresProfileSetup(session = getAuthSession()) {
  return session.isAuthenticated && session.profileCompleted !== true
}

export function requiresEmailVerification(session = getAuthSession()) {
  return (
    session.isAuthenticated &&
    session.profileCompleted === true &&
    session.emailVerified !== true
  )
}

export function getPostAuthPath(session = getAuthSession()) {
  if (!session.isAuthenticated) {
    return ROUTE_PATHS.LOGIN
  }

  if (requiresProfileSetup(session)) {
    return ROUTE_PATHS.PROFILE
  }

  if (requiresEmailVerification(session)) {
    return ROUTE_PATHS.VERIFY_EMAIL
  }

  return ROUTE_PATHS.HOME
}

export { AUTH_SESSION_STORAGE_KEY }
