import AxiosHelper from '@/utils/axios-helper/AxiosHelper'

export default new AxiosHelper({
  baseURL: window.origin,
  timeout: 60 * 1000
})
