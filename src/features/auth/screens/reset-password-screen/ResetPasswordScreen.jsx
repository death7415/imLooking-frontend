import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../../app/router/route-paths.js'
import {
  AuthBrandDock,
  AuthHelperText,
  AuthInlineError,
  AuthLegalLinks,
  AuthPasswordField,
  AuthStageCard,
  AuthStageShell,
  AuthSubmitButton,
} from '../../components/index.js'
import {
  getConfirmPasswordValidationError,
  getPasswordValidationError,
} from '../../model/index.js'
import './ResetPasswordScreen.css'

function getTokenState(searchParams) {
  const state = searchParams.get('state')

  if (state === 'invalid' || state === 'expired') {
    return state
  }

  return 'ready'
}

export function ResetPasswordScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitTimerRef = useRef(null)
  const tokenState = getTokenState(searchParams)

  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current)
      }
    }
  }, [])

  const passwordError =
    hasAttemptedSubmit || password
      ? getPasswordValidationError(password, {
          requiredMessage: hasAttemptedSubmit
            ? 'Create a new password to continue.'
            : '',
        })
      : ''
  const confirmPasswordError =
    hasAttemptedSubmit || confirmPassword
      ? getConfirmPasswordValidationError(confirmPassword, password, {
          requiredMessage: 'Confirm your new password to continue.',
        })
      : ''
  const canSubmit =
    tokenState === 'ready' &&
    Boolean(password) &&
    Boolean(confirmPassword) &&
    !passwordError &&
    !confirmPasswordError &&
    !isSubmitting

  function handleSubmit(event) {
    event.preventDefault()
    setHasAttemptedSubmit(true)

    if (!canSubmit) {
      return
    }

    setIsSubmitting(true)

    submitTimerRef.current = window.setTimeout(() => {
      setIsSubmitting(false)
      submitTimerRef.current = null
      navigate(ROUTE_PATHS.LOGIN, {
        replace: true,
        state: {
          passwordReset: true,
        },
      })
    }, 950)
  }

  return (
    <AuthStageShell frameWidth="compact" className="reset-password-screen">
      <div className="reset-password-screen__stage">
        <AuthBrandDock />

        <motion.div
          className="reset-password-screen__card-motion"
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.18,
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AuthStageCard variant="form" className="reset-password-screen__card">
            <header className="reset-password-screen__card-header">
              <h1 className="reset-password-screen__card-title">Reset password</h1>
              <p className="reset-password-screen__card-copy">
                Create a new password for your account, or handle expired and invalid
                recovery states from the same dedicated route.
              </p>
            </header>

            {tokenState !== 'ready' ? (
              <div className="reset-password-screen__state-block">
                <AuthInlineError className="reset-password-screen__state-message">
                  {tokenState === 'expired'
                    ? 'This recovery link has expired.'
                    : 'This recovery link is invalid.'}
                </AuthInlineError>
                <AuthHelperText className="reset-password-screen__state-copy">
                  Request a fresh recovery link before trying again.
                </AuthHelperText>
                <div className="reset-password-screen__state-actions">
                  <Link to={ROUTE_PATHS.FORGOT_PASSWORD}>Request another link</Link>
                  <Link to={ROUTE_PATHS.LOGIN}>Back to login</Link>
                </div>
              </div>
            ) : (
              <form
                className="reset-password-screen__form"
                noValidate
                onSubmit={handleSubmit}
              >
                <AuthPasswordField
                  id="reset-password-new"
                  name="password"
                  label="New password"
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  value={password}
                  disabled={isSubmitting}
                  error={passwordError}
                  hint={passwordError ? undefined : 'Use at least 8 characters.'}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <AuthPasswordField
                  id="reset-password-confirm"
                  name="confirmPassword"
                  label="Confirm new password"
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  disabled={isSubmitting}
                  error={confirmPasswordError}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />

                <div className="reset-password-screen__form-meta">
                  <AuthHelperText>
                    This frontend flow now returns you to login after a valid reset.
                  </AuthHelperText>
                </div>

                <AuthSubmitButton disabled={!canSubmit}>
                  {isSubmitting ? 'Resetting password...' : 'Reset password'}
                </AuthSubmitButton>
              </form>
            )}

            <AuthLegalLinks
              className="reset-password-screen__legal-links"
              message="Need the details first? Review our"
            />

            <p className="reset-password-screen__subcopy">
              Need another route? <Link to={ROUTE_PATHS.LOGIN}>Back to login</Link>
            </p>
          </AuthStageCard>
        </motion.div>
      </div>
    </AuthStageShell>
  )
}
