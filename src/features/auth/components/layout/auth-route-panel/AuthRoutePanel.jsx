import { AuthBrandDock } from '../../brand/auth-brand-dock/AuthBrandDock.jsx'
import { AuthLegalLinks } from '../../navigation/auth-legal-links/AuthLegalLinks.jsx'
import { AuthStageCard } from '../auth-stage-card/AuthStageCard.jsx'
import { AuthStageShell } from '../auth-stage-shell/AuthStageShell.jsx'
import './AuthRoutePanel.css'

export function AuthRoutePanel({
  eyebrow,
  title,
  description,
  highlights = [],
  footer = null,
}) {
  return (
    <AuthStageShell frameWidth="compact">
      <div className="auth-route-panel">
        <AuthBrandDock />

        <AuthStageCard variant="form" className="auth-route-panel__card">
          <header className="auth-route-panel__header">
            <p className="auth-route-panel__eyebrow">{eyebrow}</p>
            <h1 className="auth-route-panel__title">{title}</h1>
            <p className="auth-route-panel__description">{description}</p>
          </header>

          <ul className="auth-route-panel__highlights">
            {highlights.map((highlight) => (
              <li key={highlight} className="auth-route-panel__highlight">
                {highlight}
              </li>
            ))}
          </ul>

          {footer ? <div className="auth-route-panel__footer">{footer}</div> : null}

          <AuthLegalLinks className="auth-route-panel__legal-links" />
        </AuthStageCard>
      </div>
    </AuthStageShell>
  )
}
