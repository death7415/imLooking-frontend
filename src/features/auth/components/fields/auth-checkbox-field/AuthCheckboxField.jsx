import { AuthHelperText } from '../../feedback/auth-helper-text/AuthHelperText.jsx'
import { AuthInlineError } from '../../feedback/auth-inline-error/AuthInlineError.jsx'
import './AuthCheckboxField.css'

export function AuthCheckboxField({
  id,
  label,
  hint,
  error,
  className = '',
  ...props
}) {
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const classes = ['auth-checkbox-field', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <label className="auth-checkbox-field__label" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          className="auth-checkbox-field__control"
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          {...props}
        />
        <span className="auth-checkbox-field__copy">{label}</span>
      </label>
      {error ? (
        <AuthInlineError id={messageId} className="auth-checkbox-field__message">
          {error}
        </AuthInlineError>
      ) : hint ? (
        <AuthHelperText id={messageId} className="auth-checkbox-field__message">
          {hint}
        </AuthHelperText>
      ) : null}
    </div>
  )
}
