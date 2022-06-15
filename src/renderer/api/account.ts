import { AuthLogin } from 'renderer/types/accounts'
import http from 'renderer/lib/http'
import { ApiUrl } from 'renderer/constants/url'

export const updateLogin = (data: AuthLogin) => {
  return http.post(ApiUrl.login, data, { params: { withoutAuth: true } })
}
