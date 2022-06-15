import Login from 'renderer/screens/login'
import Organization from 'renderer/screens/organization'
import { ROUTE_PATH } from 'renderer/types/route'

export interface RouterConfig {
  path: ROUTE_PATH
  Component: React.FC
  name: string
}

export const PUBLIC_ROUTES: RouterConfig[] = [
  {
    path: ROUTE_PATH.login,
    Component: Login,
    name: 'Login',
  },
]

export const PRIVATE_ROUTES: RouterConfig[] = [
  {
    path: ROUTE_PATH.organization,
    Component: Organization,
    name: 'Organization',
  },
]
