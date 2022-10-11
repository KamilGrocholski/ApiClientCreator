import axios, { AxiosInstance, AxiosResponse } from 'axios'
import type { Config } from './types/config'
import { handleAxiosErrorRange, handleAxiosSuccessRange } from './responseHandlers'
import type { Endpoint } from './types/ApiCall'
import { Logger } from './logger'

export class BaseClient {
    private readonly _axios: AxiosInstance
    private readonly _axiosRawResponse: AxiosInstance
    private readonly _config: Config
    private readonly _logger: Logger

    protected readonly auth: AxiosInstance

    constructor(config: Config) {
        this._config = config

        this._logger = new Logger({ ...config })

        
        this._axiosRawResponse = axios.create({ 
            headers: config.headers
        })
        
        // auth axios
        this.auth = axios.create({
            headers: config.headers
        })
        this.auth.interceptors.response.use(
            response => Promise.resolve(response),
            error => Promise.reject(error)
        )
        
        // normal axios
        this._axios = axios.create({
            headers: config.headers
        })
        this._axios.interceptors.response.use(
            response => handleAxiosSuccessRange(response, config, this._logger),
            error => handleAxiosErrorRange(error, config, this._logger)
        )
    }

    // returns data

    async get<T>(endpoint: Endpoint): Promise<T> {
        const response = await this._axios.get<T>(this._config.baseURL + endpoint)

        return response.data
    }

    async post<T>(endpoint: Endpoint): Promise<T> {
        const response = await this._axios.post<T>(this._config.baseURL + endpoint)

        return response.data
    }

    async put<T>(endpoint: Endpoint): Promise<T> {
        const response = await this._axios.put<T>(this._config.baseURL + endpoint)

        return response.data
    }

    async delete<T>(endpoint: Endpoint): Promise<T> {
        const response = await this._axios.delete<T>(this._config.baseURL + endpoint)

        return response.data
    }

    // return raw axios response

    async getWithRawResponse<T>(endpoint: Endpoint): Promise<AxiosResponse<T>> {
        const response = await this._axiosRawResponse.get<T>(this._config.baseURL + endpoint)

        return response
    } 

    async postWithRawResponse<T>(endpoint: Endpoint): Promise<AxiosResponse<T>> {
        const response = await this._axiosRawResponse.post<T>(this._config.baseURL + endpoint)

        return response
    } 

    async putWithRawResponse<T>(endpoint: Endpoint): Promise<AxiosResponse<T>> {
        const response = await this._axiosRawResponse.put<T>(this._config.baseURL + endpoint)

        return response
    } 

    async deleteWithRawResponse<T>(endpoint: Endpoint): Promise<AxiosResponse<T>> {
        const response = await this._axiosRawResponse.delete<T>(this._config.baseURL + endpoint)

        return response
    } 


    // auth axios

    async authGet<T>(endpoint: Endpoint): Promise<T> {
        const response = await this.auth.get<T>(endpoint)

        return response.data
    }
}

