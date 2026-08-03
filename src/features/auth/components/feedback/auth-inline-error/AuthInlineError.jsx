import './AuthInlineError.css'

export function AuthInlineError({
  id,
  children,
  className = '',
}) {
  const classes = ['auth-inline-error', className].filter(Boolean).join(' ')

  return (
    <p id={id} className={classes} role="alert">
      {children}
    </p>
  )
}
