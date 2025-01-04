import type { AxiosRequestConfig, AxiosInstance, CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { type Params } from '@/utils/axios-helper/types'

export interface ResponseDataWrapper<T = unknown> {
  data: T
  code: number
  msg: string
}

export default class AxiosHelper {
  private readonly axiosInstance: AxiosInstance

  constructor(config: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config)
    this.initInterceptors()
  }

  initInterceptors() {
    this.axiosInstance.interceptors.request.use(
      // 在发送请求之前做些什么
      config => config,
      // 对请求错误做些什么
      err => Promise.reject(err)
    )

    this.axiosInstance.interceptors.response.use(
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      res => res,
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      err => Promise.reject(err)
    )
  }

  request<T = unknown, R = ResponseDataWrapper<T>>(config: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      this.axiosInstance
        .request<R>(config)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  }

  get<T = unknown>(url: string, params: Params = {}, config: AxiosRequestConfig = {}) {
    config = {
      url,
      params,
      method: 'GET',
      ...config
    }
    return this.request<T>(config)
  }

  post<T = unknown>(url: string, data: Params = {}, config: AxiosRequestConfig = {}) {
    config = {
      url,
      data,
      method: 'POST',
      // 使外部调用传入的 config 优先级最高
      ...config
    }
    return this.request<T>(config)
  }

  postForm<T = unknown>(url: string, data: Params = {}, config: AxiosRequestConfig = {}) {
    config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url,
      data,
      method: 'POST',
      ...config
    }
    return this.request<T>(config)
  }

  postJson<T = unknown>(url: string, data: Params = {}, config: AxiosRequestConfig = {}) {
    config = {
      headers: {
        'Content-Type': 'application/json'
      },
      url,
      data,
      method: 'POST',
      ...config
    }
    return this.request<T>(config)
  }

  putJson<T = unknown>(url: string, data: Params = {}, config: AxiosRequestConfig = {}) {
    config = {
      headers: {
        'Content-Type': 'application/json'
      },
      url,
      data,
      method: 'PUT',
      ...config
    }
    return this.request<T>(config)
  }

  // 文件流下载-带 token
  downloadWithAuth(url: string, params?: Params) {
    let _params: Params = {}
    if (params) {
      if (params.fileName) {
        const { fileName, ...other } = params
        _params = other
      } else {
        _params = params
      }
    }
    this.get(url, _params, {
      responseType: 'blob'
    }).then(blob => {
      this.download(blob as unknown as Blob, params?.fileName as string)
    })
  }

  // 文件流下载-带 token
  postDownloadWithAuth(url: string, params?: Params) {
    let _params: Params = {}
    if (params) {
      if (params.fileName) {
        const { fileName, ...other } = params
        _params = other
      } else {
        _params = params
      }
    }
    this.postForm(url, _params, {
      responseType: 'blob'
    }).then(blob => {
      this.download(blob as unknown as Blob, params?.fileName as string)
    })
  }
  // 文件流下载-带 token
  postJsonDownloadWithAuth(url: string, params?: Params) {
    let _params: Params = {}
    if (params) {
      if (params.fileName) {
        const { fileName, ...other } = params
        _params = other
      } else {
        _params = params
      }
    }
    this.postJson(url, _params, {
      responseType: 'blob'
    }).then(blob => {
      this.download(blob as unknown as Blob, params?.fileName as string)
    })
  }
  // 文件流下载
  download(blob: Blob | MediaSource, fileName?: string) {
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.href = url
    if (fileName) {
      a.download = fileName
    }
    a.click()
    window.URL.revokeObjectURL(url)
  }

  upload(url: string, file: File, fieldName = 'file', config?: AxiosRequestConfig) {
    config = {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const data = { [fieldName]: file }
    return this.post(url, data, config)
  }
}
