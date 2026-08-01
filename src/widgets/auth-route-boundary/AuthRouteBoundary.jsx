import { Outlet } from 'react-router-dom'
import './AuthRouteBoundary.css'

export function AuthRouteBoundary() {
  return (
    <main className="auth-route-boundary">
      <div className="auth-route-boundary__frame">
        <Outlet />
      </div>
    </main>
  )
}
