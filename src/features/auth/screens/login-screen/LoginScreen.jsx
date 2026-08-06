import { motion } from 'motion/react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../../app/router/route-paths.js'
import { fetchApi } from '../../../../shared/api/api-client.js'
import { API_ENDPOINTS } from '../../../../shared/config/api.js'
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
  getPostAuthPath,
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
  const [phoneOtpCode, setPhoneOtpCode] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [hasAttemptedOtpSubmit, setHasAttemptedOtpSubmit] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authErrorAction, setAuthErrorAction] = useState('')
  const [phoneLoginState, setPhoneLoginState] = useState('idle')
  const [phoneLoginNotice, setPhoneLoginNotice] = useState('')

  const normalizedPhoneNumber = normalizeMobileNumber(phoneNumber)
  const trimmedPhoneOtpCode = phoneOtpCode.trim()
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
  const phoneOtpError =
    loginMethod === 'phone' &&
    phoneLoginState === 'otp-sent' &&
    hasAttemptedOtpSubmit &&
    !trimmedPhoneOtpCode
      ? 'Enter the OTP sent to your phone number.'
      : ''
  const alternateMethodOptions = getAlternateMethodOptions(loginMethod)
  const requestedPath =
    typeof location.state?.from === 'string' ? location.state.from : ''
  const routeNotice = location.state?.passwordReset
    ? 'Password reset is complete. Sign in with your new password to continue.'
    : requestedPath
        ? 'Sign in to continue into the protected part of the app.'
        : ''

  function handleMethodChange(nextMethod) {
    setLoginMethod(nextMethod)
    setHasAttemptedSubmit(false)
    setHasAttemptedOtpSubmit(false)
    setAuthError('')
    setAuthErrorAction('')
    setPhoneOtpCode('')
    setPhoneLoginState('idle')
    setPhoneLoginNotice('')
  }

  function resetPhoneOtpState(nextPhoneNumber) {
    setPhoneNumber(nextPhoneNumber)
    setPhoneOtpCode('')
    setPhoneLoginState('idle')
    setPhoneLoginNotice('')
    setHasAttemptedOtpSubmit(false)
  }

  async function startPhoneLoginOtp() {
    const { data, error, errorAction } = await fetchApi(
      API_ENDPOINTS.auth.loginOtpStart,
      {
        method: 'POST',
        body: JSON.stringify({ phoneNumber: normalizedPhoneNumber }),
      },
    )

    if (error) {
      setAuthError(error)
      setAuthErrorAction(errorAction)
      setPhoneLoginState('idle')
      return
    }

    setPhoneLoginState('otp-sent')
    setPhoneLoginNotice(
      data?.message ||
        'If the account exists, login verification instructions have been prepared.',
    )
  }

  async function completePhoneLoginOtp() {
    setHasAttemptedOtpSubmit(true)
    if (!trimmedPhoneOtpCode) {
      return
    }

    setPhoneLoginState('verifying')

    const { data, error, errorAction } = await fetchApi(
      API_ENDPOINTS.auth.loginOtpComplete,
      {
        method: 'POST',
        body: JSON.stringify({
          phoneNumber: normalizedPhoneNumber,
          verificationCode: trimmedPhoneOtpCode,
        }),
      },
    )

    if (error) {
      setPhoneLoginState('otp-sent')
      setAuthError(error)
      setAuthErrorAction(errorAction)
      return
    }

    const nextSession = setAuthSession({
      isAuthenticated: true,
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
      email: data?.email,
      emailVerified: data?.emailVerified === true,
      phoneVerified: data?.phoneVerified === true,
      profileCompleted: data?.profileCompleted === true,
    })
    navigate(requestedPath || getPostAuthPath(nextSession), { replace: true })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setHasAttemptedSubmit(true)
    setAuthError('')
    setAuthErrorAction('')

    const phoneFlowBlocked =
      loginMethod === 'phone' && (!!phoneNumberError || !normalizedPhoneNumber)
    const identityFlowBlocked =
      loginMethod === 'identity' &&
      (!!identifierError || !!passwordError || !identifier.trim() || !password.trim())

    if (isSubmitting || phoneFlowBlocked || identityFlowBlocked) {
      return
    }

    setIsSubmitting(true)

    if (loginMethod === 'phone') {
      if (phoneLoginState === 'otp-sent') {
        await completePhoneLoginOtp()
      } else {
        await startPhoneLoginOtp()
      }

      setIsSubmitting(false)
    } else {
      const { data, error, errorAction } = await fetchApi(API_ENDPOINTS.auth.login, {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      })

      setIsSubmitting(false)

      if (error) {
        setAuthError(error)
        setAuthErrorAction(errorAction)
        return
      }

      const nextSession = setAuthSession({
        isAuthenticated: true,
        accessToken: data?.accessToken,
        refreshToken: data?.refreshToken,
        email: data?.email,
        emailVerified: data?.emailVerified === true,
        phoneVerified: data?.phoneVerified === true,
        profileCompleted: data?.profileCompleted === true,
      })
      navigate(requestedPath || getPostAuthPath(nextSession), { replace: true })
    }
  }

  const canSubmit =
    loginMethod === 'phone'
      ? phoneLoginState === 'otp-sent'
        ? Boolean(normalizedPhoneNumber) &&
          !phoneNumberError &&
          Boolean(trimmedPhoneOtpCode) &&
          !isSubmitting
        : Boolean(normalizedPhoneNumber) && !phoneNumberError && !isSubmitting
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

            {authError ? (
              <AuthHelperText className="login-experience__status login-experience__status--error" style={{ color: 'var(--text-error)' }}>
                {authError}
              </AuthHelperText>
            ) : null}

            {authErrorAction ? (
              <AuthHelperText className="login-experience__status login-experience__status--error" style={{ color: 'var(--text-error)' }}>
                {authErrorAction}
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
                        : phoneLoginState === 'sending'
                          ? 'Sending OTP now...'
                          : phoneLoginState === 'otp-sent'
                            ? 'OTP sent. Enter the latest code to continue.'
                            : phoneLoginNotice
                              ? phoneLoginNotice
                              : 'We will send a one-time password to this number.'
                    }
                    action={
                      phoneLoginState === 'otp-sent' ? (
                        <button
                          type="button"
                          className="auth-form-field__action"
                          disabled={isSubmitting || Boolean(phoneNumberError)}
                          onClick={async () => {
                            setAuthError('')
                            setAuthErrorAction('')
                            setIsSubmitting(true)
                            setPhoneLoginState('sending')
                            await startPhoneLoginOtp()
                            setIsSubmitting(false)
                          }}
                        >
                          {isSubmitting ? 'Sending...' : 'Resend OTP'}
                        </button>
                      ) : undefined
                    }
                    onChange={(event) => {
                      resetPhoneOtpState(normalizeMobileNumber(event.target.value))
                      setAuthError('')
                      setAuthErrorAction('')
                    }}
                  />

                  {phoneLoginState === 'otp-sent' ? (
                    <AuthTextField
                      id="login-phone-otp"
                      type="text"
                      name="phoneOtpCode"
                      label="OTP"
                      placeholder="Enter the OTP"
                      inputMode="numeric"
                      value={phoneOtpCode}
                      disabled={isSubmitting}
                      error={phoneOtpError}
                      hint={
                        phoneOtpError
                          ? undefined
                          : 'Use the latest OTP delivered by the backend.'
                      }
                      onChange={(event) => {
                        setPhoneOtpCode(event.target.value)
                        setAuthError('')
                        setAuthErrorAction('')
                      }}
                    />
                  ) : null}

                  <div className="login-experience__form-meta login-experience__form-meta--single">
                    <AuthHelperText>
                      Password is skipped for this path. In trial-mode development,
                      SMS may be rerouted to the verified fallback handset.
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
                    onChange={(event) => {
                      setIdentifier(event.target.value)
                      setAuthError('')
                      setAuthErrorAction('')
                    }}
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
                    onChange={(event) => {
                      setPassword(event.target.value)
                      setAuthError('')
                      setAuthErrorAction('')
                    }}
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
                    ? phoneLoginState === 'otp-sent'
                      ? 'Verifying OTP...'
                      : 'Sending OTP...'
                    : 'Signing in...'
                  : loginMethod === 'phone'
                    ? phoneLoginState === 'otp-sent'
                      ? 'Verify OTP'
                      : 'Send OTP'
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
