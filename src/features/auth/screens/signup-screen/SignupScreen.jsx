import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../../app/router/route-paths.js'
import { fetchApi } from '../../../../shared/api/api-client.js'
import { API_ENDPOINTS } from '../../../../shared/config/api.js'
import {
  AuthBrandDock,
  AuthCheckboxField,
  AuthHelperText,
  AuthLegalLinks,
  AuthPasswordField,
  AuthStageCard,
  AuthStageShell,
  AuthSubmitButton,
  AuthTextField,
} from '../../components/index.js'
import {
  MINIMUM_SIGNUP_AGE,
  USERNAME_PATTERN,
  getConfirmPasswordValidationError,
  getEmailValidationError,
  getPasswordValidationError,
  getPhoneNumberValidationError,
  normalizeMobileNumber,
} from '../../model/index.js'
import './SignupScreen.css'

const AVAILABILITY_DEBOUNCE_MS = 450

function createAvailabilityState() {
  return { state: 'idle', message: '' }
}

function parseDateOfBirth(value) {
  if (!value) return null

  const parts = value.split('-')
  if (parts.length !== 3) return null

  const year = Number(parts[0])
  const month = Number(parts[1])
  const day = Number(parts[2])

  if (year < 1900 || year > new Date().getFullYear()) {
    return null
  }

  const candidate = new Date(year, month - 1, day)
  if (Number.isNaN(candidate.getTime())) {
    return null
  }

  return candidate
}

function calculateAgeParts(dateOfBirth, today = new Date()) {
  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  )

  if (dateOfBirth > currentDate) {
    return null
  }

  let years = currentDate.getFullYear() - dateOfBirth.getFullYear()
  let months = currentDate.getMonth() - dateOfBirth.getMonth()
  const dayDelta = currentDate.getDate() - dateOfBirth.getDate()

  if (dayDelta < 0) {
    months -= 1
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  return { years, months }
}

function formatAgeDisplay(ageParts) {
  const yearLabel = ageParts.years === 1 ? 'yr' : 'yrs'
  const monthLabel = ageParts.months === 1 ? 'mon' : 'mons'

  return `${ageParts.years} ${yearLabel} ${ageParts.months} ${monthLabel}`
}

function buildAvailabilityEndpoint(field, value) {
  return `${API_ENDPOINTS.auth.signupAvailability}?field=${encodeURIComponent(field)}&value=${encodeURIComponent(value)}`
}

