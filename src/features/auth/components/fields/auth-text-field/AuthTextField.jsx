import { AuthHelperText } from '../../feedback/auth-helper-text/AuthHelperText.jsx'
import { AuthInlineError } from '../../feedback/auth-inline-error/AuthInlineError.jsx'
import '../auth-form-field/AuthFormField.css'

export function AuthTextField({
  id,
  label,
  hint,
  error,
  action,
  className = '',
  controlClassName = '',
  ...props
}) {
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const classes = ['auth-form-field', className].filter(Boolean).join(' ')
  const controlWrapClasses = [
    'auth-form-field__control-wrap',
    action ? 'auth-form-field__control-wrap--action' : '',
    controlClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <label className="auth-form-field__label" htmlFor={id}>
        {label}
      </label>
      <div className={controlWrapClasses}>
        <input
          id={id}
          className="auth-form-field__control"
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          {...props}
        />
        {action}
      </div>
      {error ? (
        <AuthInlineError id={messageId}>{error}</AuthInlineError>
      ) : hint ? (
        <AuthHelperText id={messageId}>{hint}</AuthHelperText>
      ) : null}
    </div>
  )
}
