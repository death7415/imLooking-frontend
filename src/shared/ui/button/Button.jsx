import './Button.css'

export function Button({
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const classes = ['ui-button', `ui-button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
