import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTE_PATHS } from '../../app/router/route-paths.js'
import { isAuthenticated } from '../../features/auth/model/auth-session.js'

export function ProtectedAppRoute() {
  const location = useLocation()

  if (!isAuthenticated()) {
    const returnPath = `${location.pathname}${location.search}${location.hash}`

    return (
      <Navigate
        replace
        to={ROUTE_PATHS.LOGIN}
        state={{ from: returnPath }}
      />
    )
  }

  return <Outlet />
}