export function SignupScreen() {
  const location = useLocation()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedCommunityRules, setAcceptedCommunityRules] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [hasAttemptedPhoneVerification, setHasAttemptedPhoneVerification] =
    useState(false)
  const [activeField, setActiveField] = useState('')
  const [signupError, setSignupError] = useState('')
  const [signupErrorAction, setSignupErrorAction] = useState('')
  const [signupPrepared, setSignupPrepared] = useState(false)
  const [pendingPhoneNumber, setPendingPhoneNumber] = useState('')
  const [emailVerificationState, setEmailVerificationState] = useState('idle')
  const [mobileVerificationState, setMobileVerificationState] = useState('idle')
  const [emailVerificationNotice, setEmailVerificationNotice] = useState('')
  const [mobileVerificationNotice, setMobileVerificationNotice] = useState('')
  const [phoneOtpCode, setPhoneOtpCode] = useState('')
  const [usernameAvailability, setUsernameAvailability] = useState(
    createAvailabilityState(),
  )
  const [emailAvailability, setEmailAvailability] = useState(
    createAvailabilityState(),
  )
  const [phoneAvailability, setPhoneAvailability] = useState(
    createAvailabilityState(),
  )

  const trimmedFullName = fullName.trim()
  const trimmedEmail = email.trim().toLowerCase()
  const normalizedMobileNumber = normalizeMobileNumber(mobileNumber)
  const trimmedUsername = username.trim().toLowerCase()
  const trimmedPhoneOtpCode = phoneOtpCode.trim()
  const parsedDateOfBirth = parseDateOfBirth(dateOfBirth)
  const ageParts =
    parsedDateOfBirth === null ? null : calculateAgeParts(parsedDateOfBirth)
  const age = ageParts === null ? '' : formatAgeDisplay(ageParts)
  const routeNotice = location.state?.consentCheckpointCompleted
    ? 'Consent checkpoint cleared. Finish account creation below.'
    : ''

  function clearGlobalError() {
    setSignupError('')
    setSignupErrorAction('')
  }

  function applyApiError(error, errorAction = '') {
    setSignupError(error || 'Something went wrong while preparing your account.')
    setSignupErrorAction(errorAction)
  }

  function resetPreparedSignupState() {
    if (!signupPrepared && mobileVerificationState === 'idle') {
      return
    }

    setSignupPrepared(false)
    setPendingPhoneNumber('')
    setMobileVerificationState('idle')
    setMobileVerificationNotice('')
    setPhoneOtpCode('')
    setHasAttemptedPhoneVerification(false)
  }

  function resetEmailVerification(nextEmail) {
    clearGlobalError()
    resetPreparedSignupState()
    setEmail(nextEmail)
    setEmailVerificationState('idle')
    setEmailVerificationNotice('')
  }

  function resetMobileVerification(nextMobileNumber) {
    clearGlobalError()
    resetPreparedSignupState()
    setMobileNumber(nextMobileNumber)
  }

  useEffect(() => {
    if (signupPrepared) {
      return undefined
    }

    if (!trimmedUsername) {
      setUsernameAvailability(createAvailabilityState())
      return undefined
    }

    if (!USERNAME_PATTERN.test(trimmedUsername)) {
      setUsernameAvailability({
        state: 'invalid',
        message: 'Use 3-24 lowercase letters, numbers, dots, or underscores.',
      })
      return undefined
    }

    let cancelled = false
    setUsernameAvailability({ state: 'checking', message: '' })

    const timer = window.setTimeout(async () => {
      const { data, error } = await fetchApi(
        buildAvailabilityEndpoint('username', trimmedUsername),
        { method: 'GET' },
      )

      if (cancelled) {
        return
      }

      if (error) {
        setUsernameAvailability({
          state: 'unavailable',
          message: 'Username availability could not be checked right now.',
        })
        return
      }

      setUsernameAvailability({
        state: data?.available ? 'available' : 'taken',
        message: data?.message || '',
      })
    }, AVAILABILITY_DEBOUNCE_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [trimmedUsername, signupPrepared])

  useEffect(() => {
    if (signupPrepared) {
      return undefined
    }

    if (!trimmedEmail) {
      setEmailAvailability(createAvailabilityState())
      return undefined
    }

    const validationError = getEmailValidationError(trimmedEmail)
    if (validationError) {
      setEmailAvailability({ state: 'invalid', message: validationError })
      return undefined
    }

    let cancelled = false
    setEmailAvailability({ state: 'checking', message: '' })

    const timer = window.setTimeout(async () => {
      const { data, error } = await fetchApi(
        buildAvailabilityEndpoint('email', trimmedEmail),
        { method: 'GET' },
      )

      if (cancelled) {
        return
      }

      if (error) {
        setEmailAvailability({
          state: 'unavailable',
          message: 'Email availability could not be checked right now.',
        })
        return
      }

      setEmailAvailability({
        state: data?.available ? 'available' : 'taken',
        message: data?.message || '',
      })
    }, AVAILABILITY_DEBOUNCE_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [trimmedEmail, signupPrepared])

  useEffect(() => {
    if (signupPrepared) {
      return undefined
    }

    if (!normalizedMobileNumber) {
      setPhoneAvailability(createAvailabilityState())
      return undefined
    }

    const validationError = getPhoneNumberValidationError(normalizedMobileNumber)
    if (validationError) {
      setPhoneAvailability({ state: 'invalid', message: validationError })
      return undefined
    }

    let cancelled = false
    setPhoneAvailability({ state: 'checking', message: '' })

    const timer = window.setTimeout(async () => {
      const { data, error } = await fetchApi(
        buildAvailabilityEndpoint('phoneNumber', normalizedMobileNumber),
        { method: 'GET' },
      )

      if (cancelled) {
        return
      }

      if (error) {
        setPhoneAvailability({
          state: 'unavailable',
          message: 'Phone availability could not be checked right now.',
        })
        return
      }

      setPhoneAvailability({
        state: data?.available ? 'available' : 'taken',
        message: data?.message || '',
      })
    }, AVAILABILITY_DEBOUNCE_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [normalizedMobileNumber, signupPrepared])

  const fullNameError =
    hasAttemptedSubmit && !trimmedFullName
      ? 'Enter your full name to continue.'
      : ''

  const emailValidationError =
    trimmedEmail || hasAttemptedSubmit
      ? getEmailValidationError(trimmedEmail, {
          requiredMessage: hasAttemptedSubmit
            ? 'Enter your email address to continue.'
            : '',
        })
      : ''
  const emailAvailabilityError =
    !emailValidationError &&
    emailAvailability.state === 'taken' &&
    (hasAttemptedSubmit || activeField !== 'email')
      ? emailAvailability.message
      : ''
  const emailVerificationError =
    !emailValidationError &&
    !emailAvailabilityError &&
    hasAttemptedSubmit &&
    emailVerificationState !== 'verified'
      ? 'Verify your email before continuing.'
      : ''

  const phoneNumberError =
    normalizedMobileNumber || hasAttemptedSubmit
      ? getPhoneNumberValidationError(normalizedMobileNumber, {
          requiredMessage: hasAttemptedSubmit
            ? 'Enter your mobile number to continue.'
            : '',
        })
      : ''
  const phoneAvailabilityError =
    !phoneNumberError &&
    phoneAvailability.state === 'taken' &&
    (hasAttemptedSubmit || activeField !== 'mobileNumber')
      ? phoneAvailability.message
      : ''

  const usernameError =
    hasAttemptedSubmit && !trimmedUsername
      ? 'Choose a username to continue.'
      : trimmedUsername && !USERNAME_PATTERN.test(trimmedUsername)
        ? 'Use 3-24 lowercase letters, numbers, dots, or underscores.'
        : usernameAvailability.state === 'taken' &&
            (hasAttemptedSubmit || activeField !== 'username')
          ? usernameAvailability.message
          : ''

  const passwordError =
    password || hasAttemptedSubmit
      ? getPasswordValidationError(password, {
          requiredMessage: hasAttemptedSubmit
            ? 'Create a password to continue.'
            : '',
        })
      : ''
  const confirmPasswordError =
    confirmPassword || hasAttemptedSubmit
      ? getConfirmPasswordValidationError(confirmPassword, password)
      : ''

  const dateOfBirthError =
    hasAttemptedSubmit && !dateOfBirth
      ? 'Enter your date of birth to continue.'
      : dateOfBirth && parsedDateOfBirth === null
        ? 'Enter a valid date of birth.'
        : parsedDateOfBirth !== null && ageParts === null
          ? 'Date of birth cannot be in the future.'
          : ageParts !== null && ageParts.years < MINIMUM_SIGNUP_AGE
            ? `You must be at least ${MINIMUM_SIGNUP_AGE} years old to register.`
            : ''

  const consentError =
    hasAttemptedSubmit && (!acceptedTerms || !acceptedCommunityRules)
      ? 'Accept both acknowledgments before continuing.'
      : ''

  const phoneOtpError =
    signupPrepared &&
    mobileVerificationState !== 'verified' &&
    hasAttemptedPhoneVerification &&
    !trimmedPhoneOtpCode
      ? 'Enter the OTP sent to your mobile number.'
      : ''

  const emailHint =
    emailValidationError || emailAvailabilityError || emailVerificationError
      ? undefined
      : emailVerificationState === 'sending'
        ? 'Sending verification link...'
        : emailVerificationState === 'checking'
          ? 'Checking verification status...'
          : emailVerificationState === 'verified'
            ? 'Email verified.'
            : emailVerificationNotice
              ? emailVerificationNotice
              : emailAvailability.state === 'checking'
                ? 'Checking email availability...'
                : emailAvailability.state === 'taken' && activeField === 'email'
                  ? emailAvailability.message
                  : emailAvailability.state === 'available'
                    ? 'Email available. Verify it before continuing.'
                    : 'A verified email is required on this form.'

  const mobileHint =
    phoneNumberError || phoneAvailabilityError
      ? undefined
      : mobileVerificationState === 'sending'
        ? 'Preparing your account and sending OTP...'
        : mobileVerificationState === 'verifying'
          ? 'Verifying the OTP now...'
          : mobileVerificationState === 'verified'
            ? 'Mobile number verified.'
            : mobileVerificationNotice
              ? mobileVerificationNotice
              : phoneAvailability.state === 'checking'
                ? 'Checking phone number availability...'
                : phoneAvailability.state === 'taken' &&
                    activeField === 'mobileNumber'
                  ? phoneAvailability.message
                  : signupPrepared
                    ? 'Enter the OTP sent to your number to finish signup.'
                    : 'We will verify this number with OTP after account preparation.'

  const usernameHint =
    usernameError
      ? undefined
      : usernameAvailability.state === 'checking'
        ? 'Checking username availability...'
        : usernameAvailability.state === 'available'
          ? 'Username available.'
          : usernameAvailability.state === 'taken' && activeField === 'username'
            ? usernameAvailability.message
            : 'Pick a public handle before entering the app.'

  const dateOfBirthHint =
    dateOfBirthError
      ? undefined
      : age === ''
        ? `Use yyyy-mm-dd. Registration is limited to ${MINIMUM_SIGNUP_AGE}+ users.`
        : 'Age is calculated from the current date.'

  const canSubmit =
    Boolean(trimmedFullName) &&
    Boolean(trimmedEmail) &&
    !emailValidationError &&
    emailAvailability.state === 'available' &&
    emailVerificationState === 'verified' &&
    Boolean(normalizedMobileNumber) &&
    !phoneNumberError &&
    phoneAvailability.state === 'available' &&
    Boolean(trimmedUsername) &&
    USERNAME_PATTERN.test(trimmedUsername) &&
    usernameAvailability.state === 'available' &&
    Boolean(password) &&
    !passwordError &&
    Boolean(confirmPassword) &&
    !confirmPasswordError &&
    ageParts !== null &&
    ageParts.years >= MINIMUM_SIGNUP_AGE &&
    acceptedTerms &&
    acceptedCommunityRules &&
    !isSubmitting

  async function handleSendEmailVerificationLink() {
    if (!trimmedEmail || emailValidationError || emailAvailability.state !== 'available') {
      return
    }

    clearGlobalError()
    setEmailVerificationState('sending')

    const { data, error, errorAction } = await fetchApi(
      API_ENDPOINTS.auth.emailVerificationStart,
      {
        method: 'POST',
        body: JSON.stringify({ email: trimmedEmail }),
      },
    )

    if (error) {
      setEmailVerificationState('idle')
      applyApiError(error, errorAction)
      return
    }

    setEmailVerificationState('sent')
    setEmailVerificationNotice(
      data?.message ||
        'Verification link sent. Open your inbox, click the link, then check status here.',
    )
  }

  async function handleCheckEmailVerification() {
    if (!trimmedEmail || emailValidationError) {
      return
    }

    clearGlobalError()
    setEmailVerificationState('checking')

    const { data, error, errorAction } = await fetchApi(
      `${API_ENDPOINTS.auth.emailVerificationStatus}?email=${encodeURIComponent(trimmedEmail)}`,
      { method: 'GET' },
    )

    if (error) {
      setEmailVerificationState('sent')
      applyApiError(error, errorAction)
      return
    }

    if (data?.verified) {
      setEmailVerificationState('verified')
      setEmailVerificationNotice('Email verification confirmed.')
      return
    }

    setEmailVerificationState('sent')
    setEmailVerificationNotice(
      'Email is not verified yet. Open the latest verification email and try again.',
    )
  }

  async function handleResendMobileOtp() {
    const verificationIdentifier = pendingPhoneNumber || normalizedMobileNumber
    if (!verificationIdentifier || phoneNumberError) {
      return
    }

    clearGlobalError()
    setMobileVerificationState('sending')

    const { data, error, errorAction } = await fetchApi(
      API_ENDPOINTS.auth.startVerification,
      {
        method: 'POST',
        body: JSON.stringify({ identifier: verificationIdentifier }),
      },
    )

    if (error) {
      setMobileVerificationState('otp-sent')
      applyApiError(error, errorAction)
      return
    }

    setMobileVerificationState('otp-sent')
    setMobileVerificationNotice(
      data?.message || 'A fresh OTP has been sent to your mobile number.',
    )
  }

  async function handleVerifyMobileOtp() {
    setHasAttemptedPhoneVerification(true)
    if (!trimmedPhoneOtpCode) {
      return
    }

    clearGlobalError()
    setMobileVerificationState('verifying')

    const verificationIdentifier = pendingPhoneNumber || normalizedMobileNumber
    const { data, error, errorAction } = await fetchApi(
      API_ENDPOINTS.auth.completeVerification,
      {
        method: 'POST',
        body: JSON.stringify({
          identifier: verificationIdentifier,
          verificationCode: trimmedPhoneOtpCode,
        }),
      },
    )

    if (error) {
      setMobileVerificationState('otp-sent')
      applyApiError(error, errorAction)
      return
    }

    setMobileVerificationState('verified')
    setMobileVerificationNotice(data?.message || 'Mobile verification completed.')
    navigate(ROUTE_PATHS.LOGIN, {
      replace: true,
      state: {
        signupCompleted: true,
      },
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setHasAttemptedSubmit(true)
    clearGlobalError()

    if (!canSubmit) {
      return
    }

    if (signupPrepared) {
      await handleResendMobileOtp()
      return
    }

    setIsSubmitting(true)

    const { data, error, errorAction } = await fetchApi(API_ENDPOINTS.auth.signup, {
      method: 'POST',
      body: JSON.stringify({
        displayName: trimmedFullName,
        username: trimmedUsername,
        email: trimmedEmail,
        phoneNumber: normalizedMobileNumber,
        dateOfBirth,
        password,
      }),
    })

    setIsSubmitting(false)

    if (error) {
      applyApiError(error, errorAction)
      return
    }

    setSignupPrepared(true)
    setPendingPhoneNumber(normalizedMobileNumber)
    setMobileVerificationState('otp-sent')
    setMobileVerificationNotice(
      data?.message || 'Your account is staged. Enter the OTP sent to your mobile number.',
    )
  }

  return (
    <AuthStageShell frameWidth="compact" className="signup-experience">
      <div className="signup-experience__stage">
        <AuthBrandDock />

        <motion.div
          className="signup-experience__card-motion"
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AuthStageCard variant="form" className="signup-experience__card">
            <header className="signup-experience__card-header">
              <h1 className="signup-experience__card-title">Create account</h1>
              <p className="signup-experience__card-copy">
                Verify your email, reserve a unique username, then stage the
                account and finish mobile OTP verification.
              </p>
            </header>

            {routeNotice ? (
              <AuthHelperText className="signup-experience__status signup-experience__status--info">
                {routeNotice}
              </AuthHelperText>
            ) : null}

            {signupError ? (
              <AuthHelperText
                className="signup-experience__status signup-experience__status--error"
                style={{ color: 'var(--text-error)' }}
              >
                {signupError}
              </AuthHelperText>
            ) : null}

            {signupErrorAction ? (
              <AuthHelperText
                className="signup-experience__status signup-experience__status--error"
                style={{ color: 'var(--text-error)' }}
              >
                {signupErrorAction}
              </AuthHelperText>
            ) : null}

            <form className="signup-experience__form" noValidate onSubmit={handleSubmit}>
              <AuthTextField
                id="signup-full-name"
                type="text"
                name="fullName"
                label="Full name"
                placeholder="Enter your full name"
                autoComplete="name"
                value={fullName}
                disabled={isSubmitting}
                error={fullNameError}
                onChange={(event) => {
                  clearGlobalError()
                  resetPreparedSignupState()
                  setFullName(event.target.value)
                }}
              />

              <AuthTextField
                id="signup-email"
                type="email"
                name="email"
                label="Email"
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
                value={email}
                disabled={isSubmitting}
                error={emailValidationError || emailAvailabilityError || emailVerificationError}
                hint={emailHint}
                action={
                  <button
                    type="button"
                    className="auth-form-field__action"
                    disabled={
                      isSubmitting ||
                      Boolean(emailValidationError) ||
                      emailAvailability.state !== 'available' ||
                      !trimmedEmail ||
                      emailVerificationState === 'sending' ||
                      emailVerificationState === 'checking' ||
                      emailVerificationState === 'verified'
                    }
                    onClick={
                      emailVerificationState === 'sent'
                        ? handleCheckEmailVerification
                        : handleSendEmailVerificationLink
                    }
                  >
                    {emailVerificationState === 'sending'
                      ? 'Sending...'
                      : emailVerificationState === 'checking'
                        ? 'Checking...'
                        : emailVerificationState === 'verified'
                          ? 'Verified'
                          : emailVerificationState === 'sent'
                            ? 'Check status'
                            : 'Send link'}
                  </button>
                }
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField('')}
                onChange={(event) => resetEmailVerification(event.target.value)}
              />

              <AuthTextField
                id="signup-mobile-number"
                type="tel"
                name="mobileNumber"
                label="Mobile number"
                placeholder="9876543210"
                autoComplete="tel"
                inputMode="tel"
                value={mobileNumber}
                disabled={isSubmitting}
                error={phoneNumberError || phoneAvailabilityError}
                hint={mobileHint}
                action={
                  signupPrepared && mobileVerificationState !== 'verified' ? (
                    <button
                      type="button"
                      className="auth-form-field__action"
                      disabled={
                        isSubmitting ||
                        mobileVerificationState === 'sending' ||
                        Boolean(phoneNumberError) ||
                        !normalizedMobileNumber
                      }
                      onClick={handleResendMobileOtp}
                    >
                      {mobileVerificationState === 'sending' ? 'Sending...' : 'Resend OTP'}
                    </button>
                  ) : undefined
                }
                onFocus={() => setActiveField('mobileNumber')}
                onBlur={() => setActiveField('')}
                onChange={(event) =>
                  resetMobileVerification(normalizeMobileNumber(event.target.value))
                }
              />

              {signupPrepared && mobileVerificationState !== 'verified' ? (
                <AuthTextField
                  id="signup-mobile-otp"
                  type="text"
                  name="phoneOtpCode"
                  label="Mobile OTP"
                  placeholder="Enter the OTP"
                  inputMode="numeric"
                  value={phoneOtpCode}
                  disabled={isSubmitting}
                  error={phoneOtpError}
                  hint={
                    phoneOtpError
                      ? undefined
                      : 'Use the latest OTP sent to your registered mobile number.'
                  }
                  action={
                    <button
                      type="button"
                      className="auth-form-field__action"
                      disabled={
                        isSubmitting ||
                        mobileVerificationState === 'verifying' ||
                        !trimmedPhoneOtpCode
                      }
                      onClick={handleVerifyMobileOtp}
                    >
                      {mobileVerificationState === 'verifying' ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  }
                  onChange={(event) => setPhoneOtpCode(event.target.value)}
                />
              ) : null}

              <AuthTextField
                id="signup-username"
                type="text"
                name="username"
                label="Username"
                placeholder="choose.your.handle"
                autoComplete="username"
                spellCheck="false"
                value={username}
                disabled={isSubmitting}
                error={usernameError}
                hint={usernameHint}
                onFocus={() => setActiveField('username')}
                onBlur={() => setActiveField('')}
                onChange={(event) => {
                  clearGlobalError()
                  resetPreparedSignupState()
                  setUsername(event.target.value.toLowerCase())
                }}
              />

              <AuthPasswordField
                id="signup-password"
                name="password"
                label="Password"
                placeholder="Create a password"
                autoComplete="new-password"
                value={password}
                disabled={isSubmitting}
                error={passwordError}
                hint={passwordError ? undefined : 'Use at least 8 characters.'}
                onChange={(event) => {
                  clearGlobalError()
                  resetPreparedSignupState()
                  setPassword(event.target.value)
                }}
              />

              <AuthPasswordField
                id="signup-confirm-password"
                name="confirmPassword"
                label="Confirm password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                value={confirmPassword}
                disabled={isSubmitting}
                error={confirmPasswordError}
                onChange={(event) => {
                  clearGlobalError()
                  resetPreparedSignupState()
                  setConfirmPassword(event.target.value)
                }}
              />

              <div className="signup-experience__form-grid signup-experience__form-grid--split">
                <AuthTextField
                  id="signup-date-of-birth"
                  type="date"
                  name="dateOfBirth"
                  label="Date of birth"
                  value={dateOfBirth}
                  disabled={isSubmitting}
                  error={dateOfBirthError}
                  hint={dateOfBirthHint}
                  onChange={(event) => {
                    clearGlobalError()
                    resetPreparedSignupState()
                    setDateOfBirth(event.target.value)
                  }}
                />

                <AuthTextField
                  id="signup-age"
                  type="text"
                  name="age"
                  label="Age"
                  placeholder="Age"
                  value={age}
                  readOnly
                  disabled={isSubmitting}
                  hint={age === '' ? 'Filled after DOB.' : 'Derived from DOB.'}
                />
              </div>

              <div className="signup-experience__agreements">
                <AuthCheckboxField
                  id="signup-terms"
                  checked={acceptedTerms}
                  disabled={isSubmitting}
                  error={!acceptedTerms && consentError ? consentError : undefined}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  label={
                    <>
                      I agree to the{' '}
                      <Link to={ROUTE_PATHS.TERMS} state={{ from: ROUTE_PATHS.SIGNUP }}>
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link to={ROUTE_PATHS.PRIVACY} state={{ from: ROUTE_PATHS.SIGNUP }}>
                        Privacy Policy
                      </Link>
                      .
                    </>
                  }
                />

                <AuthCheckboxField
                  id="signup-community"
                  checked={acceptedCommunityRules}
                  disabled={isSubmitting}
                  error={
                    acceptedTerms && !acceptedCommunityRules && consentError
                      ? consentError
                      : undefined
                  }
                  onChange={(event) => setAcceptedCommunityRules(event.target.checked)}
                  label={
                    <>
                      I understand the{' '}
                      <Link
                        to={ROUTE_PATHS.COMMUNITY_GUIDELINES}
                        state={{ from: ROUTE_PATHS.SIGNUP }}
                      >
                        Community Guidelines
                      </Link>{' '}
                      and agree to continue respectfully.
                    </>
                  }
                />
              </div>

              <div className="signup-experience__form-meta">
                <AuthHelperText>
                  Verify your email first. After signup is staged, finish the mobile OTP
                  step to unlock login.
                </AuthHelperText>
              </div>

              {signupPrepared && mobileVerificationState !== 'verified' ? (
                <AuthHelperText className="signup-experience__status signup-experience__status--muted">
                  Your account is staged. Enter the OTP or resend it if needed.
                </AuthHelperText>
              ) : null}

              <AuthSubmitButton disabled={!canSubmit}>
                {isSubmitting
                  ? signupPrepared
                    ? 'Sending OTP...'
                    : 'Preparing account...'
                  : signupPrepared
                    ? 'Resend OTP'
                    : 'Create account'}
              </AuthSubmitButton>
            </form>

            <AuthLegalLinks
              className="signup-experience__legal-links"
              message="Need the full details first? Review our"
            />

            <p className="signup-experience__subcopy">
              Already inside the system? <Link to={ROUTE_PATHS.LOGIN}>Back to login</Link>
            </p>
          </AuthStageCard>
        </motion.div>
      </div>
    </AuthStageShell>
  )
}
