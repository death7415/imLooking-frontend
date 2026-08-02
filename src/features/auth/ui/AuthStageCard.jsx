import './AuthStageCard.css'

export function AuthStageCard({
  children,
  variant = 'form',
  className = '',
}) {
  const classes = ['auth-stage-card', `auth-stage-card--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <div className="auth-stage-card__clouds" aria-hidden="true" />
      {children}
    </div>
  )
}
