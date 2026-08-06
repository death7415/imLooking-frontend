import { motion } from 'motion/react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../../app/router/route-paths.js'
import {
  AuthBrandDock,
  AuthCheckboxField,
  AuthHelperText,
  AuthStageCard,
  AuthStageShell,
  AuthSubmitButton,
} from '../../components/index.js'
import './ConsentScreen.css'

export function ConsentScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
  const [acceptedCommunityGuidelines, setAcceptedCommunityGuidelines] =
    useState(false)
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)

  const nextPath =
    typeof location.state?.next === 'string'
      ? location.state.next
      : ROUTE_PATHS.SIGNUP
  const backPath =
    typeof location.state?.from === 'string'
      ? location.state.from
      : ROUTE_PATHS.AGE_GATE
  const canContinue =
    acceptedTerms && acceptedPrivacy && acceptedCommunityGuidelines
  const consentError =
    hasAttemptedSubmit && !canContinue
      ? 'Accept every acknowledgment before continuing.'
      : ''

  function handleSubmit(event) {
    event.preventDefault()
    setHasAttemptedSubmit(true)

    if (!canContinue) {
      return
    }

    navigate(nextPath, {
      replace: true,
      state: {
        consentCheckpointCompleted: true,
      },
    })
  }

  return (
    <AuthStageShell frameWidth="compact" className="consent-screen">
      <div className="consent-screen__stage">
        <AuthBrandDock />

        <motion.div
          className="consent-screen__card-motion"
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.18,
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AuthStageCard variant="form" className="consent-screen__card">
            <header className="consent-screen__card-header">
              <h1 className="consent-screen__card-title">Consent checkpoint</h1>
              <p className="consent-screen__card-copy">
                Review the legal and safety expectations before private account
                progression continues. This route stays blocked until every required
                acknowledgment is accepted.
              </p>
            </header>

            <form className="consent-screen__form" noValidate onSubmit={handleSubmit}>
              <div className="consent-screen__agreements">
                <AuthCheckboxField
                  id="consent-terms"
                  checked={acceptedTerms}
                  error={!acceptedTerms && consentError ? consentError : undefined}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  label={
                    <>
                      I have reviewed the{' '}
                      <Link to={ROUTE_PATHS.TERMS} state={{ from: ROUTE_PATHS.CONSENT }}>
                        Terms
                      </Link>
                      .
                    </>
                  }
                />

                <AuthCheckboxField
                  id="consent-privacy"
                  checked={acceptedPrivacy}
                  error={
                    acceptedTerms && !acceptedPrivacy && consentError
                      ? consentError
                      : undefined
                  }
                  onChange={(event) => setAcceptedPrivacy(event.target.checked)}
                  label={
                    <>
                      I understand the{' '}
                      <Link to={ROUTE_PATHS.PRIVACY} state={{ from: ROUTE_PATHS.CONSENT }}>
                        Privacy Policy
                      </Link>
                      .
                    </>
                  }
                />

                <AuthCheckboxField
                  id="consent-community"
                  checked={acceptedCommunityGuidelines}
                  error={
                    acceptedTerms &&
                    acceptedPrivacy &&
                    !acceptedCommunityGuidelines &&
                    consentError
                      ? consentError
                      : undefined
                  }
                  onChange={(event) =>
                    setAcceptedCommunityGuidelines(event.target.checked)
                  }
                  label={
                    <>
                      I agree to follow the{' '}
                      <Link
                        to={ROUTE_PATHS.COMMUNITY_GUIDELINES}
                        state={{ from: ROUTE_PATHS.CONSENT }}
                      >
                        Community Guidelines
                      </Link>
                      .
                    </>
                  }
                />
              </div>

              <div className="consent-screen__meta">
                <AuthHelperText>
                  This checkpoint is intentionally explicit so policy review is visible
                  before signup and later profile completion continue.
                </AuthHelperText>
              </div>

              {!hasAttemptedSubmit ? (
                <AuthHelperText className="consent-screen__status consent-screen__status--muted">
                  Open the policy links if you need the full details before continuing.
                </AuthHelperText>
              ) : null}

              <AuthSubmitButton disabled={!canContinue}>Continue</AuthSubmitButton>
            </form>

            <p className="consent-screen__subcopy">
              Need a different step? <Link to={backPath}>Back</Link>
            </p>
          </AuthStageCard>
        </motion.div>
      </div>
    </AuthStageShell>
  )
}

