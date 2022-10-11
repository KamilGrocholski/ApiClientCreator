import { Status2xxRange, StatusNot2xxRange } from "./statusCodeRange"

export type Config = {
    clientName: string
    baseURL?: string,
    headers: Headers
    responseHandlers: {
        errorOnUndescribedSuccessStatus: boolean,
        axiosSuccessRange: AxiosSuccessRange
        axiosErrorRange: AxiosErrorRange
    }
}

export type TreatAs = 'WARNING' | 'ERROR' | 'SUCCESS'

export type AxiosSuccessRange = Partial<Record<Status2xxRange, {
    treatAs: TreatAs
    msg?: string
    // callback?: <T extends unknown[]>(...args: T) => T
}>>

export type AxiosErrorRange = Partial<Record<StatusNot2xxRange, {
    msg?: string
    // callback?: <T extends unknown[]>(...args: T) => T
}>>

type Headers = Record<string, string>
