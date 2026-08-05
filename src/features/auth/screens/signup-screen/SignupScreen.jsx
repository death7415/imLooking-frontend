import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../../app/router/route-paths.js'
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

const RESERVED_USERNAMES = new Set([
  'admin',
  'help',
  'imlooking',
  'moderator',
  'root',
  'support',
])



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
  const [usernameStatus, setUsernameStatus] = useState('idle')
  const [emailVerificationState, setEmailVerificationState] = useState('idle')
  const [mobileVerificationState, setMobileVerificationState] = useState('idle')
  const submitTimerRef = useRef(null)
  const emailVerificationTimerRef = useRef(null)
  const mobileVerificationTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current)
      }

      if (emailVerificationTimerRef.current !== null) {
        window.clearTimeout(emailVerificationTimerRef.current)
      }

      if (mobileVerificationTimerRef.current !== null) {
        window.clearTimeout(mobileVerificationTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const trimmedUsername = username.trim().toLowerCase()

    if (!trimmedUsername) {
      setUsernameStatus('idle')
      return
    }

    if (!USERNAME_PATTERN.test(trimmedUsername)) {
      setUsernameStatus('invalid')
      return
    }

    setUsernameStatus('checking')

    // TODO: Replace the temporary local username check with the real backend availability endpoint once auth APIs land.
    const availabilityTimer = window.setTimeout(() => {
      setUsernameStatus(
        RESERVED_USERNAMES.has(trimmedUsername) ? 'taken' : 'available',
      )
    }, 450)

    return () => {
      window.clearTimeout(availabilityTimer)
    }
  }, [username])

  function resetEmailVerification(nextEmail) {
    if (emailVerificationTimerRef.current !== null) {
      window.clearTimeout(emailVerificationTimerRef.current)
      emailVerificationTimerRef.current = null
    }

    setEmail(nextEmail)
    setEmailVerificationState('idle')
  }

  function resetMobileVerification(nextMobileNumber) {
    if (mobileVerificationTimerRef.current !== null) {
      window.clearTimeout(mobileVerificationTimerRef.current)
      mobileVerificationTimerRef.current = null
    }

    setMobileNumber(nextMobileNumber)
    setMobileVerificationState('idle')
  }

  const trimmedFullName = fullName.trim()
  const trimmedEmail = email.trim()
  const trimmedUsername = username.trim().toLowerCase()
  const parsedDateOfBirth = parseDateOfBirth(dateOfBirth)
  const ageParts =
    parsedDateOfBirth === null ? null : calculateAgeParts(parsedDateOfBirth)
  const age = ageParts === null ? '' : formatAgeDisplay(ageParts)
  const routeNotice = location.state?.consentCheckpointCompleted
    ? 'Consent checkpoint cleared. Finish account creation below.'
    : ''

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
  const emailVerificationError =
    !emailValidationError &&
    hasAttemptedSubmit &&
    emailVerificationState !== 'verified'
      ? 'Verify your email before continuing.'
      : ''
  const mobileNumberError =
    mobileNumber || hasAttemptedSubmit
      ? getPhoneNumberValidationError(mobileNumber, {
          requiredMessage: hasAttemptedSubmit
            ? 'Enter your mobile number to continue.'
            : '',
        })
      : ''
  const mobileVerificationError =
    !mobileNumberError &&
    hasAttemptedSubmit &&
    mobileVerificationState !== 'verified'
      ? 'Verify your mobile number before continuing.'
      : ''
  const usernameError =
    hasAttemptedSubmit && !trimmedUsername
      ? 'Choose a username to continue.'
      : trimmedUsername && !USERNAME_PATTERN.test(trimmedUsername)
        ? 'Use 3-24 lowercase letters, numbers, dots, or underscores.'
        : usernameStatus === 'taken'
          ? 'That username is already taken.'
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
      : dateOfBirth && dateOfBirth.length < 10
        ? 'Use the dd/mm/yyyy format.'
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

  const emailHint =
    emailVerificationState === 'sending'
      ? 'Sending OTP now. Demo mode will auto-verify this field.'
      : emailVerificationState === 'verified'
        ? 'Email verified for the current frontend flow.'
        : 'A verified email is required on this form.'
  const mobileHint =
    mobileVerificationState === 'sending'
      ? 'Sending OTP now. Demo mode will auto-verify this field.'
      : mobileVerificationState === 'verified'
        ? 'Mobile number verified for the current frontend flow.'
        : 'A verified mobile number is required on this form.'
  const usernameHint =
    usernameStatus === 'checking'
      ? 'Checking username availability...'
      : usernameStatus === 'available'
        ? 'Username available.'
        : 'Pick a public handle before entering the app.'
  const dateOfBirthHint =
    age === ''
      ? `Use dd/mm/yyyy. Registration is limited to ${MINIMUM_SIGNUP_AGE}+ users.`
      : 'Age is calculated from the current date.'
  const verificationPending =
    emailVerificationState !== 'verified' ||
    mobileVerificationState !== 'verified'
  const canSubmit =
    Boolean(trimmedFullName) &&
    Boolean(trimmedEmail) &&
    !emailValidationError &&
    emailVerificationState === 'verified' &&
    Boolean(mobileNumber) &&
    !mobileNumberError &&
    mobileVerificationState === 'verified' &&
    Boolean(trimmedUsername) &&
    usernameStatus === 'available' &&
    Boolean(password) &&
    !passwordError &&
    Boolean(confirmPassword) &&
    !confirmPasswordError &&
    ageParts !== null &&
    ageParts.years >= MINIMUM_SIGNUP_AGE &&
    acceptedTerms &&
    acceptedCommunityRules &&
    !isSubmitting

  function handleSendEmailOtp() {
    if (!trimmedEmail || emailValidationError || isSubmitting) {
      return
    }

    setEmailVerificationState('sending')

    // TODO: Replace the demo auto-verification with real email OTP dispatch and confirmation once backend endpoints are ready.
    emailVerificationTimerRef.current = window.setTimeout(() => {
      setEmailVerificationState('verified')
      emailVerificationTimerRef.current = null
    }, 900)
  }

  function handleSendMobileOtp() {
    if (!mobileNumber || mobileNumberError || isSubmitting) {
      return
    }

    setMobileVerificationState('sending')

    // TODO: Replace the demo auto-verification with real mobile OTP dispatch and confirmation once backend endpoints are ready.
    mobileVerificationTimerRef.current = window.setTimeout(() => {
      setMobileVerificationState('verified')
      mobileVerificationTimerRef.current = null
    }, 900)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setHasAttemptedSubmit(true)

    if (!canSubmit) {
      return
    }

    setIsSubmitting(true)

    // TODO: Replace the temporary frontend-only submit redirect with the real signup request during backend auth wiring.
    submitTimerRef.current = window.setTimeout(() => {
      setIsSubmitting(false)
      submitTimerRef.current = null
      navigate(ROUTE_PATHS.LOGIN, {
        replace: true,
        state: {
          signupCompleted: true,
        },
      })
    }, 1000)
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
                Verify both contact channels here, reserve a username, and clear the age
                gate before deeper onboarding begins.
              </p>
            </header>

            {routeNotice ? (
              <AuthHelperText className="signup-experience__status signup-experience__status--info">
                {routeNotice}
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
                onChange={(event) => setFullName(event.target.value)}
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
                error={emailValidationError || emailVerificationError}
                hint={
                  emailValidationError || emailVerificationError ? undefined : emailHint
                }
                action={
                  <button
                    type="button"
                    className="auth-form-field__action"
                    disabled={
                      isSubmitting ||
                      emailVerificationState === 'sending' ||
                      emailVerificationState === 'verified' ||
                      Boolean(emailValidationError) ||
                      !trimmedEmail
                    }
                    onClick={handleSendEmailOtp}
                  >
                    {emailVerificationState === 'sending'
                      ? 'Sending...'
                      : emailVerificationState === 'verified'
                        ? 'Verified'
                        : 'Send OTP'}
                  </button>
                }
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
                error={mobileNumberError || mobileVerificationError}
                hint={
                  mobileNumberError || mobileVerificationError ? undefined : mobileHint
                }
                action={
                  <button
                    type="button"
                    className="auth-form-field__action"
                    disabled={
                      isSubmitting ||
                      mobileVerificationState === 'sending' ||
                      mobileVerificationState === 'verified' ||
                      Boolean(mobileNumberError) ||
                      !mobileNumber
                    }
                    onClick={handleSendMobileOtp}
                  >
                    {mobileVerificationState === 'sending'
                      ? 'Sending...'
                      : mobileVerificationState === 'verified'
                        ? 'Verified'
                        : 'Send OTP'}
                  </button>
                }
                onChange={(event) =>
                  resetMobileVerification(normalizeMobileNumber(event.target.value))
                }
              />

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
                hint={usernameError ? undefined : usernameHint}
                onChange={(event) => setUsername(event.target.value.toLowerCase())}
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
                onChange={(event) => setPassword(event.target.value)}
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
                onChange={(event) => setConfirmPassword(event.target.value)}
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
                  hint={dateOfBirthError ? undefined : dateOfBirthHint}
                  onChange={(event) => setDateOfBirth(event.target.value)}
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
                  Both email and mobile must be verified on this form before account
                  creation can continue.
                </AuthHelperText>
              </div>

              {verificationPending && !hasAttemptedSubmit ? (
                <AuthHelperText className="signup-experience__status signup-experience__status--muted">
                  Send OTP on both contact fields to unlock the continue path.
                </AuthHelperText>
              ) : null}

              <AuthSubmitButton disabled={!canSubmit}>
                {isSubmitting ? 'Preparing account...' : 'Create account'}
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
