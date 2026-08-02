import { Outlet } from 'react-router-dom'
import { ROUTE_PATHS } from '../../app/router/route-paths.js'
import { NavigationMenu } from '../../shared/ui/navigation-menu/NavigationMenu.jsx'
import './AppShell.css'

const navItems = [
  { to: ROUTE_PATHS.HOME, label: 'Home' },
  { to: ROUTE_PATHS.ONBOARDING, label: 'Onboarding' },
  { to: ROUTE_PATHS.CHAT, label: 'Chat' },
]

export function AppShell() {
  return (
    <main className="app-shell">
      <div className="app-shell__chrome">
        <header className="app-shell__header">
          <div className="app-shell__brand">
            <span className="app-shell__brand-mark">Phase 0</span>
            <span className="app-shell__brand-name">imLooking Foundation</span>
          </div>

          <NavigationMenu items={navItems} ariaLabel="Primary" />
        </header>

        <section className="app-shell__content">
          <Outlet />
        </section>
      </div>
    </main>
  )
}
