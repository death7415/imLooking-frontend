import './AuthMethodSwitch.css'

export function AuthMethodSwitch({
  label,
  value,
  options,
  className = '',
  disabled = false,
  onChange,
}) {
  const classes = ['auth-method-switch', className].filter(Boolean).join(' ')
  const groupClasses = [
    'auth-method-switch__group',
    options.length === 1 ? 'auth-method-switch__group--single' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {label ? <p className="auth-method-switch__label">{label}</p> : null}

      <div
        className={groupClasses}
        role="tablist"
        aria-label={label ?? 'Authentication method'}
      >
        {options.map((option) => {
          const isActive = option.value === value

          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={disabled}
              className={[
                'auth-method-switch__option',
                isActive ? 'auth-method-switch__option--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onChange(option.value)}
            >
              <span className="auth-method-switch__title">{option.label}</span>
              {option.description ? (
                <span className="auth-method-switch__copy">
                  {option.description}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
