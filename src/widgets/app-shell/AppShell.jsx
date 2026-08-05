import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../app/router/route-paths.js'
import { NavigationMenu } from '../../shared/ui/navigation-menu/NavigationMenu.jsx'
import { Button } from '../../shared/ui/button/Button.jsx'
import { clearAuthSession } from '../../features/auth/model/auth-session.js'
import { fetchApi } from '../../shared/api/api-client.js'
import { API_ENDPOINTS } from '../../shared/config/api.js'
import './AppShell.css'

const navItems = [
  { to: ROUTE_PATHS.HOME, label: 'Home' },
  { to: ROUTE_PATHS.ONBOARDING, label: 'Onboarding' },
  { to: ROUTE_PATHS.CHAT, label: 'Chat' },
]

export function AppShell() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    // Notify the backend to invalidate the token if necessary
    await fetchApi(API_ENDPOINTS.auth.logout, { method: 'POST' })
    
    clearAuthSession()
    navigate(ROUTE_PATHS.LOGIN, { replace: true })
  }

  return (
    <main className="app-shell">
      <div className="app-shell__chrome">
        <header className="app-shell__header">
          <div className="app-shell__brand">
            <span className="app-shell__brand-mark">Phase 0</span>
            <span className="app-shell__brand-name">imLooking Foundation</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <NavigationMenu items={navItems} ariaLabel="Primary" />
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>

        <section className="app-shell__content">
          <Outlet />
        </section>
      </div>
    </main>
  )
}
