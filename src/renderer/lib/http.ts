import axios, { AxiosRequestConfig } from 'axios'
import { get, omit } from 'lodash'
import { commonContents } from 'renderer/contents/common'
import { getAuthToken } from './storage'

const baseUrl = 'http://c467-14-98-153-162.ngrok.io/api'

export const getErrorMessage = (error: unknown) => {
  return get(error, 'response.data.message') || commonContents.generalNetworkErrorMessage
}

export const getSuccessMessage = (response: unknown) => {
  return get(response, 'data.message') || commonContents.generalSuccesMessage
}

const http = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-type': 'application/json',
  },
})

http.interceptors.request.use(
  // eslint-disable-next-line func-names
  function (config: AxiosRequestConfig) {
    if (!config?.params?.withoutAuth) {
      config.headers.authorization = `token ${getAuthToken()}`
    }

    config.params = omit(config.params, 'withoutAuth')
    return config
  },
  // eslint-disable-next-line func-names
  function (error) {
    return Promise.reject(error)
  },
)

export default http
