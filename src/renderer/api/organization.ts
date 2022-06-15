import { ApiUrl } from 'renderer/constants/url'
import http from 'renderer/lib/http'
import { IOrganisationResp } from 'renderer/types/organization'
import { ResponseType } from 'renderer/types/api'

export const getOrgainzation = () => {
  return http.get<ResponseType<IOrganisationResp>, ResponseType<IOrganisationResp>>(ApiUrl.getOrganization)
}
