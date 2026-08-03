import { AuthBrandMark } from '../auth-brand-mark/AuthBrandMark.jsx'
import './AuthBrandDock.css'

export function AuthBrandDock() {
  return (
    <div className="auth-brand-dock">
      <AuthBrandMark size="dock" />
    </div>
  )
}
