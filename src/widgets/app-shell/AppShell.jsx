import { NavLink, Outlet } from 'react-router-dom'
import { ROUTE_PATHS } from '../../app/router/route-paths.js'
import './AppShell.css'

const navItems = [
  { to: ROUTE_PATHS.HOME, label: 'Home' },
  { to: ROUTE_PATHS.ONBOARDING, label: 'Onboarding' },
  { to: ROUTE_PATHS.CHAT, label: 'Chat' },
  { to: ROUTE_PATHS.LOGIN, label: 'Login' },
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

          <nav className="app-shell__nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? 'app-shell__nav-link app-shell__nav-link--active'
                    : 'app-shell__nav-link'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <section className="app-shell__content">
          <Outlet />
        </section>
      </div>
    </main>
  )
}
