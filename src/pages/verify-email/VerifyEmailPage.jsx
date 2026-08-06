import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  getAuthSession,
  getPostAuthPath,
  setAuthSession,
} from '../../features/auth/model/index.js'
import { fetchApi } from '../../shared/api/api-client.js'
import { API_ENDPOINTS } from '../../shared/config/api.js'
import { Button } from '../../shared/ui/button/Button.jsx'
import { FoundationPanel } from '../../shared/ui/foundation-panel/FoundationPanel.jsx'

export function VerifyEmailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const session = getAuthSession()
  const [statusMessage, setStatusMessage] = useState(
    'Use the verify button from your latest email, then confirm the status here.',
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [errorAction, setErrorAction] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  async function syncSessionAndContinue() {
    const { data, error, errorAction: nextErrorAction } = await fetchApi(
      API_ENDPOINTS.auth.session,
      { method: 'GET' },
    )

    if (error) {
      setErrorMessage(error)
      setErrorAction(nextErrorAction)
      return
    }

    const nextSession = setAuthSession({
      ...session,
      isAuthenticated: data?.authenticated === true,
      email: data?.email || session.email,
      emailVerified: data?.emailVerified === true,
      phoneVerified: data?.phoneVerified === true,
      profileCompleted: data?.profileCompleted === true,
    })

    navigate(getPostAuthPath(nextSession), { replace: true })
  }

  async function handleResendVerification() {
    if (!session.email) {
      setErrorMessage('Your account email is not available right now.')
      setErrorAction('Please complete your profile first or sign in again.')
      return
    }

    setErrorMessage('')
    setErrorAction('')
    setIsSending(true)

    const { data, error, errorAction: nextErrorAction } = await fetchApi(
      API_ENDPOINTS.auth.emailVerificationStart,
      {
        method: 'POST',
        body: JSON.stringify({ email: session.email }),
      },
    )

    setIsSending(false)

    if (error) {
      setErrorMessage(error)
      setErrorAction(nextErrorAction)
      return
    }

    setStatusMessage(
      data?.message ||
        'A fresh verification email has been prepared. Open it and use the verify button.',
    )
  }

  async function handleCheckStatus() {
    if (!session.email) {
      setErrorMessage('Your account email is not available right now.')
      setErrorAction('Please complete your profile first or sign in again.')
      return
    }

    setErrorMessage('')
    setErrorAction('')
    setIsChecking(true)

    const { data, error, errorAction: nextErrorAction } = await fetchApi(
      `${API_ENDPOINTS.auth.emailVerificationStatus}?email=${encodeURIComponent(session.email)}`,
      { method: 'GET' },
    )

    setIsChecking(false)

    if (error) {
      setErrorMessage(error)
      setErrorAction(nextErrorAction)
      return
    }

    if (data?.verified) {
      setStatusMessage('Email verified. Redirecting you now.')
      await syncSessionAndContinue()
      return
    }

    setStatusMessage(
      'Email is still pending verification. Open the latest email and click the verify button first.',
    )
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('status') === 'verified' && session.email) {
      setStatusMessage('Email link opened successfully. Confirming status now.')
      void handleCheckStatus()
    }
  }, [])

  return (
    <FoundationPanel
      eyebrow="Account Access"
      title="Verify your email to unlock the home experience."
      description="Your account is active and your phone is verified. Home stays hidden until your email is verified."
      highlights={[
        `Signed-in email: ${session.email || 'Not available'}`,
        'Click the verify button from the latest email we sent',
        'Use check status here after the email link is used',
      ]}
      footer={
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button onClick={handleResendVerification} disabled={isSending || isChecking}>
              {isSending ? 'Sending...' : 'Resend email'}
            </Button>
            <Button
              variant="ghost"
              onClick={handleCheckStatus}
              disabled={isSending || isChecking}
            >
              {isChecking ? 'Checking...' : 'Check status'}
            </Button>
          </div>
          <p>{statusMessage}</p>
          {errorMessage ? <p>{errorMessage}</p> : null}
          {errorAction ? <p>{errorAction}</p> : null}
        </div>
      }
    />
  )
}
