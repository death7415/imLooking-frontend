import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../../app/router/route-paths.js'
import {
  AuthBrandDock,
  AuthHelperText,
  AuthLegalLinks,
  AuthMethodSwitch,
  AuthPasswordField,
  AuthStageCard,
  AuthStageShell,
  AuthSubmitButton,
  AuthTextField,
} from '../../components/index.js'
import {
  getPasswordValidationError,
  getPhoneNumberValidationError,
  getRequiredFieldError,
  normalizeMobileNumber,
  setAuthSession,
} from '../../model/index.js'
import './LoginScreen.css'

const LOGIN_METHOD_OPTIONS = [
  {
    value: 'phone',
    label: 'Phone number',
    description: 'Use OTP on your mobile number.',
  },
  {
    value: 'identity',
    label: 'Email or username',
    description: 'Use your password to continue.',
  },
]

function getAlternateMethodOptions(loginMethod) {
  return LOGIN_METHOD_OPTIONS.filter((option) => option.value !== loginMethod)
}

export function LoginScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const [loginMethod, setLoginMethod] = useState('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const submitTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current)
      }
    }
  }, [])

  const normalizedPhoneNumber = normalizeMobileNumber(phoneNumber)
  const phoneNumberError = getPhoneNumberValidationError(normalizedPhoneNumber, {
    requiredMessage:
      hasAttemptedSubmit && loginMethod === 'phone'
        ? 'Enter your phone number to continue.'
        : '',
    invalidMessage: 'Enter a valid phone number.',
  })
  const identifierError =
    loginMethod === 'identity' && hasAttemptedSubmit
      ? getRequiredFieldError(
          identifier,
          'Enter your email or username to continue.',
        )
      : ''
  const passwordError =
    loginMethod === 'identity' && hasAttemptedSubmit
      ? getPasswordValidationError(password, {
          requiredMessage: 'Enter your password to continue.',
          invalidMessage: '',
        })
      : ''
  const alternateMethodOptions = getAlternateMethodOptions(loginMethod)
  const requestedPath =
    typeof location.state?.from === 'string' ? location.state.from : ''
  const routeNotice = location.state?.passwordReset
    ? 'Password reset is complete. Sign in with your new password to continue.'
    : location.state?.signupCompleted
      ? 'Account details are staged. Sign in to enter the protected app shell.'
      : requestedPath
        ? 'Sign in to continue into the protected part of the app.'
        : ''

  function handleMethodChange(nextMethod) {
    setLoginMethod(nextMethod)
    setHasAttemptedSubmit(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setHasAttemptedSubmit(true)

    const phoneFlowBlocked =
      loginMethod === 'phone' && (!!phoneNumberError || !normalizedPhoneNumber)
    const identityFlowBlocked =
      loginMethod === 'identity' &&
      (!!identifierError || !!passwordError || !identifier.trim() || !password.trim())

    if (isSubmitting || phoneFlowBlocked || identityFlowBlocked) {
      return
    }

    setIsSubmitting(true)

    submitTimerRef.current = window.setTimeout(() => {
      setIsSubmitting(false)
      submitTimerRef.current = null
      setAuthSession({ isAuthenticated: true })
      navigate(requestedPath || ROUTE_PATHS.HOME, { replace: true })
    }, 900)
  }

  const canSubmit =
    loginMethod === 'phone'
      ? Boolean(normalizedPhoneNumber) && !phoneNumberError && !isSubmitting
      : Boolean(identifier.trim()) &&
        Boolean(password.trim()) &&
        !identifierError &&
        !passwordError &&
        !isSubmitting

  return (
    <AuthStageShell frameWidth="compact" className="login-experience">
      <div className="login-experience__stage">
        <AuthBrandDock />

        <motion.div
          className="login-experience__card-motion"
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AuthStageCard variant="form" className="login-experience__card">
            <header className="login-experience__card-header">
              <h1 className="login-experience__card-title">Login</h1>
              <p className="login-experience__card-copy">
                Start with your phone number for OTP login, or switch to email or
                username with password if you prefer.
              </p>
            </header>

            {routeNotice ? (
              <AuthHelperText className="login-experience__status login-experience__status--info">
                {routeNotice}
              </AuthHelperText>
            ) : null}

            <form className="login-experience__form" noValidate onSubmit={handleSubmit}>
              {loginMethod === 'phone' ? (
                <>
                  <AuthTextField
                    id="login-phone-number"
                    type="tel"
                    name="phoneNumber"
                    label="Phone number"
                    placeholder="9876543210"
                    autoComplete="tel"
                    inputMode="tel"
                    value={phoneNumber}
                    disabled={isSubmitting}
                    error={phoneNumberError}
                    hint={
                      phoneNumberError
                        ? undefined
                        : 'We will send a one-time password to this number.'
                    }
                    onChange={(event) =>
                      setPhoneNumber(normalizeMobileNumber(event.target.value))
                    }
                  />

                  <div className="login-experience__form-meta login-experience__form-meta--single">
                    <AuthHelperText>
                      Password is skipped for this path. Entry continues through OTP.
                    </AuthHelperText>
                  </div>

                  <AuthMethodSwitch
                    className="login-experience__method-switch"
                    label="Prefer password login instead?"
                    value={loginMethod}
                    options={alternateMethodOptions}
                    disabled={isSubmitting}
                    onChange={handleMethodChange}
                  />
                </>
              ) : (
                <>
                  <AuthMethodSwitch
                    className="login-experience__method-switch"
                    label="Prefer OTP login instead?"
                    value={loginMethod}
                    options={alternateMethodOptions}
                    disabled={isSubmitting}
                    onChange={handleMethodChange}
                  />

                  <AuthTextField
                    id="login-identifier"
                    type="text"
                    name="identifier"
                    label="Email or username"
                    placeholder="you@example.com or your.handle"
                    autoComplete="username"
                    value={identifier}
                    disabled={isSubmitting}
                    error={identifierError}
                    onChange={(event) => setIdentifier(event.target.value)}
                  />

                  <AuthPasswordField
                    id="login-password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    disabled={isSubmitting}
                    error={passwordError}
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <div className="login-experience__form-meta">
                    <AuthHelperText>Private entry only after sign-in.</AuthHelperText>
                    <Link className="login-experience__link" to={ROUTE_PATHS.FORGOT_PASSWORD}>
                      Forgot password?
                    </Link>
                  </div>
                </>
              )}

              <AuthSubmitButton disabled={!canSubmit}>
                {isSubmitting
                  ? loginMethod === 'phone'
                    ? 'Sending OTP...'
                    : 'Signing in...'
                  : loginMethod === 'phone'
                    ? 'Continue with OTP'
                    : 'Continue'}
              </AuthSubmitButton>
            </form>

            <AuthLegalLinks
              className="login-experience__legal-links"
              message="Need the details first? Review our"
            />

            <p className="login-experience__subcopy">
              New here? <Link to={ROUTE_PATHS.SIGNUP}>Create your account</Link>
            </p>
          </AuthStageCard>
        </motion.div>
      </div>
    </AuthStageShell>
  )
}
