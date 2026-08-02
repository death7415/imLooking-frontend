import { NavLink } from 'react-router-dom'
import './NavigationMenu.css'

export function NavigationMenu({ items, ariaLabel = 'Navigation' }) {
  return (
    <nav className="ui-navigation-menu" aria-label={ariaLabel}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive
              ? 'ui-navigation-menu__link ui-navigation-menu__link--active'
              : 'ui-navigation-menu__link'
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
