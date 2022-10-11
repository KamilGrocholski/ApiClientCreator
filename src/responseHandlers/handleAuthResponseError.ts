import { AxiosError } from 'axios'
import type { Config } from '../types/config'
import { LoggerType } from '../logger'
import type { StatusNot2xxRange } from '../types/statusCodeRange'

export const handleAxiosErrorRange = (error: AxiosError, config: Config, logger: LoggerType, getAccessToken: () => Promise<string>, header: string) => {
    // if (!error.config || !error?.config) {

    //   return Promise.reject(error)
    // }

    // if (!(error?.message.includes("timeout") || error?.message.includes("Network Error"))) {

    //     return Promise.reject(error)
    // }   
    // if (error?.config?.headers?.common) {
    //     error.config.headers[header] = await getAccessToken()     
    // }
} 