import './AuthHelperText.css'

export function AuthHelperText({
  id,
  children,
  className = '',
}) {
  const classes = ['auth-helper-text', className].filter(Boolean).join(' ')

  return (
    <p id={id} className={classes}>
      {children}
    </p>
  )
}
