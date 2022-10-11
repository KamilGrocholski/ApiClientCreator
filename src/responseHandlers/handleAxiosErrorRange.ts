import { AxiosError } from 'axios'
import type { Config } from '../types/config'
import { LoggerType } from '../logger'
import type { StatusNot2xxRange } from '../types/statusCodeRange'

export const handleAxiosErrorRange = (error: AxiosError | any, config: Config, logger: LoggerType) => {
    const status = error?.status as StatusNot2xxRange
    const handler = config.responseHandlers.axiosErrorRange[status]


    if (!status) {
        logger.display({ treatAs: 'ERROR', status })

        return Promise.reject()
    }

    if (!(error instanceof AxiosError)) {
        logger.display({ treatAs: 'ERROR', status, msg: 'Error in not an instance of AxiosError' })

        return Promise.reject()
    }

    if (!handler) {
        // console.log('Response Error with undescribed status')
        logger.display({ treatAs: 'ERROR', status, msg: 'Response error with undescribed status' })

        return Promise.reject()
    }

    logger.display({ treatAs: 'ERROR', status, msg: handler.msg })

    return Promise.reject()
} 