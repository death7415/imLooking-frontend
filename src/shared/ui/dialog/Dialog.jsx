import './Dialog.css'

export function Dialog({
  title,
  description,
  children,
  footer,
  open = false,
}) {
  if (!open) {
    return null
  }

  return (
    <div className="ui-dialog-backdrop" role="presentation">
      <section className="ui-dialog" role="dialog" aria-modal="true" aria-label={title}>
        <header className="ui-dialog__header">
          <h2 className="ui-dialog__title">{title}</h2>
          {description ? <p className="ui-dialog__description">{description}</p> : null}
        </header>
        <div className="ui-dialog__body">{children}</div>
        {footer ? <footer className="ui-dialog__footer">{footer}</footer> : null}
      </section>
    </div>
  )
}
