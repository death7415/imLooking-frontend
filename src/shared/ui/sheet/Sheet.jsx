import './Sheet.css'

export function Sheet({
  title,
  description,
  children,
  open = false,
  side = 'right',
}) {
  if (!open) {
    return null
  }

  return (
    <div className="ui-sheet-backdrop" role="presentation">
      <aside
        className={`ui-sheet ui-sheet--${side}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="ui-sheet__header">
          <h2 className="ui-sheet__title">{title}</h2>
          {description ? <p className="ui-sheet__description">{description}</p> : null}
        </header>
        <div className="ui-sheet__body">{children}</div>
      </aside>
    </div>
  )
}
