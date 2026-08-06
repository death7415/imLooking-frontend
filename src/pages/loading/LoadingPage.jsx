import { ROUTE_PATHS } from '../../app/router/route-paths.js'
import { LoadingScreen } from '../../features/auth/index.js'
import { getPostAuthPath, isAuthenticated } from '../../features/auth/model/index.js'

export function LoadingPage() {
  const nextPath = isAuthenticated() ? getPostAuthPath() : ROUTE_PATHS.LOGIN
  return <LoadingScreen nextPath={nextPath} />
}
