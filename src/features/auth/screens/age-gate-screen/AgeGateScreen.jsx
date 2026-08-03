import { motion } from 'motion/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../../app/router/route-paths.js'
import {
  AuthBrandDock,
  AuthHelperText,
  AuthInlineError,
  AuthLegalLinks,
  AuthStageCard,
  AuthStageShell,
} from '../../components/index.js'
import { Button } from '../../../../shared/ui/button/Button.jsx'
import './AgeGateScreen.css'

export function AgeGateScreen() {
  const navigate = useNavigate()
  const [selection, setSelection] = useState('unknown')

  const isEligible = selection === 'eligible'
  const isUnderage = selection === 'underage'

  return (
    <AuthStageShell frameWidth="compact" className="age-gate-screen">
      <div className="age-gate-screen__stage">
        <AuthBrandDock />

        <motion.div
          className="age-gate-screen__card-motion"
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.18,
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AuthStageCard variant="form" className="age-gate-screen__card">
            <header className="age-gate-screen__card-header">
              <h1 className="age-gate-screen__card-title">Age gate</h1>
              <p className="age-gate-screen__card-copy">
                Confirm that you are old enough to continue into the private part of
                onboarding before consent and activation move forward.
              </p>
            </header>

            <div className="age-gate-screen__body">
              <div className="age-gate-screen__choices">
                <Button
                  className="age-gate-screen__choice"
                  variant={isEligible ? 'primary' : 'secondary'}
                  onClick={() => setSelection('eligible')}
                >
                  I am 18 or older
                </Button>

                <Button
                  className="age-gate-screen__choice"
                  variant={isUnderage ? 'primary' : 'secondary'}
                  onClick={() => setSelection('underage')}
                >
                  I am under 18
                </Button>
              </div>

              {selection === 'unknown' ? (
                <AuthHelperText className="age-gate-screen__status age-gate-screen__status--muted">
                  Select one path before continuing.
                </AuthHelperText>
              ) : null}

              {isEligible ? (
                <AuthHelperText className="age-gate-screen__status age-gate-screen__status--info">
                  You can continue to the consent checkpoint now.
                </AuthHelperText>
              ) : null}

              {isUnderage ? (
                <div className="age-gate-screen__rejection">
                  <AuthInlineError className="age-gate-screen__rejection-title">
                    You cannot continue because this experience is limited to adults.
                  </AuthInlineError>
                  <AuthHelperText className="age-gate-screen__rejection-copy">
                    This state should eventually hand off to policy-safe underage exit
                    handling once backend flow wiring is ready.
                  </AuthHelperText>
                </div>
              ) : null}

              <div className="age-gate-screen__actions">
                <Button
                  onClick={() =>
                    navigate(ROUTE_PATHS.CONSENT, {
                      state: {
                        from: ROUTE_PATHS.AGE_GATE,
                        next: ROUTE_PATHS.SIGNUP,
                      },
                    })
                  }
                  disabled={!isEligible}
                >
                  Continue to consent
                </Button>

                <Link className="age-gate-screen__back-link" to={ROUTE_PATHS.SIGNUP}>
                  Back to signup
                </Link>
              </div>
            </div>

            <AuthLegalLinks
              className="age-gate-screen__legal-links"
              message="Need the details first? Review our"
            />
          </AuthStageCard>
        </motion.div>
      </div>
    </AuthStageShell>
  )
}
