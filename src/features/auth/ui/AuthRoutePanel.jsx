import { AuthBrandDock } from './AuthBrandDock.jsx'
import { AuthStageCard } from './AuthStageCard.jsx'
import { AuthStageShell } from './AuthStageShell.jsx'
import './AuthRoutePanel.css'

export function AuthRoutePanel({
  eyebrow,
  title,
  description,
  highlights = [],
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
        </AuthStageCard>
      </div>
    </AuthStageShell>
  )
}
