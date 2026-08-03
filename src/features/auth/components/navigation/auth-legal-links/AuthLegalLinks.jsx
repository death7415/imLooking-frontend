import { Link, useLocation } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../../../app/router/route-paths.js'
import './AuthLegalLinks.css'

export function AuthLegalLinks({
  className = '',
  message = 'Review our',
}) {
  const location = useLocation()
  const classes = ['auth-legal-links', className].filter(Boolean).join(' ')
  const originPath = `${location.pathname}${location.search}${location.hash}`

  return (
    <p className={classes}>
      {message}{' '}
      <Link to={ROUTE_PATHS.TERMS} state={{ from: originPath }}>
        Terms
      </Link>,{' '}
      <Link to={ROUTE_PATHS.PRIVACY} state={{ from: originPath }}>
        Privacy Policy
      </Link>, and{' '}
      <Link to={ROUTE_PATHS.COMMUNITY_GUIDELINES} state={{ from: originPath }}>
        Community Guidelines
      </Link>.
    </p>
  )
}
