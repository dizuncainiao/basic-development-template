import http from '@/utils/axios-helper'
import { type Params } from '@/utils/axios-helper/types'

type ResData = {
  total: number
  list: Array<{
    id: number
    phone: string
    name: string
  }>
  page: number
}

export const getHbTwentyFivePhoneResultsApi = (params: Params) =>
  // 你可以传入一个响应数据类型 ResData，它可以提供更强大的智能感知
  http.get<ResData>('/virtual-manage-temp/hb25-phone-result/getHbTwentyFivePhoneResults', params)
