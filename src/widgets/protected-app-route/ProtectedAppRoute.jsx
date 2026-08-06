import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTE_PATHS } from '../../app/router/route-paths.js'
import {
  getAuthSession,
  getPostAuthPath,
  isAuthenticated,
  requiresEmailVerification,
  requiresProfileSetup,
} from '../../features/auth/model/auth-session.js'

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

  const session = getAuthSession()
  const profileRequired = requiresProfileSetup(session)
  const emailVerificationRequired = requiresEmailVerification(session)
  const postAuthPath = getPostAuthPath(session)

  if (profileRequired && location.pathname !== ROUTE_PATHS.PROFILE) {
    return <Navigate replace to={ROUTE_PATHS.PROFILE} />
  }

  if (emailVerificationRequired && location.pathname !== ROUTE_PATHS.VERIFY_EMAIL) {
    return <Navigate replace to={ROUTE_PATHS.VERIFY_EMAIL} />
  }

  if (!profileRequired && !emailVerificationRequired) {
    if (location.pathname === ROUTE_PATHS.PROFILE || location.pathname === ROUTE_PATHS.VERIFY_EMAIL) {
      return <Navigate replace to={postAuthPath} />
    }
  }

  return <Outlet />
}
