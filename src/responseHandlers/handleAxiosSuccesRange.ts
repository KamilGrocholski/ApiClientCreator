import type { AxiosResponse } from 'axios'
import type { Config } from '../types/config'
import { LoggerType } from '../logger'
import type { Status2xxRange } from '../types/statusCodeRange'

export const handleAxiosSuccessRange = (response: AxiosResponse, config: Config, logger: LoggerType) => {
    const status = response.status as Status2xxRange
    const errorOnUndescribed = config.responseHandlers.errorOnUndescribedSuccessStatus
    const handler = config.responseHandlers.axiosSuccessRange[status]

    if (errorOnUndescribed && !handler) {
        // console.log('Status is not described in the config')
        logger.display({ treatAs: 'ERROR', status })

        throw new Error('Status is not described in the config')
    }

    if (!handler) {
        // console.log('undescribed status in success range')
        logger.display({ treatAs: 'WARNING', status, msg: 'Undescribed status in success range' })

        return Promise.resolve(response)
    }

    if (handler.treatAs === 'ERROR') {
        logger.display({ treatAs: handler.treatAs, status, msg: handler.msg })
        throw new Error('By the chosen options')    
    }
    
    logger.display({ treatAs: handler.treatAs, status, msg: handler.msg })

    return Promise.resolve(response)
}

