import { useState } from 'react'
import { AuthHelperText } from '../../feedback/auth-helper-text/AuthHelperText.jsx'
import { AuthInlineError } from '../../feedback/auth-inline-error/AuthInlineError.jsx'
import '../auth-form-field/AuthFormField.css'

export function AuthPasswordField({
  id,
  label,
  hint,
  error,
  className = '',
  disabled = false,
  ...props
}) {
  const [revealed, setRevealed] = useState(false)
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const classes = ['auth-form-field', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <label className="auth-form-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="auth-form-field__control-wrap auth-form-field__control-wrap--password">
        <input
          id={id}
          className="auth-form-field__control"
          type={revealed ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          {...props}
        />
        <button
          type="button"
          className="auth-form-field__toggle"
          aria-label={revealed ? 'Hide password' : 'Show password'}
          disabled={disabled}
          onClick={() => setRevealed((value) => !value)}
        >
          {revealed ? 'Hide' : 'Show'}
        </button>
      </div>
      {error ? (
        <AuthInlineError id={messageId}>{error}</AuthInlineError>
      ) : hint ? (
        <AuthHelperText id={messageId}>{hint}</AuthHelperText>
      ) : null}
    </div>
  )
}
