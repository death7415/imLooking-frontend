import './Toast.css'

export function Toast({ title, description, variant = 'info' }) {
  const role = variant === 'error' ? 'alert' : 'status'

  return (
    <section className={`ui-toast ui-toast--${variant}`} role={role}>
      <strong className="ui-toast__title">{title}</strong>
      {description ? <p className="ui-toast__description">{description}</p> : null}
    </section>
  )
}
