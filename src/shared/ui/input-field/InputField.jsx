import './InputField.css'

export function InputField({
  error,
  hint,
  id,
  label,
  className = '',
  ...props
}) {
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={`ui-input-field ${className}`.trim()}>
      <label className="ui-input-field__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="ui-input-field__control"
        aria-invalid={Boolean(error)}
        aria-describedby={messageId}
        {...props}
      />
      {error ? (
        <p id={messageId} className="ui-input-field__message ui-input-field__message--error">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="ui-input-field__message">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
