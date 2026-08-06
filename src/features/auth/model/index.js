export {
  AUTH_SESSION_STORAGE_KEY,
  clearAuthSession,
  getPostAuthPath,
  getAuthSession,
  isAuthenticated,
  requiresEmailVerification,
  requiresProfileSetup,
  setAuthSession,
} from './auth-session.js'
export {
  EMAIL_PATTERN,
  MINIMUM_SIGNUP_AGE,
  PASSWORD_MIN_LENGTH,
  USERNAME_PATTERN,
  getConfirmPasswordValidationError,
  getEmailValidationError,
  getPasswordValidationError,
  getPhoneNumberValidationError,
  getRequiredFieldError,
  normalizeMobileNumber,
} from './auth-validation.js'
