import { ROUTE_PATHS } from '../../app/router/route-paths.js'
import { LoadingScreen } from '../../features/auth/index.js'

export function LoadingPage() {
  return <LoadingScreen nextPath={ROUTE_PATHS.LOGIN} />
}
