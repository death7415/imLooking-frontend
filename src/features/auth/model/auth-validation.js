export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u
export const USERNAME_PATTERN = /^[a-z0-9._]{3,24}$/u
export const PASSWORD_MIN_LENGTH = 8
export const MINIMUM_SIGNUP_AGE = 18

const MIN_PHONE_LENGTH = 10
const MAX_PHONE_LENGTH = 15

export function getRequiredFieldError(value, message) {
  return value.trim() ? '' : message
}

export function getEmailValidationError(
  value,
  {
    requiredMessage = '',
    invalidMessage = 'Enter a valid email address.',
  } = {},
) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return requiredMessage
  }

  if (!EMAIL_PATTERN.test(trimmedValue)) {
    return invalidMessage
  }

  return ''
}

export function normalizeMobileNumber(value = '') {
  return value.replace(/\D/g, '').slice(0, MAX_PHONE_LENGTH)
}

export function getPhoneNumberValidationError(
  value,
  {
    requiredMessage = '',
    invalidMessage = 'Enter a valid mobile number.',
  } = {},
) {
  const normalizedValue = normalizeMobileNumber(value)

  if (!normalizedValue) {
    return requiredMessage
  }

  if (
    normalizedValue.length < MIN_PHONE_LENGTH ||
    normalizedValue.length > MAX_PHONE_LENGTH
  ) {
    return invalidMessage
  }

  return ''
}

export function getPasswordValidationError(
  value,
  {
    requiredMessage = '',
    invalidMessage = `Use at least ${PASSWORD_MIN_LENGTH} characters.`,
  } = {},
) {
  if (!value) {
    return requiredMessage
  }

  if (value.length < PASSWORD_MIN_LENGTH) {
    return invalidMessage
  }

  return ''
}

export function getConfirmPasswordValidationError(
  confirmPassword,
  password,
  {
    requiredMessage = 'Confirm your password to continue.',
    mismatchMessage = 'Passwords do not match yet.',
  } = {},
) {
  if (!confirmPassword) {
    return requiredMessage
  }

  if (confirmPassword !== password) {
    return mismatchMessage
  }

  return ''
}
