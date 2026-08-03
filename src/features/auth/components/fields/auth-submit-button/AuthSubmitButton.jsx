import { Button } from '../../../../../shared/ui/button/Button.jsx'
import './AuthSubmitButton.css'

export function AuthSubmitButton({
  children,
  className = '',
  ...props
}) {
  const classes = ['auth-submit-button', className].filter(Boolean).join(' ')

  return (
    <Button type="submit" className={classes} {...props}>
      {children}
    </Button>
  )
}
