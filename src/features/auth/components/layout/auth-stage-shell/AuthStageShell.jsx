import './AuthStageShell.css'

export function AuthStageShell({
  children,
  frameWidth = 'compact',
  className = '',
}) {
  const classes = ['auth-stage-shell', className].filter(Boolean).join(' ')

  return (
    <section className={classes}>
      <div className="auth-stage-shell__ambient" aria-hidden="true" />
      <div className={`auth-stage-shell__frame auth-stage-shell__frame--${frameWidth}`}>
        {children}
      </div>
    </section>
  )
}
