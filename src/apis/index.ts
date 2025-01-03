import http from '@/utils/axios-helper'
import { type Params } from '@/utils/axios-helper/types'

export const getHbTwentyFivePhoneResultsApi = (params: Params) =>
  http.get('/virtual-manage-temp/hb25-phone-result/getHbTwentyFivePhoneResults', params)
