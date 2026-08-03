import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../../app/router/route-paths.js'
import {
  AuthBrandDock,
  AuthHelperText,
  AuthLegalLinks,
  AuthStageCard,
  AuthStageShell,
  AuthSubmitButton,
  AuthTextField,
} from '../../components/index.js'
import { getRequiredFieldError } from '../../model/index.js'
import './ForgotPasswordScreen.css'

export function ForgotPasswordScreen() {
  const [identifier, setIdentifier] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [submitNotice, setSubmitNotice] = useState('')
  const submitTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current)
      }
    }
  }, [])

  const identifierError = hasAttemptedSubmit
    ? getRequiredFieldError(identifier, 'Enter your email or username to continue.')
    : ''
  const canSubmit = Boolean(identifier.trim()) && !identifierError && !isSubmitting

  function clearTransientState() {
    setSubmitNotice('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setHasAttemptedSubmit(true)

    if (!canSubmit) {
      return
    }

    clearTransientState()
    setIsSubmitting(true)

    // TODO: Replace the temporary frontend-only recovery response with the real forgot-password API once auth-flow wiring lands.
    submitTimerRef.current = window.setTimeout(() => {
      setIsSubmitting(false)
      setSubmitNotice(
        'If an account matches that information, recovery instructions will be sent once backend delivery is connected.',
      )
      submitTimerRef.current = null
    }, 900)
  }

  return (
    <AuthStageShell frameWidth="compact" className="forgot-password-screen">
      <div className="forgot-password-screen__stage">
        <AuthBrandDock />

        <motion.div
          className="forgot-password-screen__card-motion"
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.18,
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AuthStageCard variant="form" className="forgot-password-screen__card">
            <header className="forgot-password-screen__card-header">
              <h1 className="forgot-password-screen__card-title">Forgot password</h1>
              <p className="forgot-password-screen__card-copy">
                Enter the account identifier you use for password login. Recovery
                responses stay generic so the flow does not leak account existence.
              </p>
            </header>

            <form
              className="forgot-password-screen__form"
              noValidate
              onSubmit={handleSubmit}
            >
              <AuthTextField
                id="forgot-password-identifier"
                type="text"
                name="identifier"
                label="Email or username"
                placeholder="you@example.com or your.handle"
                autoComplete="username"
                value={identifier}
                disabled={isSubmitting}
                error={identifierError}
                hint={
                  identifierError
                    ? undefined
                    : 'We will keep the recovery response generic either way.'
                }
                onChange={(event) => {
                  setIdentifier(event.target.value)
                  clearTransientState()
                }}
              />

              <div className="forgot-password-screen__form-meta">
                <AuthHelperText>
                  Password recovery continues only after backend delivery is available.
                </AuthHelperText>
              </div>

              {submitNotice ? (
                <AuthHelperText className="forgot-password-screen__status forgot-password-screen__status--info">
                  {submitNotice}
                </AuthHelperText>
              ) : null}

              <AuthSubmitButton disabled={!canSubmit}>
                {isSubmitting ? 'Preparing recovery...' : 'Send recovery instructions'}
              </AuthSubmitButton>
            </form>

            <AuthLegalLinks
              className="forgot-password-screen__legal-links"
              message="Need the details first? Review our"
            />

            <p className="forgot-password-screen__subcopy">
              Remembered it? <Link to={ROUTE_PATHS.LOGIN}>Back to login</Link>
            </p>
          </AuthStageCard>
        </motion.div>
      </div>
    </AuthStageShell>
  )
}
